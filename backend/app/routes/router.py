from fastapi import APIRouter


from app.routes import test_route, video_route

router = APIRouter()

router.include_router(
    test_route.router,
    prefix="/test",
    tags=["test"]
)

router.include_router(
    video_route.router,
    prefix="/video",
    tags=["video"]
)