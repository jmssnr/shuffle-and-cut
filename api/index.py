from fastapi import FastAPI
from api.schemas import SimulationResult, SimulationRequest
from api.service import simulate_shuffle_sequence

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")


@app.post("/api/simulate-shuffle-sequence")
def simulate_sequence(experiment: SimulationRequest) -> SimulationResult:
    print(experiment)
    return simulate_shuffle_sequence(
        id=experiment.id, repeats=experiment.repeats, steps=experiment.steps
    )
