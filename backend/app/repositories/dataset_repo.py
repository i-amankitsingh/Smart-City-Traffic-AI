import pandas as pd

def create_training_dataset():
    data = [
        # cars, bikes, heavy, density, speed, motion, weather, wrong_ratio, label
        [5,  2,  1, 0.16, 45, 0.20, 0, 0.01, "Low"],
        [8,  4,  2, 0.28, 38, 0.35, 0, 0.02, "Low"],
        [12, 6,  3, 0.50, 30, 0.55, 1, 0.05, "Medium"],
        [15, 7,  4, 0.65, 25, 0.70, 1, 0.08, "Medium"],
        [22, 9,  6, 0.90, 15, 0.92, 1, 0.15, "High"],
        [25, 10, 7, 1.00, 10, 0.98, 1, 0.20, "High"],
    ]

    columns = [
        "avg_car_count",
        "avg_bike_count",
        "avg_heavy_vehicles",
        "vehicle_density",
        "avg_speed",
        "motion_score",
        "weather_code",
        "wrong_movement_ratio",
        "congestion_level"
    ]

    df = pd.DataFrame(data, columns=columns)
    return df
