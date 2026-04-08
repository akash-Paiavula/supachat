from typing import Any, Dict, List

from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError

from app.config import get_settings

settings = get_settings()

engine = create_engine(
    settings.database_url,
    pool_pre_ping=True,
    future=True,
)


class DatabaseQueryError(Exception):
    pass


def run_query(sql: str) -> List[Dict[str, Any]]:
    try:
        with engine.connect() as conn:
            result = conn.execute(text(sql))
            rows = [dict(row._mapping) for row in result]
            return rows
    except SQLAlchemyError as exc:
        raise DatabaseQueryError("Database query execution failed.") from exc