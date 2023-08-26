from api.service import simulate_shuffle_sequence
from api.schemas import SimulationResult
import pytest


def test_returns_valid_response():
    id = "sim-1"
    repeats = 5
    steps = [{"id": "riffle"}, {"id": "strip"}]
    output = simulate_shuffle_sequence(id, repeats, steps)
    assert SimulationResult.model_validate(output)


def test_raises_error_if_step_does_not_exist():
    id = "sim-1"
    repeats = 5
    steps = [{"id": "doesNotExist"}]

    with pytest.raises(KeyError):
        simulate_shuffle_sequence(id, repeats, steps)
