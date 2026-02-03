def extract_frame_features(frame, yolo_results):
    """
    Extract features from ONE FRAME
    This will work for both recorded video and live feed
    """

    cars = yolo_results["car"]
    bikes = yolo_results["bike"]
    heavy = yolo_results["bus"] + yolo_results["truck"]

    return {
        "cars": cars,
        "bikes": bikes,
        "heavy": heavy,
        "total_vehicles": cars + bikes + heavy
    }
