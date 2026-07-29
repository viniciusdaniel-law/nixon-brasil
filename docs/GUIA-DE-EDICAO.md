# Manual do site

Este documento serve para operar o Nixon Brasil, alterar o código em Astro e reutilizar a mesma arquitetura em outro projeto.

## 1. Mapa do sistema

O projeto tem dois fluxos.

### Publicação

```text
Edição no Pages CMS ou no GitHub
        ↓
arquivo Markdown ou código no repositório
        ↓
pull request
        ↓
GitHub Actions executa npm run build
        ↓
merge na branch main
        ↓
Astro gera a pasta dist
        ↓
GitHub Pages publica o resultado
```

### Domínio

```text
nixonbrazil.page
        ↓ DNS da Name.com
GitHub Pages
        ↓
site compilado pelo Astro
```

O Astro não registra nem hospeda o domínio. Ele gera o site. A Name.com administra o nome; o GitHub Pages entrega os arquivos; o DNS liga um ao outro.

## 2. O que cada peça faz

| Peça | Função | Arquivo ou serviço |
|---|---|---|
| Astro | transforma componentes e Markdown em HTML | `src/`, `astro.config.mjs` |
| Content Collections | valida os campos de artigos e documentos | `src/content.config.ts` |
| Pages CMS | oferece formulário visual para editar conteúdo | `.pages.yml` |
| GitHub | guarda código, conteúdo e histórico | repositório `nixon-brasil` |
| GitHub Actions | testa e publica automaticamente | `.github/workflows/pages.yml` |
| GitHub Pages | hospeda o HTML compilado | configuração Pages do repositório |
| Name.com | administra o domínio e os registros DNS | painel externo |
| `verify-site.mjs` | impede regressões conhecidas | `scripts/verify-site.mjs` |

## 3. Estado esperado deste projeto

- repositório: `viniciusdaniel-law/nixon-brasil`;
- branch publicada: `main`;
- domínio canônico: `https://nixonbrazil.page`;
- editor de conteúdo: Pages CMS;
- Node.js: versão 24;
- framework: Astro 5;
- publicação: GitHub Actions e GitHub Pages;
- conteúdo: Markdown em `src/content/`;
- JavaScript no navegador: somente quando uma função realmente exigir;
- menu: HTML nativo com `<details>`, sem bloquear o `body`.

## 4. Instalação local

### Requisitos

- Git;
- Node.js 24;
- npm;
- uma cópia do repositório.

No Arch Linux:

```bash
sudo pacman -S --needed git nodejs npm
```

Confirme:

```bash
git --version
node --version
npm --version
```

### Baixar e abrir

```bash
git clone https://github.com/viniciusdaniel-law/nixon-brasil.git
cd nixon-brasil
npm ci
npm run dev
```

O terminal mostrará um endereço local, normalmente `http://localhost:4321/`.

Para encerrar o servidor:

```text
Ctrl+C
```

### Comandos cotidianos

```bash
npm run dev
```

Abre o ambiente de edição com atualização automática.

```bash
npm run build
```

Valida tipos, compila as páginas e executa as verificações do projeto.

```bash
npm run preview
```

Serve localmente a versão já compilada em `dist/`.

```bash
npm run check:domain
```

Consulta o DNS público e o HTTPS do domínio.

## 5. Estrutura de pastas

```text
.
├── .github/workflows/pages.yml   teste e publicação
├── .pages.yml                    formulário do Pages CMS
├── astro.config.mjs              domínio e opções do Astro
├── package.json                  comandos e dependências
├── public/                       arquivos copiados sem transformação
│   └── uploads/                  imagens enviadas pelo CMS
├── scripts/
│   ├── check-domain.mjs          diagnóstico de DNS e HTTPS
│   └── verify-site.mjs           testes sobre o site compilado
└── src/
    ├── components/               partes reutilizadas
    ├── content/
    │   ├── artigos/              artigos em Markdown
    │   └── documentos/           fichas do acervo
    ├── content.config.ts         contrato dos conteúdos
    ├── layouts/                  moldura comum das páginas
    ├── pages/                    rotas do site
    └── styles/                   CSS
```

