# Revisão do portfólio — 19/11/2026

Análise dos repositórios públicos de [GustavoBenAbraham](https://github.com/GustavoBenAbraham), com foco em oportunidades de desenvolvimento back-end Java júnior. Foram consultados metadados da API do GitHub, READMEs, dependências, código, arquivos de testes e registros públicos de CI. Os projetos externos não foram clonados nem tiveram seus testes executados nesta revisão. Existência de testes, leitura de código e resultado histórico de CI são evidências distintas de validação local.

## Prioridade recomendada

| Ordem | Projeto | Papel no portfólio | Motivo |
| --- | --- | --- | --- |
| 1 | DinDin de Giro (`task-manager-api`) | Principal | Produto com domínio financeiro, autenticação, acesso por espaço, convites e interface React. É muito mais amplo do que o antigo CRUD de tarefas. |
| 2 | Helpdesk API | Principal | Demonstra autorização por papel e proprietário, regras de transição, auditoria transacional e testes HTTP de integração. |
| 3 | Cuscuzeria Gourmet | Complementar | Trabalho para um negócio real, com catálogo, carrinho persistente, testes e site publicamente acessível. |
| 4 | Tarot.exe | Complementar | Java além do Spring: JavaFX, domínio separado, persistência local e testes de histórico e sorteio. |
| 5 | Pokédex Full Stack | Complementar | Mantém a trajetória de aprendizado e a integração de APIs, mas tem menor profundidade que os dois projetos principais. |

O Algoritmo Doce v2 merece aparecer na apresentação pessoal/empreendedorismo, como evolução da primeira versão. Ele acrescenta TypeScript e uma experiência pequena com Rust/WebAssembly, mas não precisa disputar um dos cinco cartões principais. Essa seleção privilegia aderência à vaga, regras implementadas, evidências de qualidade e diversidade; popularidade e data de atualização não foram usadas como substitutos de qualidade.

## 1. DinDin de Giro

[Repositório e documentação](https://github.com/GustavoBenAbraham/task-manager-api). O nome do repositório e sua descrição curta ainda remetem a tarefas; o README e a aplicação agora se chamam DinDin de Giro.

**Texto sugerido:** Aplicação para organizar finanças pessoais e de pequenos negócios. Backend Java com autenticação JWT, espaços financeiros com controle de acesso, contas a pagar e receber e fluxo de caixa; interface em React.

**Stack conferida:** Java 21, Spring Boot 4.1.1, Spring Security, Spring Data JPA, PostgreSQL, Flyway, JJWT, React 18 e Vite. Há configuração Docker. Evidências: [pom.xml](https://github.com/GustavoBenAbraham/task-manager-api/blob/main/pom.xml), [frontend/package.json](https://github.com/GustavoBenAbraham/task-manager-api/blob/main/frontend/package.json).

O código confirma:

- [JWT e BCrypt](https://github.com/GustavoBenAbraham/task-manager-api/blob/main/src/main/java/com/gustavo/taskmanager/config/SecurityConfig.java), com autenticação exigida nas rotas protegidas.
- [Seleção do espaço financeiro](https://github.com/GustavoBenAbraham/task-manager-api/blob/main/src/main/java/com/gustavo/taskmanager/service/EspacoAtualService.java) pelo cabeçalho `X-Espaco-Financeiro-Id`, validando acesso ativo; sem o cabeçalho, usa o espaço pessoal.
- [Convites para gestora financeira](https://github.com/GustavoBenAbraham/task-manager-api/blob/main/src/main/java/com/gustavo/taskmanager/service/AcessoEspacoService.java), com token aleatório armazenado como hash SHA-256, validade de sete dias, aceite vinculado ao e-mail convidado e revogação de acesso.
- [Contas previstas a pagar/receber](https://github.com/GustavoBenAbraham/task-manager-api/blob/main/src/main/java/com/gustavo/taskmanager/service/TituloFinanceiroService.java), editáveis enquanto pendentes; liquidação cria lançamento realizado em transação. O [repositório de títulos](https://github.com/GustavoBenAbraham/task-manager-api/blob/main/src/main/java/com/gustavo/taskmanager/repository/TituloFinanceiroRepository.java) usa bloqueio pessimista na atualização.
- [Fluxo de caixa](https://github.com/GustavoBenAbraham/task-manager-api/blob/main/src/main/java/com/gustavo/taskmanager/service/impl/DashboardServiceImpl.java) com saldo inicial, receitas/despesas realizadas, previsões pendentes e saldo projetado separados.

**Evidência de testes:** o [diretório de testes de serviços](https://github.com/GustavoBenAbraham/task-manager-api/tree/main/src/test/java/com/gustavo/taskmanager/service/impl) contém 19 métodos de teste com Mockito para autenticação, categorias, contas, dashboard básico, lançamentos e tarefas. Há também um teste de carregamento do contexto. Não foram encontrados testes específicos de espaços, convites ou liquidação na árvore consultada. Evitar frases como “cobertura completa” ou “todo o fluxo validado”.

**Limites:** o README declara ausência de Swagger/OpenAPI, envio de convite por e-mail, conciliação bancária e histórico imutável de todas as alterações. Não chamar o projeto apenas de Task Manager nem atribuir Swagger. A URL [publicada no README](https://task-manager-api-wmx2.onrender.com/) foi consultada, mas a página e o health check excederam os limites de espera nesta revisão; não foi possível confirmar sua disponibilidade. O README menciona demora de inicialização no Render. Um link deve ser apresentado como demonstração sujeita à disponibilidade, sem prometer que está operacional.

## 2. Helpdesk API

[Repositório e documentação](https://github.com/GustavoBenAbraham/helpdesk-api).

**Texto sugerido:** API de chamados de suporte com papéis de cliente e agente, acesso restrito por proprietário e histórico de atendimento. Regras de transição e auditoria transacional acompanhadas de testes de integração HTTP.

**Stack conferida:** Java 21, Spring Boot 4.1.2, Spring Security, Spring Data JPA, Bean Validation, Flyway, H2 e configuração PostgreSQL/Docker. Autenticação HTTP Basic com BCrypt, não JWT. Evidências: [pom.xml](https://github.com/GustavoBenAbraham/helpdesk-api/blob/main/pom.xml), [SecurityConfig](https://github.com/GustavoBenAbraham/helpdesk-api/blob/main/src/main/java/dev/portfolio/helpdesk/SecurityConfig.java).

O [TicketService](https://github.com/GustavoBenAbraham/helpdesk-api/blob/main/src/main/java/dev/portfolio/helpdesk/TicketService.java) verifica proprietário, retorna 404 para recursos de outro cliente, permite mudanças de status apenas a agentes, valida transições e persiste eventos na mesma transação. Chamados fechados não aceitam comentários. Há filtros por status/prioridade e paginação. A entidade [Ticket](https://github.com/GustavoBenAbraham/helpdesk-api/blob/main/src/main/java/dev/portfolio/helpdesk/Ticket.java) possui `@Version` para controle otimista de concorrência.

**Evidência de testes:** [ApiIntegrationTests](https://github.com/GustavoBenAbraham/helpdesk-api/blob/main/src/test/java/dev/portfolio/helpdesk/ApiIntegrationTests.java) contém três testes com servidor em porta aleatória, cliente HTTP real e H2: autenticação/validação, acesso indevido entre clientes e fluxo completo com reabertura/encerramento/histórico. O [workflow](https://github.com/GustavoBenAbraham/helpdesk-api/blob/main/.github/workflows/ci.yml) executa `mvn verify`; a [execução pública consultada](https://github.com/GustavoBenAbraham/helpdesk-api/actions/runs/40024174993), de 23/10/2026, registra sucesso. Isso não equivale a executar novamente os testes nesta revisão.

**Limites:** MVP sem interface gráfica e sem Swagger UI. A demonstração documentada usa H2 e cliente HTTP local. O próprio README informa que PostgreSQL/Docker ainda necessita validação e que não há teste específico de concorrência. Não adicionar botão de demo web inexistente; oferecer código e roteiro em [requests.http](https://github.com/GustavoBenAbraham/helpdesk-api/blob/main/requests.http).

## 3. Cuscuzeria Gourmet

[Repositório](https://github.com/GustavoBenAbraham/cuscuzeria-gourmet) e [site publicado](https://gustavobenabraham.github.io/cuscuzeria-gourmet-site/). A página respondeu HTTP 200 na consulta de 19/11/2026. O repositório `cuscuzeria-gourmet-site` contém os arquivos de publicação; o código-fonte está em `cuscuzeria-gourmet`.

**Texto sugerido:** Site e cardápio digital desenvolvidos para um restaurante, com busca, carrinho persistente e preparação de pedidos para WhatsApp. Interface React/TypeScript com testes unitários e de navegação.

**Stack:** React 19, TypeScript, Vite, Tailwind CSS 4, React Router, React Hook Form, Zod, Vitest e Playwright, conferidos no [package.json](https://github.com/GustavoBenAbraham/cuscuzeria-gourmet/blob/main/package.json).

Os [testes de domínio](https://github.com/GustavoBenAbraham/cuscuzeria-gourmet/blob/main/src/utils/order.test.ts) exercitam cálculos monetários, restauração de carrinho, dados corrompidos, limites e geração do link de WhatsApp. Os [testes de interface](https://github.com/GustavoBenAbraham/cuscuzeria-gourmet/blob/main/tests/interface.spec.ts) abrangem busca, persistência, validação, tamanhos de tela e falha de armazenamento. O catálogo é documentado e testado com 64 opções.

**Limites:** é um frontend. Não processa pagamentos, confirma pedidos, autentica usuários nem controla estoque em tempo real. A integração WhatsApp prepara uma mensagem que a pessoa envia no aplicativo; iFood é um link externo. Não anunciar integração transacional com essas plataformas. A fotografia principal é identificada como ilustrativa e gerada por IA no projeto.

## 4. Tarot.exe

[Repositório](https://github.com/GustavoBenAbraham/tarot-exe).

**Texto sugerido:** Aplicativo desktop em JavaFX com sorteios de cartas, interpretações locais, histórico e exportação de leituras. Projeto para exercitar modelagem, persistência e testes em Java.

**Stack:** Java 21, JavaFX 21 e JUnit 5, conforme [pom.xml](https://github.com/GustavoBenAbraham/tarot-exe/blob/main/pom.xml). O [motor de sorteio](https://github.com/GustavoBenAbraham/tarot-exe/blob/main/src/main/java/com/tarotexe/engine/RandomEngine.java) usa SecureRandom, evita repetição na mesma tiragem e valida cartas duplicadas. Os [testes de histórico](https://github.com/GustavoBenAbraham/tarot-exe/blob/main/src/test/java/com/tarotexe/HistoryStoreTest.java) incluem compatibilidade com arquivos antigos, restauração, ordenação e preservação de arquivos corrompidos. A [execução pública de CI consultada](https://github.com/GustavoBenAbraham/tarot-exe/actions/runs/40047020995), de 24/10/2026, registra sucesso.

**Correção necessária:** a descrição curta do GitHub menciona Ollama, mas o README e a árvore atuais informam que a integração com IA foi removida. Não mencionar IA/Ollama no cartão. O README também avisa que binários antigos precisam ser reconstruídos; oferecer o código, sem prometer instalador atualizado ou demonstração web.

## 5. Pokédex Full Stack

[Repositório](https://github.com/GustavoBenAbraham/pokedex-fullstack).

**Texto sugerido:** Pokédex que conecta uma API Java/Spring Boot à PokeAPI e apresenta busca, listagem e detalhes em uma interface JavaScript.

Java 21, Spring Boot 4.1.1, RestTemplate, JavaScript, HTML e CSS. O [serviço](https://github.com/GustavoBenAbraham/pokedex-fullstack/blob/main/backend/src/main/java/com/gustavo/pokedex/service/PokeApiService.java) confirma chamadas à PokeAPI, mapeamento em DTOs e busca por nome/ID. É uma boa evidência de integração de sistemas, menor que os projetos principais em domínio e persistência.

**Limites:** a árvore consultada contém apenas o [teste de carregamento do contexto](https://github.com/GustavoBenAbraham/pokedex-fullstack/blob/main/backend/src/test/java/com/gustavo/pokedex/PokedexApplicationTests.java). O README lista testes unitários e deploy do backend como próximos passos. Não dizer que possui suíte funcional de backend nem inventar demonstração hospedada.

## Algoritmo Doce e demais repositórios

O [Algoritmo Doce v2](https://github.com/GustavoBenAbraham/algoritmo-doce-v2) pode substituir o link da versão antiga na narrativa pessoal. A [demo v2](https://gustavobenabraham.github.io/algoritmo-doce-v2/) respondeu HTTP 200 e apresentou o título “Algoritmo Doce v2.0 | Confeitaria Tech”. A [demo v1](https://gustavobenabraham.github.io/algoritmo-doce/) também respondeu HTTP 200, com o título “Algoritmo Doce - Dev & Gourmet”; não foi identificado redirecionamento automático para v2.

Na v2, o [carrinho TypeScript](https://github.com/GustavoBenAbraham/algoritmo-doce-v2/blob/main/src/cart.ts) implementa persistência, quantidades, cupons e link WhatsApp. O [módulo Rust](https://github.com/GustavoBenAbraham/algoritmo-doce-v2/blob/main/crate-engine/src/lib.rs) aplica dois descontos por cupom e é importado como WebAssembly, com alternativa em TypeScript. É uma experiência pontual; não apresentar como backend Rust, motor complexo ou sistema de pagamentos. O README mantém roadmap de testes e produção pendente, apesar da página pública existir. HTTP 200 confirma acesso ao documento, não valida todo o fluxo de compra.

- [Agente IA Java](https://github.com/GustavoBenAbraham/agente-ia-java): experimento útil com Java, Spring AI, Ollama e histórico JDBC/PostgreSQL. O [controlador](https://github.com/GustavoBenAbraham/agente-ia-java/blob/main/src/main/java/com/gustavoDev/agente_ia_java/ChatController.java) mostra chat e conversas, mas o escopo e as evidências de testes são menores; deixar como estudo adicional.
- `agente-ia-local-ollama` e `java-exercicios`: laboratórios e estudos, sem prioridade sobre produtos com domínio e apresentação mais completos.
- `algoritmo-doce-comments`: suporte a discussões/reviews, não um projeto de aplicação independente para destaque.
- `portifolio` e `GustavoBenAbraham`: site e perfil; não ocupam os cartões de projetos nesta curadoria.
- `2887-java-screenmatch-oo`, `Programming-Books`, `kcc`, `google-java-format` e `NetHack`: marcados como forks pela API pública; não tratá-los como projetos autorais sem evidências específicas de contribuições.

## Regras para manter o conteúdo coerente

Concentrar títulos, descrições, stack, prioridade e links em uma fonte de configuração do portfólio. Separar código, documentação e demonstração nos dados para não produzir botões de demo sem URL real. Atualizar português e inglês em conjunto. Na próxima revisão, conferir README e código porque descrições curtas dos repositórios já ficaram para trás em DinDin de Giro e Tarot.exe. Não usar totais genéricos de projetos/anos nem percentuais de cobertura sem fonte verificável.

## Alterações aplicadas no portfólio

- DinDin de Giro e Helpdesk API receberam os cartões principais. Cuscuzeria Gourmet, Tarot.exe e Pokédex compõem a seleção complementar. O link de Algoritmo Doce aponta para a v2 na seção pessoal.
- O cartão da Helpdesk informa H2, usado na demonstração e nos testes documentados. A configuração PostgreSQL/Docker do repositório não foi apresentada como validada.
- Perfil, LinkedIn, experiência profissional, cursos e tecnologias foram alinhados aos currículos PDF. A Central de Manuais da DASA aparece como aplicação interna, sem inventar demonstração pública ou métricas.
- A formação aparece como **estudante de ADS na UniÍtalo**, conforme orientação expressa do usuário nesta revisão, substituindo a referência a início futuro nos textos do site.
- `curriculo.html` e `resume.html` foram atualizados, incluindo a orientação sobre ADS e margens para impressão em duas páginas. Os PDFs fornecidos pelo usuário foram preservados.
- `data/projects.json` concentra a curadoria e os links. `node scripts/sync-projects.mjs` gera os cartões em `index.html`; `--check` verifica sincronização. A página continua estática e não consulta o GitHub durante a navegação.

## Validação local da atualização

- Chromium via Playwright, com larguras de 360, 390, 768, 1024 e 1440 px: sem transbordamento horizontal ou erros de JavaScript.
- Menu móvel, fechamento com Escape, retorno de foco, links internos e referências ARIA conferidos.
- Cinco projetos e dois destaques visíveis; página funcional com JavaScript desativado e com preferência por movimento reduzido.
- PDFs PT/EN retornam HTTP 200 no servidor local; páginas HTML dos currículos conferidas e impressão validada em duas páginas com margens.
- Inspeção visual da apresentação, projetos, experiência e versão móvel; sintaxe JavaScript, sincronização dos dados e `git diff --check` aprovados.

As alterações estão no checkout local. A hospedagem existente permanece no GitHub Pages; esta revisão não incluiu publicação nem execução dos testes dos projetos externos.
