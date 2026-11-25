# Valb Studio · Gestionale

L'app di Valb Studio per magazzino, catalogo, ordini e dashboard.
Si installa sulla schermata Home di iPhone e iPad e tiene gli stessi dati su entrambi.

- **Magazzino:**
  - le categorie sono Filati, Hardware metallici, Fodere e Altri materiali, più quelle che crei tu;
  - c'è la lista "Ordina di nuovo";
  - le quantità calano da sole quando usi un materiale in una borsa.
- **Catalogo:** Ordini (le borse fatte), Modelli, Progetti e Ispirazioni.
- **Ordini:** incassato, spesa e guadagno di ogni ordine.
- **Dashboard:** i progetti, i grafici mese per mese e il grafico a torta.
- **Note** e **Impostazioni** (costo del lavoro e sincronizzazione) si aprono dalla matita e dall'ingranaggio in alto.
- Funziona anche **senza connessione**: le modifiche partono appena torna internet.

---

## Come metterla in funzione (tutto da iPhone o iPad)

Servono circa 15 minuti, una volta sola. Ci sono tre parti:

1. il database gratuito su Supabase, dove vivono i dati;
2. la pubblicazione con GitHub Pages, che dà all'app il suo indirizzo;
3. l'installazione su iPhone e iPad.

### Parte 1 · Il database (Supabase, gratis)

