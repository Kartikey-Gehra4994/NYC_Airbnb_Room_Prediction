import os
import urllib.request

MODEL_URL = "https://github.com/Kartikey-Gehra4994/NYC_Airbnb_Room_Prediction/releases/download/v1.0.0/model_pipeline.pkl"
MODEL_PATH = "model_pipeline.pkl"

if not os.path.exists(MODEL_PATH):
    print("Downloading model...")
    urllib.request.urlretrieve(MODEL_URL, MODEL_PATH)
    print("Model downloaded successfully.")
else:
    print("Model already exists.")
