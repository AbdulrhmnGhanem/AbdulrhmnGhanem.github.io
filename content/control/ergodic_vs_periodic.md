---
title: Ergodic vs Periodic Signals
draft: false
tags:
  - signals
  - system identification
  - julia
date: Jan 13, 2024
---

You know that a periodic signal has some sort of structure that repeats itself over time. For example, a sine wave is periodic because it repeats itself after a certain time. But what about stochastic signals? Do they have a similar property? The answer is yes, but it's not called periodicity. It's called ergodicity. But before we get into that, let's first define what a deterministic signal is.

## (Non-)Deterministic Signals

I love "reverse definitions", so let's start by defining the opposite, what would be a non-deterministic signal? A signal with some sort of uncertainty. The [Algorithms for Decision Making](https://algorithmsbook.com/) book defines four types of uncertainty:

1. `outcome uncertainty` $\to$ the effects of an event are uncertain,
2. `model uncertainty` $\to$ our model of the problem is uncertain,
3. `state uncertainty` $\to$ the true state of the environment is uncertain, and
4. `interaction uncertainty`$\to$ the behavior of the other agents interacting in the environment is uncertain.

If we re-adapt these definitions to signals, we can say that the uncertainty of a signal can be caused by:

1. `outcome uncertainty` $\to$ there is no mathematical definition of the value of signal $u(t)$, for example, the smell of a flower,
2. `model uncertainty` $\to$ we know the structure of the signal, but we don't know the parameters,
   for example, u(t) = sin(t + $\theta$), where $\theta \in$ Uniform[0, 2$\pi$]. Or we knew the parameters but these parameters changes over time (the case for robust control),
3. `state uncertainty` $\to$ let $u(t) = x(t) + n(t)$, where $x(t)$ is a deterministic signal and $n(t)$ is a noisy component, we compute $n(t)$ by sampling an `PRNG (Pseudo Random Number Generator)`: the value of $n(t)$ depends on the state of the PRNG,
4. `interaction uncertainty`$\to$ let $u(t)$ and $v(t)$ be two signals that are transmitted over two different channels, and in a subset of the time a cross-talk happens between the two channels.

==So I call a signal that doesn't have any of these four types of uncertainty: a deterministic signal. And a signal that has == `model`== or ==`state` ==uncertainty: a stochastic signal.==

> [!note]- Realization and manifestation uncertainty
> `Outcome`, `model`, and `interaction` uncertainties may manifest in signals that didn't go through any sort of processing while `state` uncertainty is a realization uncertainty: if we write a program to compute $u(t) = x(t) + n(t)$, each run (realization) of the program will have different output. But if we seed the PRNG with a fixed value, then the output will be deterministic. The first three are scientific problems while the last one is an engineering problem.

## Ergodic signals

An ergodic signal is a stochastic signal that has a repeating structure over time. For example, let $u(t)$ be a stochastic signal with a mean $E[u(t)] = m_u$, we can say that $u(t)$ is ergodic if:

$$
Pr[\lim_{N \to \infty}\frac{1}{N}\int_{0}^{N-1}u(t)dt=m_{u}]=1.
$$

In colloquial terms: if we take a long enough sample of the signal, the average of the sample will be equal to the mean of the signal. This is similar to the definition of a periodic signal, but instead of repeating the exact same pattern, the signal repeats the same statistical properties.

## Generating an ergodic signal in Julia

First we start by generating a multisine signal with the frequencies $f \in \{2, 4, 16, 20, 34, 50\}$ Hz. This is a deterministic signal, every time we run the code we get the same signal. It will always have zero mean.

![[ergodic_vs_periodic_01.svg]]

Now we add some white noise to the signal with a mean of 1 and a standard deviation of 0. This is a stochastic signal, every time we run the code we get a different signal. The following animation demonstrates the realization uncertainty of the signal. Although we get a different signal for each realization, the statistical property of mean ($\mu = 1$) is the same for all realizations (you can notice the horizontal at $x = 1$ line getting bolder and bolder with each realization).
![[ergodic_vs_periodic_02.gif]]

### The implementation 🖥️

```julia
using FFTW, Plots, Statistics


"""
Generate a multisine signal of that inculdes the specified frequencies
with a white noise component.
"""
function noisy_multisine_signal(fₛ, duration, freqs, noise_amplitude)
   N =  fₛ * duration
   signal_freq = zeros(Complex{Float64}, N)

   # Set the frequency components
   for freq in freqs
   idx = (N * freq ÷ fₛ) + 1
   signal_freq[idx] = 1.0
   end

   # Perform IFFT to get the time-domain signal
   signal = ifft(signal_freq) * N

   # add white noise with a mean of 1
   noise = randn(size(signal)) * noise_amplitude .+ 1.0
   signal += noise

   return real(signal)
 end


 function plot_signals(t, signals, fs)
   N = length(signals)
   la = N == 1 ? 1 : 0.3
   title = N == 1 ? "Single Multisine realization" : "$N Multisine realizations"
   theme = theme_palette(:auto)

   # setup
   p = plot(;xlabel="Time (s)",
   ylabel="Amplitude",
   title,
   legend=false,
   ylims=(-6, 8)
   )

   for signal in signals
     p = plot!(t, signal; color=theme[1], la)
     p = hline!([mean(signal)]; color=theme[2], la)
   end
   p
 end

# Parameters
fₛ = 1000  # Sampling frequency in Hz
duration = 1  # Duration of the signal in seconds
freqs = [2, 4, 16, 20, 34, 50]  # Frequencies in Hz
noise_amplitude = 0.4
num_realizations = 100

# Generate and plot multiple realizations
signals = [noisy_multisine_signal(fₛ, duration, freqs, noise_amplitude)
          for _ in 1:num_realizations]

plot_signals(0:1/fₛ:duration - 1/fₛ, signals, fₛ)
```
