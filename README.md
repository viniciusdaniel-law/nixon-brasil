# Nixon Brasil

Publicação histórica brasileira sobre Richard Nixon, sua Presidência e as relações dos Estados Unidos com o Brasil.

**Site:** [nixonbrazil.page](https://nixonbrazil.page)

O acervo reúne artigos, documentos, cronologia, discursos, perfis, temas e imagens. O conteúdo fica em Markdown ou JSON, é compilado com Astro e publicado no GitHub Pages.

Até existir autorização ou colaboração formal, o Nixon Brasil permanece uma iniciativa independente e não usa nome, selo ou identidade visual da Richard Nixon Foundation.

## Estrutura

```text
src/content/artigos/     artigos publicados e rascunhos
src/content/documentos/  documentos e notas de acervo
src/content/paginas/     biografia, Brasil e sobre
src/content/cronologia/  eventos da linha do tempo
src/content/discursos/   discursos e contexto
src/content/pessoas/     perfis biográficos
src/content/temas/       dossiês temáticos
src/content/galerias/    ensaios visuais
src/data/settings/       home, menu, rodapé, redes e SEO
src/pages/               páginas e rotas
src/components/          cabeçalho e rodapé
src/styles/              estilos gerais e da página inicial
public/uploads/           imagens enviadas pelo CMS
.pages.yml                configuração do painel editorial
```

## Edição

O uso cotidiano não exige alterar código. O [Pages CMS](https://app.pagescms.org/) edita o conteúdo e as configurações editoriais na branch `editorial`; a publicação só ocorre depois de uma pull request para `main`. Consulte:

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

## Responsabilidade editorial

Pesquisa, seleção e edição: Vinicius Daniel. Fontes oficiais são tratadas como documentos produzidos por instituições, não como interpretações neutras. O projeto distingue registro primário, análise historiográfica e inferência editorial.

## Publicação

Pull requests executam o build. Alterações incorporadas à `main` são publicadas pelo workflow [`pages.yml`](.github/workflows/pages.yml).

O Nixon Brasil não possui vínculo com a Richard Nixon Foundation, a Richard Nixon Presidential Library, a NARA ou o governo dos Estados Unidos.

Código e textos editoriais originais têm direitos reservados. Documentos e imagens de terceiros mantêm sua licença ou situação jurídica de origem; consulte [`LICENSE.md`](LICENSE.md).
