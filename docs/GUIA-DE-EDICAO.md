# Manual do site

Este é o guia de manutenção do Nixon Brasil. Para publicar artigos, consulte também [`CMS.md`](CMS.md). Para DNS e certificado, use [`DOMINIO.md`](DOMINIO.md).

## Como o sistema funciona

```text
Markdown e componentes Astro
            ↓
       npm run build
            ↓
     pasta estática dist
            ↓
       GitHub Pages
            ↓
     nixonbrazil.page
```

- Astro transforma `src/` em HTML, CSS, RSS e sitemap.
- O Pages CMS edita conteúdo e configurações editoriais no GitHub.
- GitHub Actions testa pull requests e publica a `main`.
- Name.com mantém o DNS; GitHub Pages hospeda o site.

O site não tem banco de dados, login de visitante ou servidor próprio.

## Instalação

Requisitos: Git, Node.js 24 e npm.

```bash
git clone https://github.com/viniciusdaniel-law/nixon-brasil.git
cd nixon-brasil
npm ci
npm run dev
```

O ambiente local abre normalmente em `http://localhost:4321/`. Encerre com `Ctrl+C`.

Comandos:

| Comando | Função |
|---|---|
| `npm run dev` | edição local com atualização automática |
| `npm run build` | tipos, compilação e testes do projeto |
| `npm run preview` | abre o conteúdo compilado em `dist/` |
| `npm run check:domain` | confere DNS e HTTPS públicos |

## Estrutura

```text
.github/workflows/pages.yml   teste e publicação
.pages.yml                    formulário do Pages CMS
astro.config.mjs              domínio do site
public/                       arquivos copiados sem transformação
scripts/                      verificações locais
src/components/               header e footer
src/content/artigos/          artigos em Markdown
src/content/documentos/       fichas do acervo
src/content/paginas/          páginas institucionais
src/content/cronologia/       linha do tempo
src/content/discursos/        discursos e contexto
src/content/pessoas/          perfis biográficos
src/content/temas/            dossiês
src/content/galerias/         ensaios visuais
src/data/settings/            home, menu, rodapé, redes e SEO
src/content.config.ts         campos aceitos pelo Astro
src/layouts/                  metadados e estrutura comum
src/pages/                    rotas
src/styles/                   CSS
```

Use `src/content/` para conteúdo editorial. Altere `src/pages/`, `src/components/` ou `src/styles/` somente quando a interface precisar mudar.

## Alterar uma página

Arquivos em `src/pages/` viram endereços:

| Arquivo | URL |
|---|---|
| `src/pages/index.astro` | `/` |
| `src/pages/brasil.astro` | `/brasil/` |
| `src/pages/artigos/index.astro` | `/artigos/` |
| `src/pages/artigos/[...slug].astro` | uma rota por artigo |

Um arquivo `.astro` separa lógica e HTML:

```astro
---
const title = 'Exemplo';
---

<h1>{title}</h1>
```

O código entre `---` roda durante o build. O visitante recebe apenas o resultado.

Para trocar texto da home ou menu, use **Configurações** no Pages CMS; os dados ficam em `src/data/settings/`. Para mudar cores ou tipografia, comece pelas variáveis no topo de `src/styles/global.css`.

Ao criar uma rota:

1. crie o arquivo em `src/pages/`;
2. adicione o link onde ele for necessário;
3. inclua a rota em `src/pages/sitemap.xml.ts`;
4. se for uma rota essencial, inclua-a em `scripts/verify-site.mjs`;
5. rode `npm run build`.

## Artigos

Cada arquivo em `src/content/artigos/` contém metadados e texto:

```markdown
---
title: "Título"
subtitle: "Subtítulo"
description: "Resumo para busca e redes"
publishedAt: 2026-07-29
author: "Vinicius Daniel"
category: "Política externa"
cover: "/uploads/imagem.jpg"
coverAlt: "Descrição objetiva da imagem"
coverCredit: "Autor / instituição · licença"
coverRights: "Situação dos direitos"
sourceUrl: "https://fonte-principal"
sources:
  - "https://fonte-adicional"
homePlacement: "none"
draft: true
---

Texto.
```

O nome do arquivo compõe a URL. Use minúsculas, hífens e nenhum acento.

`homePlacement` aceita:

- `lead`: matéria principal; deve existir exatamente uma;
- `rail`: lista lateral da home;
- `none`: fora dos destaques.

`draft: true` mantém o arquivo no GitHub e fora do site.

Os campos editoriais existem em dois lugares:

- `src/content.config.ts`, que valida o conteúdo;
- `.pages.yml`, que define o formulário do CMS.

Altere os dois ao criar ou remover um campo.

## Imagens

Arquivos enviados pelo CMS ficam em `public/uploads/`. No conteúdo, use `/uploads/nome-do-arquivo.jpg`.

