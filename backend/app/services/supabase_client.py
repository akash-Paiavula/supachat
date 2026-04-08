from app.config import get_settings

settings = get_settings()


def get_connection_info():
    return {
        "host": settings.postgres_host,
        "port": settings.postgres_port,
        "database": settings.postgres_db,
        "user": settings.postgres_user,
        "sslmode": settings.postgres_sslmode,
    }