# Pages CMS

O Pages CMS é o painel editorial do Nixon Brasil. Ele não possui banco de dados próprio: cada alteração salva um arquivo no GitHub. Por isso, o histórico pode ser comparado, corrigido e revertido.

## Entrar

1. Acesse [app.pagescms.org](https://app.pagescms.org/) e entre com GitHub.
2. Escolha `viniciusdaniel-law/nixon-brasil`.
3. Selecione a branch **`editorial`**. Não use `main`.

Salvar na `editorial` não altera o site público. A produção usa exclusivamente `main`.

## O que existe no painel

| Seção | Uso | Pode criar vários? |
|---|---|---:|
| Artigos | Análises assinadas | Sim |
| Documentos do acervo | Fichas, notas e traduções | Sim |
| Páginas institucionais | Biografia, Sobre e Brasil | Não |
| Cronologia | Eventos datados | Sim |
| Discursos | Texto, contexto e fonte original | Sim |
| Pessoas | Perfis ligados ao acervo | Sim |
| Temas | Dossiês de pesquisa | Sim |
| Galerias | Ensaios visuais documentados | Sim |
| Configurações | Home, menu, rodapé, redes e SEO | Não |

As páginas e configurações são arquivos únicos. Isso impede criar uma segunda biografia ou apagar o menu por acidente. Artigos e demais coleções aceitam novas entradas.

## Criar um artigo

1. Abra **Artigos → New entry**.
2. Use no nome do arquivo apenas minúsculas e hífens: `nixon-medici-e-o-cafe`.
3. Preencha título, resumo, data, autor e categoria.
4. Informe a fonte primária principal e as fontes adicionais.
5. Se houver capa, preencha texto alternativo, crédito e direitos.
6. Escreva o texto e mantenha **Rascunho** ativo.
7. Faça uma segunda leitura, teste os links e só então desative **Rascunho**.
8. Salve.

O nome do arquivo define a URL: o exemplo acima vira `/artigos/nixon-medici-e-o-cafe/`.

### Destaques da home

- `lead`: matéria principal; deve existir exatamente uma;
- `rail`: destaque secundário;
- `none`: artigo publicado fora da seleção da home.

Antes de promover um novo `lead`, altere o anterior para `rail` ou `none`. O build rejeita duas matérias principais.

## Cadastrar documento

Registre título, data, formato, tema, arquivo de origem, referência, URL original e situação da tradução. O campo **Comentário ou tradução** é publicado numa página própria do documento.

Use **Rascunho** até terminar a ficha. Não invente códigos de caixa, pasta ou documento. Se uma referência oficial não estiver disponível, deixe o campo vazio e explique a lacuna na nota.

Os campos **Pessoas** e **Temas** servem para organizar relações editoriais. Use nomes de arquivo sem extensão, por exemplo `richard-nixon` ou `detente`.

## Editar páginas institucionais

Abra **Páginas institucionais** e escolha Biografia, Sobre ou Nixon e o Brasil. Essas entradas preservam as URLs atuais. Edite título, apresentação e corpo; atualize a data de revisão quando houver mudança material.

Não crie uma página institucional nova por cópia. Para uma nova seção permanente, altere primeiro o schema e a configuração do site por pull request.

## Cronologia, discursos, pessoas e temas

Cada entrada deve cumprir uma função diferente:

- **Cronologia:** uma data, um fato delimitado e uma fonte verificável;
- **Discursos:** contexto da fala, URL do original e situação da tradução;
- **Pessoas:** perfil factual ligado a documentos do acervo;
- **Temas:** porta de entrada para um conjunto documental, não artigo duplicado.

Evite publicar resumos de duas ou três frases apenas para preencher a seção. Uma entrada curta deve orientar o leitor para a fonte; uma interpretação mais extensa pertence a Artigos.

## Galerias e imagens

Uploads são gravados em `public/uploads/`. Antes de publicar, confirme:

- o que a imagem mostra;
- fotógrafo ou órgão produtor;
- coleção e identificador, quando disponíveis;
- licença ou situação de domínio público;
- texto alternativo objetivo.

Crédito não substitui licença. Não use uma imagem apenas porque apareceu numa busca.

## Configurações

Em **Configurações** é possível alterar:

- título, introdução, imagem e botões da home;
- itens do menu;
- textos e crédito editorial do rodapé;
- links sociais;
- descrição, imagem e idioma padrão de SEO.

URLs do menu e dos botões devem começar com `/`. Links sociais devem usar HTTPS. Não altere idioma ou domínio canônico sem testar o build.

Cores, tipografia, espaçamento e componentes permanecem no código. Isso evita que uma edição de conteúdo quebre a interface.

## Pesquisa e redação

Antes de salvar um texto:

1. confira o documento original;
2. identifique quem o produziu e para qual finalidade;
3. compare com outra fonte quando houver alegação disputada;
4. diferencie fato, interpretação e inferência;
5. não atribua ao presidente uma lei produzida pelo Congresso sem explicar os papéis;
6. não trate relatório de inteligência como confirmação independente;
7. não use texto promocional, diagnóstico psicológico ou conclusão sem fonte.

Pesquisa, seleção e edição são creditadas a Vinicius Daniel. Ferramentas podem auxiliar revisão e organização; a responsabilidade pelo que é publicado continua humana.

## Publicar

1. Revise as alterações na branch `editorial`.
2. Abra [a comparação `editorial` → `main`](https://github.com/viniciusdaniel-law/nixon-brasil/compare/main...editorial?expand=1).
3. Confirme `base: main` e `compare: editorial`.
4. Crie a pull request.
5. Leia o diff completo e aguarde o check `build` ficar verde.
6. Use **Squash and merge**.
7. Não exclua a branch `editorial`.
8. Sincronize `main` de volta para `editorial` antes da próxima edição.

## Corrigir, retirar e reverter

- Correção: edite a entrada, atualize a data se a mudança for material e publique por PR.
- Retirada temporária: ative **Rascunho**.
- Exclusão: use apenas quando a entrada não deve permanecer nem como rascunho.
- Reversão de código: crie um `git revert` em nova branch e abra outra PR; nunca force a `main`.

O histórico anterior permanece no GitHub mesmo depois de uma correção.
