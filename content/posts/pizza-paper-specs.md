+++
title = "Pizza Paper Specs"
description = "On the checkered paper under the pizza, the sketches drawn between a Margherita and a Diavola, and the grease ring that landed squarely on the retry policy."
date = 2026-04-20

[taxonomies]
categories = ["Software Development"]
tags = ["specs", "documentation", "communication", "engineering", "humour"]

[extra]
toc = false
+++

Rome, a Thursday. Four engineers at a pizzeria on the wrong side of Trastevere,
the kind with paper placemats printed in red-and-white checks and a waiter who
has strong opinions about which oven produces the proper cornicione. Two pizzas
have arrived — a Margherita and a Diavola — and between them, on the strip of
exposed paper, an argument is taking place about a queue.

At-least-once or exactly-once. Someone uncaps a biro. A rectangle appears for
the producer. Two more for the consumers. A shape that is maybe a broker and
maybe a kidney. An arrow loops back into a dead-letter queue drawn, charmingly,
in the silhouette of a mushroom. The retry policy is written in the margin in a
hand that is one glass of Frascati past legible. A grease ring lands squarely on
the retry policy. Nobody notices. The tiramisù arrives. The paper is folded,
pocketed, and is, at this moment, the most accurate representation of the
system's intended behaviour that will ever exist.

This is a **pizza paper spec**, and every engineer has produced one.

## Why the pizza paper wins

Four people. One pen. One pizza. Zero Confluence pages. The decisions happen
with full context and full presence, in a room where everybody is looking at the
same object, and the object is small enough to fit between two plates. There is
no scrolling. There is no reviewer cycle. There is no "let's take this async."
The disagreement resolves itself because the disagreement has to resolve itself
before the pizza goes cold.

A forty-page PRD cannot do this. A forty-page PRD is a document produced by
people who have already stopped talking to each other. The pizza paper is the
opposite artefact: it is the residue of a conversation that actually happened.
The grease is proof of life.

## Why the pizza paper loses

It is Thursday. By Monday, the paper is in a bin in Trastevere. The retry policy
under the grease ring is now in production as whatever the dev remembered on the
train home, which, it turns out, was not quite what was drawn. The dead-letter
mushroom has become three different dead-letter mushrooms in three different
services, each with its own theory of idempotency.

The junior who joined in March cites "the pizza paper" in code review like
scripture. Nobody has seen the pizza paper. Nobody will ever see the pizza
paper. The pizza paper is now a load-bearing cultural artefact whose contents
are reconstructed, slightly differently, by each person who invokes it.

## Schrödinger's spec

A pizza paper spec is simultaneously the best and the worst document your team
has ever produced, and the state collapses the moment somebody asks, six months
later, _wait, what did we actually decide about idempotency?_

The craft is not "always write it up" and it is not "trust the pizza paper." It
is knowing which moment you are in. Kickoff, discovery, an architectural
disagreement between people who already trust each other — pizza paper is
perfect, and any heavier instrument would have killed the conversation before it
started. But a system of record, an onboarding artefact, anything a future
stranger will need to read — photograph the paper before the tiramisù arrives,
and type it up before you sleep.

The grease is a feature of the decision. It should not become a feature of the
documentation.
