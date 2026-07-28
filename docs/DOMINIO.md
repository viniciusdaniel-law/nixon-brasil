# Domínio `nixonbrazil.page`

O código usa `https://nixonbrazil.page` como endereço canônico. A publicação depende de duas configurações externas.

## GitHub Pages

No repositório:

1. abra **Settings → Pages**;
2. em **Custom domain**, informe `nixonbrazil.page`;
3. salve;
4. depois que o certificado estiver disponível, ative **Enforce HTTPS**.

Este projeto publica por GitHub Actions. Nesse modo, o arquivo `CNAME` do repositório é ignorado; o domínio deve ser salvo nas configurações do Pages.

## DNS na Name.com

Remova registros de estacionamento que entrem em conflito e crie:

| Tipo | Host | Resposta |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `viniciusdaniel-law.github.io` |

Não use CNAME no domínio raiz e não crie registro curinga (`*`). O `www` será redirecionado pelo GitHub para o domínio principal.

Os registros AAAA são opcionais:

```text
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

## Verificação

O GitHub recomenda verificar o domínio na configuração pessoal de Pages antes de associá-lo ao repositório. O processo fornece um registro TXT específico; mantenha esse registro depois da confirmação.

Após a propagação:

```bash
dig nixonbrazil.page +noall +answer -t A
dig www.nixonbrazil.page +noall +answer -t CNAME
```

O certificado HTTPS pode levar algum tempo para ser emitido. Se o DNS já estiver correto e a emissão não começar, remova e salve novamente o domínio em **Settings → Pages**.
