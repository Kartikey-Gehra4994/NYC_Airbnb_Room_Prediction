# 🏠 NYC Airbnb Room Type Prediction

A Machine Learning project that predicts the **room type of an Airbnb listing in New York City** based on listing details such as price, location, reviews, minimum nights, and availability.

The model is deployed using **FastAPI** and can be used through a simple web interface.

---

## 📌 Project Overview

This project uses Machine Learning to predict the type of Airbnb room.

The model predicts:

- Entire Home / Apartment
- Private Room
- Shared Room

The user provides information about an Airbnb listing, and the model predicts the most likely room type.

---

## 📊 Features Used

The model uses the following features:

- Latitude
- Longitude
- Price
- Minimum Nights
- Number of Reviews
- Reviews per Month
- Calculated Host Listings Count
- Availability in 365 Days
- Neighbourhood Group
- Neighbourhood

---

## 🤖 Machine Learning

The project includes:

- Data Cleaning
- Exploratory Data Analysis (EDA)
- Feature Engineering
- Data Preprocessing
- Categorical Encoding
- Feature Scaling
- Model Training
- Model Evaluation
- Model Saving

The trained model is saved using `joblib`.

```text
model_pipeline.pkl
```

## 🚀 API

The Machine Learning model is connected to a FastAPI backend.

## Start the API

First, activate the virtual environment:

``` 
nyc_room_type\Scripts\activate
``` 

Install the required packages:

```
pip install -r requirements.txt
```

Start the FastAPI server:
```
uvicorn main:app --reload
```

## The API will run at:

```http://127.0.0.1:8000```

FastAPI documentation is available at:

```http://127.0.0.1:8000/docs```

## 🌐 Web Interface

The project also contains a simple and interactive web interface.

The frontend is created using:

- HTML
- CSS
- JavaScript

The user can enter Airbnb details and get the predicted room type with prediction probabilities.

## 📁 Project Structure
```
NYC_Airbnb_Room_Prediction/
│
├── main.py
├── download_model.py
├── requirements.txt
├── Dockerfile
├── frontend ───
                ├── index.html
                ├── style.css
                ├── script.js
├── README.md
├── .gitignore
└── model_pipeline.pkl
```

```model_pipeline.pkl``` is not stored directly in the GitHub repository because of the GitHub file size limit. The trained model is provided through the GitHub Release.

## 📦 Model Download

The trained model is available in the GitHub Release of this project.

Download:

```
model_pipeline.pkl
```

Place it in the project folder before running the application locally.

## 🐳 Docker

The project can also be run using Docker.

Build the Docker image:
```
docker build -t nyc-airbnb-prediction .
```

Run the container:
```
docker run -p 8000:8000 nyc-airbnb-prediction
```
Then open:

```
http://localhost:8000
```
## 🛠️ Technologies Used
- Python
- Pandas
- NumPy
- Scikit-learn
- Joblib
- FastAPI
- Pydantic
- HTML
- CSS
- JavaScript
- Docker
- Git & GitHub

## 🎯 Goal of the Project

The main goal of this project is to build a complete Machine Learning application from data preprocessing to deployment.

**The project demonstrates:**

```
Data
  ↓
Data Cleaning
  ↓
EDA
  ↓
Preprocessing
  ↓
Machine Learning Model
  ↓
Model Saving
  ↓
FastAPI
  ↓
Web Interface
  ↓
Docker Deployment
```

## 👨‍💻 Author

**Kartikey Gehra**

GitHub:
```https://github.com/Kartikey-Gehra4994```

## ⭐ If you like this project

Feel free to ⭐ star the repository and explore the project.


### One small change I'd recommend

Since your current setup is **GitHub Release + automatic model download**, the README should eventually show the exact Release link and explain that users **don't need to manually download the model** if Docker downloads it automatically.

Once we finish your `download_model.py` + Docker setup, :contentReference[oaicite:0]{index=0}.