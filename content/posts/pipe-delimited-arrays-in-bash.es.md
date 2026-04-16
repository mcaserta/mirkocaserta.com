+++
title = "Arrays con delimitador pipe en Bash"
date = 2026-04-16
description = "Un patrón sencillo para almacenar registros estructurados en un array de Bash y dividirlos con IFS."

[taxonomies]
categories = ["Software"]
tags = ["bash", "shell", "desarrollo de software"]
+++

Necesitaba una forma de declarar una lista de repositorios git en un script de
shell — cada uno con un nombre corto, una ruta local y una URL remota — y luego
iterar sobre ellos tanto en un script de bootstrap como en uno de estado. Sin
parser YAML, sin jq, sin dependencias externas. Solo Bash.

Esto es lo que encontré.

## Los datos

```bash
REPO_SPECS=(
  "website|website/anode-labs.com|https://github.com/mcaserta/anode-labs.com.git"
  "bitcrust|product/bitcrust|https://github.com/mcaserta/bitcrust.git"
  "presitter|product/presitter|https://github.com/mcaserta/presitter.git"
  "stepbruv|product/stepbruv|https://github.com/mcaserta/stepbruv.git"
)
```

`REPO_SPECS` es un simple array indexado de Bash. Cada elemento es una cadena
única con tres campos separados por `|`. Se puede usar cualquier delimitador que
no aparezca en los datos — el pipe funciona bien porque es poco probable que
aparezca en rutas de archivos o URLs.

## Iteración y división

```bash
for spec in "${REPO_SPECS[@]}"; do
  IFS='|' read -r name dir remote <<< "$spec"

  echo "name=$name dir=$dir remote=$remote"
done
```

Dos cosas hacen el trabajo pesado aquí:

1. `"${REPO_SPECS[@]}"` expande el array de modo que cada elemento se convierte
   en una palabra separada en el bucle `for`. Las comillas dobles importan — sin
   ellas, los elementos que contengan espacios serían divididos adicionalmente
   por la shell.

2. `IFS='|' read -r name dir remote <<< "$spec"` divide el elemento actual en
   `|` y asigna los tres tokens resultantes a `name`, `dir` y `remote`.

El prefijo `IFS='|'` establece el separador de campo solo para el comando `read`
— no cambia `IFS` para el resto del script. El flag `-r` evita la interpretación
de barras invertidas. `<<<` (here-string) alimenta el valor de la variable en la
entrada estándar de `read`.

Ejecutando el bucle anterior se obtiene:

```text
name=website dir=website/anode-labs.com remote=https://github.com/mcaserta/anode-labs.com.git
name=bitcrust dir=product/bitcrust remote=https://github.com/mcaserta/bitcrust.git
name=presitter dir=product/presitter remote=https://github.com/mcaserta/presitter.git
name=stepbruv dir=product/stepbruv remote=https://github.com/mcaserta/stepbruv.git
```

## Un ejemplo real

En mi script de bootstrap del workspace, el patrón se ve así:

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

Un script de estado importa el mismo archivo repos.sh y usa el mismo patrón
`IFS='|' read` para imprimir información del branch y el estado de cada
repositorio. Un archivo de datos, dos consumidores, cero bibliotecas de parsing.

## ¿Por qué no arrays asociativos?

Bash 4+ tiene arrays asociativos, pero solo proporcionan un valor por clave.
Aquí necesito tres campos por entrada _y_ quiero preservar el orden de
declaración (los arrays asociativos no lo garantizan). Las cadenas con
delimitador pipe en un array indexado resuelven ambos problemas sin ninguna
ceremonia.

## ¿Por qué no un CSV o un archivo de configuración?

Se podría perfectamente usar un archivo externo y parsearlo con `awk` o `cut`.
Pero para un puñado de registros que están estrechamente acoplados a los scripts
que los consumen, incorporar los datos en un archivo `.sh` importable mantiene
las cosas simples. Un archivo menos que leer, un formato menos que documentar.

## Trampas

- Si un campo contiene `|`, esto se rompe. Elige un delimitador que tus datos no
  contengan.
- `<<<` (here-strings) es un bashismo. No funcionará en un simple `sh` POSIX. Si
  necesitas compatibilidad POSIX, pasa a través de `echo`:
  `echo "$spec" | IFS='|' read -r name dir remote`. Pero cuidado: en algunas
  shells el `read` se ejecuta en un subshell y las variables no sobreviven al
  pipe. En ese punto, simplemente usa Bash.
- Si hay más campos que variables, la última variable recibe el resto. Menos
  campos que variables y las extras quedan vacías. Ambos comportamientos son
  generalmente lo que deseas.

## Eso es todo

Un array de Bash, un carácter pipe e `IFS` — tres ingredientes, sin dependencias
externas y un formato de datos lo suficientemente legible como para mantenerlo a
mano sin un parser. A veces lo más simple que funciona es lo mejor que funciona.
