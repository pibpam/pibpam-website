# Migração de domínio: `pibpam.org` vira o site, o app vai para `app.pibpam.org`

## Situação

|  | Hoje | Depois |
|---|---|---|
| `www.pibpam.org` (`pibpam.org` redireciona 308 para ele) | app legado (projeto Vercel `pibpam-website`) | **site institucional** (projeto Vercel novo, Root Directory `site`) |
| `app.pibpam.org` | não existe | **app legado** (mesmo projeto `pibpam-website`) |

O DNS de `pibpam.org` está na Vercel (`ns1/ns2.vercel-dns.com`): domínio novo no projeto não exige mexer em registro.

O app nativo (Expo, `pib-app`) abre `https://www.pibpam.org?platform=ios|android` dentro de um WebView. As versões já instaladas
**continuam abrindo esse endereço** até cada pessoa atualizar. Por isso o site precisa servir o app para elas.

## Quem acessa o quê

| Quem | Abre | O que acontece |
|---|---|---|
| App nativo novo | `app.pibpam.org` | Vai direto ao app legado. Nunca passa pelo site. |
| App nativo antigo | `www.pibpam.org?platform=…` | `src/proxy.ts` repassa (rewrite) ao app legado e grava o cookie `pibpam_app`, mantendo a URL. |
| Navegador | `www.pibpam.org` | Site. Páginas que só existem no app (`/bible`, `/inscricoes/…`) recebem 308 para o mesmo caminho em `app.pibpam.org`. |
| Link antigo compartilhado | `pibpam.org/event/ID`, `/series/ID`… | 301 para a página equivalente do site. |

O proxy **não redireciona** o que o app antigo usa sem cookie: `/api/*` (inclusive o download de imagem), `/auth/*` (login com
Google), `/_next/data/*` (dados das páginas do Next 12) e os arquivos de `public/` que só o app tem. Isso cai no `fallback` de
`next.config.ts` e no próprio proxy.

## Decisões e consequências

- **Login e inscrições salvas somem na troca.** O token (`@pibpam:keyAccess`) e a lista de inscrições salvas
  (`@pibpam:registrations`) ficam no `localStorage`, que é por origem. Quem atualizar para o app em `app.pibpam.org` entra de novo e
  perde a lista local. O push **não** é afetado: o token é registrado sem login (`POST /notifications`) a cada abertura.
  Se isso incomodar, dá para migrar a sessão (WebView oculto que lê o token em `www.pibpam.org` e o entrega ao app novo). Não está feito.
- **Firebase.** Em *Authentication → Settings → Authorized domains*, adicione `app.pibpam.org` (o login com Google usa
  `signInWithPopup` na origem da página). Mantenha `pibpam.org` e `www.pibpam.org`: o app antigo segue usando.
  Confira também, no Google Cloud, o cliente OAuth web (*Authorized JavaScript origins*), se houver `www.pibpam.org` ali.
- **Canônico é `www`.** `pibpam.org` redireciona 308 para `www.pibpam.org` (como já é hoje) e `SITE_URL` é `https://www.pibpam.org`.

## Passo a passo

**Fase 1: preparar `app.pibpam.org` (sem impacto)**
1. Fazer o merge do PR do site e deste ajuste. Sem `ASSET_PREFIX`, o app não muda em nada.
2. Vercel → projeto `pibpam-website` → *Domains* → adicionar `app.pibpam.org`.
3. Firebase: autorizar `app.pibpam.org` (acima).
4. Abrir `https://app.pibpam.org` no celular e testar login com Google, navegação e compartilhar.

**Fase 2: preparar o site (sem impacto)**
5. Vercel → novo projeto a partir do mesmo repositório, framework Next.js, Node 22.x, **Root Directory `site`**.
   Variáveis (Production e Preview):
   - `API=https://api.pibpam.org/`
   - `SITE_URL=https://www.pibpam.org`
   - `LEGACY_APP_URL=https://app.pibpam.org`
   - `CONTACT_ENABLED=false` (liga quando `POST /v1/contact-messages` estiver no backend)

   Sem `LEGACY_APP_URL` o deploy de produção **falha de propósito** (`next.config.ts`): publicar assim derrubaria o app antigo.
6. No projeto `pibpam-website`, definir `ASSET_PREFIX=https://app.pibpam.org` e fazer *redeploy* de produção. Os assets do app passam a
   vir de `app.pibpam.org` (o CORS de `/_next/*` já é liberado quando a variável existe). Faça **junto do corte (fase 3)**: a
   partir daqui o `www.pibpam.org` atual já carrega JS/CSS de `app.pibpam.org`.
