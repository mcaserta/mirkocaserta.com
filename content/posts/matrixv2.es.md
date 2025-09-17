+++
title = "El Salvapantallas Matrix para Commodore 64, versión 2"
date = 2021-05-20T12:19:00Z
description = "Un salvapantallas estilo Matrix para el Commodore 64, escrito en C usando el toolkit cc65."
[taxonomies]
tags = ['c64', 'programación', 'desarrollo de software']
categories = ["Software"]
+++

Después de intentar implementar el algoritmo de
[lluvia digital](https://en.wikipedia.org/wiki/Matrix_digital_rain) en
ensamblador 6502 y [fallar miserablemente](@/posts/matrix.md), decidí probar el
toolkit [cc65](https://cc65.github.io/) y escribir código en C.

Una vez cargado, están disponibles los siguientes comandos a través del teclado:

| tecla | uso                                    |
| ----- | -------------------------------------- |
| `A`   | modo ámbar                             |
| `B`   | modo binario                           |
| `D`   | modo adn                               |
| `F`   | modo charset completo (predeterminado) |
| `G`   | modo verde (predeterminado)            |
| `H`   | modo hexadecimal                       |
| `L`   | modo lgbtq                             |
| `Q`   | salir                                  |

Puedes echar un vistazo al código fuente en mi repositorio
[C64 Playground](https://github.com/mcaserta/c64-playground) en github y
descargar la [imagen prg](../../c64/matrix.prg) para tu disfrute de emulación
retro.

Si ejecutas el salvapantallas en la máquina real y me envías un video, eres mi
héroe.

Hablando de héroes, esto obviamente estuvo fuertemente inspirado por el
salvapantallas [xmatrix](https://www.jwz.org/xscreensaver/) del legendario
[Jamie Zawinski](https://www.jwz.org/).

## Actualización 20210524

Aquí tienes un video del software ejecutándose en un C64 real, cortesía de
Jordan McGee.

<iframe width="560" height="315" src="https://www.youtube.com/embed/P01GWeBhYPc" title="Salvapantallas ejecutándose en un C64 real" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Actualización 20211029

Aquí tienes otro video del software ejecutándose en un C64 real, cortesía de mi
amigo Marco.

<iframe width="560" height="315" src="https://www.youtube.com/embed/O93npyzDnUU" title="Salvapantallas ejecutándose en un C64 real" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
