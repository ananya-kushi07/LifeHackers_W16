from fastapi import APIRouter, HTTPException, Depends
from models.user import User, UserUpdate
from services.auth_service import get_current_user
from database import init_db
from typing import List
from models.case import Case

router = APIRouter()

@router.get("/profile/{username}")
async def get_user_profile(username: str, current_user: User = Depends(get_current_user)):
    await init_db()
    if current_user.username != username:
        raise HTTPException(status_code=403, detail="Access denied")

    user = await User.find_one(User.username == username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user.to_dict()

@router.put("/profile/{username}")
async def update_user_profile(username: str, update_data: UserUpdate, current_user: User = Depends(get_current_user)):
    await init_db()
    if current_user.username != username:
        raise HTTPException(status_code=403, detail="Access denied")

    user = await User.find_one(User.username == username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if update_data.full_name is not None:
        user.full_name = update_data.full_name

    if update_data.username is not None:
        user.username = update_data.username

    if update_data.experience is not None:
        user.experience = update_data.experience

    if update_data.location is not None:
        user.location = update_data.location

    await user.save()
    return {"message": "Profile updated successfully"}

@router.delete("/profile/{username}")
async def delete_user(username: str, current_user: User = Depends(get_current_user)):
    await init_db()
    if current_user.username != username:
        raise HTTPException(status_code=403, detail="Access denied")

    user = await User.find_one(User.username == username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    await user.delete()
    return {"message": "User deleted successfully"}

@router.get("/lawyers", response_model=List[dict])
async def get_all_lawyers(current_user: User = Depends(get_current_user)):
    """Fetch all users who have the role of 'lawyer'"""
    lawyers = await User.find(User.role == "lawyer").to_list()
    if not lawyers:
        raise HTTPException(status_code=404, detail="No lawyers found")
    
    return [lawyer.to_dict() for lawyer in lawyers]

@router.get("/user_cases/{username}", response_model=List[dict])
async def user_cases(username : str, current_user: User = Depends(get_current_user)):
    """Fetch cases for the current user based on their role."""

    if username != current_user.username:
        raise HTTPException(status_code=403, detail="Access denied")

    if current_user.role == "client":
        cases = await Case.find(Case.client_username == username).to_list()
    elif current_user.role == "lawyer":
        cases = await Case.find(Case.lawyer_username == username).to_list()
    else:
        raise HTTPException(status_code=403, detail="Access denied")

    # Convert ObjectId to string before returning
    return [{**case.model_dump(), "id": str(case.id)} for case in cases]