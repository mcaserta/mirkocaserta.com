+++
title = "Specifiche sulla Carta della Pizza"
description = "Sulla carta a quadretti sotto la pizza, gli schizzi tracciati tra una Margherita e una Diavola, e l'anello di unto caduto esattamente sulla retry policy."
date = 2026-04-20

[taxonomies]
categories = ["Software Development"]
tags = ["specs", "documentation", "communication", "engineering", "humour"]

[extra]
toc = false
+++

Roma, un giovedì. Quattro ingegneri in una pizzeria dal lato sbagliato di
Trastevere, di quelle con le tovagliette di carta a quadri bianchi e rossi e il
cameriere che ha opinioni piuttosto ferme su quale forno produca il cornicione
come si deve. Sono arrivate due pizze — una Margherita e una Diavola — e tra
l'una e l'altra, sulla striscia di carta scoperta, è in corso una discussione su
una coda.

At-least-once o exactly-once. Qualcuno stappa una biro. Compare un rettangolo
per il producer. Due per i consumer. Una forma che è forse un broker e forse un
rene. Una freccia rientra in una dead-letter queue disegnata, con grazia, nella
sagoma di un fungo. La retry policy viene scritta nel margine con una grafia che
è un bicchiere di Frascati oltre la soglia della leggibilità. Un anello di unto
cade esattamente sulla retry policy. Nessuno se ne accorge. Arriva il tiramisù.
La carta viene piegata, infilata in tasca, ed è, in questo preciso istante, la
rappresentazione più accurata del comportamento previsto del sistema che sarà
mai prodotta.

Questa è una **specifica sulla carta della pizza**, e ogni ingegnere, prima o
poi, ne ha prodotta una.

## Perché la carta della pizza vince

Quattro persone. Una penna. Una pizza. Zero pagine di Confluence. Le decisioni
avvengono con contesto pieno e presenza piena, in una stanza dove tutti guardano
lo stesso oggetto, e l'oggetto è abbastanza piccolo da stare tra due piatti. Non
c'è scroll. Non c'è il ciclo dei reviewer. Non c'è il _facciamolo in asincrono_.
Il disaccordo si risolve perché il disaccordo deve risolversi prima che la pizza
si raffreddi.

Un PRD di quaranta pagine non può fare questo. Un PRD di quaranta pagine è un
documento prodotto da persone che hanno già smesso di parlarsi. La carta della
pizza è l'artefatto opposto: è il residuo di una conversazione che è davvero
accaduta. L'unto è la prova di vita.

## Perché la carta della pizza perde

È giovedì. Entro lunedì, la carta è in un cestino di Trastevere. La retry policy
sotto l'anello di unto è ora in produzione sotto forma di qualunque cosa lo
sviluppatore si sia ricordato sul treno di ritorno, che, a conti fatti, non era
esattamente ciò che era stato disegnato. Il fungo dead-letter è diventato tre
funghi dead-letter diversi in tre servizi diversi, ciascuno con la propria
teoria sull'idempotenza.

La junior entrata a marzo cita "la carta della pizza" nelle code review come
fosse Scrittura. Nessuno ha mai visto la carta della pizza. Nessuno la vedrà
mai. La carta della pizza è ormai un artefatto culturale portante, i cui
contenuti vengono ricostruiti, in modo leggermente diverso, da ciascuna persona
che la invoca.

## La specifica di Schrödinger

Una specifica sulla carta della pizza è contemporaneamente il miglior documento
e il peggior documento che il tuo team abbia mai prodotto, e lo stato collassa
nel momento esatto in cui qualcuno, sei mesi dopo, chiede: _scusa, ma
sull'idempotenza cos'è che avevamo deciso?_

L'arte non è "mettilo sempre per iscritto" e non è "fidati della carta della
pizza". È sapere in quale momento ti trovi. Kickoff, discovery, un disaccordo
architetturale tra persone che già si fidano l'una dell'altra — la carta della
pizza è perfetta, e qualsiasi strumento più pesante avrebbe ucciso la
conversazione prima ancora che cominciasse. Ma un sistema di record, un
artefatto di onboarding, qualsiasi cosa uno sconosciuto in futuro dovrà leggere
— fotografa la carta prima che arrivi il tiramisù, e trascrivila prima di
addormentarti.

L'unto è una caratteristica della decisione. Non deve diventare una
caratteristica della documentazione.
