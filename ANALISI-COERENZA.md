# Coerenza tra landing e app WatchMeGrow

Analisi del 25 ottobre 2026. Confronto tra questa repository e `D:\Archivio\Robe\AppValerioTest`. Le conclusioni descrivono il codice locale esaminato, non una verifica del servizio in produzione.

La landing condivide già colori, font e simbolo con l'app. La discrepanza maggiore era nelle promesse: presentava un giardiniere autonomo con riconoscimento fotografico, piani adattivi e hardware compatibile, mentre l'app è una demo con raccolta delle piante, letture simulate e consigli IA su richiesta. Ho corretto i testi per distinguere ciò che esiste dalle proposte future, mantenendo ordine delle sezioni, modulo e architettura statica.

## Funzioni: cosa sostiene il codice

I percorsi della seconda colonna si riferiscono alla repository dell'app principale.

| Tema | Evidenza nell'app | Discrepanza iniziale e correzione |
| --- | --- | --- |
| Raccolta delle piante | `frontend/src/App.vue`, `backend/src/domain.js`, `backend/src/app.js`: inserimento manuale di nome, specie e posizione, elenco e rimozione. | Era quasi assente dalla presentazione. Ora è il primo passaggio descritto. |
| Letture e grafici | `backend/src/simulator.js`, `backend/src/plants.js`: dati simulati, ultimi 24 campioni restituiti; pulizia delle letture oltre 24 ore. | La landing prometteva dati reali e grafici di 7 giorni o uno storico completo. I testi sulla demo ora dichiarano la simulazione; lo storico esteso resta solo nella proposta dei piani. |
| Assistente IA | `frontend/src/components/PlantAdvisor.vue`, `backend/src/ai.js`: domanda testuale sulla singola pianta; invio di specie, posizione, lettura e ultimi 8 campioni al modello configurato. | «Più passa il tempo, più conosce la tua pianta» suggeriva apprendimento persistente. Il contesto delle letture recenti non è memoria delle conversazioni. Ora si parla di consigli su richiesta. |
| Dose e momento dell'acqua | `backend/src/ai.js`: il prompt vieta dosaggi inventati e annaffiature basate sui numeri simulati. | «Annaffia tra 2 giorni · 250 ml» contraddiceva il comportamento dell'app. Rimosso dall'anteprima, insieme alla promessa di ricontatto dopo tre giorni. |
| Avvisi | `backend/src/notifications.js`, `frontend/src/components/SettingsPanel.vue`: soglie di umidità configurabili, controllo periodico e canali da configurare. | Gli avvisi esistono, ma non sono un calendario per acqua, concime e rinvaso e non vengono decisi dall'IA. Questa distinzione è ora esplicita. |
| Foto e riconoscimento | Il flusso piante è manuale; il flusso IA esaminato invia testo, non immagini. | Riconoscimento e controlli fotografici sono presentati come sviluppi ipotizzati. Le foto degli account amministrati non costituiscono riconoscimento delle piante. |
| Meteo | Nessuna integrazione meteo nei flussi frontend/backend esaminati. | Rimosso dai benefici già disponibili; resta tra le funzioni in progetto. |
| Luce dalla fotocamera | L'app mostra `light_lux` generato dal simulatore; non una misurazione tramite fotocamera. | Distinte le letture simulate dall'idea futura, ancora da verificare, di valutare la luce con il telefono. |
| Sensori Bluetooth | `README.md` dichiara che non è collegato hardware fisico; l'ID del sensore è un dato associato alla pianta. | Un ID sensore non dimostra una connessione Bluetooth. Rimossa la compatibilità dichiarata con un modello specifico e le promesse di precisione. |
| Mobile e push | `frontend/src/push.js`, `docs/integrations.md`: bridge Capacitor e invio FCM predisposti; nel browser il push è disattivato. Servono progetto nativo e configurazione. | «In arrivo per iPhone e Android» non era comprovato da app native pronte. Ora il mobile è indicato nelle FAQ come possibilità in valutazione. |
| Gratuito e Plus | Nei flussi esaminati non ci sono abbonamenti, pagamenti o quote commerciali mensili. | Conservata la proposta già contenuta nella landing, con un'avvertenza prima della tabella e una domanda di interesse formulata al condizionale. I prezzi non sono stati dedotti dal codice né confermati. |
| Condivisione della casa e inviti | Gli account hanno dati separati; il pannello admin non è una casa condivisa. Non emerge un sistema di referral nei flussi esaminati. | Sono ipotesi nella tabella, non capacità della demo. |

