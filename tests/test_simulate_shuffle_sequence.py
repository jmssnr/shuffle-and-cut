from api.service import simulate_shuffle_sequence
from api.schemas import SimulationResult, Shuffle
import pytest
from fastapi.exceptions import HTTPException


def test_returns_valid_response():
    id = "sim-1"
    repeats = 5
    steps = [Shuffle(id="riffle", name="Riffle"), Shuffle(id="strip", name="Strip")]
    output = simulate_shuffle_sequence(id, repeats, steps)
    assert SimulationResult.model_validate(output)


def test_raises_error_if_step_does_not_exist():
    id = "sim-1"
    repeats = 5
    steps = [Shuffle(id="doesNotExist", name="doesNotExist")]

    with pytest.raises(HTTPException):
        simulate_shuffle_sequence(id, repeats, steps)
