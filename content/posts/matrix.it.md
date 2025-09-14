+++
title = "The Matrix Screensaver per Commodore 64"
date = 2021-05-11T12:19:00Z
description = "Un'implementazione di screensaver in stile Matrix per Commodore 64 scritta in assembly 6502, con modalità di visualizzazione multiple e controlli interattivi, ispirata al leggendario screensaver xmatrix."
[taxonomies]
categories = ['Software']
tags = ['c64', 'programmazione', 'sviluppo software']
+++

Sto cercando di imparare un po' di assembly 6502 e questo è il risultato di uno
dei miei primi esperimenti.

Una volta caricato, i seguenti comandi sono disponibili tramite la tastiera:

| tasto | uso                                       |
| ----- | ----------------------------------------- |
| `B`   | modalità visualizzazione binaria          |
| `X`   | modalità visualizzazione hex              |
| `R`   | modalità visualizzazione random (default) |
| `N`   | incrementa colore bordo                   |
| `M`   | incrementa colore sfondo                  |
| `Q`   | esci                                      |

Puoi dare un'occhiata al codice sorgente nel mio repository
[C64 Playground](https://github.com/mcaserta/c64-playground) su github e
scaricare l'[immagine D64](../../c64/the-matrix.d64) per il tuo divertimento con
l'emulazione.

Se esegui lo screensaver sul vero hardware e mi mandi un video, sei il mio eroe.

Parlando di eroi, questo aggeggio è stato ovviamente pesantemente ispirato dallo
screensaver [xmatrix](https://www.jwz.org/xscreensaver/) del leggendario
[Jamie Zawinski](https://www.jwz.org/).
