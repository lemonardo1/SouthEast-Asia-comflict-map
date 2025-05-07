import React from 'react';
import { Container, Typography, Paper, Box, Divider, Link } from '@mui/material';

const AboutPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          About the India-Pakistan Conflict Map
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" gutterBottom>
          Project Overview
        </Typography>
        
        <Typography paragraph>
          The India-Pakistan Conflict Map is an interactive web application designed to visualize and track events related to the ongoing conflict between India and Pakistan. This tool provides real-time updates on military clashes, diplomatic events, protests, and humanitarian situations in the contested regions.
        </Typography>
        
        <Typography paragraph>
          Inspired by platforms like LiveUAMap, this project aims to provide researchers, journalists, policymakers, and the general public with accurate, up-to-date information about the evolving situation in South Asia.
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Data Sources
        </Typography>
        
        <Typography paragraph>
          Our data is collected from multiple sources, including:
        </Typography>
        
        <Box component="ul" sx={{ pl: 4 }}>
          <Typography component="li" paragraph>
            Official government statements and press releases
          </Typography>
          <Typography component="li" paragraph>
            Verified news reports from reputable media organizations
          </Typography>
          <Typography component="li" paragraph>
            Social media reports that have been cross-verified
          </Typography>
          <Typography component="li" paragraph>
            Academic and research institutions focusing on South Asian geopolitics
          </Typography>
          <Typography component="li" paragraph>
            International organizations monitoring the region
          </Typography>
        </Box>
        
        <Typography paragraph>
          All events undergo a verification process before being added to our database. We strive for accuracy and objectivity in our reporting.
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Features
        </Typography>
        
        <Box component="ul" sx={{ pl: 4 }}>
          <Typography component="li" paragraph>
            Interactive map showing conflict events
          </Typography>
          <Typography component="li" paragraph>
            Filtering by event type, date range, and region
          </Typography>
          <Typography component="li" paragraph>
            Timeline slider for historical data exploration
          </Typography>
          <Typography component="li" paragraph>
            Real-time updates of new events
          </Typography>
          <Typography component="li" paragraph>
            Detailed information about each event
          </Typography>
        </Box>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Technology
        </Typography>
        
        <Typography paragraph>
          This application is built using modern web technologies:
        </Typography>
        
        <Box component="ul" sx={{ pl: 4 }}>
          <Typography component="li" paragraph>
            Frontend: React, Leaflet (mapping library), Material UI
          </Typography>
          <Typography component="li" paragraph>
            Backend: Node.js, Express
          </Typography>
          <Typography component="li" paragraph>
            Database: MongoDB
          </Typography>
        </Box>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Contact & Feedback
        </Typography>
        
        <Typography paragraph>
          We welcome feedback, corrections, and suggestions for improvement. Please contact us at <Link href="mailto:contact@indopakmap.org">contact@indopakmap.org</Link>.
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} India-Pakistan Conflict Map. All rights reserved.
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutPage;
