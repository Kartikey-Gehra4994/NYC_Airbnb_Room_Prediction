from fastapi import FastAPI
import joblib
import pandas as pd
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

COLUMNS = [ "latitude",
            "longitude",
            "price",
            "minimum_nights",
            "number_of_reviews",
            "reviews_per_month",
            "calculated_host_listings_count",
            "availability_365",
            "neighbourhood_group",
            "neighbourhood" ]

model = joblib.load("2_model_pipeline.pkl")

# Pydantic Model = the input validation
class Features(BaseModel):
    latitude: float = Field(..., ge=-90, le=90, description="Latitude must be between -90 and 90")
    longitude: float = Field(..., ge=-180, le=180, description="Longitude must be between -180 and 180")
    price: float = Field(..., gt=0, description="Price must be greater than 0")
    minimum_nights: int = Field(..., ge=1, le=365, description="Minimum nights must be at least 1")
    number_of_reviews: int = Field(..., ge=0, description="Number of reviews must be non-negative")
    reviews_per_month: float = Field(..., ge=0, description="Reviews per month must be non-negative")
    calculated_host_listings_count: int = Field(..., ge=0, description="Calculated host listings count must be non-negative")
    availability_365: int = Field(..., ge=0, le=365, description="Availability 365 must be between 0 and 365")
    neighbourhood_group: str = Field(..., description="Neighbourhood group must be a string")
    neighbourhood: str = Field(..., description="Neighbourhood must be a string")

@app.get('/')
def greet():
    return "Welcome to this page"

@app.post("/predict")
def predict(features : Features):

    # Convert the input features to a pandas DataFrame
    row = pd.DataFrame([features.dict()], columns=COLUMNS)
    prediction = model.predict(row)
    probability = model.predict_proba(row)

    return {
        "prediction": prediction[0],
        "probability": probability[0].tolist()
    }