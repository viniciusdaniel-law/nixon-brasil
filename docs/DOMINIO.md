# Domínio `nixonbrazil.page`

O código usa `https://nixonbrazil.page` como endereço canônico. A publicação depende do GitHub Pages e do DNS da Name.com.

## O que é específico deste site

Todo domínio próprio usa DNS, mas os registros dependem da hospedagem. Os endereços abaixo são os do GitHub Pages; não devem ser copiados para outro provedor.

## Verificar a propriedade

Em **GitHub → Settings → Pages → Verified domains**, adicione `nixonbrazil.page`.

O GitHub fornece um TXT. Na Name.com:

| Campo | Valor |
|---|---|
| Tipo | `TXT` |
| Host | `_github-pages-challenge-viniciusdaniel-law` |
| Resposta | código fornecido pelo GitHub |
| TTL | `300` |

A Name.com acrescenta `.nixonbrazil.page` ao Host. Não repita o domínio. Depois de clicar **Verify** no GitHub, mantenha o TXT.

## Associar ao GitHub Pages

No repositório:

1. abra **Settings → Pages**;
2. em **Custom domain**, informe `nixonbrazil.page`;
3. salve;
4. aguarde o certificado;
5. ative **Enforce HTTPS**.

O projeto publica por GitHub Actions. Nesse modo, o domínio deve ficar salvo nas configurações do Pages.

## DNS na Name.com

Remova somente registros de estacionamento que conflitem com o host vazio ou com `www`. Não apague NS, TXT, MX ou registros de e-mail.

Crie:

| Tipo | Host na Name.com | Resposta | TTL |
|---|---|---|---|
| A | vazio | `185.199.108.153` | `300` |
| A | vazio | `185.199.109.153` | `300` |
| A | vazio | `185.199.110.153` | `300` |
| A | vazio | `185.199.111.153` | `300` |
| CNAME | `www` | `viniciusdaniel-law.github.io` | `300` |

Na interface da Name.com, deixe o Host realmente vazio nos quatro registros A. Não use `@` se o painel não aceitar e não digite `nixonbrazil.page`, pois o sufixo já é acrescentado.

Não use CNAME no domínio raiz e não crie registro curinga (`*`).

Os registros AAAA são opcionais:

```text
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

## Verificação

No repositório local:

```bash
npm run check:domain
```

Ou:

```bash
dig nixonbrazil.page +short A
dig www.nixonbrazil.page +short CNAME
dig _github-pages-challenge-viniciusdaniel-law.nixonbrazil.page +short TXT
```

Estado completo:

- quatro registros A no domínio raiz;
- `www` apontando para `viniciusdaniel-law.github.io`;
- TXT de verificação preservado;
- `nixonbrazil.page` salvo em **Repository Settings → Pages**;
- HTTPS ativo.

## Erros

| Erro | Causa provável |
|---|---|
| `NXDOMAIN` | registro ausente ou Host incorreto |
| raiz abre, `www` não | CNAME ausente |
| GitHub não verifica | TXT ausente, valor errado ou domínio duplicado no Host |
| `hostname mismatch` | DNS chegou ao GitHub, mas o certificado ainda não inclui o domínio |
| endereço antigo em canonical/assets | configuração do Astro não corresponde ao domínio |

Domínios `.page` exigem HTTPS no navegador. Enquanto o certificado estiver pendente, o site pode parecer indisponível mesmo com os registros A corretos.

