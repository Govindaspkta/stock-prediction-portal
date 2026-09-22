# Stock Prediction Portal

A full-stack web app that predicts stock prices using an LSTM neural network, with a Django REST API backend and a React frontend.

## Features
- User registration and JWT-based authentication
- Fetches historical stock data via yfinance
- Visualizes closing price, 100-day and 200-day moving averages
- LSTM model prediction vs actual price comparison
- Model evaluation metrics (MSE, RMSE, R-squared)

## Tech Stack
Backend: Django, Django REST Framework, Simple JWT, TensorFlow/Keras, scikit-learn, pandas, yfinance
Frontend: React (Vite), Bootstrap 5, Axios

## Project Structure
backend-drf - Django REST API
frontend-react - React frontend

## Local Setup - Backend
cd backend-drf
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
Create a .env file with SECRET_KEY and DEBUG=True
python manage.py migrate
python manage.py runserver

## Local Setup - Frontend
cd frontend-react
npm install
Create a .env file with VITE_BACKEND_BASE_API and VITE_BACKEND_ROOT pointing to the backend
npm run dev

## Deployment
Backend deployed on Render (free tier)
Frontend deployed on Vercel (free tier)
Database: Neon (free Postgres)

## Disclaimer
This project is for educational and portfolio purposes. Predictions are based purely on historical price patterns and should not be used as financial advice.
