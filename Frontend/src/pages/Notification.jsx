import React, { useState, useEffect } from "react";
import { 
  Popover, List, ListItem, ListItemText, IconButton, Badge, CircularProgress
} from "@mui/material";
import { Notifications as NotificationsIcon, CheckCircle } from "@mui/icons-material";
import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8000/notifications/${notificationId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) => prev.filter((notif) => notif._id !== notificationId));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <>
      <IconButton color="inherit" onClick={(event) => setAnchorEl(event.currentTarget)}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <List sx={{ width: 300, maxHeight: 300, overflow: "auto" }}>
          {loading ? (
            <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />
          ) : notifications.length === 0 ? (
            <ListItem>
              <ListItemText primary="No new notifications" />
            </ListItem>
          ) : (
            notifications.map((notif) => (
              <ListItem key={notif._id} secondaryAction={
                <IconButton edge="end" color="primary" onClick={() => markAsRead(notif._id)}>
                  <CheckCircle />
                </IconButton>
              }>
                <ListItemText primary={notif.message} secondary={dayjs(notif.timestamp).format("MMM D, YYYY h:mm A")} />
              </ListItem>
            ))
          )}
        </List>
      </Popover>
    </>
  );
};

export default Notifications;