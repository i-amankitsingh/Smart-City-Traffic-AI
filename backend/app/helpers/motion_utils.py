import cv2
import numpy as np

def compute_motion_score(video_path):
    cap = cv2.VideoCapture(video_path)
    prev = None
    motions = []

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        if prev is not None:
            diff = cv2.absdiff(prev, gray)
            motions.append(np.mean(diff))

        prev = gray

    cap.release()
    return float(np.mean(motions))
