+++
title = "Array con delimitatore pipe in Bash"
date = 2026-04-16
description = "Un pattern semplice per memorizzare record strutturati in un array Bash e dividerli con IFS."

[taxonomies]
categories = ["Software"]
tags = ["bash", "shell", "sviluppo software"]
+++

Avevo bisogno di un modo per dichiarare una lista di repository git in uno shell
script — ognuno con un nome breve, un percorso locale e un URL remoto — e poi
iterare su di essi sia in uno script di bootstrap che in uno script di stato.
Nessun parser YAML, nessun jq, nessuna dipendenza esterna. Solo Bash.

Ecco la soluzione a cui sono arrivato.

## I dati

```bash
REPO_SPECS=(
  "website|website/anode-labs.com|https://github.com/mcaserta/anode-labs.com.git"
  "bitcrust|product/bitcrust|https://github.com/mcaserta/bitcrust.git"
  "presitter|product/presitter|https://github.com/mcaserta/presitter.git"
  "stepbruv|product/stepbruv|https://github.com/mcaserta/stepbruv.git"
)
```

`REPO_SPECS` è un semplice array indicizzato Bash. Ogni elemento è una singola
stringa con tre campi separati da `|`. Si può usare qualsiasi delimitatore che
non appaia nei dati — il pipe funziona bene perché è improbabile che compaia nei
percorsi di file o negli URL.

## Iterazione e suddivisione

```bash
for spec in "${REPO_SPECS[@]}"; do
  IFS='|' read -r name dir remote <<< "$spec"

  echo "name=$name dir=$dir remote=$remote"
done
```

Due cose fanno il lavoro pesante qui:

1. `"${REPO_SPECS[@]}"` espande l'array in modo che ogni elemento diventi una
   parola separata nel ciclo `for`. Le virgolette doppie sono importanti — senza
   di esse, gli elementi contenenti spazi verrebbero ulteriormente suddivisi
   dalla shell.

2. `IFS='|' read -r name dir remote <<< "$spec"` divide l'elemento corrente su
   `|` e assegna i tre token risultanti a `name`, `dir` e `remote`.

Il prefisso `IFS='|'` imposta il separatore di campo solo per il comando `read`
— non modifica `IFS` per il resto dello script. Il flag `-r` impedisce
l'interpretazione dei backslash. `<<<` (here-string) fornisce il valore della
variabile allo standard input di `read`.

Eseguendo il ciclo sopra si ottiene:

```text
name=website dir=website/anode-labs.com remote=https://github.com/mcaserta/anode-labs.com.git
name=bitcrust dir=product/bitcrust remote=https://github.com/mcaserta/bitcrust.git
name=presitter dir=product/presitter remote=https://github.com/mcaserta/presitter.git
name=stepbruv dir=product/stepbruv remote=https://github.com/mcaserta/stepbruv.git
```

## Un esempio reale

Nel mio script di bootstrap del workspace, il pattern si presenta così:

```bash
source "$SCRIPT_DIR/repos.sh"

for spec in "${REPO_SPECS[@]}"; do
  IFS='|' read -r name dir remote <<< "$spec"
  target="$WORK_ROOT/$dir"

  if [[ -d "$target/.git" ]]; then
    echo "[ok] $name already present"
    continue
  fi

  if [[ -d "$target" ]]; then
    echo "[skip] $name exists but is not a git repo"
    continue
  fi

  if [[ -z "$remote" ]]; then
    echo "[skip] $name has no configured remote"
    continue
  fi

  echo "[clone] $name -> $target"
  git clone "$remote" "$target"
done
```

Uno script di stato importa lo stesso file repos.sh e usa lo stesso pattern
`IFS='|' read` per stampare informazioni sul branch e sullo stato di ciascun
repository. Un unico file dati, due consumatori, zero librerie di parsing.

## Perché non gli array associativi?

Bash 4+ ha gli array associativi, ma forniscono un solo valore per chiave. Qui
mi servono tre campi per voce _e_ voglio preservare l'ordine di dichiarazione
(gli array associativi non lo garantiscono). Le stringhe con delimitatore pipe
in un array indicizzato risolvono entrambi i problemi senza cerimonie.

## Perché non un CSV o un file di configurazione?

Si potrebbe certamente usare un file esterno e analizzarlo con `awk` o `cut`. Ma
per un pugno di record strettamente legati agli script che li consumano,
incorporare i dati in un file `.sh` importabile mantiene le cose semplici. Un
file in meno da leggere, un formato in meno da documentare.

## Insidie

- Se un campo contiene `|`, il meccanismo si rompe. Scegli un delimitatore che i
  tuoi dati non conterranno.
- `<<<` (here-string) è un costrutto specifico di Bash. Non funzionerà in un
  semplice `sh` POSIX. Se serve compatibilità POSIX, si può passare attraverso
  `echo`: `echo "$spec" | IFS='|' read -r name dir remote`. Ma attenzione: in
  alcune shell il `read` viene eseguito in una subshell e le variabili non
  sopravvivono al pipe. A quel punto, usa semplicemente Bash.
- Se ci sono più campi che variabili, l'ultima variabile riceve il resto. Meno
  campi che variabili e le extra saranno vuote. Entrambi i comportamenti sono
  generalmente quelli desiderati.

## Tutto qui

Un array Bash, un carattere pipe e `IFS` — tre ingredienti, nessuna dipendenza
esterna e un formato dati sufficientemente leggibile da poter essere mantenuto a
mano senza un parser. A volte la cosa più semplice che funziona è la cosa
migliore che funziona.
