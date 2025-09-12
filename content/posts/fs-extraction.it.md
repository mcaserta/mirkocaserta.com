+++
title = "Come estrarre un filesystem da un'immagine di disco"
date = 2009-04-18T17:10:00Z
draft = false
description = 'Impara come estrarre singole partizioni da un backup completo di immagine disco usando i comandi dd e mount.'
[taxonomies]
categories = ['Software']
tags = ['linux', 'unix', 'sysadm']
+++

Hai bisogno di fare un backup di un intero disco rigido in un singolo file.
Supponendo che il tuo disco sia su `/dev/hda` e il file di backup sia
`image-file`, dovresti fare:

```bash
# cat /dev/hda > image-file
```

o

```bash
# dd if=/dev/hda of=image-file
```

Il file di backup che ottieni conterrà una copia di ogni singolo bit dal disco
rigido. Questo significa che hai anche una copia dell'MBR nei primi 512 byte del
file.

Ora puoi vedere la tabella delle partizioni sul file di backup:

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

Supponi di voler estrarre la partizione numero 3. Puoi vedere che inizia al
blocco 4267680 ed è lunga 137985600 blocchi. Questo si traduce in:

```bash
# dd if=image-file of=partition3-file skip=4267680 count=137985600
```

Dare un'occhiata al contenuto della partizione è facile come:

```bash
# mount -t ext3 -o loop partition3-file /mnt/hack
```

Inoltre, puoi evitare di usare dd per estrarre il file di partizione passando l'
opzione `offset` a mount.
