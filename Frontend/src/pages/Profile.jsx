import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { default as jwt_decode } from 'jwt-decode';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Avatar, Fade, Grow } from '@mui/material';
import { blue, teal, pink } from '@mui/material/colors';
import { keyframes } from '@mui/system';
import Navbar from '../components/Navbar';

const Profile = () => {
    const [userData, setUserData] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        const decoded = jwt_decode(token);
        const username = decoded.sub;

        setIsLoading(true);
        
        axios.get(`http://localhost:8000/users/profile/${username}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setTimeout(() => {
                setUserData(response.data);
                setLoaded(true);
                setIsLoading(false);
            }, 300);
        })
        .catch(error => {
            console.error('Error fetching profile:', error);
            setIsLoading(false);
        });
    }, [navigate]);

    return (
        <div>
            <Navbar />
            <Box 
                sx={{ 
                    minHeight: '100vh', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    padding: 2,
                    background: `linear-gradient(135deg, ${blue[600]} 0%, ${teal[600]} 50%, ${pink[600]} 100%)`,
                    backgroundSize: '200% 200%',
                }}
            >
                <Fade in={true} timeout={1000}>
                    <Box>
                        <Grow in={loaded} timeout={800}>
                            <Card 
                                sx={{ 
                                    width: 700,
                                    maxWidth: '90%',
                                    background: `linear-gradient(135deg, rgba(13, 71, 161, 0.9) 0%, rgba(0, 96, 100, 0.9) 100%)`,
                                    color: '#fff', 
                                    borderRadius: 6, 
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                                    padding: 4,
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                        boxShadow: `0 12px 40px ${blue[900]}`,
                                    }
                                }}
                            >
                                <CardContent sx={{ 
                                    textAlign: 'center',
                                }}>
                                    <Avatar 
                                        sx={{ 
                                            bgcolor: teal[500], 
                                            width: 150, 
                                            height: 150, 
                                            margin: '0 auto', 
                                            fontSize: 48,
                                            border: '4px solid rgba(255,255,255,0.2)',
                                        }}
                                    >
                                        {userData.username?.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Typography 
                                        variant="h4" 
                                        sx={{ 
                                            marginTop: 3,
                                            fontWeight: 'bold',
                                            background: `linear-gradient(45deg, ${teal[200]} 30%, #fff 90%)`,
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            letterSpacing: '0.5px',
                                        }}
                                    >
                                        {userData.username}
                                    </Typography>
                                    <Typography 
                                        variant="body1" 
                                        sx={{ 
                                            color: teal[100],
                                            marginTop: 1,
                                            fontSize: '1.2rem',
                                        }}
                                    >
                                        {userData.full_name}
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        sx={{ 
                                            marginTop: 2,
                                            color: teal[100],
                                            padding: '10px 20px',
                                            borderRadius: 2,
                                            backgroundColor: 'rgba(0,150,136,0.2)',
                                            display: 'inline-block',
                                        }}
                                    >
                                        📍 {userData.location}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grow>
                    </Box>
                </Fade>
            </Box>
        </div>
    );
};

export default Profile;