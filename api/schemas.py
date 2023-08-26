from pydantic import BaseModel


class SimulationRequest(BaseModel):
    id: str
    repeats: int
    steps: list[dict[str, str]]


class SimulationResult(BaseModel):
    id: str
    result: dict[int, list[float]]
