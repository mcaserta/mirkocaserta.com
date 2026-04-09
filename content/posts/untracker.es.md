+++
title = "Untracker"
description = "Creé una app de 0,99 $ que elimina los parámetros de rastreo de cada URL que copias. Aquí explico por qué y cómo funciona."
date = 2026-03-31

[taxonomies]
categories = ["Software"]
tags = ["privacy", "ios", "macos", "swift", "app store"]

[extra]
toc = true
+++

Cada vez que copias un enlace de Amazon, YouTube, Facebook o prácticamente
cualquier plataforma importante, la URL lleva equipaje invisible: parámetros de
rastreo que te identifican, registran de dónde vienes y te siguen por toda la
web. La página carga de forma idéntica sin ellos. Existen únicamente para
decirle a la plataforma que _tú, específicamente_ hiciste clic en _ese enlace
concreto_ desde _esa fuente específica_.

Me cansé de eso, así que creé [Untracker](https://untracker.app).

## Cómo empezó

Todo comenzó con una pregunta sencilla que me daba vueltas: ¿se pueden eliminar
automáticamente los parámetros de rastreo de las URL en iPadOS? La respuesta
resultó ser "más o menos, pero no de forma elegante" — las restricciones del
portapapeles de Apple hacen imposible una monitorización real en segundo plano
en iOS. Se puede hacer a través de una extensión del menú Compartir. Y en macOS,
donde el acceso al portapapeles no tiene restricciones, se puede ir a fondo: una
app en la barra de menú que limpia silenciosamente cada URL que copias.

Así que construí ambas. Una sola app, compra universal: la versión para Mac
monitoriza tu portapapeles automáticamente, la de iPhone y iPad funciona a
través de una extensión del menú Compartir. Copias un enlace, lo compartes a
través de Untracker, listo. La URL limpia está en tu portapapeles, lista para
pegar.

## Qué elimina

Untracker utiliza la base de datos comunitaria
[ClearURLs](https://github.com/ClearURLs/Rules), que cubre más de 200
proveedores y miles de parámetros de rastreo individuales. Algunos de los
sospechosos habituales:

- `fbclid` — el ID de clic de Meta, vincula tu clic a tu perfil de Facebook
  incluso fuera de la plataforma
- `gclid` — el ID de clic de Google, conecta los clics en anuncios a tu cuenta
  de Google
- `utm_source`, `utm_medium`, `utm_campaign` — parámetros de seguimiento de
  campañas usados básicamente por todos
- `ref`, `tag` — el rastreo interno de referencia y afiliados de Amazon
- `si` — el ID de compartición de Spotify y YouTube, vincula a quien comparte
  con el destinatario
- `igshid` — el rastreo de compartición de Instagram
- `mc_eid` — el ID de email de Mailchimp, identifica tu dirección de correo a
  través de las campañas
- `li_fat_id` — el rastreo publicitario first-party de LinkedIn

La base de datos de reglas se actualiza automáticamente, así que los nuevos
rastreadores se cubren a medida que la comunidad de ClearURLs los añade.

## Resolución de redirecciones

Los parámetros de rastreo son la parte visible del problema. La parte invisible
es el envoltorio de redirecciones: cuando una plataforma dirige tu clic a través
de su propio servidor antes de reenviarte al destino real.

Facebook envuelve los enlaces salientes a través de `l.facebook.com/l.php?u=`.
X/Twitter acorta todo a `t.co`. Google redirige los clics a través de `/url?q=`.
En cada caso, la plataforma registra tu clic antes de que ocurra la redirección.

Untracker sigue estas cadenas de redirección y extrae la URL de destino real.
También resuelve acortadores de URL como `bit.ly` y `lnkd.in`.

## Antes y después

Aquí tienes un ejemplo real. Buscas unos auriculares en Amazon y copias el
enlace:

```
https://www.amazon.com/dp/B09V3KXJPB?tag=foo-20&ref=pd_rd_r&pd_rd_w=3Kf8g&content-id=amzn1.sym.eb926b83&utm_source=newsletter&utm_medium=email&fbclid=IwAR3xQz7
```

Después de Untracker:

```
https://www.amazon.com/dp/B09V3KXJPB
```

La misma página de producto. Sin vigilancia.

## ¿Y la protección integrada de Safari?

Desde iOS 17, Safari incluye la Protección Avanzada contra el Rastreo y la
Huella Digital (ATFP). Es un paso en la dirección correcta, pero tiene
limitaciones importantes:

- Funciona con una lista estática que cubre una fracción de lo que cubre la base
  de datos de ClearURLs.
- No sigue cadenas de redirección ni resuelve acortadores de URL.
- Solo limpia URLs durante la navegación en Safari — no toca las URLs que copias
  y compartes a través de Mensajes, WhatsApp, Slack, correo electrónico o
  cualquier otra app.
- Hasta iOS 26, solo estaba activa por defecto en la Navegación Privada.

Este último punto es el más importante. La mayor parte de la contaminación por
rastreo ocurre cuando _compartes_ un enlace, no cuando haces _clic_ en uno.
Cuando pegas una URL con rastreadores en un chat grupal, todos los que hacen
clic en ella llevan tu carga de rastreo. Los enlaces limpios no son solo
autoprotección — son una cortesía.

## Reglas personalizadas

Más allá de la base de datos de ClearURLs, Untracker admite reglas de limpieza
personalizadas con patrones regex. Puedes definir tus propias reglas, importar y
exportar conjuntos de reglas como JSON, y tus reglas personalizadas siempre se
verifican primero — tu intención prevalece sobre la base de datos
predeterminada.

Añadí esto porque siempre hay alguna herramienta interna o plataforma de nicho
para la que nadie más ha escrito una regla.

## Sincronización con iCloud

Los ajustes y las reglas personalizadas se sincronizan en todos tus dispositivos
a través de iCloud utilizando resolución de conflictos CRDT (Conflict-free
Replicated Data Type). Editas una regla personalizada en tu Mac y aparece en tu
iPhone. No necesitas ninguna cuenta más allá de tu Apple ID.

## La parte de privacidad

Untracker no contiene analíticas, telemetría ni rastreo. La ironía habría sido
excesiva.

Todo se ejecuta localmente en tu dispositivo. Las URLs nunca se envían a ningún
sitio. La etiqueta de privacidad de la App Store de Apple lo confirma: **Datos
no recopilados**.

## El modelo de negocio

0,99 $ una sola vez. Compra universal — cómpralo en cualquier plataforma Apple y
lo obtienes en todas. Sin suscripciones, sin compras dentro de la app, sin
anuncios.

Consideré hacerlo gratuito, pero quería un modelo sostenible que no dependiera
de la captura de atención o la recopilación de datos. Un dólar me pareció justo.
Es el precio de un café de máquina, y obtienes una herramienta que usarás todos
los días sin pensarlo.

## Para empezar

Untracker está disponible en la App Store para Mac, iPhone y iPad:

- [App Store](https://apps.apple.com/app/untracker/id6760624490)
- [Sitio web](https://untracker.app)
- [Política de privacidad](https://untracker.app/privacy)

En Mac, se ubica en la barra de menú y funciona automáticamente. En iPhone y
iPad, añádelo a tu menú Compartir y listo.

La vida es demasiado corta para enlaces de Amazon de 300 caracteres.
