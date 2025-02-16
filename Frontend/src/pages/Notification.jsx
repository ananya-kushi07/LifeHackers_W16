import React, { useEffect, useState } from "react";
import { 
  Box, Typography, Card, CardContent, IconButton, CircularProgress, Divider, Tooltip 
} from "@mui/material";
import { NotificationsNone, CheckCircle } from "@mui/icons-material";
import axios from "axios";
import dayjs from "dayjs";
import Navbar from "../components/Navbar";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log("Fetched Notifications:", response.data); // Debugging line
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Marking Notification as Read, ID:", notificationId); // Debugging line

      await axios.put(
        `http://localhost:8000/notifications/${notificationId}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update UI state
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === notificationId ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div>
    <Box sx={{ maxWidth: 500, margin: "auto", mt: 4, padding: 2 }}>
      <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", mb: 2 ,marginTop: 5}}>
        <NotificationsNone sx={{ mr: 1 }} /> Notifications
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />
      ) : notifications.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center", color: "gray" }}>
          No new notifications
        </Typography>
      ) : (
        notifications.map((notif, index) => (
          <Card key={notif._id} sx={{ mb: 2, backgroundColor: notif.read ? "#f5f5f5" : "white", boxShadow: 3 }}>
            <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: notif.read ? "normal" : "bold" }}>
                  {notif.message}
                </Typography>
                <Typography variant="caption" sx={{ color: "gray" }}>
                  {dayjs(notif.timestamp).format("MMM D, YYYY h:mm A")}
                </Typography>
              </Box>
              {!notif.read && notif._id && (
                <Tooltip title="Mark as Read">
                  <IconButton onClick={() => markAsRead(notif._id)} color="primary">
                    <CheckCircle />
                  </IconButton>
                </Tooltip>
              )}
            </CardContent>
            {index !== notifications.length - 1 && <Divider />}
          </Card>
        ))
      )}
    </Box>
    </div>
    </div>
  );
};

export default Notification;
