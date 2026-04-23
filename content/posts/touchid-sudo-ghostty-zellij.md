+++
title = "Touch ID for sudo in Ghostty and zellij"
date = 2026-04-23
description = "How to get the Touch ID prompt to work with sudo on macOS, including the pam_reattach workaround needed inside terminal multiplexers like zellij and tmux."

[taxonomies]
categories = ["Software Development"]
tags = ["macos", "terminal", "zellij", "ghostty", "sudo"]

[extra]
toc = false
+++

Typing your password every time you run `sudo` on macOS gets old. Touch ID can
handle it, and on recent macOS versions the setup survives system updates. Here
is how I set it up on my Ghostty + zellij workflow.

## The clean approach: sudo_local

Starting with macOS Sonoma (14), Apple added a template file specifically for
local PAM customizations. Use it instead of editing `/etc/pam.d/sudo` directly,
which gets overwritten on every major OS update.

```bash
sudo cp /etc/pam.d/sudo_local.template /etc/pam.d/sudo_local
sudo $EDITOR /etc/pam.d/sudo_local
```

Uncomment the `pam_tid.so` line so the file contains:

```
auth       sufficient     pam_tid.so
```

Open a new terminal, run `sudo whoami`, and you should get a Touch ID prompt.

## The catch with terminal multiplexers

If you launched that `sudo` command from inside a zellij session (or tmux, or
screen), the Touch ID prompt never appears. The multiplexer detaches from the
GUI session that Touch ID needs, so `pam_tid.so` silently falls through to
password auth.

The fix is a small PAM module called `pam_reattach` that re-attaches the `sudo`
process to the user's GUI session before authentication runs.

```bash
brew install pam-reattach
```

Then edit `/etc/pam.d/sudo_local` again. Order matters: `pam_reattach` has to
run before `pam_tid`.

On Apple Silicon:

```
auth       optional       /opt/homebrew/lib/pam/pam_reattach.so
auth       sufficient     pam_tid.so
```

On Intel Macs, the path is `/usr/local/lib/pam/pam_reattach.so` instead.

Now `sudo` works with Touch ID from inside a zellij pane.

## What doesn't work

A few things to keep in mind:

- **SSH sessions**: Touch ID requires local presence, so remote `sudo` still
  needs your password.
- **Apple Watch unlock**: this is a separate mechanism. It unlocks the Mac and
  approves some security prompts, but it does not substitute for `pam_tid` in
  `sudo`.
- **Homebrew upgrades of pam-reattach**: if the `.so` path ever changes, your
  `sudo_local` will point at a missing file and Touch ID will stop working until
  you fix the path. Worth knowing if things break mysteriously after a
  `brew upgrade`.

## Why sudo_local is worth the extra step

You could edit `/etc/pam.d/sudo` directly and get the same result, but every
macOS point release resets that file. `sudo_local` is designed to persist, and
it is included from `sudo` automatically. One-time setup, no more password
typing, no surprise regressions after `softwareupdate`.
