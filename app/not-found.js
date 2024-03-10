import React from 'react';
// import { makeStyles } from '@mui/styles';
import { Container, Typography, Button } from '@mui/material';
// import { Link } from 'react-router-dom'; // If using React Router
export default function NotFoundPage ()  {
    // const classes = useStyles();
  
    return (
      <Container  maxWidth="sm">
        <Typography variant="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </Typography>
        {/* <span role="img" aria-label="Crying face" >
          😢
        </span> */}
        {/* <Button
          variant="contained"
          color="primary"
          // Change Link to your router's Link component
          to="/" // Change to your home page route
          
        >
          Go to Home
        </Button> */}
      </Container>
    );
  };