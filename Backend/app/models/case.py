from beanie import Document
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Case(Document):
    title: str
    description: str
    category: str  # Example: "Criminal", "Civil", "Corporate"
    client_username: str  # Username of the client who created the case
    lawyer_username: Optional[str] = None  # Assigned lawyer (if any)
    status: str = "pending"  # Status: pending, accepted, closed
    created_at: datetime = datetime.utcnow()

    class Settings:
        name = "cases"  # MongoDB collection name

    def to_dict(self):
        return {
            "id": str(self.id),
            "title": self.title,
            "description": self.description,
            "category": self.category,
            "client_username": self.client_username,
            "lawyer_username": self.lawyer_username,
            "status": self.status,
            "created_at": self.created_at.isoformat(),
        }

class CaseCreate(BaseModel):
    title: str
    description: str
    category: str

class CaseUpdate(BaseModel):
    status: Optional[str] = None
