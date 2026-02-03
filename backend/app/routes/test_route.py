from fastapi import APIRouter
from app.utils.api_response import APIResponse
from app.utils.api_error import APIError

router = APIRouter()

@router.get("/test-route")
async def test(name: str=None):
        if not name:
            raise APIError(404, "Name not found!")
        return APIResponse(200, {"name": name}, f"Hello {name}! Your Smart City Traffic AI API working fine!")
 