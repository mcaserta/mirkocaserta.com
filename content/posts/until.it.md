+++
title = "Il ciclo `until` della shell"
description = "Un giro pratico del ciclo until: sintassi, quando si legge meglio di while, e cinque esempi concreti per attendere servizi, file, porte, retry e job in background."
date = 2026-04-21

[taxonomies]
categories = ["Software Development"]
tags = ["unix", "bash", "shell", "scripting", "software development"]

[extra]
toc = false
+++

Chiunque programmi in shell conosce `while`. Quasi nessuno usa il suo fratello
gemello: `until`. È lo stesso ciclo con la condizione invertita — e nel contesto
giusto si legge come una frase in italiano, mentre `while !` si legge come un
piccolo rompicapo.

## Sintassi

```bash
until CONDIZIONE; do
  CORPO
done
```

Il ciclo esegue ripetutamente il corpo **finché `CONDIZIONE` non ha successo**
(cioè esce con stato `0`). Detto altrimenti: continua a iterare finché la
condizione fallisce.

Confronta:

```bash
# while: cicla finché la condizione è vera
while ! pgrep -x redis-server >/dev/null; do sleep 1; done

# until: cicla finché la condizione non diventa vera
until pgrep -x redis-server >/dev/null; do sleep 1; done
```

Stesso comportamento. Il secondo si legge come lo descriveresti a voce alta:
_aspetta finché Redis non è in esecuzione_. È tutto qui il senso di `until` —
scegli la forma che non costringe chi legge a invertire un booleano nella testa.

## Cinque esempi pratici

### 1. Attendere che un servizio sia pronto

Avvii un container e poi aspetti che il suo endpoint HTTP risponda:

```bash
docker compose up -d api

until curl -sf http://localhost:8080/health >/dev/null; do
  sleep 1
done

echo "API pronta"
```

`curl -sf` esce con stato diverso da zero in caso di connessione rifiutata,
timeout o risposte non 2xx — tutti gli stati in cui "pronta" è ancora falso.

### 2. Attendere la comparsa di un file

Utile quando un altro processo deve scrivere un marker:

```bash
until [ -f /tmp/import.done ]; do
  sleep 0.5
done

process_the_import
```

### 3. Ritentare un comando instabile, con un limite

I cicli infiniti sono una trappola. Abbina sempre `until` a un massimo:

```bash
tentativo=0
max=10

until curl -sf https://example.com/api/data -o data.json; do
  tentativo=$((tentativo + 1))
  if [ "$tentativo" -ge "$max" ]; then
    echo "rinuncio dopo $tentativo tentativi" >&2
    exit 1
  fi
  sleep $((tentativo * 2))   # backoff lineare
done
```

### 4. Attendere una porta TCP

Prima di lanciare le migrazioni su un Postgres appena avviato:

```bash
until nc -z localhost 5432; do
  sleep 1
done

psql -h localhost -U app -d app -f migrations.sql
```

`nc -z` (o `nc -zv` se vuoi l'output verboso) sonda la porta senza inviare dati.

### 5. Bloccare il flusso finché un job in background non finisce

`kill -0 "$pid"` non uccide niente — chiede solo "questo pid è ancora vivo?"
(esce con 0 se sì).

```bash
long_running_job &
pid=$!

# Fai altro lavoro qui se serve, poi blocca:
until ! kill -0 "$pid" 2>/dev/null; do
  sleep 1
done

wait "$pid"   # recupera lo stato di uscita
```

Di solito `wait "$pid"` è ciò che vuoi davvero, ma il pattern qui sopra è comodo
quando devi contemporaneamente controllare qualche altra condizione (uno
spinner, una scadenza).

## Trappole

**Prevedi sempre una via d'uscita.** Un `until` senza timeout e senza contatore
è uno script che si impianta all'infinito quando la dipendenza non arriva mai.
Usa `timeout`, un contatore, o entrambi:

```bash
timeout 60 bash -c 'until curl -sf http://localhost:8080/health; do sleep 1; done'
```

**`set -e` non interrompe il ciclo se fallisce il corpo.** I comandi dentro il
blocco `do`/`done` che falliscono non fermano il ciclo — solo la condizione
influenza l'iterazione. Se devi fallire subito a metà del corpo, controlla
esplicitamente e usa `exit` o `break`.

**Portabilità.** `until` è POSIX. Funziona in `bash`, `zsh`, `dash`, `ksh` e
`ash` (BusyBox). Se lo script inizia con `#!/bin/sh`, sei a posto.

**Non invertire solo per stile.** Se il modo naturale di descrivere il ciclo è
"finché X sta accadendo", usa `while`. `until` guadagna il suo posto solo quando
è la condizione di successo quella ovvia da nominare.

## Perché vale la pena metterlo nella memoria muscolare

`until` non fa niente che `while` non possa fare. Produce soltanto, ogni tanto,
codice che si capisce a colpo d'occhio invece che dopo aver mentalmente negato
una condizione. Per una parola chiave così piccola, è uno scambio onesto. La
prossima volta che stai per scrivere `while !`, fermati mezzo secondo e chiediti
se l'altra forma non si legga meglio. Spesso è così.
