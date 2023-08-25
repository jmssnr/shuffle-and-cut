import numpy as np


def riffle_shuffle(deck: list) -> list:
    x = np.sort(np.random.uniform(low=0, high=1, size=len(deck)))
    y = 2 * x % 1
    return [deck[i] for i in np.argsort(y)]


def strip(deck: list) -> list:
    n = len(deck)
    shuffled_deck = []
    while len(deck) > 0:
        slice = np.random.binomial(n, 0.25)
        shuffled_deck = deck[:slice] + shuffled_deck
        deck = deck[slice:]
    return shuffled_deck


def cut(deck: list) -> list:
    slice = np.random.binomial(len(deck), 0.5)
    return deck[slice:] + deck[:slice]
