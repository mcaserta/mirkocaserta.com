+++
title = "Touch ID per sudo in Ghostty e zellij"
date = 2026-04-23
description = "Come far funzionare il prompt Touch ID con sudo su macOS, incluso il workaround pam_reattach necessario all'interno di multiplexer di terminale come zellij e tmux."

[taxonomies]
categories = ["Software Development"]
tags = ["macos", "terminale", "zellij", "ghostty", "sudo"]

[extra]
toc = false
+++

Digitare la password ogni volta che si esegue `sudo` su macOS stanca. Touch ID
può occuparsene, e nelle versioni recenti di macOS la configurazione sopravvive
agli aggiornamenti di sistema. Ecco come l'ho impostato nel mio flusso di lavoro
Ghostty + zellij.

## L'approccio pulito: sudo_local

A partire da macOS Sonoma (14), Apple ha aggiunto un file template pensato
specificamente per le personalizzazioni PAM locali. Usalo invece di modificare
`/etc/pam.d/sudo` direttamente, che viene sovrascritto a ogni aggiornamento
maggiore del sistema operativo.

```bash
sudo cp /etc/pam.d/sudo_local.template /etc/pam.d/sudo_local
sudo $EDITOR /etc/pam.d/sudo_local
```

Decommenta la riga `pam_tid.so` in modo che il file contenga:

```
auth       sufficient     pam_tid.so
```

Apri un nuovo terminale, esegui `sudo whoami`, e dovresti ricevere un prompt
Touch ID.

## Il problema con i multiplexer di terminale

Se hai lanciato quel comando `sudo` da dentro una sessione zellij (o tmux, o
screen), il prompt Touch ID non compare mai. Il multiplexer si stacca dalla
sessione GUI di cui Touch ID ha bisogno, quindi `pam_tid.so` ricade
silenziosamente sull'autenticazione tramite password.

La soluzione è un piccolo modulo PAM chiamato `pam_reattach` che ricollega il
processo `sudo` alla sessione GUI dell'utente prima che parta l'autenticazione.

```bash
brew install pam-reattach
```

Poi modifica di nuovo `/etc/pam.d/sudo_local`. L'ordine conta: `pam_reattach`
deve essere eseguito prima di `pam_tid`.

Su Apple Silicon:

```
auth       optional       /opt/homebrew/lib/pam/pam_reattach.so
auth       sufficient     pam_tid.so
```

Sui Mac Intel, il percorso è invece `/usr/local/lib/pam/pam_reattach.so`.

Ora `sudo` funziona con Touch ID anche da dentro un pannello zellij.

## Cosa non funziona

Alcune cose da tenere a mente:

- **Sessioni SSH**: Touch ID richiede la presenza fisica, quindi il `sudo`
  remoto continua a richiedere la password.
- **Sblocco con Apple Watch**: è un meccanismo separato. Sblocca il Mac e
  approva alcuni prompt di sicurezza, ma non sostituisce `pam_tid` in `sudo`.
- **Aggiornamenti Homebrew di pam-reattach**: se il percorso del `.so` dovesse
  cambiare, il tuo `sudo_local` punterà a un file mancante e Touch ID smetterà
  di funzionare finché non aggiusti il percorso. È bene saperlo se le cose si
  rompono misteriosamente dopo un `brew upgrade`.

## Perché sudo_local vale il passo in più

Potresti modificare `/etc/pam.d/sudo` direttamente e ottenere lo stesso
risultato, ma ogni point release di macOS resetta quel file. `sudo_local` è
progettato per persistere e viene incluso automaticamente da `sudo`.
Configurazione una tantum, niente più password da digitare, nessuna sorpresa
dopo un `softwareupdate`.