Regra prática:

- texto editorial: `src/content/`;
- página: `src/pages/`;
- parte repetida em várias páginas: `src/components/`;
- metadados comuns: `src/layouts/BaseLayout.astro`;
- aparência comum: `src/styles/global.css`;
- aparência exclusiva da home: `src/styles/home.css`.

## 6. Como ler um arquivo `.astro`

Um componente Astro normalmente tem duas partes:

```astro
---
const title = 'Exemplo';
---

<h1>{title}</h1>
```

Entre `---` fica o código executado durante o build. Abaixo fica o HTML. Chaves inserem valores:

```astro
<a href={`${base}acervo/`}>Acervo</a>
```

Astro gera HTML estático para este projeto. O visitante não recebe o código entre `---`.

### Rotas

Os arquivos em `src/pages/` viram endereços:

| Arquivo | Endereço |
|---|---|
| `src/pages/index.astro` | `/` |
| `src/pages/sobre.astro` | `/sobre/` |
| `src/pages/brasil.astro` | `/brasil/` |
| `src/pages/artigos/index.astro` | `/artigos/` |
| `src/pages/artigos/[...slug].astro` | uma página para cada artigo |

### Componentes

`Header.astro` e `Footer.astro` aparecem em todas as páginas porque `BaseLayout.astro` os importa:

```astro
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
```

Uma alteração no header afeta o site inteiro.

### Layout

Cada página entrega título, descrição e conteúdo ao layout:

```astro
<BaseLayout
  title="Título da página"
  description="Descrição para busca e compartilhamento"
>
  <section>Conteúdo</section>
</BaseLayout>
```

O layout monta:

- `<title>`;
- descrição;
- URL canônica;
- Open Graph;
- cartão do X;
- dados estruturados;
- header e footer.

## 7. Receitas de alteração

### Trocar texto da página inicial

Abra:

```text
src/pages/index.astro
```

Altere somente o texto dentro das tags. Exemplo:

```astro
<h1>Novo título</h1>
<p class="hero-lead">Novo resumo.</p>
```

Depois:

```bash
npm run build
```

### Trocar imagem da home

Em `src/pages/index.astro`, localize `class="hero-media"` e altere `src`, `alt`, `width` e `height`.

Se a imagem estiver no repositório:

```text
public/uploads/nome-da-imagem.jpg
```

use:

```astro
src={`${base}uploads/nome-da-imagem.jpg`}
```

Não publique imagem sem procedência, licença e crédito.

### Adicionar link ao menu

Abra `src/components/Header.astro` e acrescente um item:

```ts
['Sobre', 'sobre/'],
```

Se o menu voltar a comprimir em notebook, ajuste o breakpoint em `src/styles/global.css`. Não reduza a fonte até ficar ilegível.

### Alterar cores

Abra `src/styles/global.css`. As variáveis ficam no início:

```css
:root {
  --navy: #0a1d36;
  --red: #9f2531;
  --paper: #f2efe7;
}
```

Altere uma variável por vez e confira:

- texto sobre fundo;
- botões;
- links;
- foco do teclado;
- celular.

### Alterar tipografia

Há duas etapas:

1. carregar a fonte em `src/layouts/BaseLayout.astro`;
2. apontar a variável em `src/styles/global.css`.

```css
--display: 'Nome da Fonte', Georgia, serif;
```

Evite carregar muitas famílias ou pesos. Cada arquivo de fonte aumenta o tempo da primeira visita.

### Criar página estática

Crie `src/pages/nova-pagina.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Nova página"
  description="Descrição objetiva da nova página."
>
  <section class="page-hero">
    <div class="shell">
      <h1>Nova página</h1>
    </div>
  </section>
</BaseLayout>
```

Depois:

1. adicione o link ao header ou a outra página;
2. inclua a rota em `src/pages/sitemap.xml.ts`;
3. se for rota essencial, inclua em `scripts/verify-site.mjs`;
4. rode `npm run build`.

