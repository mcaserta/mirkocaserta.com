+++
title = "El bucle `until` de la shell"
description = "Un recorrido práctico por el bucle until: sintaxis, cuándo se lee mejor que while, y cinco ejemplos reales para esperar servicios, archivos, puertos, reintentos y trabajos en segundo plano."
date = 2026-04-21

[taxonomies]
categories = ["Software Development"]
tags = ["unix", "bash", "shell", "scripting", "software development"]

[extra]
toc = false
+++

Cualquiera que programe en shell conoce `while`. Casi nadie usa a su hermano
gemelo: `until`. Es el mismo bucle con la condición invertida — y en el contexto
adecuado se lee como una frase en castellano, mientras que `while !` se lee como
un pequeño rompecabezas.

## Sintaxis

```bash
until CONDICIÓN; do
  CUERPO
done
```

El bucle ejecuta el cuerpo repetidamente **hasta que `CONDICIÓN` tenga éxito**
(es decir, termine con estado `0`). Dicho de otra forma: sigue iterando mientras
la condición falle.

Compara:

```bash
# while: itera mientras la condición sea verdadera
while ! pgrep -x redis-server >/dev/null; do sleep 1; done

# until: itera hasta que la condición se vuelva verdadera
until pgrep -x redis-server >/dev/null; do sleep 1; done
```

Mismo comportamiento. La segunda se lee como lo describirías en voz alta:
_espera hasta que Redis esté corriendo_. Ese es todo el argumento a favor de
`until` — elige la forma que no obligue a quien lee a invertir un booleano
mentalmente.

## Cinco ejemplos prácticos

### 1. Esperar a que un servicio esté listo

Arrancas un contenedor y luego esperas a que su endpoint HTTP responda:

```bash
docker compose up -d api

until curl -sf http://localhost:8080/health >/dev/null; do
  sleep 1
done

echo "API lista"
```

`curl -sf` devuelve un estado distinto de cero ante conexiones rechazadas,
tiempos de espera o respuestas no 2xx — todos los estados en los que "listo" aún
es falso.

### 2. Esperar a que aparezca un archivo

Útil cuando otro proceso debe dejar un marcador:

```bash
until [ -f /tmp/import.done ]; do
  sleep 0.5
done

process_the_import
```

### 3. Reintentar un comando inestable, con un tope

Los bucles infinitos son una trampa. Empareja siempre `until` con un máximo:

```bash
intento=0
max=10

until curl -sf https://example.com/api/data -o data.json; do
  intento=$((intento + 1))
  if [ "$intento" -ge "$max" ]; then
    echo "me rindo tras $intento intentos" >&2
    exit 1
  fi
  sleep $((intento * 2))   # retroceso lineal
done
```

### 4. Esperar a que un puerto TCP esté abierto

Antes de lanzar las migraciones contra un Postgres recién arrancado:

```bash
until nc -z localhost 5432; do
  sleep 1
done

psql -h localhost -U app -d app -f migrations.sql
```

`nc -z` (o `nc -zv` si prefieres salida detallada) sondea el puerto sin enviar
datos.

### 5. Bloquear hasta que un trabajo en segundo plano termine

`kill -0 "$pid"` no mata nada — solo pregunta "¿este pid sigue vivo?" (termina
con 0 si sí).

```bash
long_running_job &
pid=$!

# Haz otras cosas aquí si hace falta, luego bloquea:
until ! kill -0 "$pid" 2>/dev/null; do
  sleep 1
done

wait "$pid"   # recupera el estado de salida
```

Normalmente `wait "$pid"` es lo que realmente quieres, pero el patrón de arriba
es útil cuando necesitas vigilar alguna otra condición en paralelo (un
indicador, una fecha límite).

## Trampas

**Ten siempre una salida.** Un `until` sin tiempo límite y sin contador es un
script que se cuelga para siempre cuando su dependencia no llega nunca. Usa
`timeout`, un contador, o ambos:

```bash
timeout 60 bash -c 'until curl -sf http://localhost:8080/health; do sleep 1; done'
```

**`set -e` no rompe el bucle si falla el cuerpo.** Los comandos dentro del
bloque `do`/`done` que fallen no abortan el bucle — solo la condición influye en
la iteración. Si necesitas fallar rápido a mitad del cuerpo, comprueba
explícitamente y usa `exit` o `break`.

**Portabilidad.** `until` es POSIX. Funciona en `bash`, `zsh`, `dash`, `ksh` y
`ash` (BusyBox). Si tu script empieza con `#!/bin/sh`, no hay problema.

**No inviertas solo por estilo.** Si la manera natural de describir el bucle es
"mientras X sigue ocurriendo", usa `while`. `until` se gana su sitio solo cuando
la condición de éxito es la que resulta obvia nombrar.

## Por qué vale la pena ponerlo en la memoria muscular

`until` no hace nada que `while` no pueda hacer. Solo produce, de vez en cuando,
código que se entiende de un vistazo en lugar de tras negar mentalmente una
condición. Para una palabra clave tan pequeña, es un intercambio justo. La
próxima vez que estés a punto de escribir `while !`, detente medio segundo y
pregúntate si la otra forma no se lee mejor. A menudo sí.
