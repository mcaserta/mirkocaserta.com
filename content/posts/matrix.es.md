+++
title = "The Matrix Screensaver para Commodore 64"
date = 2021-05-11T12:19:00Z
description = "Una implementación de screensaver estilo Matrix para Commodore 64 escrita en assembly 6502, con múltiples modos de visualización y controles interactivos, inspirada en el legendario screensaver xmatrix."
[taxonomies]
categories = ['Software']
tags = ['c64', 'programación', 'desarrollo de software']
+++

Estoy tratando de aprender algo de assembly 6502 y este es el resultado de uno
de mis primeros experimentos.

Una vez cargado, los siguientes comandos están disponibles a través del teclado:

| tecla | uso                                    |
| ----- | -------------------------------------- |
| `B`   | modo de visualización binaria          |
| `X`   | modo de visualización hex              |
| `R`   | modo de visualización random (default) |
| `N`   | incrementa color del borde             |
| `M`   | incrementa color de fondo              |
| `Q`   | salir                                  |

Puedes echar un vistazo al código fuente en mi repositorio
[C64 Playground](https://github.com/mcaserta/c64-playground) en github y
descargar la [imagen D64](../../c64/the-matrix.d64) para tu diversión con
emulación retro.

Si ejecutas el screensaver en el hardware real y me envías un video, eres mi
héroe.

Hablando de héroes, esto obviamente fue fuertemente inspirado por el screensaver
[xmatrix](https://www.jwz.org/xscreensaver/) del legendario
[Jamie Zawinski](https://www.jwz.org/).