La presenza di un endpoint o di un'integrazione configurabile non dimostra che sia attiva nel deployment. Le assenze riportate derivano dalla lettura dei flussi e dalle ricerche nel codice, non da prove su tutti i possibili ambienti.

## Identità visiva

| Elemento | Prima | Esito |
| --- | --- | --- |
| Palette | Bosco `#244F3D`, muschio `#A6BE85`, carta `#F7F8F4`, come in `frontend/src/style.css`. | Coerente; conservata. |
| Font | Manrope su entrambe, ma Google Fonts sulla landing e file locale nell'app. | Copiati font e licenza OFL dall'app; tutte e tre le pagine caricano il font locale. |
| Logo | Simbolo condiviso, nome ricomposto con testo HTML e parola «Grow» di colore diverso. L'app usa il wordmark “Quiet growth”. | Copiato il wordmark effettivamente servito dall'app e la sua variante bianca dal kit del brand; applicati a header e footer di tutte le pagine. |
| Header | Fondo crema giallastro, trasparenza e sfocatura rispetto al fondo carta dell'app. | Fondo carta pieno, senza sfocatura. |
| Anteprima | Telefono disegnato con meteo, stato di salute, dose d'acqua e conversazione con ricontatto. | Sempre uno schema illustrativo, ora dichiarato anche visivamente e nel testo accessibile; contenuti compatibili con la demo e risposta IA marcata come esempio. Non è uno screenshot autentico. |
| Componenti | Molte card arrotondate, icone, ombre e badge; l'app ha una struttura da dashboard con navigazione e pannello di dettaglio. | Somiglianza cromatica, ma continuità di composizione parziale. La revisione del layout è documentata sotto, senza ricostruire la pagina. |

Non serve trasformare una landing in una dashboard. Serve però che il frammento di prodotto mostrato sia riconoscibile e che non suggerisca capacità assenti.

## Revisione grafica con design-taste-frontend

Eseguiti l'inspector in browser a 1440, 768 e 390 px e il lint statico. Gli screenshot iniziali sono in `.taste-skill/before/`; quelli successivi alle correzioni in `.taste-skill/after/`. I report JSON conservano misure e segnalazioni. Non è stata estratta una nuova direzione grafica: si tratta di una revisione del sito esistente, con palette e identità già definite.

L'inspector iniziale restituisce **13 categorie FAIL e 5 WARN**. Sono categorie di regole della skill, non 13 bug funzionali. Il lint iniziale restituisce **40 occorrenze FAIL e 7 WARN**: ha unità di conteggio diverse e non va sommato all'inspector.

I tre interventi di layout con maggiore effetto sarebbero:

1. **Accorciare l'hero e mostrare prima il prodotto.** La pagina iniziale misura circa 12,3 schermate desktop; l'hero occupa 520vh. L'inspector rileva quattro schermate con bassa occupazione. Nei fogli `before/desktop-page-01.jpg` e `before/mobile-page-01.jpg` si vede il lungo passaggio in cui il titolo scompare e restano simbolo e telefono. La W che diventa pianta è un'idea legata al brand da conservare, con una durata minore.
2. **Mostrare un frammento autentico dell'app a una scala leggibile.** L'anteprima originale contiene 13 blocchi di testo sotto 13 px secondo l'inspector, ulteriormente ridotti dalle trasformazioni del telefono. Sostituire lo schema con una cattura della raccolta e del dettaglio pianta; indicare sempre la simulazione dei valori. Per una cattura reale occorre una sessione autorizzata dell'app, non un'immagine del kit presentata come schermata corrente.
3. **Ridurre ripetizione e attrito mobile.** Le sezioni “come funziona” e “funzionalità” ripetono card con icona e lo stesso peso visivo. La tabella ha un'unica riga orizzontale da scorrere a 768 e 390 px, tagliando la visione del confronto (`before/tablet-page-02.jpg`, `before/mobile-page-02.jpg`). Preferire passaggi in elenco e un riepilogo più breve dei piani proposti, leggibile senza scorrimento laterale.

