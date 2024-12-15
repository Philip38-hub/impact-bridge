import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Pagination,
  Fade,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import StartupCard from '../cards/StartupCard';
import StartupContactModal from '../contact/StartupContactModal';
import LoginModal from '../LoginModal';

const sampleStartups = [
  {
    id: 1,
    name: "EcoTech Solutions",
    logo: "https://source.unsplash.com/800x600/?sustainability",
    industry: "Clean Energy",
    shortDescription: "Revolutionizing renewable energy storage solutions for sustainable future.",
    description: "EcoTech Solutions is pioneering innovative renewable energy technologies that make sustainable living accessible to urban communities. Our solutions combine solar power with AI-driven optimization.",
    fundingNeeded: 500000,
    revenue: "300000",
    valuation: "2000000",
    equityOffered: 15,
    location: "Nairobi, Kenya",
  },
  {
    id: 2,
    name: "HealthBridge Africa",
    logo: "https://source.unsplash.com/800x600/?healthcare",
    industry: "Healthcare",
    shortDescription: "Bringing affordable healthcare solutions to rural communities.",
    description: "HealthBridge Africa is revolutionizing healthcare access in rural communities through mobile clinics and telemedicine. Our platform connects patients with doctors remotely.",
    fundingNeeded: 750000,
    revenue: "500000",
    valuation: "3000000",
    equityOffered: 20,
    location: "Lagos, Nigeria",
  },
  {
    id: 3,
    name: "AgroTech Innovations",
    logo: "https://source.unsplash.com/800x600/?agriculture",
    industry: "Agriculture",
    shortDescription: "Smart farming solutions for small-scale farmers in Africa.",
    description: "AgroTech Innovations provides smart farming solutions that help small-scale farmers optimize their crop yields and reduce resource usage through IoT sensors and AI analytics.",
    fundingNeeded: 300000,
    revenue: "200000",
    valuation: "1500000",
    equityOffered: 12,
    location: "Accra, Ghana",
  },
  {
    id: 4,
    name: "EduReach",
    logo: "https://source.unsplash.com/800x600/?education",
    industry: "Education",
    shortDescription: "Digital education platform making learning accessible to all.",
    description: "EduReach is democratizing education through an innovative digital platform that provides high-quality educational content to students in underserved communities.",
    fundingNeeded: 400000,
    revenue: "250000",
    valuation: "2000000",
    equityOffered: 18,
    location: "Kampala, Uganda",
  },
];

const StartupMatchingCards = () => {
  const [page, setPage] = useState(1);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const cardsPerPage = 3;
  const totalPages = Math.ceil(sampleStartups.length / cardsPerPage);
  const { user } = useAuth();
  const isInvestor = user?.type === 'investor';
  const isLoggedIn = !!user;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleContactClick = (startup) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (!isInvestor) {
      return;
    }
    setSelectedStartup(startup);
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
  };

  const getCurrentStartups = () => {
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    return sampleStartups.slice(start, end);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          color: '#008080',
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        Matching Startups
      </Typography>

      <Grid container spacing={3}>
        {getCurrentStartups().map((startup) => (
          <Grid item xs={12} md={4} key={startup.id}>
            <Fade in timeout={500}>
              <Box>
                <StartupCard 
                  startup={startup}
                  isStartupDashboard={false}
                />
              </Box>
            </Fade>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#008080',
            },
            '& .Mui-selected': {
              bgcolor: '#008080 !important',
              color: 'white !important',
            },
          }}
        />
      </Box>

      {selectedStartup && (
        <StartupContactModal
          open={Boolean(selectedStartup)}
          startup={selectedStartup}
          onClose={() => setSelectedStartup(null)}
        />
      )}

      <LoginModal 
        open={showLoginModal} 
        handleClose={handleLoginClose}
      />
    </Box>
  );
};

export default StartupMatchingCards;
