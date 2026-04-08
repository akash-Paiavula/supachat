from datetime import date, datetime
from decimal import Decimal
from typing import Any, Dict, List


def _serialize_value(value: Any) -> Any:
    if isinstance(value, (date, datetime)):
        return value.isoformat()
    if isinstance(value, Decimal):
        return float(value)
    return value


def serialize_rows(rows: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    serialized_rows: List[Dict[str, Any]] = []

    for row in rows:
        serialized_rows.append(
            {key: _serialize_value(value) for key, value in row.items()}
        )

    return serialized_rows


def format_chart(rows: List[Dict[str, Any]], x_key: str, series: List[str]) -> Dict[str, Any]:
    serialized_rows = serialize_rows(rows)

    return {
        "x_key": x_key,
        "series": series,
        "data": serialized_rows,
    }