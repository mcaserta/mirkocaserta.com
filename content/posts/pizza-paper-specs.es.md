+++
title = "Especificaciones en el Papel de la Pizza"
description = "Sobre el papel a cuadros bajo la pizza, los bocetos trazados entre una Margarita y una Diavola, y el anillo de grasa que cayó justo sobre la política de reintentos."
date = 2026-04-20

[taxonomies]
categories = ["Software Development"]
tags = ["specs", "documentation", "communication", "engineering", "humour"]

[extra]
toc = false
+++

Roma, un jueves. Cuatro ingenieros en una pizzería del lado equivocado de
Trastevere, de esas con manteles de papel a cuadros rojos y blancos y un
camarero con opiniones firmes sobre qué horno produce el cornicione como es
debido. Han llegado dos pizzas — una Margarita y una Diavola — y entre ambas,
sobre la franja de papel descubierta, se desarrolla una discusión acerca de una
cola.

At-least-once o exactly-once. Alguien destapa un bolígrafo. Aparece un
rectángulo para el productor. Dos más para los consumidores. Una forma que es
quizá un broker y quizá un riñón. Una flecha vuelve sobre sí misma hacia una
dead-letter queue dibujada, con cierto garbo, con la silueta de un champiñón. La
política de reintentos se escribe al margen con una caligrafía que ya está una
copa de Frascati más allá del umbral de lo legible. Un anillo de grasa cae justo
sobre la política de reintentos. Nadie se da cuenta. Llega el tiramisú. El papel
se dobla, se guarda en el bolsillo y es, en este preciso instante, la
representación más precisa del comportamiento previsto del sistema que jamás se
producirá.

Esto es una **especificación en el papel de la pizza**, y todo ingeniero, tarde
o temprano, ha producido una.

## Por qué el papel de la pizza gana

Cuatro personas. Un bolígrafo. Una pizza. Cero páginas de Confluence. Las
decisiones se toman con contexto pleno y presencia plena, en una sala donde
todos miran el mismo objeto, y el objeto es lo bastante pequeño como para caber
entre dos platos. No hay scroll. No hay ciclo de revisores. No hay _mejor lo
llevamos a asíncrono_. El desacuerdo se resuelve porque el desacuerdo tiene que
resolverse antes de que la pizza se enfríe.

Un PRD de cuarenta páginas no puede hacer esto. Un PRD de cuarenta páginas es un
documento producido por personas que ya han dejado de hablarse. El papel de la
pizza es el artefacto contrario: es el residuo de una conversación que ocurrió
de verdad. La grasa es la prueba de vida.

## Por qué el papel de la pizza pierde

Es jueves. Para el lunes, el papel está en una papelera de Trastevere. La
política de reintentos bajo el anillo de grasa está ahora en producción bajo la
forma de lo que el desarrollador recordó en el tren de vuelta, que, a fin de
cuentas, no era del todo lo que se había dibujado. El champiñón dead-letter se
ha convertido en tres champiñones dead-letter distintos en tres servicios
distintos, cada uno con su propia teoría de la idempotencia.

La junior que entró en marzo cita "el papel de la pizza" en las revisiones de
código como si fuera Escritura. Nadie ha visto nunca el papel de la pizza. Nadie
lo verá jamás. El papel de la pizza es ya un artefacto cultural portante cuyo
contenido es reconstruido, de manera ligeramente distinta, por cada persona que
lo invoca.

## La especificación de Schrödinger

Una especificación en el papel de la pizza es simultáneamente el mejor y el peor
documento que tu equipo ha producido nunca, y el estado colapsa en el instante
exacto en que alguien, seis meses después, pregunta: _perdona, pero sobre la
idempotencia, ¿qué habíamos decidido exactamente?_

El oficio no es "escríbelo siempre" y no es "confía en el papel de la pizza". Es
saber en qué momento te encuentras. Kickoff, descubrimiento, un desacuerdo
arquitectónico entre personas que ya confían las unas en las otras — el papel de
la pizza es perfecto, y cualquier instrumento más pesado habría matado la
conversación antes de que empezara. Pero un sistema de registro, un artefacto de
onboarding, cualquier cosa que un desconocido futuro vaya a tener que leer —
fotografía el papel antes de que llegue el tiramisú, y pásalo a limpio antes de
irte a dormir.

La grasa es una característica de la decisión. No debería convertirse en una
característica de la documentación.
