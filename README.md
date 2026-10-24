# WatchMeGrow – sito della lista d'attesa

Landing page in italiano per WatchMeGrow, l'app (in sviluppo) con un giardiniere IA per le piante di casa e del balcone. Il sito presenta il prodotto e raccoglie le iscrizioni alla lista d'attesa.

## Tecnologie

- HTML, CSS e un piccolo file JavaScript vanilla: nessun framework, nessun build step.
- Google Font Manrope, in linea con la webapp.
- Palette e simbolo del brand condivisi con WatchMeGrow.
- Illustrazioni e icone in SVG inline; lo smartphone dell'hero è disegnato in CSS.
- Netlify Forms per il modulo `lista-attesa` (con honeypot anti-spam).

## File

- `index.html` – pagina principale (hero, problema, come funziona, sensori compatibili, funzionalità, confronto piani, modulo, FAQ, footer)
- `grazie.html` – pagina dopo l'iscrizione (servita su `/grazie`)
- `privacy.html` – informativa privacy (servita su `/privacy`)
- `styles.css` – tutti gli stili, mobile-first
- `script.js` – solo il pulsante "Condividi" di `grazie.html`
- `favicon.svg`, `netlify.toml`

## Avvio in locale

Basta aprire `index.html` nel browser, oppure servire la cartella con un server statico qualsiasi. Per provare anche il modulo con l'emulazione di Netlify:

```bash
netlify dev
```

Le iscrizioni si leggono nel pannello Netlify, sezione **Forms → lista-attesa**.

## Prima della pubblicazione

- Sostituire i segnaposto `[EMAIL]`, `[INSTAGRAM]`, `[TIKTOK]` (footer e `grazie.html`) e `[NOME E CONTATTI]` (`privacy.html`).
- Far verificare l'informativa privacy e poi rimuovere la nota "Testo da far verificare".
- Aggiungere un'immagine di anteprima `og-image.png` (1200×630) e scommentare il relativo meta tag in `index.html`.
- Se si usa un dominio personalizzato, aggiornare gli URL canonical/og e quello di condivisione in `grazie.html`.
- Facoltativo: inserire lo script di Plausible o Umami nel punto indicato da un commento nel `<head>` di ogni pagina.
