from pydantic import BaseModel


class Shuffle(BaseModel):
    id: str
    name: str


class SimulationRequest(BaseModel):
    id: str
    repeats: int
    steps: list[Shuffle]


class SimulationResult(BaseModel):
    id: str
    result: dict[int, list[float]]
