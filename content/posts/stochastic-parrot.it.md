+++
title = "Pappagallo stocastico"
description = "Una metafora scettica su ciò che fanno i grandi modelli linguistici quando sembrano capirci — da dove viene l'espressione e perché punge ancora."
date = 2026-04-15

[taxonomies]
categories = ["Parola del giorno"]
tags = ["parola del giorno", "linguaggio", "ia", "critica"]

[extra]
toc = false
+++

Un **pappagallo stocastico** (in inglese _stochastic parrot_) è una metafora
scettica su ciò che fanno i grandi modelli linguistici quando producono testo
fluente, plausibile e apparentemente competente: cuciono insieme sequenze di
token statisticamente probabili, estratte dai dati di addestramento, senza alcun
ancoraggio al mondo a cui le parole si riferiscono. È una doccia fredda
deliberata, rivolta a un settore che aveva cominciato a parlare come se la
fluenza coincidesse con la comprensione.

L'espressione è stata coniata nel 2021, nell'articolo _On the Dangers of
Stochastic Parrots: Can Language Models Be Too Big? 🦜_, firmato da Emily M.
Bender, Timnit Gebru, Angelina McMillan-Major e "Shmargaret Shmitchell" (uno
pseudonimo adottato da Margaret Mitchell dopo le pressioni interne in Google).
Il paper è diventato più famoso per le sue conseguenze che per l'argomento vero
e proprio — Gebru e Mitchell sono state entrambe allontanate da Google poco dopo
la sua circolazione interna — ma l'argomento merita di essere riletto per quello
che dice davvero.

## L'argomento

Scomponiamo l'espressione:

- **Stocastico**: campionato in modo casuale secondo una distribuzione di
  probabilità. A ogni passo il modello ha una distribuzione sui possibili token
  successivi e ne estrae uno.
- **Pappagallo**: un essere capace di riprodurre i suoni del parlato senza,
  nella lettura forte, necessariamente comprenderli.

Un pappagallo stocastico è quindi un sistema che genera linguaggio plausibile
campionando da pattern di co-occorrenza appresi, senza alcun modello del
significato, della verità o dell'intenzione dietro a ciò che dice.

Le preoccupazioni delle autrici andavano ben oltre il "capisce davvero?".
Includevano il costo ambientale dell'addestramento di modelli sempre più grandi;
la tendenza dei dati di addestramento su scala internet a codificare e
amplificare i pregiudizi di chi aveva la piattaforma per pubblicare in quantità;
l'opacità di corpora così vasti da non poter essere sottoposti a una revisione
seria; e il rischio di scambiare la fluenza per affidabilità in ambiti ad alto
rischio come salute, diritto e selezione del personale. Il pappagallo era solo
un'immagine dentro un avvertimento più ampio.

## Il seguito

Cinque anni dopo, "pappagallo stocastico" è diventato qualcosa a metà fra una
scorciatoia tecnica e uno slogan politico. Per gli scettici è un promemoria:
un'intera pagina di prosa fluente non è prova di ragionamento interno. Per gli
entusiasti è diventato un uomo di paglia comodo da abbattere indicando capacità
che la metafora originale non pretendeva affatto di escludere. I due
schieramenti hanno imparato a usare l'espressione senza intenderla allo stesso
modo.

La verità, come spesso accade con le etichette che attecchiscono, sta da qualche
parte scomoda nel mezzo. I modelli di frontiera di oggi fanno chiaramente più
che cucire n-grammi, e l'immagine del pappagallo sottovaluta la loro capacità di
comporre, astrarre e generalizzare. Ma, altrettanto chiaramente, confabulano con
grande fluenza, affermano con sicurezza cose che non hanno modo di sapere e
producono frasi ben formate che sono semplicemente false. Qualunque parola
finiremo per scegliere per ciò che stanno facendo, _pappagallo stocastico_ ha
reso per sempre più difficile confondere l'eloquenza con la comprensione — che
era esattamente il punto.
