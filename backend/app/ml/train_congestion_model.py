import numpy as np
import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier

df = pd.read_csv("../../data/traffic_training_data.csv")

X = df.drop("label", axis=1).values
y = df["label"].values

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
