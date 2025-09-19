---
title: Feedback and Control for Everyone
draft: false
tags:
  - book review
date: Jan 21, 2024
---

I have been trying to read this book for ages. I started reading it in 2022 (senior undergrad): I read few pages and left it, once again in 2023 (gap year), and finally read it in 2024 (first year masters). And this is not because the book is hard, it's the exact opposite. I took several courses covering the book content, so I got bored reading the first few pages. But this year I made a rule for myself that I am only allowed to read control or machine learning books. And this is a light read, so I put between heavier books.

![[book_list.png]]

<center>The book is logged in my reading list in 2022, 2023, and 2024. <code>22/08</code> is the 8th week of my 22nd year.</center>

## The preface

The book delivered on its promise: it doesn't try to be mathematically rigorous and make feedback accessible to everyone.
I really like how they structured the different reading paths:
![[reading_paths.png]]

## Chapters

One major theme of this book is the excellent analogies. For example, when they tried to explain how control systems are ubiquitous, yet invisible:

> Control to systems is mind to brain.

During my undergrad years, the content control textbooks was hard enough for me that I couldn't focus on both theory and practice. For example, on my first pass on observability I didn't appreciate how it adds virtual sensors to system. == I would definitely recommend this book as an accompanying source to conventional textbooks.==The examples in the book covers household system, manufacturing processes, mechanics. But electrical systems are underrepresented, I think is rather unfortunate because electrical systems are usual target for moving from abstract model to refined one.

I loved their definition the signal `bandwidth` and `spectrum`:

> Formally, the bandwidth refers to the range of frequencies a signal is composed of. In colloquial terms, the larger the bandwidth, the faster the signal changes. If referred to a process, for instance a loudspeaker, its bandwidth denotes the range of sound frequencies it reproduces with good fidelity.

> In signal processing, the terms spectrum and bandwidth refer to how important particular pulsations are in its Fourier transform, and this part of the spectrum that contains half the total energy of the signal respectively.

And they have the clearest explanation of degrees-of-freedom and trade-offs that I have ever read:

> The fact we are asking two questions, and have only one degree of freedom to play with, immediately implies that there will have to be a trade-off between these two objectives.

I even learned about some topics that I haven't heard of before:

- Lebesgue sampling
- Deadbeat control
- Attractive stable points
- 2DoF control
- Dual actuators
- Smart dust
- Fourier representation uncertainty principle

Also, I add a couple of books recommended in the `further reading` section to reading list.

Apart from some weird punctuation errors, I didn't find any major issues with the book. Add it to my recommendable light technical reads.
