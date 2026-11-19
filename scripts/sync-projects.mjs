import { readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

// Generate static HTML so projects remain readable without JavaScript or GitHub.
const root = new URL('../', import.meta.url);
const projects = JSON.parse(await readFile(new URL('data/projects.json', root), 'utf8'));
const indexPath = new URL('index.html', root);
const html = await readFile(indexPath, 'utf8');
const start = '<!-- PROJECTS:START -->';
const end = '<!-- PROJECTS:END -->';
assert(html.split(start).length === 2 && html.split(end).length === 2, 'Project markers must appear exactly once.');
assert(html.indexOf(start) < html.indexOf(end), 'Project markers are out of order.');
assert(Array.isArray(projects) && projects.length > 0, 'Add at least one project.');
const ids = new Set();
for (const project of projects) {
  assert(/^[a-z0-9-]+$/.test(project.id) && !ids.has(project.id), 'Project IDs must be unique slugs.');
  ids.add(project.id);
  for (const field of ['name', 'category', 'language', 'description', 'repository']) {
    assert(typeof project[field] === 'string' && project[field].trim(), `Missing ${field} in ${project.id}.`);
  }
  assert(typeof project.featured === 'boolean', `Missing featured in ${project.id}.`);
  for (const field of ['highlights', 'technologies']) {
    assert(Array.isArray(project[field]) && project[field].length > 0 && project[field].every(value => typeof value === 'string' && value.trim()), `Invalid ${field} in ${project.id}.`);
  }
  for (const field of ['subtitle', 'note']) {
    assert(project[field] === undefined || typeof project[field] === 'string', `Invalid ${field} in ${project.id}.`);
  }
  for (const value of [project.repository, project.demo].filter(value => value !== undefined)) {
    assert(new URL(value).protocol === 'https:', `Use HTTPS links in ${project.id}.`);
  }
}

const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const link = (url, label, name) => `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer" class="btn btn--ghost btn--sm" aria-label="${escape(label)}: ${escape(name)}">${escape(label)}</a>`;
const card = project => `          <article class="project-card${project.featured ? ' project-card--featured' : ''} reveal" aria-labelledby="${project.id}-title">
            <div class="project-card__header">
              <span class="project-card__category">${escape(project.category)}</span>
              <span class="project-card__lang">${escape(project.language)}</span>
            </div>
            <h3 class="project-card__name" id="${project.id}-title">${escape(project.name)}</h3>${project.subtitle ? `
            <p class="project-card__subtitle">${escape(project.subtitle)}</p>` : ''}
            <p class="project-card__desc">${escape(project.description)}</p>
            <ul class="project-card__highlights">
${project.highlights.map(value => `              <li>${escape(value)}</li>`).join('\n')}
            </ul>${project.note ? `
            <p class="project-card__note">${escape(project.note)}</p>` : ''}
            <ul class="project-card__tags" aria-label="Tecnologias usadas">
${project.technologies.map(value => `              <li class="tag">${escape(value)}</li>`).join('\n')}
            </ul>
            <div class="project-card__footer">
              ${link(project.repository, 'Ver código', project.name)}${project.demo ? `
              ${link(project.demo, 'Abrir aplicação', project.name)}` : ''}
            </div>
          </article>`;

const featured = projects.filter(project => project.featured);
const supporting = projects.filter(project => !project.featured);
const sections = [];
if (featured.length) sections.push(`        <div class="projects-featured">\n${featured.map(card).join('\n\n')}\n        </div>`);
if (supporting.length) sections.push(`        <p class="projects-secondary-heading">Outros projetos selecionados</p>\n        <div class="projects-grid">\n${supporting.map(card).join('\n\n')}\n        </div>`);
const newline = html.includes('\r\n') ? '\r\n' : '\n';
const content = (`\n${sections.join('\n\n')}\n        `).replaceAll('\n', newline);
const updated = html.slice(0, html.indexOf(start) + start.length) + content + html.slice(html.indexOf(end));
if (process.argv.includes('--check')) {
  assert(updated === html, 'Projects are out of sync. Run node scripts/sync-projects.mjs.');
  console.log(`OK: ${projects.length} projects match index.html.`);
} else {
  await writeFile(indexPath, updated, 'utf8');
  console.log(`Updated ${projects.length} projects in index.html.`);
}
