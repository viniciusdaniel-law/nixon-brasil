# Nixon Brasil

Publicação independente em português sobre a vida, a Presidência e a política externa de Richard Nixon.

**Site:** [nixonbrazil.page](https://nixonbrazil.page)

O acervo editorial é formado por artigos em Markdown e fichas de documentos históricos. As páginas são compiladas com Astro e publicadas no GitHub Pages.

## Estrutura

```text
src/content/artigos/     artigos publicados e rascunhos
src/content/documentos/  fichas do acervo
src/pages/               páginas e rotas
src/components/          cabeçalho e rodapé
src/styles/              estilos gerais e da página inicial
public/uploads/           imagens enviadas pelo CMS
.pages.yml                configuração do painel editorial
```

## Edição

O uso cotidiano não exige alterar código. O [Pages CMS](https://app.pagescms.org/) edita os artigos e documentos diretamente no repositório. Consulte:

- [`docs/CMS.md`](docs/CMS.md) — publicar e organizar conteúdo;
- [`docs/GUIA-DE-EDICAO.md`](docs/GUIA-DE-EDICAO.md) — revisão, teste e manutenção;
- [`docs/DOMINIO.md`](docs/DOMINIO.md) — DNS e GitHub Pages;
- [`docs/OPERACAO-SOCIAL.md`](docs/OPERACAO-SOCIAL.md) — adaptação para redes;
- [`docs/TRADUCAO-DE-VIDEO.md`](docs/TRADUCAO-DE-VIDEO.md) — transcrição e legendagem.

## Desenvolvimento local

Requer Node.js 24.

```bash
npm ci
npm run dev
```

Antes de enviar uma alteração:

```bash
npm run build
```

O comando verifica os tipos, compila todas as rotas e testa navegação, metadados e configuração editorial.

## Publicação

Pull requests executam o build. Alterações incorporadas à `main` são publicadas pelo workflow [`pages.yml`](.github/workflows/pages.yml).

O Nixon Brasil não possui vínculo com a Richard Nixon Foundation, a Richard Nixon Presidential Library, a NARA ou o governo dos Estados Unidos.