### Publicar artigo sem tocar em código

Use o Pages CMS:

1. abra `https://app.pagescms.org/`;
2. entre com o GitHub;
3. selecione `viniciusdaniel-law/nixon-brasil`;
4. selecione a branch `main`;
5. abra **Artigos**;
6. crie a entrada;
7. mantenha **Rascunho** ativo;
8. revise;
9. desative **Rascunho**;
10. salve.

O painel grava um arquivo Markdown. O conteúdo não fica preso ao CMS.

### Publicar artigo pelo editor

Crie:

```text
src/content/artigos/endereco-do-artigo.md
```

Modelo:

```markdown
---
title: "Título"
subtitle: "Subtítulo"
description: "Resumo para busca e redes"
publishedAt: 2026-07-28
updatedAt: 2026-07-28
author: "Nixon Brasil"
category: "Política externa"
cover: "/uploads/imagem.jpg"
coverAlt: "Descrição visual objetiva"
coverCredit: "Autor / instituição · licença"
sourceUrl: "https://fonte-principal"
homePlacement: "none"
draft: true
---

Primeiro parágrafo.

## Subtítulo real

Texto.
```

O nome do arquivo vira parte da URL. Use minúsculas, hífens e nenhum acento.

### Colocar um artigo na home

Há três posições:

- `lead`: matéria principal;
- `rail`: lista lateral;
- `none`: fora da seleção.

Deve existir exatamente um artigo `lead`. O build falha se houver zero ou mais de um.

### Criar ou alterar campo editorial

Um campo existe em dois contratos:

1. `src/content.config.ts`: o que o Astro aceita;
2. `.pages.yml`: o que o CMS exibe.

Exemplo:

```ts
readingTime: z.number().optional(),
```

e:

```yaml
- name: readingTime
  label: Minutos de leitura
  type: number
```

Se alterar apenas um arquivo, o painel e o build divergem.

## 8. CSS responsivo

O projeto usa abordagem desktop com breakpoints explícitos:

```css
@media (max-width: 1100px) {
  /* notebook e tablet */
}

@media (max-width: 700px) {
  /* celular */
}
```

### Método seguro

1. identifique o elemento no `.astro`;
2. localize a classe no CSS;
3. altere a regra geral;
4. confira as regras de `1100px` e `700px`;
5. teste larguras próximas ao breakpoint, não apenas um iPhone.

Larguras mínimas de teste:

- 1440 px;
- 1024 px;
- 768 px;
- 390 px;
- 320 px.

### O defeito antigo do header

O menu possuía sete links rígidos e só mudava para o modo compacto em `980px`. Em certas larguras, os itens competiam com a marca. O script do menu também podia deixar `body.nav-open` ativo depois de um redimensionamento.

A correção adotou:

- breakpoint em `1100px`;
- espaçamento fluido;
- `<details>` e `<summary>` nativos;
- lista em duas colunas no tablet e uma no celular;
- navegação funcional sem JavaScript;
- remoção do bloqueio do `body`.

Se o header quebrar novamente, primeiro verifique:

1. quantidade e tamanho dos links;
2. largura da marca;
3. `gap`;
4. breakpoint;
5. regras mobile conflitantes.

Não adicione um script para corrigir um problema que CSS e HTML resolvem.

## 9. Automação

### Build local

O `package.json` executa:

```json
"build": "astro check && astro build && node scripts/verify-site.mjs"
```

São três barreiras:

1. `astro check`: erros de Astro e TypeScript;
2. `astro build`: geração das páginas;
3. `verify-site.mjs`: regras específicas deste produto.

### Verificação específica

`scripts/verify-site.mjs` confere:

- rotas obrigatórias;
- domínio canônico;
- menu sem dependência de JavaScript;
- ligação entre CMS e home;
- existência de uma matéria principal;
- quantidade esperada de páginas;
- títulos e descrições;
- URLs canônicas;
- links internos.

Ao criar uma nova regra estrutural importante, acrescente um teste curto nesse arquivo.

Não transforme o script em teste de redação ou preferência estética.

### GitHub Actions

