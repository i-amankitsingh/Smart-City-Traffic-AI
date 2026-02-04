from ultralytics import YOLO

# Load YOLO once (important for speed)
_yolo_model = YOLO("yolov8n.pt")   # lightweight, fast model


# Map YOLO class IDs to your vehicle categories
YOLO_CLASS_MAP = {
    2: "car",
    3: "bike",
    5: "bus",
    7: "truck"
}


def run_yolo_on_frame(frame):
    """
    Runs YOLO on a single frame and returns vehicle counts.
    This function will be used for:
      - recorded videos
      - live CCTV frames (later)
    """

    results = _yolo_model(frame)[0]

    counts = {
        "car": 0,
        "bike": 0,
        "bus": 0,
        "truck": 0
    }

    for box in results.boxes:
        cls_id = int(box.cls[0])  # class id from YOLO

        if cls_id in YOLO_CLASS_MAP:
            vehicle_type = YOLO_CLASS_MAP[cls_id]
            counts[vehicle_type] += 1

    return counts
