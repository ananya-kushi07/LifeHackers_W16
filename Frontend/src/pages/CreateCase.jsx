import React, { useState } from "react";
import { Container, TextField, Button, Typography, Alert, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CreateCase = () => {
  const [caseData, setCaseData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  // ✅ Predefined case categories
  const categories = [
    "Education",
    "Real Estate",
    "Personal Injury",
    "Criminal",
    "Traffic",
    "Contract Disputes",
    "Property Disputes",
    "Consumer Complaints",
    "Family Law",
    "Employment Issues",
    "Theft and Fraud",
    "Cybercrime",
    "Medical Malpractice",
    "Land Disputes",
    "Business Contracts",

  ];

  // ✅ Handle input change
  const handleChange = (e) => {
    setCaseData({ ...caseData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:8000/cases/create_case", caseData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccessMessage("Case created successfully!");
      setTimeout(() => navigate("/cases"), 2000); // Redirect after 2 sec
    } catch (error) {
      setError(error.response?.data?.detail || "Error creating case");
    }
  };

  return (
    <div>
      <Navbar/>
    <div>
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom sx={{ marginTop:10 }}>
        Create a New Case
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={caseData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Description"
          name="description"
          value={caseData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          required
        />

        {/* ✅ Category Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={caseData.category}
            onChange={handleChange}
            required
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Submit Case
        </Button>
      </form>
    </Container>
    </div>
    </div>
  );
};

export default CreateCase;
