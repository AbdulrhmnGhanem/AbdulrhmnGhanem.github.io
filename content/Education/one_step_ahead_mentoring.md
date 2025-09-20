---
title: One Step (ϵ) Ahead Mentoring
tags:
  - Education
  - El Garash
date: 2025-01-12
---

> [T]hat young man has talent; however you should not praise him, for learning everything by himself. A man of talent is not born to be left to himself,
> but devote himself to art and good masters who will make something of him.
>
> — Johann Eckermann, Conversations with Goethe.

But what if the talent doesn't have access to good masters? Or doesn't know that they exist?

Getting my education in a limited resource environment was hard. I was pretty much on my own. If I got stuck, I had no one to ask.
I had to be my own mentor. Older classes were either concerned with conventional career paths or random extracurricular activities.
The faculty (who I later learned were so knowledgeable in their fields) were stretched thin, teaching subjects outside their expertise,
which made me lose trust in their credibility. I had no idea what I was missing out on.

Was it totally bad? No. I learned to be independent, and resourceful. I got well-equipped for the situations where I venture into a territory
where there is actually no one to ask. But what if I was guided better? I don't know, and pretty much don't care at this point. Though, looking at my younger colleagues,
I saw I could make many things easier for them. I took the initiative to mentor them. I am not a master, I am just a tiny bit ($\epsilon$) ahead of them.
But that $\epsilon$ is enough to make a difference. Actually, from [MPC](https://en.wikipedia.org/wiki/Model_predictive_control) perspective, I don't need to know the entire trajectory to guide them. I just need to know the next step.

A year after graduating I read [[Readings/The Idea Factory]], I fall in love with Bell Labs. I tried to replicate their operations in #El-Garash.
Little did I notice that I am not backed by AT&T. During my supervision of [Al Ajwad team](https://github.com/ElGarash/Al-Ajwad/)
I made the team work in the LAB fashion; fast-lean experiments, ready-shoot-aim (ansatz) style of work, write report for every experiment,
get the reports signed off by other peers.
The project failed in achieving its goals because I was focused on the process rather than the outcome.
And it isn't your conventional project management type of work. It is a research project, and they didn't have any funding.
I redacted this strategy and focused on providing guidance on the next tiny step (the $\epsilon$).

> [!note]- The epsilon (ϵ)
> In mathematics, the epsilon ($\epsilon$) is used to represent a very small quantity. For example, machine epsilon is the smallest number representable by
> a computer. In a standard 64-bit machine:
>
> > `python -c "import sys; print(sys.float_info.epsilon)"`
> >
> > 2.220446049250313e-16
>
> which is really tiny.

## A list of my ϵs

### Success

#### 1. Luck favors the prepared mind

One of my favorite lecture series is [Learning to learn](https://www.youtube.com/playlist?list=PL2FF649D0C4407B30) by
Richard Hamming (from Bell Labs). He gave this lecture series to grad student in engineering and science.
I can't remember how many times he said: luck favors the prepared mind. Some opportunities will come across your way,
if you aren't prepared you won't even notice them, forget about taking advantage of them.

<!-- markdownlint-disable MD033-->
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/FlTybZvds0U?si=95kYeElbiJiKPi6f" style="max-width: 90svw;"
title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

#### 2. Reproducibility

> Success without duplication is merely future failure in disguise.

You should study your success not your failures, by studying failures you won't make the same mistakes, but you won't develop a recipe for success.
Look for a common pattern in your successes, make a hypothesis that they are the main factors for success, test the hypothesis,
and ignore the false positives (this is good a strategy for debugging 😉).

### Failure

#### 1. Humiliation

If you talk publicly about your work (which you should definitely do), and there is a chance that you will fail at it.
You will feel humiliated. Don't develop a coping strategy (not pushing yourself or sheltering yourself from the public).
But at the same time protect your reputation. You can afford to fail, but you can't afford to be seen as a failure.

#### 2. Hope isn't a strategy

If something is going to fail, it will fail. You are an engineer, you should have this as a second nature.
Whether it's a live demo, or your laptop getting stolen on the dissertation night. Eliminate single points of failure.
You should be prepared. And do develop an instinct for being a pessimist (in good sense)
I recommend reading [Set Phasers on Stun](https://www.goodreads.com/en/book/show/1066702.Set_Phasers_on_Stun) and
[The Atomic Chef](https://www.goodreads.com/book/show/306429.The_Atomic_Chef) to get some paranoia.

#### 3. Pushing the limits

Growing is correlated to how much you will push yourself. But keep yourself under the breaking point.
If all your projects are out of your depth, you are going to accumulate so many failures. You lose your internal credibility.
Bunch above your weight, but incrementally. I can't insist more on the importance of developing the habit of finishing projects.
The majority of undergrad students, including myself back then, have the habit of abandoning a project once it gets hard, most likely on the 80% mark.
But real sustainable growth comes from the last 20% which are usually the hardest.

#### 4. Avoid the sunk cost fallacy

Don't fall in love with your work. And keep a decision log. Sometimes you will find yourself going in a certain direction just because
you have invested so much time in it, and you will forget why you started it in the first place. A decision log will help you remember why
you made a certain decision, and it will be much easier to correct your course.

#### 5. Be wary of the imposter syndrome

This is contrary to what you might have hear about it. I am not trying to flatter you. If you are growing yourself thin,
most of the time you are an actual imposter, and you will know it. Get your fundamentals right, and surround yourself with people
who would call you out on your half-baked work.

### Labeling yourself

#### 1. I'm `X` developer

I am not against specialization, I am against specialization that will make you settle. Do you want to become a cog in someone's machine? Large
corporates will favor you, but you will turn into a technology person than actual engineer. Pick a specialty that will give some career stability,
but don't sacrifice attaining fundamental knowledge because you are a React developer now.

> The most momentous personality changes occur between age eighteen and one’s late twenties, so specializing early is a task of predicting match
> quality for a person who does not yet exist. It could work, but it makes for worse odds. Plus, while personality change slows, it does not stop at any age.
> Sometimes it can actually happen instantly.
>
> ...
>
> It might seem that nothing would be easier than deciding what you like, but it turns out to be hard,
> partly because it’s hard to get an accurate picture of most jobs. Most of the work I’ve done in the last ten years didn’t exist when I was in high school.
> ...
> In such a world it’s not a good idea to have fixed plans.
>
> — David Epstein, Range: Why Generalists Triumph in a Specialized World.

#### 2. Other majors

The only difference I see between CS major and computer engineering is that the latter is surrounded by other engineering majors.
Make use of it. During your career the hardest problems you will face will arise from domain problems, not reversing a binary tree.
Know as much as you can about other majors. Pick their lingo. And don't be afraid of jargon, most ideas are just recycled with different names.

> There is a dynamic balance in using three people with different perspectives. The energy of creativity has its own momentum.
> A single person in charge would be like a single helicopter blade, which, if placed alone to rotate, would fly off and render the craft unusable.
> Three blades provide balance, allowing a central stability, with each blade rotating independently, with their collective momentum
> being held in balance and in check at the center point.
>
> — Alberto S. Silveira Jr., Building and Managing High-Performance Distributed Teams.

#### 3. Only if I attended Harvard

Yes, getting into an Ivy League school will open doors for you. But don't get fixated on the idea.
We are so privileged that you can get the same quality of education from the internet.
The only difference is the community, and you can compensate for this with online communities. And if you don't believe me, watch this 👇️

<iframe width="560" height="315" style="max-width: 90svw;" src="https://www.youtube-nocookie.com/embed/3UEwbRWFZVc?si=C9NuuTq_COOhxoxh"
title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Mathematics

#### 1. Mathematics isn't numerics

During my undergraduate years, the mathematics course were insufferable to me. I have grown tired of the mechanical part of it.
A computer can do the mechanical part, why would I bother?
And this is my biggest regret. If you have the intention to do any R&D type of work you should have a solid foundation in mathematics.
And you don't need to be able to write proofs.
But you should be able to read a formula and implement it, a strong command of numerical packages.
I would say if you can (with a computer) analyze a linear system, solve a system of ODEs, DAEs, and PDEs, choose a right solver for an optimization problem, statstical modeling and interpretation,
and have strong grasp of numerical stability and errors you are well-equipped to whatever scientific field you are going to choose.

#### 2. Science vs Engineering

The difference between science and engineering is that the in engineering if you don't know what you are doing you are a bad engineer, on the other hand,
in science if you know what you are doing, you are a bad scientist. If you want to do fundamental research, the above aren't enough. But in engineering
you will use battle-tested tools which in most cases has turned into a technology rather than a science.

### Be an apprentice

If you interact with others from a position of superiority, you will miss out. Everybody has something to teach you. During your first years, be a sponge to knowledge.
Filter and contemplate, but listen more than you talk. Find a good mentor, if you can't, read books of written by prolific people in your field.

Start by copying, then modify, then innovate. You won't develop your taste without looking at excellent work.

### Tools

#### 1. Write now thank me later

Writing is the best tool you can have. Put your ideas on paper. And learn to write for the right purpose. Are you righting to think, to communicate, or to persuade?
It astonishes me when I get back to my freshmen year notes and read how I approached problems. Sometimes I get embarrassed by the amount of naivety I had, other times
I can't believe that I was that clever. Check out the [devwriting repository](https://github.com/Nutlope/devwriting?tab=readme-ov-file) and watch this 👇️

<iframe width="560" height="315" style="max-width: 90svw;" src="https://www.youtube-nocookie.com/embed/vtIzMaLkCaM?si=O6lGvdFJr89QbyZV" 
title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

#### 2. My shinny new hammer

I remember I tried to convince my control professor to use Python instead of MATLAB. Python is objectively better than MATLAB in every aspect. But there is **no** other
language that comes close to MATLAB when it comes to control. The problem I had then was that I was trying to make use of whatever the newest thing I learned for
everything without respecting "the right tool for the right job". Don't let your learning to be hype-driven.

#### 3. Premium features

If you are broke, replicating the premium features of the tools you use regularly is great, real experience.

### Collaboration

Maybe the idea of the lone star is appealing to you. But the world no longer operates like Netflix's movies. If you are on your own you won't get so far.
Maybe an indie dev or something. The easiest way of becoming good at something is to surround yourself by people who are either good at it or trying to.
And if you enter the work force after spending your college years working in isolation, I suspect you will be defensive, and lacking so many crucial skills.
Realize that your colleagues aren't your competition, there are millions working on your field, compete with whomever you want but your colleagues.
If you think you are really smart, then use it pull your friends around you up (in moderate way don't burn yourself out).
And finally if you're working with a team, give credit to everyone, for exactly what they did, no more no less. And selling yourself short isn't humility.

### How not to learn

#### 1. JIT vs AOT

Just like compilers. In some scenarios you will need to learn AOT (ahead of time) and in others JIT (just in time) will be enough. Your fundamentals should be AOT.
Domain knowledge and tools can and should be JITed.

#### 2. The best book

Stop looking for the best book, or course on a topic before you start learning it. You will never find it because it doesn't exist. People are different
what makes a good writer for you won't necessarily be the same for me. Start with a decent book. Avoid hopping from one book to another. Will become expert
in chapter one, nothing more.

#### 3. Over-engineering

> Q: What is the difference between an optimist, a pessimist, and an engineer?
>
> A: An optimist sees a glass half full, a pessimist sees a glass half empty, an engineer sees a glass twice as big as it needs to be.

In general, over-engineering is bad. But if it's a deliberate practice you learn a lot, and you will learn to spot and over-engineered solution when you see one.
In real work be allergic to over-engineering, the simplest solutions are the most powerful. You can always add complexity, but stripping it down is hard.
