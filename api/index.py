from fastapi import FastAPI
from api.schemas import SimulationResult, SimulationRequest
from api.service import simulate_shuffle_sequence

app = FastAPI()


@app.post("/simulate-shuffle-sequence")
def simulate_sequence(experiment: SimulationRequest) -> SimulationResult:
    return simulate_shuffle_sequence(
        id=experiment.id, repeats=experiment.repeats, steps=experiment.steps
    )