`.github/workflows/pages.yml` roda em:

- pull request para `main`: compila e testa;
- push em `main`: compila, testa e publica;
- execução manual: recompila e publica.

O fluxo normal é:

```text
branch → commit → pull request → CI verde → merge → deploy
```

Evite editar diretamente a `main` quando a mudança altera layout, componentes, schema ou automação.

### Pages CMS

O CMS automatiza o trabalho repetitivo:

- cria o frontmatter;
- envia imagens para `public/uploads/`;
- salva o Markdown;
- registra a alteração no GitHub.

Ele não substitui:

- revisão histórica;
- direitos de imagem;
- teste visual;
- validação do build.

### Diagnóstico do domínio

```bash
npm run check:domain
```

O script informa:

- quatro registros A;
- CNAME de `www`;
- TXT de verificação;
- resposta HTTPS;
- certificado incompatível, quando houver.

DNS e certificado são externos ao build. Por isso o diagnóstico não roda como requisito de toda pull request.

## 10. Domínio e DNS

### Todo site precisa disso?

Todo site público precisa de algum endereço. Nem todo projeto exige configuração manual de DNS:

- `usuario.github.io/projeto`: não exige domínio próprio;
- `projeto.netlify.app`: não exige domínio próprio;
- `nixonbrazil.page`: exige DNS porque o nome foi comprado separadamente;
- outro provedor: usa registros e valores próprios.

Os quatro IPs deste projeto não são universais. São os endereços IPv4 oficiais do GitHub Pages para domínio raiz.

### Registros deste projeto

Na Name.com:

| Tipo | Host | Resposta | Finalidade |
|---|---|---|---|
| TXT | `_github-pages-challenge-viniciusdaniel-law` | código fornecido pelo GitHub | prova de propriedade |
| A | vazio | `185.199.108.153` | domínio raiz |
| A | vazio | `185.199.109.153` | domínio raiz |
| A | vazio | `185.199.110.153` | domínio raiz |
| A | vazio | `185.199.111.153` | domínio raiz |
| CNAME | `www` | `viniciusdaniel-law.github.io` | endereço com `www` |

Na interface atual da Name.com, deixe o Host vazio nos registros A. O painel acrescenta `nixonbrazil.page` automaticamente. No TXT e no CNAME, informe apenas o prefixo; não repita o domínio.

### Ordem correta

1. GitHub pessoal: **Settings → Pages → Add a domain**;
2. criar o TXT fornecido;
3. clicar **Verify** e manter o TXT;
4. repositório: **Settings → Pages → Custom domain**;
5. salvar `nixonbrazil.page`;
6. criar os quatro A;
7. criar o CNAME de `www`;
8. aguardar o certificado;
9. ativar **Enforce HTTPS**;
10. rodar `npm run check:domain`.

### O que significa TTL

TTL é o tempo durante o qual um resolvedor pode guardar a resposta. `300` significa cinco minutos. Isso não garante que todo cache obedeça imediatamente, mas permite correções rápidas durante a configuração.

### `.page` e HTTPS

Domínios `.page` são carregados por HTTPS nos navegadores modernos. Se o certificado ainda não incluir `nixonbrazil.page`, o site pode parecer totalmente fora do ar mesmo com os quatro registros A corretos.

Erros típicos:

- `certificate verify failed: hostname mismatch`: DNS chegou ao GitHub, mas o certificado ainda não cobre o domínio;
- `NXDOMAIN`: o nome consultado não possui registro;
- raiz funciona e `www` não: CNAME ausente;
- GitHub não verifica a propriedade: TXT ausente ou host preenchido com o domínio duplicado.

## 11. Publicação pelo GitHub

### Alteração pequena

```bash
git switch -c ajuste/titulo-home
```

Edite e valide:

```bash
npm run build
git status
git diff
```

Registre:

```bash
git add src/pages/index.astro
git commit -m "Ajustar título da página inicial"
git push -u origin ajuste/titulo-home
```

No GitHub, abra uma pull request para `main`.

### Regra de commit

