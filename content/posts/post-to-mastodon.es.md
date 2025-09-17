+++
title = "Publicar en Mastodon"
date = 2022-12-26T00:00:00Z
description = "Cómo publicar en Mastodon usando solo un cliente HTTP"
[taxonomies]
categories = ["Software"]
tags = ["mastodon", "curl", "desarrollo de software"]
+++

Debido a los recientes problemas de Twitter causados por
[Space Karen](https://knowyourmeme.com/memes/space-karen), me he creado una
[cuenta de Mastodon](https://mastodon.online/@mcaserta) y debo decir que, hasta
ahora, la experiencia ha sido extremadamente positiva, probablemente porque la
mayoría de las personas que sigo son nerds educados que se preocupan por
compartir buenas vibras. Si también tienes ganas de unirte, echa un vistazo a
[Join Mastodon](https://joinmastodon.org/) y compruébalo tú mismo.

De todos modos, me encontré bastante pronto con la necesidad de automatizar mis
publicaciones. Tengo un [canal de telegram](https://t.me/mirkolovesmusic) donde
publico música que me gusta, y quería automatizar la publicación cruzada desde
allí a mi cuenta de Mastodon, y lo hice con [IFTTT](https://ifttt.com) usando un
componente WebHook para Mastodon.

Por ahora, solo quiero documentar lo fácil que es publicar en Mastodon. Todo lo
que necesitas es un cliente http. Usaré [curl](https://curl.se/) en mis
ejemplos, pero por supuesto puedes usar lo que consideres apropiado.

```bash
curl --request POST  \
  --header 'Authorization: Bearer your-auth-token-here' \
  --form 'status="The Crusaders: \"And Then There Was The Blues\" https://youtu.be/F-EAazr0j78 #music"' \
  https://mastodon.online/api/v1/statuses
```

Esta es la forma general de la solicitud. En otras palabras, estamos haciendo
una solicitud http POST donde el cuerpo es el equivalente a enviar un formulario
HTML con un campo `status` cuyo valor es el texto real que queremos publicar en
nuestra cronología. Solo ten cuidado con las comillas dentro del campo `status`.

En cuanto al encabezado de autorización, necesitas obtener un token de
autenticación de tu instancia del servidor Mastodon. En mi servidor, está bajo
Preferencias → Development. Solo tengo que seleccionar _New Application_,
completar un poco de información sobre mi aplicación, seleccionar solo
`write:statuses` como los permisos que estoy otorgando y, una vez creada, el
token será visible en la información de la aplicación bajo _Your access token_.

También necesitarás reemplazar `mastodon.online` con el nombre de host de tu
servidor.

Eso es todo. De nada.
