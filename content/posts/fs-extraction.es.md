+++
title = 'Cómo extraer un sistema de archivos de una imagen de disco'
date = 2009-04-18T17:10:00Z
draft = false
description = 'Aprende cómo extraer particiones individuales de una copia de seguridad completa de imagen de disco usando comandos dd y mount.'
[taxonomies]
categories = ['Software']
tags = ['linux', 'unix', 'sysadm']
+++

Necesitas hacer una copia de seguridad de un disco duro completo a un solo
archivo. Suponiendo que tu disco está en `/dev/hda` y el archivo de copia de
seguridad es `image-file`, harías:

```bash
# cat /dev/hda > image-file
```

o

```bash
# dd if=/dev/hda of=image-file
```

El archivo de copia de seguridad que obtienes contendrá una copia de cada bit
del disco duro. Esto significa que también tienes una copia del MBR en los
primeros 512 bytes del archivo.

Debido a esto, puedes ver la tabla de particiones en el archivo de copia de
seguridad:

```bash
# sfdisk -l -uS image-file
Disk image-file: 0 cylinders, 0 heads, 0 sectors/track
Warning: The partition table looks like it was made
for C/H/S=*/255/32 (instead of 0/0/0).
For this listing I'll assume that geometry.
Units = sectors of 512 bytes, counting from 0
Device Boot Start End #sectors Id System
image-filep1 32 261119 261088 83 Linux
image-filep2 261120 4267679 4006560 82 Linux swap / Solaris
image-filep3 4267680 142253279 137985600 83 Linux
image-filep4 0 - 0 0 Empty
```

Supón que quieres extraer la partición número 3. Puedes ver que comienza en el
bloque 4267680 y tiene 137985600 bloques de longitud. Esto se traduce a:

```bash
# dd if=image-file of=partition3-file skip=4267680 count=137985600
```

Echar un vistazo al contenido de la partición es tan fácil como:

```bash
# mount -t ext3 -o loop partition3-file /mnt/hack
```

También, puedes evitar usar dd para extraer el archivo de partición pasando la
opción `offset` a mount.
