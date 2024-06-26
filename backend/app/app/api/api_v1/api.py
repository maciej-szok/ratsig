from fastapi import APIRouter

from app.api.api_v1.endpoints import items, login, users, tags, entry, summary

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(tags.router, prefix="/tags", tags=["tags"])
api_router.include_router(entry.router, prefix="/entries", tags=["entries"])
api_router.include_router(summary.router, prefix="/summary", tags=["summary"])