Antes de publicar, registre:

- descrição visual;
- fotógrafo ou órgão produtor;
- arquivo e identificador, quando existirem;
- licença ou situação de domínio público.

Crédito não substitui autorização.

## CSS e responsividade

O CSS comum está em `src/styles/global.css`; a home usa também `src/styles/home.css`.

Teste pelo menos:

- 1440 px;
- 1024 px;
- 768 px;
- 390 px;
- 320 px.

Ao alterar o header, confira os breakpoints de `1100px`, `700px` e `460px`. A navegação de desktop é independente; no celular, o menu usa `<details>` e `<summary>` e deve continuar funcionando sem JavaScript.

## Git e publicação

Para código, layout, schema ou automação:

```bash
git switch -c ajuste/nome-curto
# edite
npm run build
git diff --check
git status
git add caminho/dos/arquivos
git commit -m "Descrever a alteração"
git push -u origin ajuste/nome-curto
```

Abra uma pull request para `main`. O workflow testa o branch; o merge publica o site.

O Pages CMS grava na branch selecionada. Se selecionar `main`, a alteração publica sem PR. Para revisão prévia, selecione uma branch editorial no CMS e abra a pull request manualmente.

Não experimente layout ou automação diretamente na `main`.

## O que o build verifica

`npm run build` executa:

1. `astro check`;
2. `astro build`;
3. `scripts/verify-site.mjs`.

O script próprio confere:

- rotas obrigatórias;
- domínio canônico;
- navegação sem script;
- integração entre CMS, configurações e home;
- uma única matéria principal;
- títulos, descrições e URLs canônicas;
- links internos e rotas das novas coleções;
- instalação sem scripts de terceiros no CI;
- bloqueio temporário de versões incompatíveis do TypeScript.

O workflow também executa `npm audit` e só concede permissão de publicação ao job de deploy.

## Proteção do repositório

No GitHub Free, este projeto precisa permanecer público para continuar publicado pelo GitHub Pages. Torná-lo privado nesse plano despublica o site.

Código visível não é sinônimo de código aberto. Os direitos de uso estão em [`../LICENSE.md`](../LICENSE.md).

Em **Settings → Rules → Rulesets**, proteja `main` com:

- pull request obrigatório para código;
- build obrigatório antes do merge;
- bloqueio de force push;
- bloqueio de exclusão da branch.

Se a regra exigir PR sem exceção, o Pages CMS não poderá gravar diretamente na `main`. Nesse caso, use uma branch editorial no CMS.

Em **Settings → Actions → General**:

- permita apenas actions do GitHub ou de criadores verificados;
- mantenha o token padrão com acesso somente de leitura;
- não permita aprovação automática de workflows vindos de forks.

## Domínio

O domínio próprio liga três serviços:

```text
Name.com: DNS
GitHub Pages: hospedagem e certificado
Astro: URLs canônicas e arquivos estáticos
```

Os registros atuais e a ordem de configuração estão em [`DOMINIO.md`](DOMINIO.md). Não altere DNS para corrigir CSS, conteúdo ou build.

Diagnóstico:

```bash
npm run check:domain
```

Interpretação rápida:

| Sintoma | Causa provável |
|---|---|
| `NXDOMAIN` | registro DNS ausente |
| raiz funciona e `www` não | CNAME ausente |
| erro de certificado | domínio não salvo no Pages ou certificado pendente |
| HTML sem CSS | caminho de asset incorreto ou deploy antigo |
| artigo não aparece | `draft: true` |
| CMS aceita e build rejeita | schema e `.pages.yml` divergentes |

## Recriar o modelo em outro site

1. crie outro repositório;
2. copie os arquivos sem a pasta `.git`;
3. troque nome, descrição e domínio;
4. redefina categorias em `.pages.yml` e `src/content.config.ts`;
5. substitua textos e imagens;
6. revise header, footer, metadados, RSS, sitemap e robots;
7. ajuste `verify-site.mjs`;
8. rode o build;
9. configure GitHub Pages;
10. conecte o domínio por último.

Não copie credenciais, DNS, imagens sem licença, textos editoriais ou histórico Git.

## Checklist antes do merge

- `npm ci`;
- `npm audit --audit-level=high`;
- `npm run build`;
- `git diff --check`;
- diff lido por inteiro;
- nenhuma credencial ou informação pessoal;
- imagens licenciadas e creditadas;
- páginas testadas em desktop e celular;
- links, RSS, sitemap e canonical válidos.

## Reversão

Para retirar um artigo, use `draft: true`.

Para desfazer código publicado:

```bash
git revert SHA_DO_COMMIT
git push
```

Abra uma pull request com a reversão. Não reescreva a `main` com `reset --hard` ou force push.
