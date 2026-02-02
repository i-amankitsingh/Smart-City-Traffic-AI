from fastapi import APIRouter


from app.routes import test_route

router = APIRouter()

router.include_router(
    test_route.router,
    prefix="",
    tags=["test"]
)