from fastapi import APIRouter, HTTPException, Depends, Form
from models.user import User
from services.auth_service import hash_password, verify_password, create_access_token
from database import init_db
from pydantic import BaseModel
from datetime import timedelta
from fastapi.responses import JSONResponse

router = APIRouter()

class RegisterUser(BaseModel):
    full_name: str
    username: str
    password: str
    role: str
    experience: int = 0
    location: str = ""

class LoginUser(BaseModel):
    username: str
    password: str

@router.post("/register")
async def register_user(user_data: RegisterUser):
    await init_db()
    existing_user = await User.find_one(User.username == user_data.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    # ✅ Fix role assignment
    role = user_data.role.lower()  # Convert to lowercase for consistency
    if role not in ["client", "lawyer"]:
        raise HTTPException(status_code=400, detail="Invalid role")

    user = User(
        full_name=user_data.full_name,
        username=user_data.username,
        password=hash_password(user_data.password),
        role=role,  # ✅ Correctly save "client" or "lawyer" instead of "user"
        experience=user_data.experience if role == "lawyer" else None,
        location=user_data.location
    )
    await user.insert()

    # ✅ Include role in token
    token = create_access_token({"user_id": str(user.id), "username": user.username, "role": role})

    return JSONResponse(content={"token": token})

@router.post("/auth/login")
async def login(username: str = Form(...), password: str = Form(...)):
    await init_db()
    user = await User.find_one(User.username == username)
    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # ✅ Include role in token
    access_token = create_access_token(
        data={"sub": user.username, "role": user.role},
        expires_delta=timedelta(minutes=30)
    )

    return {"access_token": access_token, "token_type": "bearer"}
