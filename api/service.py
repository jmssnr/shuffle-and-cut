import numpy as np
from api.schemas import SimulationResult


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


def simulate_shuffle_sequence(
    id: str, repeats: int, steps: list[dict[str, str]]
) -> SimulationResult:
    models = {"riffle": riffle_shuffle, "strip": strip, "cut": cut}

    sequence = []
    for step in steps:
        if step["id"] in models.keys():
            sequence.append(models[step["id"]])
        else:
            raise KeyError(f"Step with id: '{step['id']}' does not exist")

    experiments = []
    for _ in range(0, repeats):
        deck = list(range(1, 52))
        for step in sequence:
            deck = step(deck)
        experiments.append(deck)

    result = {
        card: np.histogram(
            [
                idx
                for res in experiments
                for idx, carde in enumerate(res)
                if carde == card
            ],
            52,
            density=True,
        )[0].tolist()
        for card in list(range(1, 52))
    }

    return SimulationResult(id=id, result=result)
