+++
title = "Lissajous / Vectorscope Display"
description = "The hypnotic curves traced by two sinusoids plotted against each other — and why mix engineers stare at them to keep stereo images honest."
date = 2026-03-05

[taxonomies]
categories = ["Word of the Day"]
tags = ["word of the day", "audio", "signal processing", "oscilloscope"]

[extra]
toc = false
+++

A **Lissajous figure** is the pattern traced on an oscilloscope — or in a
mathematician's imagination — when two perpendicular sinusoidal signals are
plotted against each other, one driving the horizontal axis and the other the
vertical. Named after the 19th-century French physicist Jules Antoine Lissajous,
who first studied them around 1857 using mirrors glued to vibrating tuning
forks, they are the visual signature of the relationship between two
oscillations.

When the two signals have the same frequency and the same phase, you get a
diagonal line. Shift one by 90° and the line opens into a circle. Different
frequency ratios produce closed looping curves whose number of lobes is set by
the ratio of the two frequencies. If the frequencies are not in a rational
ratio, the curve never quite closes — it slowly precesses, drawing an
ever-denser spiderweb that would, given infinite time, fill the entire box.

## The vectorscope

In audio engineering, a **vectorscope** is a Lissajous display with a very
specific job: it shows the left channel against the right channel, rotated 45°
so that a pure mono signal appears as a vertical line. This turns the abstract
concept of stereo imaging into something you can see directly.

- **Mono-compatible signal** — traces close to the vertical axis.
- **Wide stereo** — energy spreads out horizontally around the centre.
- **Out-of-phase signal** (a mix engineer's nightmare, because it disappears
  when summed to mono) — traces along the horizontal axis.
- **Perfectly correlated stereo** — a thin vertical line.
- **Perfectly uncorrelated noise** — a diffuse cloud filling the box.

Mix engineers use vectorscopes to catch phase problems they cannot reliably
hear, to verify that a track will still make sense when summed to mono for a
phone speaker, and to judge stereo width at a glance. Broadcast engineers use
them to guarantee a signal is safe for transmission. Long before digital
frequency counters existed, electronics technicians used Lissajous figures to
measure unknown frequencies and phase differences by matching them against a
reference.

They are also, just as a matter of pure aesthetics, one of the most beautiful
things that physics accidentally draws. Two pendulums swinging at an irrational
ratio, a pair of tuning forks, a stereo mix of a cello — they all leave the same
family of fingerprints on the scope. Once you learn to read them, you cannot
look at a green phosphor screen the same way again.
