import cv2

def run_ml_on_video(video_path):
    cap = cv2.VideoCapture(video_path)

    frame_count = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame_count += 1
        # TODO: send frame to ML model later

    cap.release()

    return {
        "total_frames": frame_count,
        "message": "Video read successfully"
    }
