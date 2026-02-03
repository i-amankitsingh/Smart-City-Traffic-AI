import numpy as np

def aggregate_features(frame_features_list):
    """
    Convert per-frame data into video-level analytics
    """

    cars = [f["cars"] for f in frame_features_list]
    bikes = [f["bikes"] for f in frame_features_list]
    heavy = [f["heavy"] for f in frame_features_list]
    total = [f["total_vehicles"] for f in frame_features_list]

    return {
        "avg_car_count": float(np.mean(cars)),
        "avg_bike_count": float(np.mean(bikes)),
        "avg_heavy_vehicles": float(np.mean(heavy)),
        "avg_total_vehicles": float(np.mean(total)),
        "vehicle_density": float(np.mean(total) / 50)   # road factor = 50
    }
