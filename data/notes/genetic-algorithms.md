---
title: Genetic Algorithms
date: 2019-11-14
tags: [data, digitization, algorithm]
---

## Darwinian Natural Selection

- **Heredity**: There must be a process where children receives properties of their parents.
- **Variation**: There must be variety of traits present in the population or a means that introduces variation.
- **Selection**: There must be a mechanism by which some members of a population have the opportunity to be parents and pass their genetic information and some do not (aka "survival of the fittest")

## Steps Required

- **Setup function**: Create a population of `N` elements with random genetic information.
- **Draw function**:
  - **Selection function**: Calculate fitness for `N` elements.
  - Reproduction/Selection
    - **Reproduction function**: Pick `x` parents.
    - Make a new element (**Variation**)
      - **Crossover function**: Create a "child" by combining the genetic information of these two parents.
      - **Mutation function**: Mutate the child's genetic information based on a given probability
      - Add new child to a new population
- Replace the old population with the new population and return to step 2 (**Selection**)

## Encoding DNA

- **Genotype**: The "data", "encoding" of the DNA.
- **Phenotype**: The "expression", "rendering" of the DNA.

> Thought experiment: If GAs are truly agnostic to their motives, run various GA simulations of the same problem but with different genotypes e.g. strings/polygons vs pure bytes. The algorithm should not care.

## Pool Selection

- Mating Pool
- Rejection Sampling
