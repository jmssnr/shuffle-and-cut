import numpy as np
from api.schemas import SimulationResult, Shuffle
from fastapi.exceptions import HTTPException


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


def _run_simulations(repeats: int, steps: list[callable]) -> list[list[int]]:
    simulations = []
    for _ in range(0, repeats):
        deck = list(range(1, 53))
        for step in steps:
            deck = step(deck)
        simulations.append(deck)
    return simulations


def _build_model_sequence(steps: list[Shuffle]) -> list[callable]:
    models = {"riffle": riffle_shuffle, "strip": strip, "cut": cut}
    sequence = []
    for step in steps:
        if step.id in models.keys():
            sequence.append(models[step.id])
        else:
            raise HTTPException(
                status_code=400, detail=f"Shuffle with id: '{step.id}' does not exist"
            )
    return sequence


def _compute_probability_density(card_pos: int, simulations: list[list[int]]):
    return np.histogram(
        [idx for sim in simulations for idx, c in enumerate(sim) if c == card_pos],
        52,
        density=True,
    )[0].tolist()


def simulate_shuffle_sequence(
    id: str, repeats: int, steps: list[Shuffle]
) -> SimulationResult:
    sequence = _build_model_sequence(steps)

    simulations = _run_simulations(repeats, sequence)

    result = {
        card: _compute_probability_density(card, simulations)
        for card in list(range(1, 53))
    }

    return SimulationResult(id=id, result=result)
