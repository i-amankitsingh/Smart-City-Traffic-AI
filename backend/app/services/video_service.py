import cv2
import numpy as np
from app.services.yolo_service import run_yolo_on_frame
from app.helpers.feature_extraction import extract_frame_features
from app.helpers.motion_utils import compute_motion_score
from app.services.ml_service import get_congestion_level



def aggregate_features(frame_features_list):
    """
    Combine per-frame features into video-level features
    """
    cars = [f["cars"] for f in frame_features_list]
    bikes = [f["bikes"] for f in frame_features_list]
    heavy = [f["heavy"] for f in frame_features_list]
    total = [f["total_vehicles"] for f in frame_features_list]

    return {
        "avg_car_count": float(np.mean(cars)),
        "avg_bike_count": float(np.mean(bikes)),
        "avg_heavy_vehicles": float(np.mean(heavy)),
        "vehicle_density": float(np.mean(total) / 50)  # road capacity factor
    }


def run_ml_on_video(video_path):
    cap = cv2.VideoCapture(video_path)

    frame_count = 0
    frame_features = []

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame_count += 1

        # ---- STEP 1: YOLO detection per frame ----
        yolo_counts = run_yolo_on_frame(frame)

        # ---- STEP 2: Extract features per frame ----
        features = extract_frame_features(frame, yolo_counts)
        frame_features.append(features)

    cap.release()

    if len(frame_features) == 0:
        return {
            "error": "No frames processed"
        }

    # ---- STEP 3: Aggregate video-level features ----
    aggregated = aggregate_features(frame_features)

    # ---- STEP 4: Compute motion score ----
    motion_score = compute_motion_score(video_path)

    # Placeholder values (we will replace later)
    avg_speed = 30
    weather = 0
    wrong_ratio = 0.02

    # ---- STEP 5: Prepare data for sklearn model ----
    feature_vector = [
        aggregated["avg_car_count"],
        aggregated["avg_bike_count"],
        aggregated["avg_heavy_vehicles"],
        aggregated["vehicle_density"],
        avg_speed,
        motion_score,
        weather,
        wrong_ratio
    ]

    # ---- STEP 6: Call sklearn congestion model ----
    result = get_congestion_level(feature_vector)

    return {
        "total_frames": frame_count,
        "avg_car_count": aggregated["avg_car_count"],
        "vehicle_density": aggregated["vehicle_density"],
        "motion_score": motion_score,
        "congestion_level": result["congestion_level"]
    }