Um commit deve descrever a mudança, não a ferramenta:

```text
Corrigir navegação em telas compactas
Documentar configuração do domínio
Adicionar ficha do Tratado ABM
```

Evite:

```text
AI fixes
final final
recovery
update files
```

### Antes do merge

- CI verde;
- diff lido;
- nenhum arquivo temporário;
- nenhuma credencial;
- mobile e desktop conferidos;
- texto e imagens revisados;
- domínio ou schema alterados no mesmo conjunto de arquivos dependentes.

## 12. Uso controlado de assistentes de código

Não peça “melhore tudo”. Delimite escopo, invariantes e verificação.

Modelo:

```text
Repositório: viniciusdaniel-law/nixon-brasil
Branch: crie uma branch a partir da main atual.

Objetivo:
[uma mudança concreta]

Arquivos prováveis:
[lista curta]

Preservar:
- Astro estático;
- Pages CMS;
- domínio nixonbrazil.page;
- navegação sem JavaScript;
- voz editorial do Nixon Brasil;
- estrutura e conteúdo fora do escopo.

Não fazer:
- não reescrever textos que não foram pedidos;
- não adicionar biblioteca ou CDN sem necessidade;
- não apagar histórico;
- não editar diretamente a main;
- não criar documentos de processo redundantes.

Verificação obrigatória:
- npm ci;
- npm run build;
- teste em 1440, 1024, 768 e 390 px;
- git diff --check;
- resumo final com arquivos alterados e riscos restantes.
```

### Economia de tokens

- uma tarefa por vez;
- passe caminhos dos arquivos;
- peça primeiro diagnóstico, depois patch;
- reutilize o mesmo branch e a mesma conversa;
- mantenha este manual e o README como contexto;
- não envie `node_modules`, `dist` ou logs enormes;
- peça diffs, não cópias integrais do repositório;
- rode ferramentas determinísticas antes de pedir opinião ao modelo.

### Limite da automação

Assistente pode:

- localizar arquivos;
- preparar patch;
- rodar build;
- revisar diff;
- abrir pull request.

Revisão humana continua necessária para:

- direção do produto;
- precisão histórica;
- direito autoral;
- domínio e contas;
- merge e publicação institucional.

## 13. Como este site foi construído

O processo reutilizável foi:

1. definir o produto antes da estética;
2. separar conteúdo, componentes, layout e CSS;
3. modelar artigos e documentos;
4. espelhar o modelo no Pages CMS;
5. criar páginas estáticas e rotas de conteúdo;
6. centralizar metadados no layout;
7. criar home, header e footer;
8. testar responsividade;
9. retirar JavaScript e dependências sem função;
10. transformar defeitos encontrados em verificações automáticas;
11. configurar CI e GitHub Pages;
12. verificar o domínio;
13. publicar por pull request.

O conserto mais importante não foi cosmético. O projeto tinha camadas acumuladas de recuperação e animação, enquanto o header permanecia frágil. A solução foi reduzir o número de estados:

- um layout comum;
- um CSS global;
- um CSS da home;
- menu nativo;
- conteúdo validado;
- um comando de build;
- um fluxo de publicação.

## 14. Reutilizar a base em outro site

### Caminho curto

1. crie um novo repositório;
2. copie os arquivos sem copiar `.git`;
3. troque nome, descrição e domínio;
4. substitua cores e fontes;
5. redefina categorias e campos;
6. substitua os conteúdos;
7. ajuste rotas e testes;
8. configure o Pages;
9. só depois conecte o domínio.

### Arquivos que sempre precisam de revisão

```text
README.md
astro.config.mjs
.pages.yml
src/content.config.ts
src/layouts/BaseLayout.astro
src/components/Header.astro
src/components/Footer.astro
src/pages/index.astro
src/pages/sitemap.xml.ts
src/pages/rss.xml.ts
src/pages/robots.txt.ts
src/styles/global.css
scripts/verify-site.mjs
scripts/check-domain.mjs
```

### Não copiar

- pasta `.git`;
- credenciais;
- domínio;
- imagens sem licença;
- identificadores de analytics;
- textos institucionais;
- histórico e autoria do projeto de origem.

