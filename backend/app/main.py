import uvicorn
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.utils.api_error import APIError
from app.core.database import connect_db, close_db
from app.routes.router import router as v1_router

app = FastAPI(title="AI Traffic Backend")

#  Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origin,       
    allow_credentials=True,      
    allow_methods=["*"],        
    allow_headers=["*"],      
)

@app.exception_handler(APIError)
async def api_error_handler(request: Request, exc: APIError):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "status_code": exc.status_code,
            "data": exc.data,
            "message": exc.message,
            "success": exc.success,
        }
    )

app.include_router(v1_router, prefix="/api/v1")

@app.on_event("startup")
async def startup():
    await connect_db()
    
@app.on_event("shutdown")
async def shutdown():
    await close_db()


if __name__ == "__main__":
    uvicorn.run("main:app", host=settings.host, port=settings.port, reload=True)