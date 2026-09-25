# Documentação técnica — Portfólio

Este documento descreve a estrutura, o comportamento e os procedimentos de manutenção do portfólio de Gustavo Ben Abraham.

## 1. Visão geral

O projeto é um site pessoal estático, desenvolvido com HTML5, CSS3 e JavaScript sem bibliotecas de execução ou frameworks. Os arquivos são servidos diretamente pelo GitHub Pages. Não há configuração de pacote, compilador, bundler ou processo de build no repositório.

**Endereço publicado:** <https://gustavobenabraham.github.io/portifolio/>

## 2. Arquivos e responsabilidades

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Metadados da página, conteúdo, seções, navegação, cartões e links. |
| `style.css` | Variáveis de tema, tipografia, componentes, animações e regras responsivas. |
| `script.js` | Interações do menu, efeitos de rolagem, animações e Canvas do banner. |
| `README.md` | Apresentação do projeto e instruções rápidas para visitantes e colaboradores. |

## 3. Organização da página

O documento HTML organiza o conteúdo nestas áreas principais:

1. **Apresentação:** nome, foco profissional e atalhos para projetos e contato.
2. **Sobre mim:** resumo pessoal e informações de perfil.
3. **Jornada:** etapas da trajetória de aprendizagem e objetivo profissional.
4. **Projetos:** cartões com descrição, tecnologias e links para código ou demonstração quando disponíveis.
5. **Tecnologias:** tecnologias que aparecem no perfil e nos projetos.
6. **Além do código:** interesses pessoais e iniciativa Algoritmo Doce.
7. **Status:** bloco visual de terminal com apresentação progressiva das linhas.
8. **Contato:** canais externos de contato e redes sociais.

Os links da navegação apontam para os identificadores das seções, permitindo percorrer a página sem roteamento ou recarga.

## 4. Estilos e responsividade

O CSS concentra as cores, tipografia, espaçamentos e outras decisões visuais em propriedades customizadas no seletor `:root`. O tema combina fundo escuro com detalhes azuis e verdes. As fontes Inter e JetBrains Mono são carregadas pelo Google Fonts; fontes alternativas do sistema são definidas como fallback.

Há regras específicas para larguras menores que 900 px, 768 px e 480 px. Essas regras reorganizam o layout e adaptam a navegação e os cartões às telas menores. A folha de estilos também inclui tratamento para a preferência `prefers-reduced-motion`.

## 5. Comportamentos JavaScript

O script inicializa após `DOMContentLoaded` e implementa:

- **Canvas do banner:** cria uma animação decorativa de caracteres. O canvas é marcado como oculto para tecnologias assistivas e redesenhado ao redimensionar a janela; a animação pausa o desenho quando a aba está oculta.
- **Cabeçalho:** adiciona ou remove a classe `scrolled` de acordo com a posição da página.
- **Menu móvel:** alterna visibilidade e estado ARIA, fecha ao escolher um link, ao clicar fora, pressionar `Escape` ou aumentar a janela para o layout desktop.
- **Indicador de rolagem:** desaparece após o início da rolagem.
- **Revelação de conteúdo:** usa `IntersectionObserver` para exibir elementos `.reveal` quando entram na área visível, com alternativa sem observer.
- **Terminal:** revela suas linhas sequencialmente quando o bloco aparece na tela.
- **Links internos:** rola suavemente até a seção e considera a altura do cabeçalho; desativa a rolagem animada quando o usuário prefere movimento reduzido.

## 6. Executar e editar

### Pré-requisitos

- Navegador moderno.
- Git, caso deseje clonar o projeto.
- Conexão à internet para carregar as fontes hospedadas pelo Google Fonts.

### Execução

Abra `index.html` diretamente no navegador. Para uma experiência local servida por HTTP, abra a pasta no VS Code e use uma extensão como Live Server. Não há dependências npm a instalar.

### Atualizar conteúdo

- Edite textos, metadados, seções e cartões em `index.html`.
- Edite cores, tipografia, espaçamento, breakpoint e layout em `style.css`.
- Edite interações e animações em `script.js`.
- Ao alterar um link de projeto, confira tanto o endereço do repositório como o da demonstração. Os links exibidos devem apontar para os destinos específicos do projeto.

O título, a descrição, o autor e os metadados Open Graph e Twitter ficam no `<head>` de `index.html`. Atualize esses campos quando o nome, resumo ou endereço público do site mudar.

## 7. Publicação no GitHub Pages

O projeto não exige etapa de build. Para publicar uma atualização:

1. Faça as alterações nos arquivos do site.
2. Confira a página localmente em um navegador.
3. Registre e envie as alterações para o repositório GitHub.
4. Nas definições **Settings → Pages**, confirme a branch e a pasta de origem selecionadas para publicação.
5. Aguarde a conclusão da publicação e acesse o endereço configurado.

Se o endereço do site mudar, atualize também os campos `og:url` e os demais metadados relacionados em `index.html`.

## 8. Acessibilidade e compatibilidade

O HTML usa landmarks como `header`, `nav`, `main` e `footer`, títulos hierárquicos, nomes acessíveis para controles e estados ARIA no menu móvel. Efeitos decorativos são ocultados da árvore de acessibilidade. As animações de revelação e a rolagem consideram a preferência por movimento reduzido.

O JavaScript usa `IntersectionObserver` com alternativa para navegadores que não o disponibilizam. O conteúdo principal permanece em HTML, sem depender de uma API para ser carregado.

## 9. Dependências e serviços externos

- **Google Fonts:** entrega Inter e JetBrains Mono; as fontes alternativas do sistema continuam disponíveis se o serviço não puder ser carregado.
- **GitHub Pages:** hospeda os arquivos estáticos do site.
- Links de projetos e redes sociais direcionam para serviços externos. O site não inclui uma API de back-end ou armazenamento de dados próprio.

## 10. Manutenção recomendada

- Manter os links de projetos, contato e demonstrações atualizados.
- Conferir a visualização em desktop e celular ao alterar a estrutura ou o CSS.
- Preservar os atributos de acessibilidade ao editar controles e navegação.
- Atualizar metadados de compartilhamento junto com mudanças no conteúdo ou endereço do site.
- Evitar publicar dados pessoais que não devam ser públicos; links externos e informações de contato são visíveis a qualquer visitante.
