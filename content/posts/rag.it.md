+++
title = "RAG"
description = "Retrieval-Augmented Generation — come i modelli linguistici imparano a cercare i fatti fuori da sé stessi, e perché è importante che lo facciano."
date = 2026-04-16

[taxonomies]
categories = ["Parola del giorno"]
tags = ["parola del giorno", "ia", "architettura", "linguaggio"]

[extra]
toc = false
+++

**RAG**, acronimo di _Retrieval-Augmented Generation_ (generazione aumentata dal
recupero), è un pattern architetturale per la costruzione di applicazioni di IA
che combina un modello linguistico con una base di conoscenza esterna e
ricercabile. Invece di affidarsi esclusivamente ai fatti incorporati nei propri
parametri durante l'addestramento, un sistema RAG recupera documenti pertinenti
al momento della query e li fornisce al modello come contesto prima che generi
una risposta.

Il flusso di base è il seguente: l'utente invia una query; il sistema la
converte in un vettore numerico (_embedding_) che ne rappresenta il significato;
cerca nel database di documenti similarmente vettorializzati i vicini più
prossimi; antepone quei documenti al prompt; infine il modello linguistico
genera una risposta ancorata a ciò che ha appena letto. Il recupero avviene di
solito su un _vector store_ — un database ottimizzato per la ricerca di
similarità — anche se approcci ibridi che combinano ricerca per parole chiave e
ricerca semantica sono comuni.

## Perché esiste

I modelli linguistici hanno due limitazioni ostinate che RAG affronta in un
colpo solo.

La prima è il **knowledge cutoff** (limite temporale della conoscenza). Un
modello addestrato su dati raccolti fino a una certa data non sa nulla di ciò
che è accaduto dopo. Chiedergli dell'ultima conference call sugli utili, di uno
studio appena pubblicato o di una normativa cambiata questo trimestre produrrà o
un'ammissione di ignoranza o, più pericolosamente, una risposta falsa ma sicura
di sé. RAG sostituisce la memoria chiusa del modello con un archivio aperto e
aggiornabile.

La seconda è l'**allucinazione**. I modelli addestrati puramente a prevedere
continuazioni plausibili produrranno a volte continuazioni plausibili che sono
semplicemente false. Ancorare la generazione ai documenti recuperati dà al
modello qualcosa di reale a cui aggrapparsi — e, aspetto cruciale, dà all'utente
qualcosa da citare e verificare. Una risposta che si chiude con "Fonte: report
agli investitori Q1 2025, p. 14" è verificabile in un modo che la risposta di un
modello isolato non è.

## Quello che non risolve

RAG non è una cura. È un interruttore tra la tendenza del modello a confabulare
e il bisogno dell'utente di informazioni accurate — ma è efficace solo quanto lo
è il recupero.

Se il documento pertinente non è nell'archivio, il modello torna a indovinare.
Se i documenti recuperati sono obsoleti, contraddittori o mal suddivisi, il
modello ragionerà fedelmente su input difettosi e produrrà risposte errate con
una fiducia fuori luogo. La qualità di un sistema RAG dipende interamente dalla
pipeline di indicizzazione — come i documenti vengono suddivisi,
vettorializzati, classificati e filtrati prima di raggiungere il modello.

C'è anche un rischio più sottile: il passo di recupero può creare un falso senso
di ancoraggio. Una risposta che cita un documento non è necessariamente una
lettura corretta di quel documento. Il modello può ancora fraintendere,
attribuire erroneamente o estrarre selettivamente — ha semplicemente spostato
l'errore dalla confabulazione alla lettura errata, che è una modalità di
fallimento diversa ma altrettanto reale.

## Il quadro più ampio

RAG è diventato l'architettura dominante per la costruzione di applicazioni di
IA su conoscenza privata, specifica del dominio o frequentemente aggiornata. Bot
di assistenza clienti, assistenti per documenti interni, strumenti di ricerca
legale e sistemi di riferimento medico usano tutti qualche variante di questo
approccio. È la risposta pratica alla domanda che tutti fanno quando capiscono
per la prima volta cosa sono i modelli linguistici: "Ma come lo faccio
funzionare sui _miei_ dati?"

Il nome, coniato in un articolo del 2020 di Meta AI da Patrick Lewis e colleghi,
ha resistito perché descrive la funzione in modo limpido. _Prima recupera, poi
genera._ La parte ingegneristica interessante è nel recupero.
