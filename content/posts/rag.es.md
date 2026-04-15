+++
title = "RAG"
description = "Retrieval-Augmented Generation — cómo los modelos de lenguaje aprenden a buscar hechos fuera de sí mismos, y por qué importa que lo hagan."
date = 2026-04-16

[taxonomies]
categories = ["Palabra del día"]
tags = ["palabra del día", "ia", "arquitectura", "lenguaje"]

[extra]
toc = false
+++

**RAG**, acrónimo de _Retrieval-Augmented Generation_ (generación aumentada por
recuperación), es un patrón arquitectónico para construir aplicaciones de IA que
combina un modelo de lenguaje con una base de conocimiento externa y
consultable. En lugar de depender exclusivamente de los hechos incorporados en
sus parámetros durante el entrenamiento, un sistema RAG recupera documentos
relevantes en el momento de la consulta y los entrega al modelo como contexto
antes de que genere una respuesta.

El flujo básico es el siguiente: el usuario envía una consulta; el sistema la
convierte en un vector numérico (_embedding_) que representa su significado;
busca en una base de datos de documentos igualmente vectorizados los vecinos más
cercanos; antepone esos documentos al prompt; y finalmente el modelo de lenguaje
genera una respuesta anclada en lo que acaba de leer. El paso de recuperación se
realiza habitualmente sobre un _vector store_ — una base de datos optimizada
para la búsqueda por similitud — aunque los enfoques híbridos que combinan
búsqueda por palabras clave y búsqueda semántica son comunes.

## Por qué existe

Los modelos de lenguaje tienen dos limitaciones persistentes que RAG aborda de
un solo golpe.

La primera es el **knowledge cutoff** (límite temporal del conocimiento). Un
modelo entrenado con datos recopilados hasta una fecha determinada no sabe nada
de lo que ocurrió después. Preguntarle sobre la última llamada de resultados, un
estudio recién publicado o una normativa que cambió este trimestre producirá o
una admisión de ignorancia o, más peligrosamente, una respuesta falsa dicha con
seguridad. RAG sustituye la memoria cerrada del modelo por un almacén abierto y
actualizable.

La segunda es la **alucinación**. Los modelos entrenados puramente para predecir
continuaciones plausibles producirán a veces continuaciones plausibles que son
simplemente falsas. Anclar la generación en documentos recuperados da al modelo
algo real a lo que aferrarse — y, de forma crucial, da al usuario algo que citar
y verificar. Una respuesta que termina con "Fuente: informe para inversores Q1
2025, p. 14" es auditable de un modo que una respuesta de un modelo sin contexto
no lo es.

## Lo que no soluciona

RAG no es una cura. Es un interruptor entre la tendencia del modelo a confabular
y la necesidad del usuario de información precisa — pero solo es tan bueno como
lo sea la recuperación.

Si el documento relevante no está en el almacén, el modelo vuelve a adivinar. Si
los documentos recuperados están desactualizados, son contradictorios o están
mal fragmentados, el modelo razonará fielmente sobre entradas defectuosas y
producirá respuestas incorrectas con una confianza fuera de lugar. La calidad de
un sistema RAG depende enteramente de su pipeline de indexación — cómo se
dividen, vectorizan, clasifican y filtran los documentos antes de llegar al
modelo.

Hay también un riesgo más sutil: el paso de recuperación puede crear una falsa
sensación de anclaje. Una respuesta que cita un documento no es necesariamente
una lectura correcta de ese documento. El modelo puede seguir citando mal,
atribuyendo incorrectamente o extrayendo de forma selectiva — simplemente ha
desplazado el error de la confabulación a la mala lectura, que es una forma de
fallo diferente pero igualmente real.

## El panorama más amplio

RAG se ha convertido en la arquitectura dominante para construir aplicaciones de
IA sobre conocimiento privado, específico de un dominio o frecuentemente
actualizado. Bots de atención al cliente, asistentes para documentos internos,
herramientas de investigación legal y sistemas de referencia médica usan alguna
variante de este enfoque. Es la respuesta práctica a la pregunta que todos hacen
cuando entienden por primera vez qué son los modelos de lenguaje: "¿Pero cómo
hago que funcione con _mis_ datos?"

El nombre, acuñado en un artículo de 2020 de Meta AI por Patrick Lewis y sus
colegas, ha perdurado porque describe la función con claridad. _Primero
recupera, luego genera._ La ingeniería interesante está en la recuperación.