Altri rilievi della skill: etichette sopra i titoli, piccoli testi maiuscoli, gradienti decorativi, ombre sugli elementi fermi, bordi sottili e numerosi formati tipografici. Sono criteri di direzione grafica, non violazioni automatiche dell'accessibilità. Il numero minimo di fotografie e l'assenza di video hanno meno priorità qui rispetto a una rappresentazione autentica dell'interfaccia; non ho aggiunto immagini di repertorio per soddisfare il conteggio.

L'inspector segnala inoltre testo coperto durante lo scroll e margini ottici diversi. Nel primo caso `hero.js` nasconde intenzionalmente il titolo durante la transizione: la segnalazione automatica da sola non prova una collisione. Nel secondo caso `.wrap` è centrato; il rilievo richiede una verifica della massa visiva e non giustifica uno spostamento arbitrario del contenitore.

### Critica visiva iniziale

```text
ROUND 1
Seen in one second: titolo centrato e grande simbolo W.
Idea (one sentence): la W del brand diventa la radice di una pianta durante lo scroll.
Live thing: modulo lista d'attesa con domande sul prodotto; nessuna demo interattiva.
Layout words by section: hero=pinned / problema=split / passi=card / sensori=confronto / funzioni=card / piani=tabella / iscrizione=form / FAQ=accordion / footer=colonne.
Scores: design 5.5 · usability 6 · creativity 6 · content 4 → overall 5.6
Caps applied: contenuti segnaposto, decorazioni vietate dalla skill, assenza di fotografie, lunghi tratti a bassa densità.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. desktop-page-01.jpg: prodotto mostrato tardi; ridurre la durata dell'hero.
2. mobile-page-01.jpg: schema minuscolo e promesse non dimostrate; mostrare un frammento reale e leggibile.
3. mobile-page-02.jpg: confronto piani tagliato lateralmente; semplificare e adattare il contenuto.
```

I punteggi sono giudizi editoriali secondo la griglia della skill, non misure automatiche di qualità o conversione. Questa analisi non equivale a un redesign completato o alla certificazione di conformità alla skill.

### Risultato dopo le correzioni

| Controllo | Prima | Dopo |
| --- | --- | --- |
| Inspector in browser | 13 categorie FAIL, 5 WARN | 11 categorie FAIL, 6 WARN |
| Lint statico sugli stessi 7 file | 40 occorrenze FAIL, 7 WARN | 30 occorrenze FAIL, 5 WARN |
| Titolo hero, a tutte le larghezze | 2 righe | 2 righe |
| Testi sotto 13 px rilevati nell'anteprima, desktop | 13 | 6 |
| Formati tipografici rilevati, desktop | 14 | 11 |
| Schermate desktop a bassa occupazione rilevate | 4 | 5 |

I valori dipendono anche dal campionamento dell'animazione. Il numero di segnalazioni non è una misura della conversione; i nuovi testi non risolvono il ritmo dell'hero, e il rilievo sulla bassa occupazione peggiora. Tutti i 10 screenshot finali elencati dall'inspector sono stati aperti e osservati.

```text
ROUND 2
Seen in one second: titolo sul controllo delle piante e wordmark originale.
Idea (one sentence): la W che diventa pianta conserva il legame con il brand.
Live thing: modulo lista d'attesa, con domanda su Plus formulata come ipotesi.
Layout words by section: hero=pinned / problema=split / passi=card / sensori=confronto / funzioni=card / piani=tabella / iscrizione=form / FAQ=accordion / footer=colonne.
Scores: design 6 · usability 6 · creativity 6 · content 5 → overall 5.9
Caps applied: restano segnaposto e link social incompleti, ornamenti, assenza di fotografie e lunghi tratti poco densi.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. after/desktop-page-01.jpg: il lungo tratto con la sola W resta; accorciare l'hero.
2. after/mobile-page-01.jpg: il telefono è ancora poco leggibile; sostituirlo con un frammento autentico più grande.
3. after/mobile-page-02.jpg: tabella ancora tagliata e dettagliata; ridurre il confronto commerciale su telefono.
```

Non sono state cercate o aggiunte fotografie, clip o immagini generate. Gli SVG esistenti restano illustrazioni, il telefono resta uno schema e i nuovi wordmark provengono dal kit locale del brand. Nessun credito fotografico esterno da aggiungere.

## Testi corretti con no-ai-slop-it

Preservati il “tu”, il tono amichevole e «pollice nero». Tolte le promesse non sostenute e le frasi che sostituivano una spiegazione concreta con una formula pubblicitaria.

