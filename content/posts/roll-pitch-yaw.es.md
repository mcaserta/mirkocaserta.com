+++
title = "Alabeo, cabeceo, guiñada"
description = "Los tres ejes de rotación de cualquier cuerpo rígido en movimiento — inclinar, asentir, girar — y por qué tres palabras náuticas acabaron gobernando medio mundo moderno."
date = 2026-01-30

[taxonomies]
categories = ["Palabra del día"]
tags = ["palabra del día", "física", "aviación", "robótica"]

[extra]
toc = false
+++

**Alabeo** (_roll_), **cabeceo** (_pitch_) y **guiñada** (_yaw_) son los tres
ejes de rotación de un cuerpo rígido en movimiento. Describen todas las formas
posibles en las que un avión, un barco, un dron, una nave espacial, una cámara o
tu propia cabeza pueden girar respecto a su centro de masas. La traslación
(moverse por el espacio) da tres grados de libertad — arriba/abajo,
derecha/izquierda, adelante/atrás — y el alabeo, el cabeceo y la guiñada dan los
otros tres, para un total de seis.

- **Alabeo** es la rotación alrededor del eje longitudinal (de proa a popa).
  Piensa en inclinar la cabeza hacia el hombro, o en un avión ladeándose en un
  viraje. Si eres un barco, el alabeo es de lo que está hecho el mareo.
- **Cabeceo** es la rotación alrededor del eje transversal (de un lado al otro).
  Asentir con la cabeza, un avión subiendo o picando, una patineta haciendo un
  _ollie_.
- **Guiñada** es la rotación alrededor del eje vertical. Negar con la cabeza, un
  coche girando en un cruce, un barco cambiando de rumbo sin inclinarse.

## De dónde vienen las palabras

El vocabulario viene de la ingeniería náutica y aeronáutica, donde nombrar con
precisión estos tres ejes era cuestión de supervivencia. Los términos _yaw_ y
_pitch_ aparecieron en la marinería mucho antes de que existieran los aviones —
el inglés antiguo _ġeagian_ y el medio inglés _yawen_ significaban "desviarse de
un rumbo recto", que es exactamente lo que hace un barco cuando una ola lo
golpea de costado. _Pitch_ recuerda el cabeceo de la proa subiendo y bajando
sobre el oleaje. _Roll_ se explica solo para cualquiera que haya intentado
dormir en un barco pequeño en mar abierto.

Los pioneros de la aviación tomaron las palabras tal cual, porque los problemas
eran análogos y las matemáticas se trasladaban directamente. Desde el punto de
vista de la dinámica rotacional, un avión es solo un submarino en un fluido más
fino.

## Dónde viven ahora

Hoy la tríada está en todas partes. Los controladores de vuelo de los
cuadricópteros ejecutan lazos PID independientes sobre cada uno de los tres
ejes. Los motores de videojuegos usan ángulos de Euler (normalmente en el orden
guiñada-cabeceo-alabeo) para orientar cámaras y personajes. Las IMU de los
teléfonos, los mandos de juego y los visores de RA miden las tres rotaciones
usando diminutos giroscopios MEMS. La robótica las usa para describir la
orientación del efector final en la punta de un brazo. Los directores de
fotografía las usan para describir lo que hace un _gimbal_.

El **bloqueo de cardán** (_gimbal lock_) — la pérdida de un grado de libertad
cuando dos de los ejes acaban alineados — es la patología famosa de esta
representación. Es la razón por la que los astronautas del Apolo 11 tuvieron que
preocuparse por un ángulo concreto, y la razón por la que los sistemas modernos
suelen usar cuaterniones por debajo. Pero alabeo, cabeceo y guiñada siguen
siendo las palabras que se dicen en voz alta, porque se mapean limpiamente sobre
la intuición física: inclinar, asentir, girar. Tres verbos que cubren todas las
rotaciones de todas las cosas rígidas del universo.
