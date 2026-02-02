from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from app.utils.api_error import APIError
from app.routes.router import router as v1_router

app = FastAPI(title="AI Traffic Backend")

origins = [
    "*"
]

#  Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       
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


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)