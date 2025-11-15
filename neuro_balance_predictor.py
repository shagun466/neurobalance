import joblib
import pandas as pd

model = joblib.load("neuro_balance_model (2).pkl")
scaler = joblib.load("neuro_balance_scaler (1).pkl")

def predict_mfi(sentiment_score, activity_score, rest_balance):
    input_df = pd.DataFrame({
        "sentiment_score": [sentiment_score],
        "activity_score": [activity_score],
        "rest_balance": [rest_balance]
    })
    input_scaled = scaler.transform(input_df)
    prediction = model.predict(input_scaled)[0]
    return float(prediction)

print(predict_mfi(0.74,0.55,0.61))