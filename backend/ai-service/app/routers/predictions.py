from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime, timedelta
import pandas as pd
import numpy as np
from app.services.auth import get_current_user

router = APIRouter()

class User(BaseModel):
    id: str
    email: str

class TransactionPrediction(BaseModel):
    category: str
    amount: float
    date: str
    confidence: float
    description: Optional[str] = None

class SpendingForecast(BaseModel):
    category: str
    amount: float
    month: str
    
@router.post("/spending-forecast", response_model=List[SpendingForecast])
async def predict_spending(months_ahead: int = 3, current_user: User = Depends(get_current_user)):
    """
    Generate spending forecasts for the upcoming months based on historical data
    """
    # In a real app, this would use ML models to predict future spending
    # For this example, we'll generate mock data
    
    # Categories to predict for
    categories = ["food", "housing", "transportation", "healthcare", "entertainment", "utilities"]
    
    # Generate predictions
    forecasts = []
    current_date = datetime.now()
    
    for i in range(months_ahead):
        future_date = current_date + timedelta(days=30 * (i + 1))
        month_str = future_date.strftime("%Y-%m")
        
        for category in categories:
            # Mock prediction calculation
            base_amount = 500 if category == "housing" else 200
            # Add some randomness to make it look realistic
            variance = np.random.normal(0, base_amount * 0.1)
            amount = base_amount + variance
            
            forecasts.append(
                SpendingForecast(
                    category=category,
                    amount=round(max(amount, 0), 2),
                    month=month_str
                )
            )
    
    return forecasts

@router.post("/transaction-categorization", response_model=TransactionPrediction)
async def categorize_transaction(description: str, amount: float, current_user: User = Depends(get_current_user)):
    """
    Predict the category for a new transaction based on its description and amount
    """
    # In a real app, this would use ML models to categorize
    # For this example, we'll use a simple rule-based approach
    
    description_lower = description.lower()
    
    # Simple rule-based categorization
    if any(word in description_lower for word in ["restaurant", "cafe", "coffee", "pizza", "burger"]):
        category = "food"
        confidence = 0.85
    elif any(word in description_lower for word in ["uber", "lyft", "taxi", "gas", "fuel"]):
        category = "transportation"
        confidence = 0.82
    elif any(word in description_lower for word in ["netflix", "cinema", "movie", "ticket", "concert"]):
        category = "entertainment"
        confidence = 0.78
    elif any(word in description_lower for word in ["rent", "mortgage", "property"]):
        category = "housing"
        confidence = 0.95
    elif any(word in description_lower for word in ["doctor", "pharmacy", "hospital", "medicine"]):
        category = "healthcare"
        confidence = 0.88
    elif any(word in description_lower for word in ["electricity", "water", "internet", "phone"]):
        category = "utilities"
        confidence = 0.9
    else:
        category = "other"
        confidence = 0.5
    
    # Add some randomness to confidence to make it look realistic
    confidence_variance = np.random.normal(0, 0.05)
    confidence = min(max(confidence + confidence_variance, 0.4), 0.98)
    
    return TransactionPrediction(
        category=category,
        amount=amount,
        date=datetime.now().strftime("%Y-%m-%d"),
        confidence=round(confidence, 2),
        description=description
    )