## 15. Diagnóstico

| Sintoma | Causa provável | Verificação |
|---|---|---|
| `npm ci` falha | versão de Node ou cache sem permissão | `node --version`; use cache no usuário |
| página nova dá 404 | arquivo fora de `src/pages` ou rota incorreta | confira o caminho e rode o build |
| CSS não muda | arquivo errado ou regra sobrescrita | procure a classe em `global.css` e `home.css` |
| assets dão 404 | caminho absoluto/base incorreto | use `import.meta.env.BASE_URL` |
| artigo não aparece | `draft: true` | desative rascunho |
| home sem matéria | nenhum `homePlacement: "lead"` | escolha exatamente um |
| CMS mostra campo, build rejeita | `.pages.yml` e schema divergentes | altere os dois |
| header quebra no notebook | breakpoint tardio ou link longo | teste próximo a `1100px` |
| raiz abre, `www` não | CNAME ausente | `npm run check:domain` |
| domínio mostra erro de certificado | Pages não salvou o domínio ou certificado pendente | Settings → Pages |
| build local passa e CI falha | Node/lockfile diferentes | use `npm ci` e Node 24 |
| alteração desapareceu | edição feita em branch errada | confira branch e histórico |

### Cache do npm sem permissão

Se o ambiente tentar escrever em um diretório indisponível:

```bash
mkdir -p /tmp/nixon-npm-cache
npm_config_cache=/tmp/nixon-npm-cache npm ci
```

Isso não altera o projeto nem o lockfile.

## 16. QA antes de publicar

### Conteúdo

- nomes, cargos e datas confirmados;
- citações comparadas com a fonte;
- tradução distinguida de paráfrase;
- título e descrição coerentes;
- imagem com crédito, licença e texto alternativo;
- nenhum placeholder.

### Interface

- header em 1440, 1024, 768, 390 e 320 px;
- navegação por teclado;
- menu compacto abre e fecha;
- home;
- artigo recente;
- acervo;
- página 404;
- foco visível;
- ausência de rolagem horizontal.

### Build

```bash
npm ci
npm run build
npm run preview
git diff --check
```

### Site publicado

- `/`;
- `/artigos/`;
- `/acervo/`;
- `/sitemap.xml`;
- `/rss.xml`;
- `/robots.txt`;
- canonical em `https://nixonbrazil.page/`;
- HTTPS;
- `www` redirecionando para o endereço principal.

## 17. Reversão

### Retirar artigo

Defina:

```yaml
draft: true
```

Publique a alteração. O arquivo e o histórico permanecem.

### Desfazer código

Não apague commits nem use `git reset --hard` na branch compartilhada.

```bash
git revert SHA_DO_COMMIT
git push
```

Abra uma pull request com a reversão.

### Falha após merge

1. identifique o commit responsável;
2. reverta esse commit;
3. deixe o CI compilar;
4. faça o merge da reversão;
5. investigue a causa em outro branch.

## 18. Higiene do repositório

Mantenha:

- README curto;
- este manual como guia principal;
- documentação separada apenas para operações específicas;
- nomes de arquivos descritivos;
- commits por mudança real;
- dependências mínimas.

Não mantenha:

- transcrições de conversa;
- prompts soltos;
- arquivos chamados `final`, `recovery`, `new-final` ou equivalentes;
- relatórios de agente;
- CSS duplicado;
- bibliotecas adicionadas para um único efeito;
- documentação que descreve uma função inexistente.

O repositório deve ser compreensível pela estrutura e pelo histórico, sem depender de saber qual ferramenta produziu cada linha.

## 19. Referências técnicas

- Astro: `https://docs.astro.build/`
- Content Collections: `https://docs.astro.build/en/guides/content-collections/`
- GitHub Pages: `https://docs.github.com/en/pages`
- Domínio no GitHub Pages: `https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site`
- Pages CMS: `https://pagescms.org/docs/`
- Name.com DNS: `https://www.name.com/support/categories/200296828`

