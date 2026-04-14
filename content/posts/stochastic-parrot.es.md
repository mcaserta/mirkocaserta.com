+++
title = "Loro estocástico"
description = "Una metáfora escéptica sobre lo que hacen los grandes modelos de lenguaje cuando parece que nos entienden — de dónde viene la expresión y por qué sigue escociendo."
date = 2026-04-15

[taxonomies]
categories = ["Palabra del día"]
tags = ["palabra del día", "lenguaje", "ia", "crítica"]

[extra]
toc = false
+++

Un **loro estocástico** (en inglés _stochastic parrot_) es una metáfora
escéptica sobre lo que hacen los grandes modelos de lenguaje cuando producen
texto fluido, plausible y aparentemente competente: cosen secuencias de tokens
estadísticamente probables, sacadas de sus datos de entrenamiento, sin ningún
anclaje en el mundo al que las palabras se refieren. Es una ducha fría
deliberada, dirigida a un campo que había empezado a hablar como si la fluidez y
la comprensión fueran la misma cosa.

La expresión fue acuñada en el artículo de 2021 _On the Dangers of Stochastic
Parrots: Can Language Models Be Too Big? 🦜_, firmado por Emily M. Bender,
Timnit Gebru, Angelina McMillan-Major y "Shmargaret Shmitchell" (un seudónimo
adoptado por Margaret Mitchell tras las presiones internas en Google). El paper
se hizo más famoso por sus consecuencias que por el argumento en sí — Gebru y
Mitchell fueron apartadas de Google poco después de que circulara internamente —
pero el argumento merece releerse por lo que realmente dice.

## El argumento

Desarmemos la expresión:

- **Estocástico**: muestreado al azar según una distribución de probabilidad. En
  cada paso el modelo tiene una distribución sobre los posibles tokens
  siguientes y extrae uno de ella.
- **Loro**: una criatura capaz de reproducir los sonidos del habla sin, en la
  lectura fuerte, necesariamente entenderlos.

Un loro estocástico es, por tanto, un sistema que genera lenguaje plausible
muestreando patrones de coocurrencia aprendidos, sin ningún modelo del
significado, la verdad o la intención detrás de lo que dice.

Las preocupaciones de las autoras iban mucho más allá del "¿realmente
entiende?". Incluían el coste ambiental de entrenar modelos cada vez más
grandes; la tendencia de los datos de entrenamiento a escala internet a
codificar y amplificar los sesgos de quienes tenían la plataforma para publicar
en cantidad; la opacidad de corpus tan enormes que no pueden ser auditados de
forma significativa; y el riesgo de confundir fluidez con fiabilidad en ámbitos
de alto impacto como la salud, el derecho o la contratación. El loro era solo
una imagen dentro de una advertencia más amplia.

## La vida después

Cinco años más tarde, "loro estocástico" se ha convertido en algo a medio camino
entre una abreviación técnica y un eslogan político. Para los escépticos es un
recordatorio: un tramo de prosa fluida del largo de un ensayo no es prueba de
razonamiento interno. Para los entusiastas se ha vuelto un espantapájaros fácil
de derribar señalando capacidades que la metáfora original nunca pretendió
excluir. Ambos bandos han aprendido a usar la expresión sin querer decir lo
mismo con ella.

La verdad, como suele pasar con las etiquetas que cuajan, está en algún lugar
incómodo en medio. Los modelos de frontera actuales hacen claramente más que
coser n-gramas, y la imagen del loro subestima su capacidad para componer,
abstraer y generalizar. Pero también, con igual claridad, confabulan con gran
fluidez, afirman con seguridad cosas que no tienen modo de saber y producen
frases bien formadas que simplemente no son verdaderas. Sea cual sea la palabra
con la que acabemos describiendo lo que están haciendo, _loro estocástico_ ha
hecho para siempre más difícil confundir la elocuencia con la comprensión — que
era exactamente el punto.
