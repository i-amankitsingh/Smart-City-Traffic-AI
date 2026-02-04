import numpy as np
import pickle
from sklearn.ensemble import RandomForestClassifier

# --------------------------------------------------
# STEP 1: Create dummy (simulated) training data
# --------------------------------------------------

# Features:
# [cars, bikes, heavy, density, speed, motion, weather, wrong_ratio]

X = np.array([
    [2, 1, 0, 0.05, 45, 0.20, 0, 0.01],   # Low traffic
    [4, 2, 1, 0.10, 40, 0.35, 0, 0.02],   # Low
    [8, 5, 2, 0.20, 35, 0.50, 0, 0.03],   # Medium
    [12, 6, 3, 0.35, 30, 0.65, 1, 0.05],  # Medium
    [18, 10, 5, 0.60, 20, 0.85, 1, 0.08], # High
    [20, 12, 6, 0.70, 15, 0.90, 1, 0.10], # High
])

# Labels:
# 0 = Low, 1 = Medium, 2 = High
y = np.array([0, 0, 1, 1, 2, 2])

# --------------------------------------------------
# STEP 2: Train Random Forest Model
# --------------------------------------------------

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# --------------------------------------------------
# STEP 3: Save model as traffic_model.pkl
# --------------------------------------------------

with open("traffic_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Model trained and saved as traffic_model.pkl")
