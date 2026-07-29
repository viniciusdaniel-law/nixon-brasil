# Pages CMS

## Acesso

1. Entre em [app.pagescms.org](https://app.pagescms.org/) com a conta do GitHub.
2. Autorize apenas o repositório `viniciusdaniel-law/nixon-brasil`.
3. Selecione a branch `editorial` — não edite `main` diretamente.

O painel lê `.pages.yml` nessa branch e exibe duas coleções: **Artigos** e **Documentos do acervo**. A branch `editorial` funciona como área de trabalho; `main` é a produção publicada.

## Publicar um artigo

1. Abra **Artigos → New entry**.
2. Preencha título, subtítulo, resumo, data, autor e categoria.
3. Escolha a posição na página inicial:
   - `lead`: matéria principal; mantenha apenas um artigo nessa posição;
   - `rail`: lista lateral, limitada aos quatro artigos mais recentes;
   - `none`: não aparece na seleção da página inicial.
4. Adicione imagem, texto alternativo e crédito.
5. Escreva e revise o texto.
6. Mantenha **Rascunho** ativo até a revisão final.
7. Para publicar, desative **Rascunho** e salve.
8. Abra [a comparação `editorial` → `main`](https://github.com/viniciusdaniel-law/nixon-brasil/compare/main...editorial?expand=1), crie a pull request e aguarde o check `build`.
9. Revise a prévia e faça o merge somente quando o check estiver aprovado.

O CMS cria ou atualiza um arquivo em `src/content/artigos/`. Salvar no CMS não publica o site; a publicação começa somente quando a pull request chega à branch `main`.

## Cadastrar um documento

Registre:

- título editorial e título original;
- data e formato;
- tema;
- instituição ou arquivo de origem;
- referência oficial;
- URL do original;
- situação da tradução;
- nota documental.

Não estime códigos de caixa, pasta ou documento. Se a referência não estiver disponível na instituição de custódia, deixe o campo vazio.

## Imagens

Uploads são gravados em `public/uploads/`. Antes de publicar, confirme:

- descrição visual;
- fotógrafo ou órgão produtor;
- coleção e identificador, quando disponíveis;
- licença ou situação de domínio público.

Crédito não substitui autorização de uso.

## Correção e retirada

Para uma correção simples, edite a entrada e preencha **Última atualização**. Para retirar um artigo sem apagá-lo, ative **Rascunho**. Salve na branch `editorial` e use a mesma pull request de revisão. O histórico anterior permanece no GitHub.
