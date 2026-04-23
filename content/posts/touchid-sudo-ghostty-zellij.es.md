+++
title = "Touch ID para sudo en Ghostty y zellij"
date = 2026-04-23
description = "Cómo hacer que el prompt de Touch ID funcione con sudo en macOS, incluyendo el workaround de pam_reattach necesario dentro de multiplexores de terminal como zellij y tmux."

[taxonomies]
categories = ["Software Development"]
tags = ["macos", "terminal", "zellij", "ghostty", "sudo"]

[extra]
toc = false
+++

Escribir la contraseña cada vez que ejecutas `sudo` en macOS cansa. Touch ID
puede ocuparse de ello, y en las versiones recientes de macOS la configuración
sobrevive a las actualizaciones del sistema. Así es como lo configuré en mi
flujo de trabajo con Ghostty + zellij.

## El enfoque limpio: sudo_local

A partir de macOS Sonoma (14), Apple añadió un archivo de plantilla pensado
específicamente para personalizaciones locales de PAM. Úsalo en vez de editar
`/etc/pam.d/sudo` directamente, que se sobrescribe en cada actualización mayor
del sistema operativo.

```bash
sudo cp /etc/pam.d/sudo_local.template /etc/pam.d/sudo_local
sudo $EDITOR /etc/pam.d/sudo_local
```

Descomenta la línea `pam_tid.so` para que el archivo contenga:

```
auth       sufficient     pam_tid.so
```

Abre un terminal nuevo, ejecuta `sudo whoami` y deberías recibir un prompt de
Touch ID.

## El problema con los multiplexores de terminal

Si lanzaste ese comando `sudo` desde dentro de una sesión de zellij (o tmux, o
screen), el prompt de Touch ID nunca aparece. El multiplexor se desvincula de la
sesión gráfica que Touch ID necesita, así que `pam_tid.so` cae silenciosamente a
la autenticación por contraseña.

La solución es un pequeño módulo PAM llamado `pam_reattach` que vuelve a
vincular el proceso `sudo` a la sesión gráfica del usuario antes de que se
ejecute la autenticación.

```bash
brew install pam-reattach
```

Luego edita `/etc/pam.d/sudo_local` otra vez. El orden importa: `pam_reattach`
tiene que ejecutarse antes que `pam_tid`.

En Apple Silicon:

```
auth       optional       /opt/homebrew/lib/pam/pam_reattach.so
auth       sufficient     pam_tid.so
```

En Macs con Intel, la ruta es `/usr/local/lib/pam/pam_reattach.so` en su lugar.

Ahora `sudo` funciona con Touch ID desde dentro de un panel de zellij.

## Qué no funciona

Algunas cosas a tener en cuenta:

- **Sesiones SSH**: Touch ID requiere presencia local, así que el `sudo` remoto
  sigue necesitando tu contraseña.
- **Desbloqueo con Apple Watch**: es un mecanismo aparte. Desbloquea el Mac y
  aprueba algunos prompts de seguridad, pero no sustituye a `pam_tid` en `sudo`.
- **Actualizaciones de pam-reattach con Homebrew**: si la ruta del `.so` llega a
  cambiar, tu `sudo_local` apuntará a un archivo inexistente y Touch ID dejará
  de funcionar hasta que arregles la ruta. Conviene saberlo si las cosas se
  rompen misteriosamente tras un `brew upgrade`.

## Por qué sudo_local vale el paso extra

Podrías editar `/etc/pam.d/sudo` directamente y obtener el mismo resultado, pero
cada point release de macOS resetea ese archivo. `sudo_local` está diseñado para
persistir y se incluye desde `sudo` automáticamente. Configuración única, se
acabó escribir contraseñas, sin sorpresas tras un `softwareupdate`.
