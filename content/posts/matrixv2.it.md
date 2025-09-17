+++
title = "Lo Screensaver Matrix per Commodore 64, versione 2"
date = 2021-05-20T12:19:00Z
description = "Uno screensaver in stile Matrix per il Commodore 64, scritto in C utilizzando il toolkit cc65."
[taxonomies]
tags = ["c64", "programmazione", "sviluppo del software"]
categories = ["Software"]
+++

Dopo aver tentato di implementare l'algoritmo della
[pioggia digitale](https://en.wikipedia.org/wiki/Matrix_digital_rain) in
assembly 6502 e [fallendo miseramente](@/posts/matrix.it.md), ho deciso di
provare il toolkit [cc65](https://cc65.github.io/) e scrivere del codice C.

Una volta caricato, sono disponibili i seguenti comandi tramite tastiera:

| tasto | utilizzo                                |
| ----- | --------------------------------------- |
| `A`   | modalità ambra                          |
| `B`   | modalità binaria                        |
| `D`   | modalità dna                            |
| `F`   | modalità charset completo (predefinita) |
| `G`   | modalità verde (predefinita)            |
| `H`   | modalità esadecimale                    |
| `L`   | modalità lgbtq                          |
| `Q`   | esci                                    |

Puoi dare un'occhiata al codice sorgente nel mio repository
[C64 Playground](https://github.com/mcaserta/c64-playground) su github e
scaricare l'[immagine prg](../../c64/matrix.prg) per il tuo divertimento con
l'emulazione retro.

Se fai girare lo screensaver sulla macchina vera e mi mandi un video, sei il mio
eroe.

A proposito di eroi, questo è stato ovviamente pesantemente ispirato dallo
screensaver [xmatrix](https://www.jwz.org/xscreensaver/) del leggendario
[Jamie Zawinski](https://www.jwz.org/).

## Aggiornamento 20210524

Ecco un video del software in esecuzione su un vero C64, cortesemente inviatomi
da Jordan McGee.

<iframe width="560" height="315" src="https://www.youtube.com/embed/P01GWeBhYPc" title="Screensaver in esecuzione su un vero C64" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Aggiornamento 20211029

Ecco un altro video del software in esecuzione su un vero C64, cortesemente
inviatomi dal mio amico Marco.

<iframe width="560" height="315" src="https://www.youtube.com/embed/O93npyzDnUU" title="Screensaver in esecuzione su un vero C64" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
