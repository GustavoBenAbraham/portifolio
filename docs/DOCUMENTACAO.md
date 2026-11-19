# Documentação técnica — Portfólio

O portfólio de Gustavo Ben Abraham é um site estático em HTML, CSS e JavaScript, publicado no [GitHub Pages](https://gustavobenabraham.github.io/portifolio/). Não utiliza framework, bundler ou dependências npm. Node.js é usado somente na manutenção da seleção de projetos; a página continua abrindo diretamente no navegador.

## Arquivos e responsabilidades

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Metadados, seções, navegação, currículos e trecho gerado dos projetos. |
| `style.css` | Tema, tipografia, componentes, responsividade e animações. |
| `script.js` | Menu, rolagem, revelação de conteúdo e Canvas. |
| `data/projects.json` | Fonte dos títulos, descrições, prioridades, tecnologias e links dos cartões. |
| `scripts/sync-projects.mjs` | Validação dos dados, geração dos cartões e verificação de sincronização. |
| `README.md` / `README.en.md` | Apresentação e instruções em português e inglês. |
| `docs/REVISAO-PORTFOLIO-2026-11.md` | Evidências e critérios usados na curadoria dos projetos. |

## Conteúdo da página

A apresentação posiciona Gustavo como estudante de ADS na UniÍtalo, bolsista pelo Programa Pulse Mais, com foco em Back-End Java. A seleção atual tem cinco projetos:

| Grupo | Ordem | Projeto |
| --- | --- | --- |
| Principal | 1 | DinDin de Giro, evolução do repositório `task-manager-api` |
| Principal | 2 | Helpdesk API |
| Complementar | 1 | Cuscuzeria Gourmet |
| Complementar | 2 | Tarot.exe |
| Complementar | 3 | Pokédex Full Stack |

A trajetória profissional inclui DASA, Konecta/Decolar.com, Shell e atuação freelancer com CFTV e redes. Na DASA, o destaque é a Central de Manuais Operacionais, ferramenta interna em JavaScript, HTML e CSS; o site não oferece seu código ou acesso. Formação, cursos, tecnologias em contexto, Algoritmo Doce, currículos e contatos completam a apresentação.

A [revisão de novembro de 2026](REVISAO-PORTFOLIO-2026-11.md) explica por que esses projetos receberam destaque e diferencia funcionalidades verificadas, evidências de testes e limitações. Consulte esse documento ao atualizar descrições técnicas.

## Editar os projetos

[`data/projects.json`](../data/projects.json) é um array de objetos. A ordem é preservada dentro de cada grupo: primeiro são exibidos os objetos com `featured: true`, depois os demais.

| Campo | Formato e uso |
| --- | --- |
| `id` | Identificador único com letras minúsculas, números e hífens; usado nos IDs dos títulos. |
| `featured` | Booleano obrigatório; `true` coloca o cartão no grupo principal. |
| `name`, `category`, `language` | Textos obrigatórios para nome, contexto e linguagem exibidos. |
| `description` | Resumo obrigatório do problema e da solução. |
| `highlights` | Array não vazio de textos com funcionalidades ou evidências relevantes. |
| `technologies` | Array não vazio de textos para as tags de tecnologias. |
| `repository` | URL HTTPS obrigatória para o botão “Ver código”. |
| `demo` | URL HTTPS opcional para o botão “Abrir aplicação”. Omita quando não houver demonstração confirmada. |
| `subtitle`, `note` | Textos opcionais para contexto adicional ou limitações. |

Execute os comandos na raiz do repositório:

```bash
node scripts/sync-projects.mjs
node scripts/sync-projects.mjs --check
```

O primeiro comando valida os dados e substitui apenas o trecho entre `<!-- PROJECTS:START -->` e `<!-- PROJECTS:END -->` em `index.html`. Os marcadores devem permanecer presentes uma única vez e na ordem correta. Textos e atributos são escapados pelo gerador antes de entrarem no HTML.

O segundo comando faz as mesmas validações e verifica se o HTML está sincronizado, sem gravar arquivos. Ele termina com erro se os dados forem inválidos ou os cartões estiverem desatualizados. A verificação não acessa os links nem executa os projetos externos.

Não edite os cartões gerados diretamente: a próxima geração sobrescreverá essas alterações. Versione `data/projects.json` e o `index.html` regenerado juntos. O navegador não lê esse JSON, não chama o GitHub e não depende de Node.js para mostrar os projetos.

## Editar o restante do site

- Textos de apresentação, experiência, formação, metadados e links de currículo ficam em `index.html`.
- Cores, fontes, espaçamentos e layouts ficam em `style.css`.
- Navegação e animações ficam em `script.js`.
- Mantenha os dois READMEs alinhados quando mudar o perfil, a seleção ou o procedimento de manutenção.

O LinkedIn atual é [gustavo-ben-abraham-silva](https://www.linkedin.com/in/gustavo-ben-abraham-silva/). Ao trocar currículos, confirme os caminhos usados pelos botões. Ao mudar o endereço público, revise também os metadados Open Graph e Twitter no `<head>`.

## Estilos, interação e acessibilidade

O tema usa propriedades customizadas em `:root`, fundo escuro e detalhes azuis e verdes. Inter e JetBrains Mono vêm do Google Fonts, com alternativas do sistema. Os projetos principais usam duas colunas e os complementares, três; até 900 px, ambos passam para uma coluna. Há ajustes adicionais em 768 px e 480 px.

O JavaScript controla o menu móvel, os estados ARIA, o cabeçalho durante a rolagem, o Canvas decorativo e as animações de entrada. O menu fecha ao selecionar um link, pressionar `Escape`, clicar fora ou voltar ao layout desktop. A preferência `prefers-reduced-motion` reduz os efeitos; o conteúdo principal permanece no HTML mesmo sem JavaScript.

Preserve a estrutura semântica, a hierarquia dos títulos, os nomes acessíveis, o foco visível e os estados do menu ao editar a página.

## Visualizar e publicar

1. Abra `index.html` no navegador ou sirva a pasta com Live Server. Não há instalação npm.
2. Se mudou os projetos, execute a geração e `--check`.
3. Confira desktop e celular, navegação por teclado, downloads dos currículos e destinos dos links.
4. Envie os arquivos atualizados para a branch já configurada em **Settings → Pages**.

A hospedagem existente no GitHub Pages continua servindo os arquivos estáticos. O gerador é uma ferramenta local de edição: não exige alterar a infraestrutura nem acrescentar compilação à publicação.

O site usa Google Fonts para tipografia e links para serviços externos; não possui API própria ou armazenamento de dados de visitantes. O código está sob a [licença MIT](../LICENSE).
