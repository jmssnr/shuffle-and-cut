import numpy as np


def riffle_shuffle(deck: list) -> list:
    x = np.sort(np.random.uniform(low=0, high=1, size=len(deck)))
    y = 2 * x % 1
    return [deck[i] for i in np.argsort(y)]