7. Validar o site na URL `*.vercel.app` do projeto novo (comandos abaixo, trocando o host).

**Fase 3: corte (terça ou quarta de madrugada; evite domingo e quarta à noite, quando mais gente usa o app)**
8. Projeto `pibpam-website`: remover `pibpam.org` e `www.pibpam.org`.
9. Projeto do site: adicionar `www.pibpam.org` (principal) e `pibpam.org` (redirect 308 para `www.pibpam.org`).
10. Rodar os testes de aceitação abaixo e abrir o app em um aparelho com a **versão antiga**.

*Rollback* (segundos): remover os dois domínios do projeto do site e adicioná-los de volta ao `pibpam-website`.

**Fase 4: app nativo**
11. Aplicar o patch abaixo em `pib-app`, subir a versão (`app.json`: `version` e `android.versionCode`) e publicar nas lojas.
12. Acompanhar a adoção (seção seguinte).

**Fase 5: encerrar o suporte ao app antigo**
13. Quando as aberturas do app antigo chegarem perto de zero, remover de `src/proxy.ts` o bloco do cookie/`?platform=`, o `fallback` de
    `next.config.ts`, a trava de `LEGACY_APP_URL` e `skipProxyUrlNormalize`. **Mantenha** os redirects 308 das páginas do app
    (preservam links antigos) e os 301 do site.

## Quando dá para encerrar o suporte

Cada abertura do app antigo gera uma linha de log no projeto do site: `{"event":"legacy-app-launch","platform":"ios"}`
(só na primeira requisição, `/?platform=`). Na Vercel, *Logs* do projeto do site, filtre por `legacy-app-launch` e compare por dia.

## Testes de aceitação (produção)

```bash
# Site e redirect do apex
curl -sI https://www.pibpam.org/ | head -1                              # 200
curl -sI https://pibpam.org/ | grep -iE "^(HTTP|location)"              # 308 → https://www.pibpam.org/

# App antigo: abre o app legado (título sem "| Primeira Igreja…") e grava o cookie
curl -s -c /tmp/jar "https://www.pibpam.org/?platform=ios" | grep -o "<title>[^<]*"
grep -c pibpam_app /tmp/jar                                              # 1

# Dados do Next 12 pelo proxy devem ser JSON (pegue o buildId do HTML do app)
BUILD=$(curl -s https://app.pibpam.org/ | grep -o '"buildId":"[^"]*"' | cut -d'"' -f4)
curl -s -b /tmp/jar -o /dev/null -w "%{http_code} %{content_type}\n" "https://www.pibpam.org/_next/data/$BUILD/about.json"   # 200 application/json

# O que o app antigo usa sem cookie
curl -s -o /dev/null -w "%{http_code}\n" https://www.pibpam.org/api/lives          # 200
curl -s -o /dev/null -w "%{http_code}\n" https://www.pibpam.org/auth/google        # 200

# Navegador: páginas do app vão para app.pibpam.org e links antigos para o site
curl -sI https://www.pibpam.org/bible | grep -iE "^(HTTP|location)"      # 308 → https://app.pibpam.org/bible
curl -sI https://www.pibpam.org/about | grep -iE "^(HTTP|location)"      # 301 → /sobre
```

## Patch no app nativo (`pib-app/app/index.tsx`)

Não foi aplicado: o arquivo tem alterações suas ainda não commitadas (branch `v3`) e trocar a URL antes de existir
`app.pibpam.org` quebraria os builds de teste. O detector `includes("pibpam.org/auth/code")` já serve para os dois domínios.

```diff
-        source={{ uri: "https://www.pibpam.org?platform=" + platform }}
+        source={{ uri: "https://app.pibpam.org?platform=" + platform }}
...
-            request.url.startsWith("https://www.pibpam.org") ||
+            request.url.startsWith("https://app.pibpam.org") ||
...
-            source={{ uri: "https://www.pibpam.org/auth/google" }}
+            source={{ uri: "https://app.pibpam.org/auth/google" }}
```

## O que mudou no código por causa disso

- `site/src/proxy.ts`: redirects 308 das páginas do app para `app.pibpam.org`; log de abertura do app antigo;
  repasse correto de `/_next/data/*` (com `skipProxyUrlNormalize`, senão o legado devolvia HTML no lugar do JSON).
- `site/next.config.ts`: trava de produção para `LEGACY_APP_URL` e `skipProxyUrlNormalize`.
- App legado: `https://app.pibpam.org` entra na lista de origens ignoradas do `postMessage`
  (`contexts/postMessage.tsx`); o download de imagem da galeria usa a origem da página em vez de `pibpam.org` fixo.
