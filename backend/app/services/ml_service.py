import pickle
import numpy as np
import os


MODEL_PATH = os.path.join(os.path.dirname(__file__), "../ml/traffic_model.pkl")

if os.path.exists(MODEL_PATH):
    with open(MODEL_PATH, "rb") as f:
        _model = pickle.load(f)
else:
    print("⚠️ WARNING: traffic_model.pkl not found. Using dummy model.")
    _model = None


def get_congestion_level(features: list):
    """
    Wrapper service around your sklearn congestion model.
    This function belongs to SERVICE layer, NOT model layer.
    """

    # Convert to numpy array for sklearn
    X = np.array([features])

    # Predict congestion class
    prediction = _model.predict(X)[0]

    # Map numeric output to labels
    label_map = {
        0: "Low",
        1: "Medium",
        2: "High"
    }

    congestion_label = label_map.get(prediction, "Unknown")

    return {
        "raw_prediction": int(prediction),
        "congestion_level": congestion_label
    }
