from beanie import Document # type: ignore
from datetime import datetime
from typing import Optional

class Notification(Document):
    recipient: str  # Username of the recipient
    message: str  # Notification message
    case_id: Optional[str] = None  # Related case ID (if applicable)
    notification_type: str  # Type (new_case, case_accepted, etc.)
    timestamp: datetime  # Time of notification
    read: bool  # Read or unread

    class Settings:
        name = "notifications"

    def to_dict(self):
        return {
            "id": str(self.id),
            "recipient": self.recipient,
            "message": self.message,
            "case_id": self.case_id,
            "notification_type": self.notification_type,
            "timestamp": self.timestamp.isoformat(),
            "read": self.read
        }