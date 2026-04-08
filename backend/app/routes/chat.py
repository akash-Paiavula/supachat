from fastapi import APIRouter, HTTPException, status

from app.schemas import ChatRequest, ChatResponse
from app.services.formatter import format_chart, serialize_rows
from app.services.query_executor import DatabaseQueryError, run_query
from app.services.translator import UnsupportedQueryError, translate_query
from app.utils.logger import get_logger

router = APIRouter()
logger = get_logger(__name__)


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    try:
        logger.info("Incoming question: %s", request.message)

        plan = translate_query(request.message)
        logger.info("Generated SQL: %s", plan["sql"])

        rows = run_query(plan["sql"])
        table = serialize_rows(rows)
        logger.info("Returned row count: %s", len(table))

        chart = format_chart(table, plan["x_key"], plan["series"])

        return {
            "reply": plan["reply"],
            "query_type": plan["query_type"],
            "sql": plan["sql"],
            "table": table,
            "chart": chart,
        }

    except UnsupportedQueryError as exc:
        logger.warning("Unsupported query error: %s", str(exc))
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc

    except DatabaseQueryError as exc:
        logger.error("Database query error: %s", str(exc))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database error while fetching analytics data.",
        ) from exc

    except Exception as exc:
        logger.exception("Unexpected server error")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error.",
        ) from exc