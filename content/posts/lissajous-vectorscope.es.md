+++
title = "Lissajous / Vectorscopio"
description = "Las curvas hipnóticas que trazan dos sinusoides graficadas una contra otra — y por qué los ingenieros de mezcla las miran fijamente para mantener honesta la imagen estéreo."
date = 2026-03-05

[taxonomies]
categories = ["Palabra del día"]
tags = ["palabra del día", "audio", "procesamiento de señales", "osciloscopio"]

[extra]
toc = false
+++

Una **figura de Lissajous** es el patrón trazado en un osciloscopio — o en la
imaginación de un matemático — cuando dos señales sinusoidales perpendiculares
se grafican una contra otra, una impulsando el eje horizontal y la otra el
vertical. Llevan el nombre del físico francés del siglo XIX Jules Antoine
Lissajous, que las estudió por primera vez alrededor de 1857 usando espejos
pegados a diapasones en vibración. Son la firma visual de la relación entre dos
oscilaciones.

Cuando las dos señales tienen la misma frecuencia y la misma fase se obtiene una
línea diagonal. Si desplazas una 90° la línea se abre en un círculo. Diferentes
razones de frecuencia producen curvas cerradas en lóbulos, cuyo número queda
fijado por la razón entre las dos frecuencias. Si las frecuencias no están en
una razón racional, la curva nunca llega a cerrarse — precede lentamente,
dibujando una telaraña cada vez más densa que, con tiempo infinito, terminaría
por llenar toda la caja.

## El vectorscopio

En ingeniería de audio, un **vectorscopio** es un display de Lissajous con una
tarea muy concreta: muestra el canal izquierdo frente al canal derecho, rotado
45° de modo que una señal mono pura aparezca como una línea vertical. Esto
convierte el concepto abstracto de imagen estéreo en algo que puedes ver
directamente.

- **Señal mono-compatible** — traza cerca del eje vertical.
- **Estéreo amplio** — la energía se extiende horizontalmente alrededor del
  centro.
- **Señal fuera de fase** (la pesadilla del ingeniero de mezcla, porque
  desaparece al sumarse a mono) — traza a lo largo del eje horizontal.
- **Estéreo perfectamente correlado** — una fina línea vertical.
- **Ruido perfectamente no correlacionado** — una nube difusa que llena la caja.

Los ingenieros de mezcla usan el vectorscopio para detectar problemas de fase
que no pueden oír de forma fiable, para verificar que una pista sigue teniendo
sentido cuando se suma a mono en el altavoz de un móvil y para juzgar de un
vistazo el ancho estéreo. Los ingenieros de _broadcast_ lo usan para garantizar
que una señal sea segura para la emisión. Mucho antes de que existieran los
frecuencímetros digitales, los técnicos electrónicos usaban las figuras de
Lissajous para medir frecuencias desconocidas y diferencias de fase
comparándolas con una referencia.

Son también, por puro valor estético, una de las cosas más bellas que la física
dibuja por accidente. Dos péndulos oscilando en una razón irracional, un par de
diapasones, una mezcla estéreo de un violonchelo — todos dejan la misma familia
de huellas en el osciloscopio. Una vez aprendes a leerlas, ya no miras igual una
pantalla de fósforo verde.
