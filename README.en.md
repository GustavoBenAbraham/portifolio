[Português](README.md) | **English**

# Gustavo Ben Abraham — Portfolio

I am Gustavo Ben Abraham Silva, a Systems Analysis and Development student at UniÍtalo and a Pulse Mais scholarship recipient. My focus is Java back-end development with Spring Boot and PostgreSQL. This portfolio connects my projects with my experience in support, customer service and problem solving.

[Visit the portfolio](https://gustavobenabraham.github.io/portifolio/)

## Portfolio content

- **DinDin de Giro and Helpdesk API** are the main projects, demonstrating financial domain modeling, authentication, authorization and business rules in Java.
- **Cuscuzeria Gourmet, Tarot.exe and Pokédex Full Stack** provide supporting examples of a real business website, desktop Java and external API integration.
- Professional experience at **DASA**, including a JavaScript tool for searching operational manuals, plus roles at Konecta, Shell and freelance work with CCTV and networks.
- Degree studies, courses, technologies in context, Portuguese and English résumés, and my Algoritmo Doce business.

The [November 2026 review](docs/REVISAO-PORTFOLIO-2026-11.md) documents the selection criteria, GitHub evidence and project limitations (in Portuguese).

## Technologies and behavior

The site uses native HTML, CSS and JavaScript and is hosted on GitHub Pages. It includes a responsive layout, keyboard-accessible navigation, Canvas animations and reduced-motion support. Inter and JetBrains Mono load through Google Fonts, with system font fallbacks.

Project content is already present in the HTML. Viewing the site requires no GitHub API calls, npm dependencies or compilation.

## Run locally

```bash
git clone https://github.com/GustavoBenAbraham/portifolio.git
cd portifolio
```

Open `index.html` in a browser or serve the folder with Live Server. **Node.js is not required to view the portfolio.**

## Update the project selection

Edit [`data/projects.json`](data/projects.json), the source of the project cards. `featured: true` places a project in the main group; array order determines the display order within each group. `repository` is required and `demo` is optional: without it, the card has no application button.

After changing the selection, use Node.js to regenerate the static HTML and check synchronization:

```bash
node scripts/sync-projects.mjs
node scripts/sync-projects.mjs --check
```

The `--check` command validates the data and checks that the HTML matches the configuration without changing files. Do not edit generated cards directly. Other page content remains editable in `index.html`.

## Structure

```text
index.html                       # Page and generated cards
style.css                        # Theme, layout and responsive rules
script.js                        # Navigation and animations
data/projects.json               # Project selection and content
scripts/sync-projects.mjs         # Card HTML generation and verification
docs/DOCUMENTACAO.md              # Technical and maintenance guide
docs/REVISAO-PORTFOLIO-2026-11.md   # Project review and selection criteria
LICENSE                          # MIT license
```

## Publishing and maintenance

The existing GitHub Pages hosting remains in place. Commit the regenerated HTML alongside the project data and other changes to the branch already configured under **Settings → Pages**. Hosting continues to serve static files without new infrastructure or a server-side compilation step.

See the [technical documentation](docs/DOCUMENTACAO.md) for the data format and maintenance instructions (in Portuguese).

## Contact and license

[GitHub](https://github.com/GustavoBenAbraham) · [LinkedIn](https://www.linkedin.com/in/gustavo-ben-abraham-silva/) · [Portfolio](https://gustavobenabraham.github.io/portifolio/)

Licensed under [MIT](LICENSE); retain its copyright notice and license terms when reusing the code.
