import React, { useState, useEffect } from "react";
import { Container, Typography, Card, CardContent, Grid, Avatar, Box } from "@mui/material";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Navbar from "../components/Navbar";

const Lawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role);

        if (decodedToken.role === "client") {
          fetchLawyers();
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const fetchLawyers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/users/lawyers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLawyers(response.data);
    } catch (error) {
      console.error("Error fetching lawyers:", error.response?.data?.detail || error.message);
    }
  };

  return (
    <div>
      
        <Navbar />
      <div>
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", textAlign: "center",marginTop: 5 }}>
        Available Lawyers
      </Typography>

      {role === "client" ? (
        lawyers.length > 0 ? (
          <Grid container spacing={3}>
            {lawyers.map((lawyer) => (
              <Grid item xs={12} sm={6} md={4} key={lawyer.id}>
                <Card
                  sx={{
                    p: 2,
                    borderRadius: "12px",
                    boxShadow: 3,
                    transition: "0.3s",
                    "&:hover": { boxShadow: 8, transform: "scale(1.03)" },
                  }}
                >
                  <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        mb: 2,
                        bgcolor: "#1976d2",
                      }}
                    >
                      {lawyer.full_name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
                      {lawyer.full_name || "Unknown Name"}
                    </Typography>
                    {/* <Typography variant="body2" color="textSecondary">
                      {lawyer.email || "No email available"}
                    </Typography> */}
                    <Box sx={{ mt: 1, textAlign: "center" }}>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Experience:{" "}
                        <span style={{ fontWeight: "normal" }}>
                          {lawyer.experience ? `${lawyer.experience} years` : "Not specified"}
                        </span>
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Location:{" "}
                        <span style={{ fontWeight: "normal" }}>{lawyer.location || "Not provided"}</span>
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography textAlign="center" sx={{ mt: 3, fontSize: "1.2rem", fontWeight: "bold", color: "gray" }}>
            No lawyers available at the moment.
          </Typography>
        )
      ) : (
        <Typography textAlign="center" sx={{ mt: 3, fontSize: "1.2rem", fontWeight: "bold", color: "gray" }}>
          Only clients can view the list of lawyers.
        </Typography>
      )}
    </Container>
    </div>
    </div>
    
  );
};

export default Lawyers;
