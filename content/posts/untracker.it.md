+++
title = "Untracker"
description = "Ho creato un'app da 0,99 $ che rimuove i parametri di tracciamento da ogni URL che copi. Ecco perché e come funziona."
date = 2026-03-31

[taxonomies]
categories = ["Software"]
tags = ["privacy", "ios", "macos", "swift", "app store"]

[extra]
toc = true
+++

Ogni volta che copi un link da Amazon, YouTube, Facebook o da qualsiasi altra
grande piattaforma, l'URL porta con sé un bagaglio invisibile: parametri di
tracciamento che ti identificano, registrano da dove provieni e ti seguono
attraverso il web. La pagina si carica in modo identico senza di essi. Esistono
esclusivamente per comunicare alla piattaforma che _proprio tu_ hai cliccato
_proprio quel link_ da _quella specifica fonte_.

Mi sono stufato, e ho creato [Untracker](https://untracker.app).

## Come è iniziato

Tutto è partito da una semplice domanda che mi frullava in testa: è possibile
rimuovere automaticamente i parametri di tracciamento dagli URL su iPadOS? La
risposta si è rivelata "più o meno, ma non in modo elegante" — le restrizioni di
Apple sugli appunti rendono impossibile un vero monitoraggio in background su
iOS. Si può fare tramite un'estensione del foglio di condivisione. E su macOS,
dove l'accesso agli appunti non è limitato, si può fare tutto: un'app nella
barra dei menu che pulisce silenziosamente ogni URL che copi.

Così ho creato entrambe le versioni. Un'unica app, acquisto universale: la
versione Mac monitora automaticamente gli appunti, quella per iPhone e iPad
funziona tramite un'estensione del foglio di condivisione. Copi un link, lo
condividi attraverso Untracker, fatto. L'URL pulito è negli appunti, pronto da
incollare.

## Cosa rimuove

Untracker utilizza il database della community
[ClearURLs](https://github.com/ClearURLs/Rules), che copre oltre 200 provider e
migliaia di singoli parametri di tracciamento. Ecco alcuni dei soliti noti:

- `fbclid` — l'ID di clic di Meta, collega il tuo clic al tuo profilo Facebook
  anche fuori dalla piattaforma
- `gclid` — l'ID di clic di Google, collega i clic sugli annunci al tuo account
  Google
- `utm_source`, `utm_medium`, `utm_campaign` — parametri di tracciamento delle
  campagne usati praticamente da tutti
- `ref`, `tag` — il tracciamento interno di Amazon per referral e affiliazioni
- `si` — l'ID di condivisione di Spotify e YouTube, collega chi condivide al
  destinatario
- `igshid` — il tracciamento di condivisione di Instagram
- `mc_eid` — l'ID email di Mailchimp, identifica il tuo indirizzo email
  attraverso le campagne
- `li_fat_id` — il tracciamento pubblicitario first-party di LinkedIn

Il database delle regole si aggiorna automaticamente, quindi i nuovi tracker
vengono coperti man mano che la community di ClearURLs li aggiunge.

## Risoluzione dei redirect

I parametri di tracciamento sono la parte visibile del problema. La parte
invisibile è il wrapping dei redirect: quando una piattaforma instrada il tuo
clic attraverso il proprio server prima di inoltrarti alla destinazione reale.

Facebook instrada i link in uscita attraverso `l.facebook.com/l.php?u=`.
X/Twitter accorcia tutto a `t.co`. Google instrada i clic attraverso `/url?q=`.
In ogni caso, la piattaforma registra il tuo clic prima che il redirect avvenga.

Untracker segue queste catene di redirect ed estrae l'URL di destinazione reale.
Risolve anche gli accorciatori di URL come `bit.ly` e `lnkd.in`.

## Prima e dopo

Ecco un esempio concreto. Cerchi delle cuffie su Amazon e copi il link:

```
https://www.amazon.com/dp/B09V3KXJPB?tag=foo-20&ref=pd_rd_r&pd_rd_w=3Kf8g&content-id=amzn1.sym.eb926b83&utm_source=newsletter&utm_medium=email&fbclid=IwAR3xQz7
```

Dopo Untracker:

```
https://www.amazon.com/dp/B09V3KXJPB
```

Stessa pagina prodotto. Nessuna sorveglianza.

## E la protezione integrata di Safari?

A partire da iOS 17, Safari include la Protezione Avanzata contro il
Tracciamento e il Fingerprinting (ATFP). È un passo nella giusta direzione, ma
ha limiti significativi:

- Funziona su una lista statica che copre una frazione di ciò che copre il
  database di ClearURLs.
- Non segue le catene di redirect né risolve gli accorciatori di URL.
- Pulisce gli URL solo durante la navigazione in Safari — non tocca gli URL che
  copi e condividi tramite Messaggi, WhatsApp, Slack, email o qualsiasi altra
  app.
- Fino a iOS 26, era attiva per impostazione predefinita solo nella Navigazione
  Privata.

Quest'ultimo punto è il più importante. La maggior parte dell'inquinamento da
tracciamento avviene quando _condividi_ un link, non quando ne _clicchi_ uno.
Quando incolli un URL tracciato in una chat di gruppo, tutti quelli che ci
cliccano portano con sé il tuo payload di tracciamento. I link puliti non sono
solo autoprotezione — sono una cortesia.

## Regole personalizzate

Oltre al database di ClearURLs, Untracker supporta regole di pulizia
personalizzate con pattern regex. Puoi definire le tue regole, importare ed
esportare set di regole in formato JSON, e le tue regole personalizzate vengono
sempre verificate per prime — la tua volontà prevale sul database predefinito.

Ho aggiunto questa funzione perché c'è sempre quel tool interno o quella
piattaforma di nicchia per cui nessun altro ha scritto una regola.

## Sincronizzazione iCloud

Le impostazioni e le regole personalizzate si sincronizzano su tutti i tuoi
dispositivi tramite iCloud utilizzando la risoluzione dei conflitti CRDT
(Conflict-free Replicated Data Type). Modifichi una regola personalizzata sul
Mac e appare sul tuo iPhone. Non serve alcun account oltre al tuo Apple ID.

## La questione privacy

Untracker non contiene analytics, telemetria né tracciamento. L'ironia sarebbe
stata eccessiva.

Tutto viene eseguito localmente sul tuo dispositivo. Gli URL non vengono mai
inviati da nessuna parte. L'etichetta privacy dell'App Store di Apple lo
conferma: **Dati non raccolti**.

## Il modello di business

0,99 $ una tantum. Acquisto universale — compralo su qualsiasi piattaforma Apple
e lo ottieni su tutte. Nessun abbonamento, nessun acquisto in-app, nessuna
pubblicità.

Ho considerato l'idea di renderlo gratuito, ma volevo un modello sostenibile che
non dipendesse dalla cattura dell'attenzione o dalla raccolta dati. Un dollaro
mi è sembrato giusto. È il prezzo di un caffè al distributore automatico, e
ottieni uno strumento che userai ogni giorno senza pensarci.

## Per iniziare

Untracker è disponibile sull'App Store per Mac, iPhone e iPad:

- [App Store](https://apps.apple.com/app/untracker/id6760624490)
- [Sito web](https://untracker.app)
- [Privacy Policy](https://untracker.app/privacy)

Su Mac, si posiziona nella barra dei menu e funziona automaticamente. Su iPhone
e iPad, aggiungilo al foglio di condivisione e sei a posto.

La vita è troppo breve per link Amazon da 300 caratteri.
