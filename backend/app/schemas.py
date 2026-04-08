from typing import Any, Dict, List, Literal

from pydantic import BaseModel, Field


ChartType = Literal["bar_chart", "line_chart"]


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=3, max_length=500)


class ChartPayload(BaseModel):
    x_key: str
    series: List[str]
    data: List[Dict[str, Any]]


class ChatResponse(BaseModel):
    reply: str
    query_type: ChartType
    sql: str
    table: List[Dict[str, Any]]
    chart: ChartPayload