+++
title = "Stochastic Parrot"
description = "A sceptical metaphor for what large language models are doing when they sound like they understand us — where the phrase came from, and why it still stings."
date = 2026-04-15

[taxonomies]
categories = ["Word of the Day"]
tags = ["word of the day", "language", "ai", "criticism"]

[extra]
toc = false
+++

A **stochastic parrot** is a sceptical metaphor for what large language models
are doing when they produce fluent, plausible, apparently knowledgeable text:
stitching together statistically likely sequences of tokens drawn from their
training data, without any grounding in the world the words refer to. It is a
deliberate cold splash, aimed at a field that had begun to speak as if fluency
were the same thing as understanding.

The phrase was coined in the 2021 paper _On the Dangers of Stochastic Parrots:
Can Language Models Be Too Big? 🦜_ by Emily M. Bender, Timnit Gebru, Angelina
McMillan-Major, and "Shmargaret Shmitchell" (a pseudonym adopted by Margaret
Mitchell after internal pressure at Google). The paper became more famous for
its consequences than for its core argument — Gebru and Mitchell were both
pushed out of Google shortly after it circulated internally — but the argument
itself is worth rereading on its own terms.

## The argument

Break the phrase apart:

- **Stochastic**: randomly sampled according to a probability distribution. At
  each step, the model has a distribution over possible next tokens and draws
  from it.
- **Parrot**: a creature capable of reproducing the sounds of speech without, in
  the strong reading, necessarily understanding them.

A stochastic parrot is therefore a system that generates plausible language by
sampling from learned co-occurrence patterns, without any model of the meaning,
truth, or intent behind what it says.

The authors' concerns went well beyond "does it really understand?". They
included the environmental cost of training ever-larger models; the tendency of
internet-scale training data to encode and amplify the biases of whoever had the
platform to publish at scale; the opacity of corpora so large that they cannot
be meaningfully audited; and the risk of mistaking fluency for reliability in
high-stakes domains like health, law, and hiring. The parrot was only one image
in a broader warning.

## The afterlife

Five years on, "stochastic parrot" has become something between a technical
shorthand and a political slogan. For sceptics, it is a reminder that an
essay-long stretch of fluent prose is not evidence of inner reasoning. For
enthusiasts, it has become a strawman they like to demolish by pointing at
capabilities the original metaphor was never claiming to rule out. Both camps
have learned to deploy the phrase without quite meaning the same thing by it.

The truth, as is usually the case with labels that catch on, is somewhere
uncomfortable in the middle. Modern frontier models clearly do more than stitch
n-grams, and the "parrot" image undersells their ability to compose, abstract,
and generalise. But they also, clearly, confabulate with great fluency,
confidently assert things they have no way to know, and produce well-formed
sentences that are simply not true. Whatever word we settle on for what they are
doing, _stochastic parrot_ has permanently made it harder to confuse eloquence
with comprehension — which was the whole point.
