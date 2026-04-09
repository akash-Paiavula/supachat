import os
from typing import Any, Dict, List

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()

app = FastAPI(title="SupaChat API", version="0.1.0")

# CORS
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*")
origins = [origin.strip() for origin in ALLOWED_ORIGINS.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str
    query_type: str
    sql: str
    data: List[Dict[str, Any]]


@app.get("/")
def root():
    return {
        "message": "SupaChat backend is running",
        "service": "SupaChat API",
        "version": "0.1.0"
    }


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "SupaChat API"
    }


@app.post("/api/chat", response_model=ChatResponse)
def chat(payload: ChatRequest):
    message = payload.message.strip().lower()

    if message == "show top trending topics in last 30 days":
        return {
            "reply": "Here are the top trending topics in the last 30 days.",
            "query_type": "bar_chart",
            "sql": """
SELECT
    topic,
    SUM(views) AS total_views
FROM article_analytics
WHERE event_date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY topic
ORDER BY total_views DESC;
            """.strip(),
            "data": [
                {"topic": "AI", "total_views": 1250},
                {"topic": "Cloud", "total_views": 1040},
                {"topic": "DevOps", "total_views": 980},
                {"topic": "Cybersecurity", "total_views": 890},
            ],
        }

    elif message == "compare article engagement by topic":
        return {
            "reply": "Here is the article engagement comparison by topic.",
            "query_type": "bar_chart",
            "sql": """
SELECT
    topic,
    SUM(views + likes + comments) AS engagement
FROM article_analytics
GROUP BY topic
ORDER BY engagement DESC;
            """.strip(),
            "data": [
                {"topic": "AI", "engagement": 1600},
                {"topic": "Cloud", "engagement": 1320},
                {"topic": "DevOps", "engagement": 1210},
                {"topic": "Cybersecurity", "engagement": 1100},
            ],
        }

    elif message == "plot daily views trend for ai articles":
        return {
            "reply": "Here is the daily views trend for ai articles.",
            "query_type": "line_chart",
            "sql": """
SELECT
    event_date,
    SUM(views) AS views
FROM article_analytics
WHERE LOWER(topic) = LOWER('ai')
GROUP BY event_date
ORDER BY event_date;
            """.strip(),
            "data": [
                {"event_date": "2026-04-01", "views": 120},
                {"event_date": "2026-04-02", "views": 180},
                {"event_date": "2026-04-03", "views": 150},
                {"event_date": "2026-04-04", "views": 210},
                {"event_date": "2026-04-05", "views": 260},
            ],
        }

    elif message == "show top 5 articles by views":
        return {
            "reply": "Here are the top 5 articles by views.",
            "query_type": "table",
            "sql": """
SELECT
    article_title,
    SUM(views) AS total_views
FROM article_analytics
GROUP BY article_title
ORDER BY total_views DESC
LIMIT 5;
            """.strip(),
            "data": [
                {"article_title": "AI in 2026", "total_views": 540},
                {"article_title": "Cloud Scaling Basics", "total_views": 500},
                {"article_title": "DevOps Pipeline Guide", "total_views": 470},
                {"article_title": "Zero Trust Security", "total_views": 430},
                {"article_title": "Kubernetes for Beginners", "total_views": 410},
            ],
        }

    elif message == "compare likes by topic":
        return {
            "reply": "Here is the likes comparison by topic.",
            "query_type": "bar_chart",
            "sql": """
SELECT
    topic,
    SUM(likes) AS total_likes
FROM article_analytics
GROUP BY topic
ORDER BY total_likes DESC;
            """.strip(),
            "data": [
                {"topic": "AI", "total_likes": 320},
                {"topic": "Cloud", "total_likes": 280},
                {"topic": "DevOps", "total_likes": 250},
                {"topic": "Cybersecurity", "total_likes": 220},
            ],
        }

    raise HTTPException(
        status_code=400,
        detail=(
            "Unsupported query. Try one of these:\n"
            "1. Show top trending topics in last 30 days\n"
            "2. Compare article engagement by topic\n"
            "3. Plot daily views trend for AI articles\n"
            "4. Show top 5 articles by views\n"
            "5. Compare likes by topic"
        ),
    )