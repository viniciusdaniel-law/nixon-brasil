# Guia de edição

## Definição do produto

O Nixon Brasil é um produto editorial brasileiro voltado à preservação e à divulgação do legado de Richard Nixon. A referência de categoria é o trabalho público da Richard Nixon Foundation: história presidencial, documentos, educação, vídeo, atualidade e comunidade. O projeto não copia sua marca nem se apresenta como afiliado enquanto não houver autorização formal.

Prioridades:

- Presidência e realizações de governo;
- política externa, estratégia e diplomacia;
- discursos, documentos e imagens de arquivo;
- trajetória pessoal de Richard e Pat Nixon;
- relações entre Estados Unidos e Brasil;
- aplicação do legado a temas contemporâneos;
- conteúdo próprio em português para site, vídeo e redes sociais.

O site não é uma biografia adversarial nem um portal genérico sobre política americana. Assuntos controversos só entram quando forem o tema específico de uma publicação; não funcionam como compensação obrigatória em páginas sobre outro assunto. Watergate não integra a página inicial nem a comunicação promocional. O dossiê brasileiro não romantiza o governo Médici.

## Fluxo curto

1. Reunir a fonte principal e as referências auxiliares.
2. Escrever o artigo no Pages CMS ou em `src/content/artigos/`.
3. Conferir datas, nomes, cargos, citações, links e direitos da imagem.
4. Revisar título, subtítulo e resumo separadamente.
5. Rodar `npm run build`.
6. Abrir a versão local em pelo menos uma largura de desktop e uma de celular.
7. Enviar por pull request e publicar após a revisão.

## Critério editorial

Um artigo deve distinguir:

- fato documentado;
- interpretação do autor;
- tradução ou paráfrase;
- informação ainda incerta.

A linha editorial é favorável ao legado de Nixon. Rigor significa confirmar o que é publicado, atribuir corretamente a autoria de leis e decisões e não inventar causalidade; não significa inserir um parágrafo de oposição em todo texto.

## Estrutura de artigo

O cabeçalho contém:

```yaml
title: "Título"
subtitle: "Uma frase que delimita o argumento"
description: "Resumo objetivo para busca e redes"
publishedAt: 2026-07-28
updatedAt: 2026-07-28
author: "Nixon Brasil"
category: "Política externa"
cover: "/uploads/imagem.jpg"
coverAlt: "Descrição da imagem"
coverCredit: "Autor / instituição · licença"
sourceUrl: "https://fonte-principal"
homePlacement: "none"
draft: true
```

Use subtítulos para mudanças reais de assunto. Evite uma seção de “conclusão” que apenas repita a abertura.

## Revisão de linguagem

Retire:

- slogans sem função factual;
- perguntas retóricas dirigidas a adversários imaginários;
- oposição repetitiva entre “não é X” e “é Y”;
- negrito usado apenas para dar intensidade;
- frases genéricas sobre “mudar o jogo”, “construir narrativas” ou “dar voz”;
- parágrafos que anunciam o que o próprio texto fará.

Prefira datas, documentos, agentes, decisões e consequências identificáveis.

## Imagens

Use arquivos de procedência conhecida. Para material do governo federal americano, confirme a ficha do item: nem todo conteúdo hospedado por uma instituição pública está automaticamente em domínio público.

O texto alternativo descreve o que aparece na imagem. O crédito registra autoria, coleção e situação de direitos.

## Teste local

```bash
npm ci
npm run dev
```

O servidor local informa o endereço de pré-visualização. Para a verificação final:

```bash
npm run build
npm run preview
```

O build deve terminar sem erros. Verifique:

- menu em desktop e celular;
- página inicial;
- artigo mais recente;
- filtros do acervo;
- página 404;
- `sitemap.xml`, `rss.xml` e `robots.txt`.

## Alterar a estrutura

As responsabilidades estão separadas:

- `Header.astro` e `Footer.astro`: navegação;
- `BaseLayout.astro`: metadados e estrutura comum;
- `global.css`: elementos usados por várias páginas;
- `home.css`: apenas página inicial;
- `content.config.ts`: campos aceitos nos conteúdos;
- `.pages.yml`: campos exibidos no CMS;
- `verify-site.mjs`: verificações depois do build.

Ao criar ou remover um campo editorial, altere `content.config.ts` e `.pages.yml` no mesmo commit.

## Reutilizar a base em outro site

1. Troque nome, domínio e descrição em `astro.config.mjs`, `BaseLayout.astro`, `Header.astro` e `Footer.astro`.
2. Defina as categorias e campos em `content.config.ts`.
3. Espelhe os mesmos campos em `.pages.yml`.
4. Substitua as páginas temáticas e os conteúdos de exemplo.
5. Ajuste cores e tipografia em `global.css`.
6. Atualize as rotas verificadas em `scripts/verify-site.mjs`.
7. Configure o domínio e o GitHub Pages.

Não copie credenciais, histórico Git, imagens sem licença ou metadados do projeto original.

## Reverter uma publicação

O histórico do GitHub permite restaurar uma versão anterior sem apagar o registro. Para uma retirada urgente de artigo, ative `draft: true` e publique. Para defeito de layout, reverta o commit responsável por uma nova pull request.
