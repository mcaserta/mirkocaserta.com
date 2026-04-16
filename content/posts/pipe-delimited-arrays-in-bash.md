+++
title = "Pipe-delimited arrays in Bash"
date = 2026-04-16
description = "A simple pattern for storing structured records in a Bash array and splitting them with IFS."

[taxonomies]
categories = ["Software"]
tags = ["bash", "shell", "software development"]
+++

I needed a way to declare a list of git repositories in a shell script — each
with a short name, a local path, and a remote URL — and then iterate over them
in both a bootstrap script and a status script. No YAML parser, no jq, no
external dependencies. Just Bash.

Here's what I landed on.

## The data

```bash
REPO_SPECS=(
  "website|website/anode-labs.com|https://github.com/mcaserta/anode-labs.com.git"
  "bitcrust|product/bitcrust|https://github.com/mcaserta/bitcrust.git"
  "presitter|product/presitter|https://github.com/mcaserta/presitter.git"
  "stepbruv|product/stepbruv|https://github.com/mcaserta/stepbruv.git"
)
```

`REPO_SPECS` is a plain Bash indexed array. Each element is a single string with
three fields separated by `|`. You could use any delimiter that won't appear in
your data — pipe works well because it's unlikely to show up in file paths or
URLs.

## Iterating and splitting

```bash
for spec in "${REPO_SPECS[@]}"; do
  IFS='|' read -r name dir remote <<< "$spec"

  echo "name=$name dir=$dir remote=$remote"
done
```

Two things are doing the heavy lifting here:

1. `"${REPO_SPECS[@]}"` expands the array so that each element becomes a
   separate word in the `for` loop. The double quotes matter — without them,
   elements containing spaces would be split further by the shell.

2. `IFS='|' read -r name dir remote <<< "$spec"` splits the current element on
   `|` and assigns the three resulting tokens to `name`, `dir`, and `remote`.

The `IFS='|'` prefix sets the field separator only for the `read` command — it
doesn't change `IFS` for the rest of the script. The `-r` flag prevents
backslash interpretation. The `<<<` (here-string) feeds the variable's value
into `read`'s standard input.

Running the loop above prints:

```text
name=website dir=website/anode-labs.com remote=https://github.com/mcaserta/anode-labs.com.git
name=bitcrust dir=product/bitcrust remote=https://github.com/mcaserta/bitcrust.git
name=presitter dir=product/presitter remote=https://github.com/mcaserta/presitter.git
name=stepbruv dir=product/stepbruv remote=https://github.com/mcaserta/stepbruv.git
```

## A real example

In my workspace bootstrap script, the pattern looks like this:

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

A status script sources the same repos.sh file and uses the same `IFS='|' read`
pattern to print branch and dirty-state info for each repo. One data file, two
consumers, zero parsing libraries.

## Why not associative arrays?

Bash 4+ has associative arrays, but they only give you one value per key. Here I
need three fields per entry _and_ I want to preserve declaration order
(associative arrays don't guarantee it). Pipe-delimited strings in an indexed
array solve both problems without any ceremony.

## Why not a CSV or a config file?

You could absolutely use an external file and parse it with `awk` or `cut`. But
for a handful of records that are tightly coupled to the scripts that consume
them, inlining the data in a sourced `.sh` file keeps things simple. One fewer
file to read, one fewer format to document.

## Gotchas

- If a field itself contains `|`, this breaks. Pick a delimiter that your data
  won't contain.
- `<<<` (here-strings) are a Bash-ism. This won't work in plain POSIX `sh`. If
  you need POSIX compatibility, pipe through `echo` instead:
  `echo "$spec" | IFS='|' read -r name dir remote`. But beware: in some shells
  the `read` runs in a subshell and the variables won't survive the pipe. At
  that point, just use Bash.
- If you have more fields than variables, the last variable gets the remainder.
  Fewer fields than variables and the extras are empty. Both behaviors are
  usually what you want.

## That's it

A Bash array, a pipe character, and `IFS` — three ingredients, no external
dependencies, and a data format that's readable enough that you can maintain it
by hand without a parser. Sometimes the simplest thing that works is the best
thing that works.
