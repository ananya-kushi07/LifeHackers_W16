import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardActions, Typography, Button, Container, Grid, CircularProgress, Box } from '@mui/material';
import { keyframes } from '@mui/system';
import Navbar from "../components/Navbar";

const NewsFeed = () => {
    const fadeIn = keyframes`
        from { 
            opacity: 0; 
            transform: translateY(20px);
            filter: blur(5px);
        }
        to { 
            opacity: 1; 
            transform: translateY(0);
            filter: blur(0);
        }
    `;

    const slideIn = keyframes`
        from { 
            transform: translateX(-100%);
            opacity: 0;
            filter: blur(5px);
        }
        to { 
            transform: translateX(0);
            opacity: 1;
            filter: blur(0);
        }
    `;

    const [news, setNews] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/news/scrape', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setNews(response.data.news);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch news');
            }
        };

        fetchNews();
    }, []);

    return (
        <div>
            <Navbar/>
                    <Container 
            sx={{ 
                mt: 10,
                minHeight: 'calc(100vh - 64px)',
                background: 'linear-gradient(135deg,rgb(96, 96, 101) 0%, #121858 100%)',
                borderRadius: 4,
                padding: { xs: 2, md: 4 },
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    zIndex: 0
                }
            }}
        >
            <Typography 
                variant="h3" 
                gutterBottom
                sx={{
                    color: '#ffffff',
                    textAlign: 'center',
                    fontWeight: 700,
                    mb: 6,
                    animation: `${slideIn} 1.2s ease-out`,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    position: 'relative',
                    zIndex: 1,
                    letterSpacing: '0.5px',
                    '& span': {
                        color: '#90caf9'
                    }
                }}
            >
                Latest <span>Legal Updates</span>
            </Typography>

            {error && (
                <Typography 
                    color="error"
                    sx={{
                        textAlign: 'center',
                        animation: `${fadeIn} 0.5s ease-out`,
                        mb: 4,
                        backgroundColor: 'rgba(255,0,0,0.1)',
                        padding: 2,
                        borderRadius: 2,
                        color: '#ff1744'
                    }}
                >
                    {error}
                </Typography>
            )}

            {news.length > 0 ? (
                <Grid container spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
                    {news.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card 
                                sx={{ 
                                    height: '100%', 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                    borderRadius: 3,
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    animation: `${fadeIn} 0.5s ease-out`,
                                    animationDelay: `${index * 0.1}s`,
                                    transform: 'perspective(1000px) rotateX(0deg)',
                                    '&:hover': {
                                        transform: 'perspective(1000px) rotateX(2deg) translateY(-5px)',
                                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
                                    }
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                    <Typography 
                                        variant="h5" 
                                        gutterBottom
                                        sx={{
                                            color: '#1a237e',
                                            fontWeight: 600,
                                            lineHeight: 1.4,
                                            mb: 2,
                                            transition: 'color 0.3s ease',
                                            '&:hover': {
                                                color: '#006994'
                                            }
                                        }}
                                    >
                                        {item.headline}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ p: 2, pt: 0 }}>
                                    <Button 
                                        size="large" 
                                        variant="contained"
                                        color="primary" 
                                        href={item.article_link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        sx={{
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            background: 'linear-gradient(45deg,rgb(8, 9, 17) 30%,rgb(33, 40, 102) 90%)',
                                            boxShadow: '0 3px 15px rgba(26, 35, 126, 0.2)',
                                            fontWeight: 600,
                                            padding: '8px 24px',
                                            '&:hover': {
                                                background: 'linear-gradient(45deg,rgb(14, 15, 29) 30%,rgb(25, 26, 41) 90%)',
                                                boxShadow: '0 6px 20px rgba(26, 35, 126, 0.4)',
                                                transform: 'scale(1.05)'
                                            }
                                        }}
                                    >
                                        Read More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box 
                    sx={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    <CircularProgress 
                        sx={{ 
                            color: '#90caf9',
                            animation: `${fadeIn} 0.5s ease-out`
                        }} 
                    />
                    <Typography 
                        sx={{ 
                            textAlign: 'center', 
                            color: '#ffffff',
                            fontSize: '1.2rem',
                            animation: `${fadeIn} 0.5s ease-out`,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                            fontWeight: 500,
                            letterSpacing: '0.5px'
                        }}
                    >
                        Loading...
                    </Typography>
                </Box>
            )}
        </Container>
        </div>
    );
};

export default NewsFeed;