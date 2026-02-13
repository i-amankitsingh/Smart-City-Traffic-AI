from fastapi import APIRouter, UploadFile, File
import shutil
import os
from app.utils.api_response import APIResponse
from app.services.video_service import run_ml_on_video


BASE_DIR = os.path.dirname(__file__) 

UPLOAD_DIR = f"{BASE_DIR}/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

router = APIRouter()

@router.post("/process-video")
async def process_video(file: UploadFile = File(...)):
    video_path = f"{UPLOAD_DIR}/{file.filename}"
     
    with open(video_path, "wb") as buffer:
         shutil.copyfileobj(file.file, buffer)
         
    result = run_ml_on_video(video_path)
    
    return APIResponse(200, result, "Video processed successfully!")
    
    