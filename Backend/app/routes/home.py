from fastapi import APIRouter, HTTPException, Depends
from models.user import User
from services.auth_service import get_current_user
from database import init_db

router = APIRouter()

@router.get("/home")
async def get_home(current_user: User = Depends(get_current_user)):
    await init_db()

    user_data = {
        "username": current_user.username,
        "message": f"Welcome back, {current_user.username}!"
    }
    
    return user_data

