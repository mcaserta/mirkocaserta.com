+++
title = "Untracker"
description = "I built a $0.99 app that strips tracking parameters from every URL you copy. Here's why, and how it works."
date = 2026-03-31

[taxonomies]
categories = ["Software"]
tags = ["privacy", "ios", "macos", "swift", "app store"]

[extra]
toc = true
+++

Every time you copy a link from Amazon, YouTube, Facebook, or pretty much any
major platform, the URL is carrying invisible baggage: tracking parameters that
identify you, record where you came from, and follow you across the web. The
page loads identically without them. They exist solely to tell the platform that
_you, specifically_ clicked _that specific link_ from _that specific source_.

I got tired of it, so I built [Untracker](https://untracker.app).

## How it started

It began with a simple question I was mulling over: can you automatically strip
tracking parameters from URLs on iPadOS? The answer turned out to be “sort of,
but not elegantly” — Apple’s clipboard restrictions make true background
monitoring impossible on iOS. You can do it via a Share Sheet extension, though.
And on macOS, where clipboard access is unrestricted, you can go the full route:
a menu bar app that silently cleans every URL you copy.

So I built both. One app, universal purchase: the Mac version monitors your
clipboard automatically, the iPhone and iPad version works through a Share Sheet
extension. Copy a link, share it through Untracker, done. The clean URL is on
your clipboard, ready to paste.

## What it strips

Untracker uses the [ClearURLs](https://github.com/ClearURLs/Rules) community
database, which covers over 200 providers and thousands of individual tracking
parameters. Some of the usual suspects:

- `fbclid` — Meta’s click ID, ties your click to your Facebook profile even
  off-platform
- `gclid` — Google’s click ID, connects ad clicks to your Google account
- `utm_source`, `utm_medium`, `utm_campaign` — campaign tracking parameters used
  by basically everyone
- `ref`, `tag` — Amazon’s internal referral and affiliate tracking
- `si` — Spotify and YouTube’s share ID, links the sharer to the recipient
- `igshid` — Instagram’s share tracking
- `mc_eid` — Mailchimp’s email ID, identifies your email address across
  campaigns
- `li_fat_id` — LinkedIn’s first-party ad tracking

The rule database refreshes automatically, so new trackers get covered as the
ClearURLs community adds them.

## Redirect unwrapping

Tracking parameters are the visible part of the problem. The invisible part is
redirect wrapping: when a platform routes your click through their own server
before forwarding you to the actual destination.

Facebook wraps outbound links through `l.facebook.com/l.php?u=`. X/Twitter
shortens everything to `t.co`. Google routes clicks through `/url?q=`. In each
case, the platform logs your click before the redirect happens.

Untracker follows these redirect chains and extracts the real destination URL.
It also resolves URL shorteners like `bit.ly` and `lnkd.in`.

## Before and after

Here’s a real-world example. You search for headphones on Amazon and copy the
link:

```
https://www.amazon.com/dp/B09V3KXJPB?tag=foo-20&ref=pd_rd_r&pd_rd_w=3Kf8g&content-id=amzn1.sym.eb926b83&utm_source=newsletter&utm_medium=email&fbclid=IwAR3xQz7
```

After Untracker:

```
https://www.amazon.com/dp/B09V3KXJPB
```

Same product page. No surveillance.

## What about Safari’s built-in protection?

Since iOS 17, Safari has included Advanced Tracking and Fingerprinting
Protection (ATFP). It’s a step in the right direction, but it has significant
limits:

- It works on a static list that covers a fraction of what the ClearURLs
  database covers.
- It doesn’t follow redirect chains or unwrap URL shorteners.
- It only cleans URLs during navigation in Safari — it doesn’t touch URLs you
  copy and share through Messages, WhatsApp, Slack, email, or any other app.
- Until iOS 26, it was only active by default in Private Browsing.

That last point matters most. The majority of tracking pollution happens when
you _share_ a link, not when you _click_ one. When you paste a tracked URL into
a group chat, everyone who clicks it carries your tracking payload. Clean links
aren’t just self-protection — they’re a courtesy.

## Custom rules

Beyond the ClearURLs database, Untracker supports custom cleaning rules with
regex patterns. You can define your own rules, import and export rule sets as
JSON, and your custom rules are always checked first — your intent wins over the
default database.

I added this because there’s always that one internal tool or niche platform
that nobody else has written a rule for.

## iCloud sync

Settings and custom rules sync across all your devices via iCloud using CRDT
(Conflict-free Replicated Data Type) conflict resolution. Edit a custom rule on
your Mac, it shows up on your iPhone. No account required beyond your Apple ID.

## The privacy part

Untracker contains zero analytics, zero telemetry, zero tracking. The irony
would have been too much.

Everything runs locally on your device. URLs are never sent anywhere. Apple’s
App Store privacy label confirms it: **Data Not Collected**.

## The business model

$0.99 once. Universal purchase — buy it on any Apple platform, get it on all of
them. No subscriptions, no in-app purchases, no ads.

I considered making it free, but I wanted a sustainable model that doesn’t
depend on attention capture or data collection. A dollar felt right. It’s the
price of a coffee from a vending machine, and you get a tool you’ll use every
day without thinking about it.

## Getting started

Untracker is available on the App Store for Mac, iPhone, and iPad:

- [App Store](https://apps.apple.com/app/untracker/id6760624490)
- [Website](https://untracker.app)
- [Privacy Policy](https://untracker.app/privacy)

On Mac, it sits in your menu bar and works automatically. On iPhone and iPad,
add it to your Share Sheet and you’re set.

Life’s too short for 300-character Amazon links.
