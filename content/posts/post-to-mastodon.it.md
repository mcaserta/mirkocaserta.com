+++
title = "Postare su Mastodon"
date = 2022-12-26T00:00:00Z
description = "Come postare su Mastodon usando solo un client HTTP"
[taxonomies]
categories = ["Software"]
tags = ["mastodon", "curl", "sviluppo del software"]
+++

A causa dei recenti problemi di Twitter dovuti a
[Space Karen](https://knowyourmeme.com/memes/space-karen), mi sono fatto un
[account Mastodon](https://mastodon.online/@mcaserta) e devo dire che, finora,
l'esperienza è stata estremamente positiva, probabilmente perché la maggior
parte delle persone che seguo sono nerd educati che si preoccupano di mantenere
un buon karma. Se anche tu hai voglia di unirti, dai un'occhiata a
[Join Mastodon](https://joinmastodon.org/) e guarda tu stesso.

Comunque, mi sono trovato abbastanza presto nella necessità di automatizzare i
miei post. Ho un [canale telegram](https://t.me/mirkolovesmusic) dove posto
musica che mi piace, e volevo automatizzare il cross-posting da lì al mio
account Mastodon, e l'ho fatto con [IFTTT](https://ifttt.com) usando un
componente WebHook per Mastodon.

Per ora voglio solo documentare quanto sia facile postare su Mastodon. Tutto
quello che serve è un client http. Userò [curl](https://curl.se/) nei miei
esempi, ma puoi ovviamente usare qualsiasi cosa ritieni adatta.

```bash
curl --request POST  \
  --header 'Authorization: Bearer your-auth-token-here' \
  --form 'status="The Crusaders: \"And Then There Was The Blues\" https://youtu.be/F-EAazr0j78 #music"' \
  https://mastodon.online/api/v1/statuses
```

Questa è la forma generale della richiesta. In altre parole, stiamo facendo una
richiesta http POST dove il body è l'equivalente di inviare un form HTML con un
campo `status` il cui valore è il testo effettivo che vogliamo postare sulla
nostra timeline. Fai solo attenzione alle virgolette all'interno del campo
`status`.

Per quanto riguarda l'header di autorizzazione, devi ottenere un token di
autenticazione dalla tua istanza del server Mastodon. Nel mio server, è sotto
Preferenze → Sviluppo. Devo solo selezionare _Nuova Applicazione_, riempire
alcune informazioni sulla mia app, selezionare solo `write:statuses` come
permessi che sto concedendo e, una volta creata, il token sarà visibile nelle
informazioni dell'app sotto _Il tuo token di accesso_.

Dovrai anche sostituire `mastodon.online` con l'hostname del tuo server.

Questo è tutto. Prego.
