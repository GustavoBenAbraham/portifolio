# Análise e melhorias — 20/10/2026

Revisão do código local do portfólio. Os nomes dos repositórios dos projetos foram conferidos na API pública do GitHub.

## Atualizações aplicadas

- Apresentação mais específica: Java, Spring Boot, PostgreSQL e objetivo de oportunidade júnior, com download do currículo na abertura.
- Projetos posicionados antes da biografia e da jornada, facilitando a avaliação do trabalho.
- Links de Task Manager API e Pokédex corrigidos para os respectivos repositórios.
- Cores secundárias mais legíveis no tema escuro e correção da variável de espaçamento ausente.
- Tecnologias apresentadas em texto, eliminando dez requisições de imagens externas.
- Menu fechado removido da navegação por teclado, rótulo do botão atualizado e retorno de foco ao pressionar Escape.
- Atalho para pular ao conteúdo e foco no destino dos links internos.
- Conteúdo das seções e do terminal visível sem JavaScript.
- Efeitos de cursor e Canvas desativados para movimento reduzido; desenho do Canvas suspenso fora da apresentação ou em aba oculta.
- URL canônica adicionada e menu móvel com rolagem para telas baixas.

## Próximas oportunidades de conteúdo

- Transformar os projetos em estudos de caso: problema, decisões técnicas, instruções de execução e exemplos de uso. Validar cada afirmação contra o código antes de publicar.
- Adicionar capturas reais das aplicações e uma imagem de compartilhamento social. O site declara cartão social grande, mas ainda não fornece essa imagem.
- Rever dados pessoais, disponibilidade e currículos quando houver mudanças profissionais. Nenhuma experiência, resultado ou qualificação nova foi presumida nesta revisão.
- Medir desempenho e acessibilidade no endereço publicado após o deploy, incluindo carregamento em rede móvel.

## Verificação local

- Chrome em modo headless, com larguras de 360, 768, 1024 e 1440 pixels: sem transbordamento horizontal ou erros de JavaScript.
- Menu móvel: abertura, fechamento com Escape, retorno de foco ao botão e fechamento após selecionar projeto.
- Destinos de todos os links internos encontrados no HTML.
- Preferência por movimento reduzido: Canvas e efeito de cursor ausentes.
- JavaScript desativado: projetos, terminal e navegação móvel disponíveis.
- Currículos PDF e páginas HTML de currículo: resposta HTTP 200 no servidor local.
- Sintaxe JavaScript e espaços no diff verificados. A verificação local não equivale a uma auditoria completa de acessibilidade ou de desempenho em produção.

## Publicação no GitHub Pages

As alterações são locais. A hospedagem existente continua no GitHub Pages; publicar requer enviar as alterações para a branch configurada no repositório.
