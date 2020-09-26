---
title: Specs
date: 2020-09-26
tags: [specs, web, dev, learning]
---

It has been awhile since I wrote, and a lot has happened in a short period of time, where I have rapidly learned and ramped up on a variety of projects.  All this boils down to a more active focus on caring about **specs**.

Despite not actively being aware of specs-driven development, I have actually always used this approach at work (subconsciously).  I apply this approach because I realized over time that all problems are inherently due to miscommunication and misinformation that humans have around understanding, building, or implementation of the system.  If the system cannot be described (or specced) or designed from well-behaved parts, how can we expect it to behave correctly at all?

I begin every project with a draft document, and after iterating with coworkers, turn it into a living 'design doc'.  For larger-scoped projects, I would describe the scope, interfaces, and behaviors of the program or system that we intend to build.  What I am lacking is a formal approach to writing these docs.

Over the past few months, exposure to a number of specs-driven open source projects has activated a new mental mode of working:
- https://github.com/unifiedjs/unified
- https://github.com/syntax-tree/hast
- https://github.com/syntax-tree/unist
- https://spec.commonmark.org/
- https://github.com/semver/semver/blob/master/semver.md
- https://html.spec.whatwg.org/dev/


I am excited that I have learned and gained a natural knowledge of writing better specs.  I feel that I am back in my earlier years of learning in college, where mindful studying of materials is important in understanding the subject matter.  In my current situation, a mindful understanding of specs leads to an understanding of the system itself.

My journey of diving deeper (and deeper) into these areas have always triggered by a disatisfaction to how I have approached solving related problems at work.  I realized that I was solving them in a fairly superficial way (applying surface-level solutions using higher-order libraries) instead of actually understanding the problem.

Specific recent examples include dealing with searching/annotating documents, and working with form components.  Just a year ago, my natural response was to look up various JS libraries to solve these problems.  While they are important as an initial approach to solving the problem, I learned that I wasn't actually understanding how it worked since I only had a knowledge of the library's APIs in solving a subset of known problems.  Upon further research, it became more obvious that these libraries were written and designed to solve problems with specific scopes (they are also specced after all!)

There's a tradeoff to be made between simply using a library to solve your problems vs understanding the underlying mechanisms.  It's important to first solve problems through an initial understanding of the problems.  However, the problem space is something that you are actively interested and committed to, learning more about the underlying system through associated specs will pay itself off in the long run.

We are extremely fortunate that the web itself has organically unified itself through a living specification that was battle-tested against various conflicting groups: https://html.spec.whatwg.org/dev/introduction.html#history-2

Personally, as a web developer, I feel it is my job to understand the mechanisms and processes of the web system.  It is time to stop 'messing' around with tools (or toys), and have a deeper understanding of the web itself.  https://html.spec.whatwg.org/dev/ is a huge treasure trove that I am currently diving into, and I will most likely be posting an update about it in the future!
