from fastapi import APIRouter, Depends, HTTPException
from typing import List
from datetime import datetime, timezone
from models.notification import Notification  # Ensure correct import path
from models.user import User
from services.auth_service import get_current_user
from database import init_db  # Ensure DB connection

router = APIRouter()

# Send a notification (internal usage)
async def create_notification(recipient: str, message: str, case_id: str, notification_type: str):
    await init_db()  # Ensure DB is initialized

    notification = Notification(
        recipient=recipient,
        message=message,
        case_id=case_id,
        notification_type=notification_type,
        timestamp=datetime.now(timezone.utc),  
        read=False
    )
    await notification.insert()

# Get all notifications for the logged-in user
@router.get("/notifications", response_model=List[dict])
async def get_notifications(current_user: User = Depends(get_current_user)):
    await init_db()  # Ensure DB is initialized

    notifications = await Notification.find(Notification.recipient == current_user.username).to_list()
    return [n.to_dict() for n in notifications]  # Convert to dict

# Mark a notification as read
@router.put("/notifications/{notification_id}/read")
async def mark_notification_as_read(notification_id: str, current_user: User = Depends(get_current_user)):
    await init_db()  # Ensure DB is initialized

    notification = await Notification.get(notification_id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")

    if notification.recipient != current_user.username:
        raise HTTPException(status_code=403, detail="Access denied")

    notification.read = True  # Changed from is_read to read
    await notification.save()
    return {"message": "Notification marked as read"}