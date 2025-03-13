from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any, Optional
from pydantic import BaseModel
from datetime import datetime, timedelta
import pandas as pd
import numpy as np
from app.services.auth import get_current_user

router = APIRouter()

class User(BaseModel):
    id: str
    email: str

class SpendingInsight(BaseModel):
    category: str
    message: str
    change_percent: float
    recommendation: str
    severity: str  # "positive", "neutral", "warning", "critical"

class BudgetRecommendation(BaseModel):
    category: str
    current_budget: Optional[float] = None
    recommended_budget: float
    reason: str

class FinancialHealthScore(BaseModel):
    score: int  # 0-100
    spending_score: int
    saving_score: int
    debt_score: int
    overall_message: str
    category_scores: Dict[str, int]

@router.get("/spending-insights", response_model=List[SpendingInsight])
async def get_spending_insights(current_user: User = Depends(get_current_user)):
    """
    Generate insights about user's spending patterns
    """
    # In a real app, this would analyze real transaction data
    # For this example, we'll generate mock insights
    
    insights = [
        SpendingInsight(
            category="food",
            message="Your food spending has increased by 15% compared to last month",
            change_percent=15.0,
            recommendation="Consider cooking at home more often to reduce expenses",
            severity="warning"
        ),
        SpendingInsight(
            category="entertainment",
            message="You've reduced entertainment spending by 20% this month",
            change_percent=-20.0,
            recommendation="Great job on cutting down entertainment costs!",
            severity="positive"
        ),
        SpendingInsight(
            category="transportation",
            message="Your transportation costs are in line with your historical average",
            change_percent=2.0,
            recommendation="Continue with your current transportation habits",
            severity="neutral"
        ),
        SpendingInsight(
            category="shopping",
            message="Your shopping expenses have increased significantly by 45%",
            change_percent=45.0,
            recommendation="Review your recent shopping purchases for necessary items",
            severity="critical"
        )
    ]
    
    return insights

@router.get("/budget-recommendations", response_model=List[BudgetRecommendation])
async def get_budget_recommendations(current_user: User = Depends(get_current_user)):
    """
    Generate personalized budget recommendations based on spending patterns
    """
    # In a real app, this would analyze real transaction data and existing budgets
    # For this example, we'll generate mock recommendations
    
    recommendations = [
        BudgetRecommendation(
            category="food",
            current_budget=500,
            recommended_budget=450,
            reason="Your food spending is consistently below budget. You could reallocate some funds."
        ),
        BudgetRecommendation(
            category="housing",
            current_budget=1200,
            recommended_budget=1200,
            reason="Your housing budget is appropriate for your spending patterns."
        ),
        BudgetRecommendation(
            category="entertainment",
            current_budget=200,
            recommended_budget=150,
            reason="You're frequently exceeding your entertainment budget. Consider adjusting it or reducing spending."
        ),
        BudgetRecommendation(
            category="saving",
            current_budget=300,
            recommended_budget=400,
            reason="Based on your income, you could increase your monthly savings by reducing discretionary spending."
        )
    ]
    
    return recommendations

@router.get("/financial-health", response_model=FinancialHealthScore)
async def get_financial_health(current_user: User = Depends(get_current_user)):
    """
    Calculate an overall financial health score based on various financial metrics
    """
    # In a real app, this would analyze real financial data
    # For this example, we'll generate a mock financial health score
    
    # Generate random scores for demonstration
    spending_score = np.random.randint(65, 85)
    saving_score = np.random.randint(55, 80)
    debt_score = np.random.randint(70, 95)
    
    # Calculate overall score (weighted average)
    overall_score = int(spending_score * 0.3 + saving_score * 0.4 + debt_score * 0.3)
    
    # Generate category scores
    category_scores = {
        "budget_adherence": np.random.randint(60, 90),
        "emergency_fund": np.random.randint(50, 85),
        "debt_to_income": np.random.randint(65, 95),
        "savings_rate": np.random.randint(55, 85),
        "retirement_planning": np.random.randint(40, 80)
    }
    
    # Generate appropriate message based on score
    if overall_score >= 80:
        message = "Excellent financial health! You're on track to meet your financial goals."
    elif overall_score >= 70:
        message = "Good financial health. Some minor improvements could strengthen your position."
    elif overall_score >= 60:
        message = "Fair financial health. Consider addressing some key areas to improve your position."
    else:
        message = "Your financial health needs attention. Focus on building savings and reducing debt."
    
    return FinancialHealthScore(
        score=overall_score,
        spending_score=spending_score,
        saving_score=saving_score,
        debt_score=debt_score,
        overall_message=message,
        category_scores=category_scores
    )