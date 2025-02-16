from beanie import Document
from pydantic import BaseModel, EmailStr
from typing import Optional



class User(Document):
    full_name: str
    username: str
    password: str
    role: str
    experience: Optional[int] = None  # Only for lawyers
    location: Optional[str] = None  # Lawyers & Clients

    class Settings:
        collection = "users"

    def to_dict(self):
        return {
            "id": str(self.id),
            "full_name": self.full_name,
            "username": self.username,
            "role": self.role,
            "experience": self.experience,
            "location": self.location
        }
    

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    username: Optional[str] = None  # Updated from email to username
    experience: Optional[int] = None  # Only for lawyers
    location: Optional[str] = None
