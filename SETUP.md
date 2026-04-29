# Deploy su Cloudflare Pages + Keystatic CMS

## 1. Pubblica il codice su GitHub

```bash
git init
git add .
git commit -m "init: migrazione a Astro"
git remote add origin https://github.com/TUO_USERNAME/aedilia-astro.git
git push -u origin main
```

## 2. Crea il progetto su Cloudflare Pages

1. Vai su [pages.cloudflare.com](https://pages.cloudflare.com)
2. **Create a project** → Connect to Git → seleziona il repo GitHub
3. Impostazioni build:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variable:** `NODE_VERSION = 20`
4. Salva e fai Deploy

Il sito sarà live su `https://aedilia-astro.pages.dev`.

---

## 3. Collega il dominio personalizzato

Su Cloudflare Pages → il tuo progetto → **Custom domains** → Aggiungi `aediliacostruzioni.it`.

---

## 4. Attiva Keystatic CMS in produzione

Hai già un account su [keystatic.cloud](https://keystatic.cloud). Segui questi step:

### 4a. Crea un progetto Keystatic Cloud

1. Vai su **keystatic.cloud** → crea un nuovo progetto
2. Connetti il repo GitHub `TUO_USERNAME/aedilia-astro`
3. Copia il **Project slug** (formato: `team-name/project-name`)

### 4b. Aggiorna `keystatic.config.ts`

```ts
storage: {
  kind: 'cloud',
  project: 'il-tuo-team/aedilia',  // sostituisci con il tuo slug
},
```

### 4c. Aggiungi le variabili d'ambiente su Cloudflare Pages

Nel pannello Cloudflare Pages → il tuo progetto → **Settings** → **Environment variables**:

| Variabile | Valore |
|-----------|--------|
| `KEYSTATIC_GITHUB_CLIENT_ID` | *fornito da Keystatic Cloud* |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | *fornito da Keystatic Cloud* |
| `KEYSTATIC_SECRET` | stringa casuale lunga (es: genera con `openssl rand -hex 32`) |

### 4d. Usa il CMS

- In locale (sviluppo): `npm run dev` → vai su `http://localhost:4321/keystatic/`
- In produzione: vai su `https://www.aediliacostruzioni.it/keystatic/`

---

## Come funziona

Ogni modifica dal CMS fa un commit su GitHub → Cloudflare Pages esegue il rebuild automaticamente (~30 sec) → il sito si aggiorna.

**Cosa si può modificare dal CMS:**
- **Portfolio lavori** — aggiungere, modificare, eliminare foto e descrizioni
- **Impostazioni sito** — telefono, email, indirizzo, P.IVA, GA4 ID, ecc.
- **Home — testi hero** — testo principale sopra e sotto la foto
- **Chi siamo — testi** — paragrafi della pagina chi siamo
