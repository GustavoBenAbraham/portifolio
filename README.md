**Português** | [English](README.en.md)

# Gustavo Ben Abraham — Portfólio

Sou Gustavo Ben Abraham Silva, estudante de Análise e Desenvolvimento de Sistemas na UniÍtalo e bolsista pelo Programa Pulse Mais. Meu foco é Back-End Java, com Spring Boot e PostgreSQL. Este portfólio conecta meus projetos à experiência com suporte, atendimento e resolução de problemas.

[Acesse meu portfólio](https://gustavobenabraham.github.io/portifolio/)

## O que o site apresenta

- **DinDin de Giro e Helpdesk API** como projetos principais: domínio financeiro, autenticação, autorização e regras de negócio em Java.
- **Cuscuzeria Gourmet, Tarot.exe e Pokédex Full Stack** como projetos complementares, cobrindo um negócio real, Java desktop e integração com API externa.
- Experiência na **DASA**, com a Central de Manuais Operacionais desenvolvida em JavaScript, além das passagens pela Konecta, Shell e atuação freelancer com CFTV e redes.
- Formação em ADS, cursos, tecnologias em contexto, currículos em português e inglês e o empreendimento Algoritmo Doce.

A [revisão de novembro de 2026](docs/REVISAO-PORTFOLIO-2026-11.md) registra os critérios da seleção, as evidências consultadas no GitHub e os limites de cada projeto.

## Tecnologias e funcionamento

O site usa HTML, CSS e JavaScript nativos, com hospedagem no GitHub Pages. Inclui layout responsivo, menu acessível por teclado, animações em Canvas e suporte a movimento reduzido. Inter e JetBrains Mono são carregadas pelo Google Fonts, com fontes alternativas do sistema.

Os projetos já ficam no HTML: não há chamadas ao GitHub durante a visita, dependências npm ou compilação para visualizar o site.

## Executar localmente

```bash
git clone https://github.com/GustavoBenAbraham/portifolio.git
cd portifolio
```

Abra `index.html` no navegador ou sirva a pasta com o Live Server. **Não é necessário Node.js para abrir o portfólio.**

## Atualizar a seleção de projetos

Edite [`data/projects.json`](data/projects.json), a fonte dos cartões. `featured: true` coloca o projeto no grupo principal; a ordem do array define a ordem dentro de cada grupo. `repository` é obrigatório e `demo` é opcional: sem esse campo, não aparece botão de aplicação.

Após editar a seleção, use Node.js para regenerar o trecho estático em `index.html` e verificar a sincronização:

```bash
node scripts/sync-projects.mjs
node scripts/sync-projects.mjs --check
```

O comando `--check` valida os dados e verifica se o HTML corresponde à configuração, sem alterar arquivos. Não edite os cartões gerados diretamente. Textos das demais seções continuam em `index.html`.

## Estrutura

```text
index.html                       # Página e cartões gerados
style.css                        # Tema, layout e responsividade
script.js                        # Navegação e animações
data/projects.json               # Seleção e conteúdo dos projetos
scripts/sync-projects.mjs         # Geração e verificação do HTML dos cartões
docs/DOCUMENTACAO.md              # Guia técnico e manutenção
docs/REVISAO-PORTFOLIO-2026-11.md   # Análise e critérios de destaque
LICENSE                          # Licença MIT
```

## Publicação e manutenção

O site mantém a hospedagem existente no GitHub Pages. Envie o HTML regenerado junto com os dados e demais alterações para a branch já configurada em **Settings → Pages**. A publicação continua servindo arquivos estáticos, sem nova infraestrutura ou etapa de compilação no servidor.

Consulte a [documentação técnica](docs/DOCUMENTACAO.md) para o formato dos dados e os cuidados de manutenção.

## Contato e licença

[GitHub](https://github.com/GustavoBenAbraham) · [LinkedIn](https://www.linkedin.com/in/gustavo-ben-abraham-silva/) · [Portfólio](https://gustavobenabraham.github.io/portifolio/)

Licenciado sob [MIT](LICENSE). Ao reutilizar o código, mantenha o aviso de direitos autorais e os termos da licença.
