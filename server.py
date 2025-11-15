from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel, Field
import joblib
import pandas as pd

class MfiRequest(BaseModel):
    sentiment: float = Field(..., ge=0.0, le=100.0)
    activity: float = Field(..., ge=0.0, le=100.0)
    rest: float = Field(..., ge=0.0, le=100.0)

class MfiResponse(BaseModel):
    mfi: float

app = FastAPI()
model = joblib.load("neuro_balance_model (2).pkl")
scaler = joblib.load("neuro_balance_scaler (1).pkl")

@app.post("/api/mfi/score", response_model=MfiResponse)
async def score(req: MfiRequest, request: Request):
    try:
        s = req.sentiment / 100.0
        a = req.activity / 100.0
        r = req.rest / 100.0
        df = pd.DataFrame({
            "sentiment_score": [s],
            "activity_score": [a],
            "rest_balance": [r]
        })
        scaled = scaler.transform(df)
        pred = float(model.predict(scaled)[0])
        return {"mfi": max(0.0, min(100.0, pred * 100.0))}
    except Exception:
        raise HTTPException(status_code=500, detail="Model inference failed")
