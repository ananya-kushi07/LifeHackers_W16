import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode"; // Import jwt-decode
import Navbar from "../components/Navbar";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // Get JWT token from localStorage and decode to get the username
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const username = decoded.sub; // Extracting username from sub

  const socket = new WebSocket("ws://localhost:8000/ws");

  useEffect(() => {
    // Handle incoming messages from the server
    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };
  }, []);

  // const sendMessage = () => {
  //   if (message.trim()) {
  //     const formattedMessage = ${username}:::${message}; // Using username
  //     socket.send(formattedMessage);
  //     setMessages((prev) => [...prev, formattedMessage]); // Display sent message locally
  //     setMessage(""); // Clear the input field
  //   }
  // };

  const sendMessage = () => {
    if (message.trim()) {
      const formattedMessage = `${username}:::${message}`;
      socket.send(formattedMessage); // Just send, don't update state here
      setMessage(""); // Clear the input field
    }
  };
  

  return (
    <div>
        <Navbar />
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", marginTop: 20}}>
      <h1>Real-Time Chat</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "400px",
          overflowY: "scroll",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, idx) => {
          const [senderName, content] = msg.split(":::"); // Extract senderName and message
          return (
            <p
              key={idx}
              style={{
                textAlign: senderName === username ? "right" : "left", // Align messages
                margin: "5px 0",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: senderName === username ? "#d1e7dd" : "#f8d7da", // Different colors
                color: senderName === username ? "#0f5132" : "#842029",
                wordWrap: "break-word",
                display: "block",
              }}
            >
              <strong>{senderName}:</strong> {content} {/* Display sender's name */}
            </p>
          );
        })}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        style={{
          width: "80%",
          padding: "10px",
          marginRight: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <button
        onClick={sendMessage}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0d6efd",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
    </div>
  );
};

export default ChatApp;