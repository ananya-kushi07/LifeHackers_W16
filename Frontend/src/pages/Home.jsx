import React from 'react';
import { Container, Box, Typography, Paper, CardMedia, IconButton, Grid, Link } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { keyframes } from '@mui/system';

const Home = () => {
    // Define animations
    const fadeIn = keyframes`
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    `;

    const slideIn = keyframes`
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    `;

    const news = [
        {
            title: 'Legal Rights Awareness',
            description: 'Learn about your legal rights and how to protect them.',
            imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        },
        {
            title: 'Court Proceedings Simplified',
            description: 'Understand the process of court hearings and legal procedures.',
            imageUrl: 'https://www.legid.app/wp-content/uploads/online-education-3412473_1920.jpg'
        },
        {
            title: 'Empowering Justice',
            description: 'Providing equal access to justice for all communities.',
            imageUrl: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        }
    ];

    const marquee = keyframes`
    0% { transform: translateX(-100%); } // Start off-screen left
    100% { transform: translateX(100%); } // Move off-screen right
`;

    return (
        <Container 
            sx={{ 
                minHeight: 'calc(100vh - 64px - 64px)',
                pt: 2,
                background: 'linear-gradient(135deg,rgb(19, 22, 1) 0%,rgb(55, 55, 67) 100%)',
                pb: 8,
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    zIndex: 0
                }
            }}
            maxWidth="xl"
        > 
            {/* Added heading above carousel */}
            <Typography 
                variant="h4"
                align="center"
                sx={{
                    color: '#ffffff',
                    mb: 4,
                    mt: 2,
                    fontWeight: 600,
                    marginTop: 10,
                    animation: `${fadeIn} 1s ease-out`,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    '& span': {
                        color: '#90caf9'
                    }
                }}
            >
                {/* Marquee Slogan */}
                <Box
                sx={{
                    width: '100%',
                    overflow: 'hidden',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: '8px 0',
                    color: '#fff',
                    position: 'relative',
                    zIndex: 10,
                    height: '40px', // or minHeight
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        animation: `${marquee} 8s linear infinite`, // Adjust duration
                        whiteSpace: 'nowrap',
                        position: 'absolute',
                        top: '28%',
                        left: '0%', // Start at the left edge
                        transform: 'translateY(-50%)',
                        // No padding needed here
                    }}
                >
                    Justice Without Limits, Help Without Borders.
                </Typography>
            </Box>
            
                Your <span>Legal Buddy</span>
            </Typography>

            <Box 
                sx={{ 
                    position: 'relative',
                    textAlign: 'center', 
                    mt: 5, 
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?auto=format&fit=crop&w=1500&q=80)`,
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    color: '#ffffff', 
                    py: 25,
                    borderRadius: 4,
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    animation: `${slideIn} 1.2s ease-out`,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.005)',
                        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.2)'
                    }
                }}
            >
                <Typography 
                    variant="h3" 
                    gutterBottom
                    sx={{
                        fontWeight: 700,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        letterSpacing: 1.5,
                        animation: `${fadeIn} 1.5s ease-in`,
                        color: '#fff'
                    }}
                >
                    Legal Aid Platform
                </Typography>
                <Typography 
                    variant="h6" 
                    sx={{
                        color: '#fff',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                        letterSpacing: 1.2,
                        fontWeight: 400,
                        animation: `${fadeIn} 1.5s ease-in 0.5s`
                    }}
                    gutterBottom
                >
                    Empowering Justice for All
                </Typography>
            </Box>

            <Box 
                sx={{ 
                    mt: 8,
                    mx: 'auto', 
                    width: '80%',
                    position: 'relative',
                    zIndex: 1,
                    animation: `${fadeIn} 1.5s ease-out`,
                    '& .MuiPaper-root': {
                        transition: 'all 0.3s ease-in-out',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)'
                        }
                    }
                }}
            >
                <Carousel 
    navButtonsAlwaysVisible 
    autoPlay={false} 
    indicators={false} 
    NextIcon={<ArrowForwardIos />} 
    PrevIcon={<ArrowBackIos />}
    navButtonsProps={{
        style: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: 0,
            padding: '20px 8px',
            color: '#fff'
        }
    }}
    sx={{
        height: '950px', // Increased the height of the whole carousel
        '& .MuiIconButton-root': {
            transition: 'all 0.3s ease',
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                transform: 'scale(1.1)'
            }
        }
    }}
>
    {news.map((item, index) => (
        <Paper 
            key={index} 
            sx={{ 
                textAlign: 'center', 
                background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                height: '100%'  // Ensures the whole item takes full height
            }}
        >
            <CardMedia
                component="img"
                image={item.imageUrl}
                alt={item.title}
                sx={{ 
                    height: '700px',  // Keep the image height reasonable
                    objectFit: 'cover',
                    width: '100%',
                    filter: 'brightness(0.95)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        filter: 'brightness(1.05)',
                        transform: 'scale(1.02)'
                    }
                }}
            />
            <Box 
                sx={{ 
                    p: 4,
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,1))'
                }}
            >
                <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{
                        fontWeight: 600,
                        color: '#2c3e50',
                        mb: 2,
                        letterSpacing: 0.5,
                        transition: 'color 0.3s ease',
                        '&:hover': {
                            color: '#1a237e'
                        }
                    }}
                >
                    {item.title}
                </Typography>
                <Typography 
                    variant="body1" 
                    sx={{
                        color: '#5a6c7d',
                        lineHeight: 1.6,
                        fontSize: '1.1rem'
                    }}
                >
                    {item.description}
                </Typography>
            </Box>
        </Paper>
    ))}
</Carousel>
            </Box>  

 {/* About Us Section */}
 <Box
                sx={{
                    mt: 10,
                    mx: 'auto',
                    width: '80%',
                    display: 'flex', // Enable flexbox for alignment
                    alignItems: 'center', // Vertically center content
                    animation: `${fadeIn} 1.5s ease-out`,
                    color: '#ffffff',
                    flexDirection: { xs: 'column', md: 'row' }, // Stack on small screens, row on medium and up
                    textAlign: { xs: 'center', md: 'left' } // Center text on small screens, left on medium and up
                }}
            >
                <Box sx={{ flex: 1, pr: {md: 4}, mb: {xs: 4, md: 0} }}> {/* Text container, takes up 1 part of available space, adds right padding on medium screens and bottom margin on small screens */}
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            mb: 4,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                            animation: `${fadeIn} 1s ease-out`
                        }}
                    >
                        About Us
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: '1.2rem',
                            lineHeight: 1.8,
                            animation: `${fadeIn} 1.5s ease-out`
                        }}
                    >
                        We are dedicated to providing accessible legal aid to everyone. Our platform aims to empower individuals by providing them with the knowledge and resources they need to understand their legal rights and navigate the legal system. We believe in equal access to justice for all communities.
                    </Typography>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}> {/* Image container, takes up 1 part of available space, centers image */}
                    <CardMedia
                        component="img"
                        image="https://media.istockphoto.com/id/1317653361/vector/legal-and-law-concept-illustration.jpg?s=612x612&w=0&k=20&c=Us_-iTHz8z8aKLvxumWNalaZO-AmTtdbQZtLlBwkEbY=" // Replace with your image URL
                        alt="About Us Image"
                        sx={{
                            maxWidth: '100%', // Ensure image doesn't overflow container
                            height: 'auto', // Maintain aspect ratio
                            borderRadius: 2, // Add some rounded corners
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s ease', // Add a transition for hover effect
                            '&:hover': {
                                transform: 'scale(1.05)' // Scale up slightly on hover
                            }
                        }}
                    />
                </Box>
            </Box>

            {/* Footer */}
            <Box 
                sx={{ 
                    mt: 10,
                    py: 4,
                    backgroundColor: '#333',
                    color: '#fff',
                    textAlign: 'center'
                }}
            >
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <Link href="#" color="inherit" underline="none">Home</Link><br />
                        <Link href="#" color="inherit" underline="none">About Us</Link><br />
                        <Link href="#" color="inherit" underline="none">Services</Link><br />
                        <Link href="#" color="inherit" underline="none">Contact</Link>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Legal
                        </Typography>
                        <Link href="#" color="inherit" underline="none">Privacy Policy</Link><br />
                        <Link href="#" color="inherit" underline="none">Terms of Service</Link><br />
                        <Link href="#" color="inherit" underline="none">Disclaimer</Link>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        <Link href="#" color="inherit" underline="none">Facebook</Link><br />
                        <Link href="#" color="inherit" underline="none">Twitter</Link><br />
                        <Link href="#" color="inherit" underline="none">LinkedIn</Link><br />
                        <Link href="#" color="inherit" underline="none">Instagram</Link>
                    </Grid>
                </Grid>
                <Typography variant="body2" sx={{ mt: 4 }}>
                    &copy; {new Date().getFullYear()} Legal Aid Platform. All rights reserved.
                </Typography>
            </Box>
        </Container>
    );
};

export default Home;