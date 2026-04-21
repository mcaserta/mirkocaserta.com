+++
title = "The shell's `until` loop"
description = "A practical tour of the until loop: syntax, when it reads better than while, and five real-world examples for waiting on services, files, ports, retries, and background jobs."
date = 2026-04-21

[taxonomies]
categories = ["Software Development"]
tags = ["unix", "bash", "shell", "scripting", "software development"]

[extra]
toc = false
+++

Every shell programmer knows `while`. Almost nobody uses its sibling: `until`.
It's the same loop with the condition inverted — and in the right spot, it reads
like plain English where `while !` reads like a puzzle.

## Syntax

```bash
until CONDITION; do
  BODY
done
```

The loop runs the body repeatedly **until `CONDITION` succeeds** (i.e. exits
with status `0`). Put differently: it keeps looping as long as `CONDITION`
fails.

Compare:

```bash
# while: loop as long as the condition is true
while ! pgrep -x redis-server >/dev/null; do sleep 1; done

# until: loop until the condition becomes true
until pgrep -x redis-server >/dev/null; do sleep 1; done
```

Same behavior. The second one reads the way you'd describe it out loud: _wait
until Redis is running_. That's the whole case for `until` — pick the form where
the reader doesn't have to flip a boolean in their head.

## Five practical examples

### 1. Wait for a service to come up

Starting a container, then waiting for its HTTP endpoint:

```bash
docker compose up -d api

until curl -sf http://localhost:8080/health >/dev/null; do
  sleep 1
done

echo "API is ready"
```

`curl -sf` exits non-zero on connection refused, timeouts, and non-2xx responses
— all the states where "ready" is still false.

### 2. Wait for a file to appear

Useful when another process is supposed to drop a marker:

```bash
until [ -f /tmp/import.done ]; do
  sleep 0.5
done

process_the_import
```

### 3. Retry a flaky command, with a cap

Infinite loops are a footgun. Always pair `until` with a maximum:

```bash
attempt=0
max=10

until curl -sf https://example.com/api/data -o data.json; do
  attempt=$((attempt + 1))
  if [ "$attempt" -ge "$max" ]; then
    echo "giving up after $attempt attempts" >&2
    exit 1
  fi
  sleep $((attempt * 2))   # linear backoff
done
```

### 4. Wait for a TCP port

Before running migrations against a freshly-booted Postgres:

```bash
until nc -z localhost 5432; do
  sleep 1
done

psql -h localhost -U app -d app -f migrations.sql
```

`nc -z` (or `nc -zv` if you want the noise) probes the port without sending
data.

### 5. Block until a background job finishes

`kill -0 "$pid"` doesn't actually kill anything — it only asks "is this pid
still alive?" (exits 0 if yes).

```bash
long_running_job &
pid=$!

# Do other work here if needed, then block:
until ! kill -0 "$pid" 2>/dev/null; do
  sleep 1
done

wait "$pid"   # reap the exit status
```

`wait "$pid"` alone is usually what you want, but the pattern above is handy
when you need to poll some other condition alongside liveness (e.g. a spinner,
or a deadline).

## Gotchas

**Always have an escape hatch.** An `until` with no timeout and no attempt
counter is a script that hangs forever when its dependency never comes up. Use
`timeout`, a counter, or both:

```bash
timeout 60 bash -c 'until curl -sf http://localhost:8080/health; do sleep 1; done'
```

**`set -e` does not break the loop on body failures.** Commands inside the
`do`/`done` block that fail won't abort the loop — only the condition influences
iteration. If you need to fail fast mid-body, check explicitly and `exit` or
`break`.

**Portability.** `until` is POSIX. It works in `bash`, `zsh`, `dash`, `ksh`, and
`ash` (BusyBox). If your script starts with `#!/bin/sh`, you're fine.

**Don't invert for style alone.** If the natural way to describe the loop is
"while X is still happening," use `while`. `until` earns its keep only when the
success condition is the obvious thing to name.

## Why it's worth the muscle memory

`until` doesn't do anything `while` can't. It just occasionally produces code
that's obvious at a glance instead of mildly obvious after parsing a negation.
For a tiny keyword, that's a fair trade. The next time you find yourself typing
`while !`, pause for half a second and ask whether the other spelling reads
better. Often it does.
