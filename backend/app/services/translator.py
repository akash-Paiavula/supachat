import re
from typing import Any, Dict


class UnsupportedQueryError(ValueError):
    pass


def _normalize_text(message: str) -> str:
    return " ".join(message.lower().strip().split())


def translate_query(message: str) -> Dict[str, Any]:
    text = _normalize_text(message)

    # 1. Top trending topics in last N days
    if "top trending topics" in text:
        days_match = re.search(r"(\d+)\s*days?", text)
        days = int(days_match.group(1)) if days_match else 30

        sql = f"""
        SELECT
            topic,
            SUM(views) AS total_views
        FROM article_analytics
        WHERE event_date >= CURRENT_DATE - INTERVAL '{days} days'
        GROUP BY topic
        ORDER BY total_views DESC
        LIMIT 10;
        """

        return {
            "reply": f"Here are the top trending topics in the last {days} days.",
            "query_type": "bar_chart",
            "sql": sql.strip(),
            "x_key": "topic",
            "series": ["total_views"],
        }

    # 2. Compare article engagement by topic
    if "compare" in text and "engagement" in text and "topic" in text:
        sql = """
        SELECT
            topic,
            SUM(views) AS views,
            SUM(likes) AS likes,
            SUM(comments) AS comments,
            SUM(shares) AS shares
        FROM article_analytics
        GROUP BY topic
        ORDER BY views DESC;
        """

        return {
            "reply": "Here is the article engagement comparison by topic.",
            "query_type": "bar_chart",
            "sql": sql.strip(),
            "x_key": "topic",
            "series": ["views", "likes", "comments", "shares"],
        }

    # 3. Daily views trend for topic
    if "daily views trend" in text or "plot daily views trend" in text:
        topic_match = re.search(r"for\s+(.+?)\s+articles?", text)
        topic = topic_match.group(1).strip() if topic_match else "AI"
        safe_topic = topic.replace("'", "''")

        sql = f"""
        SELECT
            event_date,
            SUM(views) AS views
        FROM article_analytics
        WHERE LOWER(topic) = LOWER('{safe_topic}')
        GROUP BY event_date
        ORDER BY event_date;
        """

        return {
            "reply": f"Here is the daily views trend for {topic} articles.",
            "query_type": "line_chart",
            "sql": sql.strip(),
            "x_key": "event_date",
            "series": ["views"],
        }

    # 4. Top articles by views
    if "articles" in text and "views" in text and "top" in text:
        limit_match = re.search(r"top\s+(\d+)", text)
        limit = int(limit_match.group(1)) if limit_match else 10

        sql = f"""
        SELECT
            article_title,
            topic,
            SUM(views) AS total_views
        FROM article_analytics
        GROUP BY article_title, topic
        ORDER BY total_views DESC
        LIMIT {limit};
        """

        return {
            "reply": f"Here are the top {limit} articles by views.",
            "query_type": "bar_chart",
            "sql": sql.strip(),
            "x_key": "article_title",
            "series": ["total_views"],
        }

    # 5. Compare likes by topic
    if "likes" in text and "topic" in text:
        sql = """
        SELECT
            topic,
            SUM(likes) AS total_likes
        FROM article_analytics
        GROUP BY topic
        ORDER BY total_likes DESC;
        """

        return {
            "reply": "Here is the likes comparison by topic.",
            "query_type": "bar_chart",
            "sql": sql.strip(),
            "x_key": "topic",
            "series": ["total_likes"],
        }

    raise UnsupportedQueryError(
        "Unsupported query. Try one of these:\n"
        "1. Show top trending topics in last 30 days\n"
        "2. Compare article engagement by topic\n"
        "3. Plot daily views trend for AI articles\n"
        "4. Show top 5 articles by views\n"
        "5. Compare likes by topic"
    )