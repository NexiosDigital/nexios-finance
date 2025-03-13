from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from app.routers import predictions, insights
from app.services.auth import get_current_user
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Nexios Finance AI Service",
    description="AI and ML services for Nexios Finance application",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(predictions.router, prefix="/api/predictions", tags=["predictions"])
app.include_router(insights.router, prefix="/api/insights", tags=["insights"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Nexios Finance AI Service"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}