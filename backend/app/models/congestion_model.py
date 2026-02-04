import os
import joblib
import numpy as np
from typing import List, Dict, Union


BASE_DIR = os.path.dirname(__file__) 
# MODEL_PATH = "traffic_model.pkl"
MODEL_PATH = os.path.join(BASE_DIR, "../ml/traffic_model.pkl")



class CongestionModel:
    """
    Dedicated Model Layer for Traffic Congestion Prediction.
    This class ONLY handles ML inference.
    No business logic, no FastAPI, no OpenCV here.
    """

    def __init__(self, model_path: str = MODEL_PATH):
        self.model_path = model_path
        self.model = self._load_model()

    def _load_model(self):
        """
        Load trained sklearn model.
        If model file is missing, raise a clear error.
        """
        if not os.path.exists(self.model_path):
            raise FileNotFoundError(
                f"Model file '{self.model_path}' not found. "
                f"Run training first: python utils/train_model.py"
            )

        model = joblib.load(self.model_path)
        print(f"✅ Loaded congestion model from: {self.model_path}")
        return model

    def validate_features(self, features: List[Union[int, float]]):
        """
        Ensure feature vector has correct length and type.
        Expected 8 features in this project.
        """

        expected_length = 8

        if not isinstance(features, list):
            raise TypeError("Features must be a Python list.")

        if len(features) != expected_length:
            raise ValueError(
                f"Expected {expected_length} features, got {len(features)}. "
                "Order must be: [cars, bikes, heavy, density, speed, motion, weather, wrong_ratio]"
            )

        # Convert to float for safety
        return [float(x) for x in features]

    def predict(self, features: List[Union[int, float]]) -> str:
        """
        Main prediction function used by service layer.

        Input feature order:
        0: avg_car_count
        1: avg_bike_count
        2: avg_heavy_vehicles
        3: vehicle_density
        4: avg_speed
        5: motion_score
        6: weather_code
        7: wrong_movement_ratio
        """

        # Validate input
        X = self.validate_features(features)

        # Convert to numpy array
        X_array = np.array([X])

        # Predict congestion level
        prediction = self.model.predict(X_array)[0]

        return str(prediction)

    def predict_from_dict(self, data: Dict) -> str:
        """
        Optional helper: allows service to pass features as a dictionary.
        Useful when integrating with YOLO + OpenCV later.
        """

        feature_vector = [
            data.get("avg_car_count", 0),
            data.get("avg_bike_count", 0),
            data.get("avg_heavy_vehicles", 0),
            data.get("vehicle_density", 0),
            data.get("avg_speed", 30),           # default placeholder
            data.get("motion_score", 0),
            data.get("weather_code", 0),         # 0 = clear
            data.get("wrong_movement_ratio", 0)
        ]

        return self.predict(feature_vector)


# Create a single global instance (best practice for FastAPI)
congestion_model = CongestionModel()


def predict_congestion(features: List[Union[int, float]]) -> str:
    """
    Simple function that service layer will call.
    This keeps your service layer very clean.
    """
    return congestion_model.predict(features)


def predict_congestion_from_dict(data: Dict) -> str:
    """
    Alternate API for service layer using dictionary input.
    """
    return congestion_model.predict_from_dict(data)
