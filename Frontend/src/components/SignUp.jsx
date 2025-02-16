import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Paper,
  Link,
  Stack,
  MenuItem,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const validate = () => {
    let tempErrors = {};
    tempErrors.fullName = fullName.length >= 3 ? '' : 'Full Name must be at least 3 characters';
    tempErrors.username = username.length >= 3 ? '' : 'Username must be at least 3 characters';
    tempErrors.password = password.length >= 6 ? '' : 'Password must be at least 6 characters';
    tempErrors.confirmPassword = password === confirmPassword ? '' : 'Passwords do not match';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        const payload = {
          full_name: fullName,
          username,
          password,
          role,
          experience: role === 'lawyer' ? parseInt(experience) : 0,
          location
        };
  
        const response = await axios.post('http://localhost:8000/register', payload);
        
        // Extract token
        const token = response.data.token;
  
        // Store token
        localStorage.setItem("token", token);
  
        console.log("Token:", token);
  
        // Redirect to Sign In page
        navigate('/');
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        setServerError(error.response?.data?.detail || "Registration failed.");
      }
    }
  };
  

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e3f2fd',
        padding: 2,
      }}
    >
      <Container component="main" maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                name="fullName"
                autoFocus
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={Boolean(errors.fullName)}
                helperText={errors.fullName}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={Boolean(errors.username)}
                helperText={errors.username}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
              />
              <TextField
                select
                margin="normal"
                required
                fullWidth
                id="role"
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="client">client</MenuItem>
                <MenuItem value="lawyer">lawyer</MenuItem>
              </TextField>
              {role === 'lawyer' && (
                <TextField
                  margin="normal"
                  fullWidth
                  id="experience"
                  label="Experience (Years)"
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              )}
              <TextField
                margin="normal"
                fullWidth
                id="location"
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              {serverError && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {serverError}
                </Typography>
              )}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Stack direction="row" justifyContent="flex-end">
                <Link component={RouterLink} to="/signin" variant="body2">
                  Already have an account? Sign In
                </Link>
              </Stack>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUp;
