+++
title = "RAG"
description = "Retrieval-Augmented Generation — how language models learn to reach outside themselves for facts, and why it matters that they do."
date = 2026-04-16

[taxonomies]
categories = ["Word of the Day"]
tags = ["word of the day", "ai", "architecture", "language"]

[extra]
toc = false
+++

**RAG**, short for Retrieval-Augmented Generation, is an architectural pattern
for building AI applications that combines a language model with a searchable
external knowledge base. Instead of relying solely on facts baked into its
parameters during training, a RAG system retrieves relevant documents at query
time and hands them to the model as context before it generates a response.

The basic flow is as follows: a user submits a query; the system converts that
query into a numerical vector (an _embedding_) that represents its meaning; it
searches a database of similarly embedded documents for the nearest neighbours;
it prepends those documents to the prompt; and finally the language model
generates a response grounded in what it just read. The retrieval step is
usually done over a _vector store_ — a database optimised for similarity search
— though hybrid approaches combining keyword and semantic search are common.

## Why it exists

Language models have two stubborn limitations that RAG addresses in one move.

The first is the **knowledge cutoff**. A model trained on data collected up to a
certain date knows nothing that happened after it. Asking it about last week's
earnings call, a newly published study, or a regulation that changed this
quarter will get you either an admission of ignorance or, more dangerously, a
confidently fabricated answer. RAG replaces the closed memory of the model with
an open, updatable store.

The second is **hallucination**. Models trained purely to predict plausible
continuations will sometimes produce plausible continuations that are simply
false. Grounding the generation in retrieved source documents gives the model
something real to anchor to — and, crucially, gives the user something to cite
and verify. A response that ends with "Source: Q1 2025 investor report, p. 14"
is auditable in a way that a response from a bare model is not.

## What it does not fix

RAG is not a cure. It is a circuit break between a model's tendency to
confabulate and the user's need for accurate information — but only as good as
the retrieval.

If the relevant document is not in the store, the model is back to guessing. If
the retrieved documents are stale, contradictory, or poorly chunked, the model
will faithfully reason over bad inputs and produce wrong answers with misplaced
confidence. The quality of a RAG system lives or dies in its indexing pipeline —
how documents are split, embedded, ranked, and filtered before they ever reach
the model.

There is also a subtler risk: the retrieval step can create a false sense of
groundedness. A response that cites a document is not necessarily a correct
reading of that document. The model can still misquote, misattribute, or
selectively extract — it has just moved the error from confabulation to
misreading, which is a different but equally real failure mode.

## The wider picture

RAG has become the dominant architecture for building AI applications over
private, domain-specific, or frequently updated knowledge. Customer support
bots, internal document assistants, legal research tools, and medical reference
systems all use some variant of it. It is the practical answer to the question
everyone asks when they first understand what language models are: "But how do I
make it work on _my_ data?"

The name, coined in a 2020 paper from Meta AI by Patrick Lewis and colleagues,
has stuck because it describes the function cleanly. _Retrieve, then generate._
The interesting engineering is in the retrieve.
