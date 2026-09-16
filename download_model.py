import os
import urllib.request

MODEL_URL = "https://github.com/Kartikey-Gehra4994/NYC_Airbnb_Room_Prediction/releases/tag/v1.0.0"
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model_pipeline.pkl")

if not os.path.exists(MODEL_PATH):
    print("Downloading model...")
    urllib.request.urlretrieve(MODEL_URL, MODEL_PATH)
    print("Model downloaded successfully.")
else:
    print("Model already exists.")