# C64 assets

- `matrix-v1.d64`: Matrix screensaver v1 disk image
- `matrix-v1.prg`: Matrix screensaver v1 program extracted from `matrix-v1.d64` for browser emulators that do not load D64 images
- `matrix-v2.prg`: Matrix screensaver v2 program

To re-extract `matrix-v1.prg` from the D64 image:

```zsh
c1541 -attach static/c64/matrix-v1.d64 -read "the-matrix.d64" static/c64/matrix-v1.prg
```

