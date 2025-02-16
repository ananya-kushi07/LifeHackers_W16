from fastapi import APIRouter, Depends, HTTPException
from utils.scraper import scrape_news
from models.user import User  # Assuming you have a User model for authentication
from services.auth_service import get_current_user

router = APIRouter(
    prefix="/news",
    tags=["News"]
)

# Route to scrape news
@router.get("/scrape", summary="Scrape Latest Legal News")
async def get_latest_news(current_user: User = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=403, detail="Not authenticated")

    news_data = scrape_news()
    return {"news": news_data}