| Prima | Dopo / intervento | Motivo |
| --- | --- | --- |
| «Il giardiniere che conosce la tua pianta» | «Le tue piante, sotto controllo», seguito dalla spiegazione dell'app in sviluppo. | La conoscenza persistente non è dimostrata dal flusso IA. |
| «Tre passi, zero stress» | «Da dove parte l'app». | Formula generica sostituita da un'introduzione al funzionamento attuale. |
| «Il giardiniere ti segue e impara» | «Chiedi all'assistente». | Verbo e azione corrispondono a ciò che fa l'utente. |
| «Tutto quello che serve alle tue piante» | «Le funzioni in progetto». | Rimossa una promessa totale, chiarito lo stato. |
| «Funziona benissimo anche senza» | Descrizione delle azioni disponibili senza sensore e del limite dei dati simulati. | Enfasi sostituita con informazioni verificabili. |
| «Le tue piante sono in buone mani: le tue» | «Ti scriveremo quando potrai provare WatchMeGrow». | Eliminato il finale a effetto nella pagina di ringraziamento. |
| «Più siamo, più presto le piante di tutti staranno meglio» | Invito a mandare la pagina a una persona interessata. | Eliminato un beneficio causale non dimostrabile. |

**Cosa è cambiato:** hero, metadati SEO/social, messaggi dello schema, descrizione del funzionamento, sensori, funzioni future, presentazione dei piani, modulo, FAQ, footer e testi di ringraziamento/condivisione. I testi completi aggiornati sono direttamente in `index.html`, `grazie.html` e, per il footer condiviso, `privacy.html`.

Controlli di `no-ai-slop-it/eval.md`: significato e tono preservati; frasi personali utili conservate; tagli proporzionati; verbi diretti; promesse confrontate con il codice; niente nuove statistiche, recensioni o scadenze; rimossi enfasi gratuita, finali a effetto e spiegazioni generiche. La tabella commerciale preesistente è conservata come ipotesi, non validata come decisione di prodotto. La sostanza giuridica dell'informativa non è stata riscritta.

## Cosa resta da risolvere

- **Prima di pubblicare:** completare email, contatti del titolare e destinazioni social. Sono ancora presenti `[EMAIL]`, `[NOME E CONTATTI]`, `[INSTAGRAM]` e `[TIKTOK]`. I collegamenti social non sono quindi funzionanti; anche la frase sui contenuti pubblicati sui social va confermata o rimossa.
- **Decisione di prodotto:** confermare o ridurre roadmap e proposta commerciale. La presenza di prezzi e limiti nella landing originale non prova che siano stati approvati. Anche con le nuove avvertenze, la tabella è molto dettagliata rispetto alla demo.
- **Netlify:** l'azione `/grazie`, il nome del modulo e i campi restano corretti e invariati. Il marker `.netlify/features/` citato nelle istruzioni del progetto non è presente in questo checkout: l'attivazione effettiva di Forms e la consegna delle iscrizioni vanno verificate sul sito Netlify.
- **Privacy:** completare e far verificare il testo già contrassegnato come bozza. Questa è una revisione editoriale e di coerenza, non una verifica legale né un confronto tra informative della landing e dell'app autenticata.
- **Grafica:** applicare gli interventi di layout elencati sopra e acquisire screenshot autentici dell'app. La pagina conserva problemi grafici segnalati dall'inspector.
- **Anteprima social:** manca l'immagine Open Graph, come già indicato nel TODO.

## Verifiche

Controllati in browser `index.html`, `/grazie` e `/privacy` a 1440, 768 e 390 px: nessuna espansione orizzontale del documento, immagini e font locali caricati, un solo `h1` per pagina e nessuna eccezione JavaScript rilevata. La tabella ha uno scorrimento interno: il controllo sul documento non significa che il confronto sia comodo da leggere su mobile.

Verificati vincoli email/consenso del modulo senza invio, apertura delle FAQ, destinazione del pulsante di iscrizione e fallback di condivisione senza Web Share/clipboard. Verificata la disattivazione delle animazioni con movimento ridotto e la visibilità dell'hero senza JavaScript. Conservati `action="/grazie"`, `form-name="lista-attesa"`, honeypot e nomi dei campi. Nessuna dipendenza, build o modifica nell'app principale.

Non eseguiti invii reali a Netlify, login o test dei provider IA, Telegram, FCM e hardware dell'app. Nessun deploy o push.