1. In Safari apri **supabase.com** e tocca **Start your project**. Il modo più semplice per entrare è **Continue with GitHub**.
2. Tocca **New project**:
   - **Name:** `valb-studio`
   - **Database Password:** scegline una e salvala (nell'app non serve, ma tienila).
   - **Region:** una in Europa, per esempio *Central EU (Frankfurt)*.
   - Piano **Free**, poi **Create new project**. Aspetta un paio di minuti.
3. Prepara le tabelle:
   - qui su GitHub apri il file [`supabase/schema.sql`](supabase/schema.sql), tocca **Raw**, poi seleziona tutto il testo e copialo;
   - in Supabase apri **SQL Editor** e tocca **New query**;
   - incolla il testo e tocca **Run**. Deve comparire *Success. No rows returned*.
4. In Supabase apri **Authentication › URL Configuration**. In **Site URL** scrivi l'indirizzo dell'app (lo trovi nella Parte 2):
   `https://valeriabertocchi.github.io/valbstudio-main/`
   Poi tocca **Save**. Così i link nelle email (conferma, password dimenticata) aprono l'app.
5. Apri **Project Settings › API** (oppure **Data API** / **API Keys**) e tieni a portata di mano due codici:
   - **Project URL**, per esempio `https://abcdxyz.supabase.co`;
   - la chiave **anon public**, una riga lunga che inizia con `eyJ…`. Nei progetti nuovi può chiamarsi **Publishable key** e iniziare con `sb_publishable_…`.

   La chiave *anon / publishable* è fatta per stare nelle app: i dati restano protetti dall'accesso con email e password. Non usare mai la chiave **service_role** / **secret**.

### Parte 2 · L'indirizzo dell'app (GitHub Pages, gratis)

1. Qui nel repository **valbstudio-main** apri **Settings › Pages**.
2. In **Build and deployment**:
   - **Source:** *Deploy from a branch*
   - **Branch:** `main` e cartella `/ (root)`

   Poi tocca **Save**.
3. Dopo circa un minuto l'app è online a questo indirizzo:
   **https://valeriabertocchi.github.io/valbstudio-main/**

> Se GitHub dice che Pages non è disponibile, il repository è privato: con il piano gratuito Pages funziona solo con i repository pubblici. Puoi renderlo pubblico da **Settings › General › Danger Zone › Change visibility**. È sicuro: nel codice non ci sono password né dati, e i tuoi dati stanno su Supabase, protetti dal tuo account.

### Parte 3 · Installare l'app

**Su iPhone:**

1. Apri l'indirizzo in **Safari**, tocca **Condividi**, poi **Aggiungi alla schermata Home** e **Aggiungi**.
2. Apri **Valb Studio** dalla schermata Home.
3. Incolla **Project URL** e **chiave anon public**, poi tocca **Collega**.
4. Tocca **Prima volta? Crea l'account**, scrivi la tua email e una password, poi tocca **Crea account**.
5. Ti arriva un'email da Supabase: aprila e tocca il link di conferma. Poi torna nell'app e tocca **Entra**.

**Su iPad:** fai gli stessi passi 1, 2 e 3. Al posto del punto 4 tocca **Entra** con **la stessa email e password**. Non creare un secondo account.

Da qui in poi ogni modifica fatta su un dispositivo compare da sola sull'altro.

**Consigliato:** quando il tuo account funziona su tutti e due, in Supabase vai su **Authentication › Sign In / Providers** e disattiva **Allow new users to sign up**. Così nessun altro può creare account nel tuo database.

---

## Domande utili

**Come vedo se è sincronizzato?** In **Impostazioni** (l'ingranaggio in alto), alla voce **Sincronizzazione**:

- pallino verde: è tutto sincronizzato;
- pallino azzurro che pulsa: sta sincronizzando;
- pallino grigio: sei offline o non hai ancora fatto l'accesso.

**E se sono senza internet?** L'app si apre e funziona lo stesso. Le modifiche restano salvate sul dispositivo e partono appena torna la connessione.

**E se cambio la stessa scheda su iPhone e iPad quando sono tutti e due senza internet?** Resta la versione inviata per ultima.

**Le foto?** Prima di salvarle l'app le rimpicciolisce (lato più lungo 1600 px), così occupano poco. Poi vanno nello spazio privato *media* di Supabase.

**Backup:** in **Impostazioni** c'è **Scarica una copia dei dati**. Salva un file con tutte le schede, senza le foto.

**Limiti del piano gratuito di Supabase:** 500 MB di dati e 1 GB di foto, che bastano per migliaia di schede e di foto. Se il progetto resta **una settimana senza essere usato**, Supabase lo mette in pausa. Si riattiva dal sito di Supabase con **Restore project**, e i dati non si perdono.

**Aggiornamenti dell'app:** quando il codice viene aggiornato, l'app scarica da sola la nuova versione. La vedi la volta dopo che la apri: a volte serve chiuderla e riaprirla.

**Ho dimenticato la password:** nella schermata **Entra** scrivi l'email e tocca **Password dimenticata?**.

---

## Per chi lavora sul codice

| File | Cosa contiene |
|---|---|
| `index.html` | la pagina dell'app |
| `styles.css` | colori, caratteri e impaginazione |
| `app.js` | schermate e logica (magazzino, catalogo, ordini, dashboard, note) |
| `sync.js` | salvataggio sul dispositivo (localStorage + IndexedDB per foto e PDF), sincronizzazione con Supabase, schermate di collegamento e accesso |
| `config.js` | facoltativo: Project URL e chiave anon, se si vogliono già scritti nell'app |
| `sw.js` | service worker per usare l'app anche offline (cambia `VERSION` a ogni rilascio) |
| `manifest.webmanifest`, `icons/` | installazione sulla schermata Home |
| `vendor/supabase-2.118.0.js` | libreria ufficiale `@supabase/supabase-js` 2.118.0 (licenza MIT, vedi `vendor/supabase-LICENSE.txt`) |
| `supabase/schema.sql` | tabella `items`, regole di accesso (RLS), tempo reale e spazio `media` per le foto |

Ogni scheda è una riga di `items`:

- chiavi: `user_id`, `coll` e `rid`;
- contenuto: `data`, in formato jsonb;
- in più: `deleted` e `updated_at`, quest'ultimo messo dal database.

I dispositivi inviano solo le schede cambiate e ricevono quelle nuove in tempo reale. Le ricevono comunque anche a ogni apertura e ogni 30 secondi.

È un sito statico senza build: basta servire la cartella con HTTPS.
