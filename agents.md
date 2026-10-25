# AGENTS.md

## Architettura
Sito statico puro (HTML + CSS + JS vanilla minimo), pubblicato da Netlify dalla cartella principale (`netlify.toml`, `publish = "."`). Nessun package.json, nessun build step: non aggiungerne senza una richiesta esplicita.

## File chiave
- `index.html`: tutte le sezioni della landing, nell'ordine richiesto dal cliente. Ogni sezione è commentata con il suo numero.
- `grazie.html`, `privacy.html`: condividono head, header e footer con `index.html` (copiati, non inclusi: se modifichi header/footer aggiornali in tutti e tre i file).
- `styles.css`: variabili colore in `:root`, allineate alla webapp (verde foresta, muschio, sfondo chiaro). Mobile-first, breakpoint a 640px e 900px.
- `script.js`: caricato solo da `grazie.html` per il pulsante di condivisione (Web Share API, fallback copia link).
- `hero.js`: caricato solo da `index.html`. Aggiunge `.hero--scrub` all'hero (alto 300vh, scena `sticky`) e a ogni scroll scrive variabili CSS (`--copy`, `--move`, `--show`, `--grow`, `--in`, `--out`, `--v`) su cui `styles.css` calcola le trasformazioni. Le soglie di ogni fase sono in `render()`; gli stati finali sono il CSS di base, quindi senza JS o con movimento ridotto l'hero è una sequenza statica.
- `reveal.js`: caricato solo da `index.html`. Marca con `data-reveal` (left/right/up/pop/fade) i blocchi sotto l'hero tramite un elenco di selettori in cima al file; `IntersectionObserver` aggiunge `.is-in` all'ingresso e `.is-done` a fine transizione (così gli hover non ereditano i ritardi). Lo stato nascosto in `styles.css` esiste solo per gli elementi marcati: per animare un nuovo blocco basta aggiungere il suo selettore. Con movimento ridotto lo script non parte.
- La pianta è l'SVG `.hero-figure`: la W del simbolo è disegnata sopra il fusto (`.stem`, animato con `stroke-dashoffset` su `pathLength="1"`); le foglie sono agganciate al fusto con `data-t` (frazione di lunghezza), `data-rot` e `data-size`.

## Decisioni non ovvie
- Il modulo Netlify `lista-attesa` usa `action="/grazie"` (senza `.html`): con i pretty URL di Netlify il path `.html` nell'action di un modulo può dare 404. La funzionalità Forms è attivata tramite il marker in `.netlify/features/`.
- Nomi dei campi del modulo: `email`, `nome`, `sensore`, `piante`, `plus`, `consenso`, più `form-name` e l'honeypot `bot-field`. Rinominare un campo crea una nuova colonna nelle iscrizioni.
- FAQ con `<details>/<summary>`: fisarmonica accessibile da tastiera senza JavaScript.
- Analisi: nessun cookie né Google Analytics; c'è un commento nel `<head>` dove inserire Plausible/Umami.

## Regole sui contenuti (dal cliente)
Tono amichevole con il "tu". Non inventare recensioni, numeri di utenti, premi o loghi. Non usare marchi (Xiaomi solo come nome nella FAQ). L'app non è disponibile: niente pulsanti degli store, niente date di uscita.
