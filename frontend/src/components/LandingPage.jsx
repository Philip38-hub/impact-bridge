import React, { useState } from 'react';
import { Container, Typography, Box, Tabs, Tab, Grid, Pagination, Button } from '@mui/material';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import BusinessCard from './BusinessCard';
import { startups, investors } from '../data/sampleData';

const HeroSection = styled(Box)`
  background-color: white;
  padding: 60px 0;
  text-align: center;
`;

const Title = styled(Typography)`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  color: #008080;
  margin-bottom: 16px;
`;

const Subtitle = styled(Typography)`
  font-family: 'Roboto', sans-serif;
  color: #666;
  margin-bottom: 24px;
`;

const SignUpButton = styled(Button)`
  font-family: 'Poppins', sans-serif;
  text-transform: none;
  padding: 12px 32px;
  margin-bottom: 40px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
  background-color: #008080;
  color: white;
  transition: all 0.2s ease;

  &:hover {
    background-color: #006666;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

const StyledTabs = styled(Tabs)`
  margin-bottom: 40px;
  
  .MuiTab-root {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
    
    &.Mui-selected {
      color: #008080;
    }
  }
  
  .MuiTabs-indicator {
    background-color: #008080;
  }
`;

const LandingPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 6;

  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const currentData = tabValue === 0 ? startups : investors;
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedData = currentData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box>
      <HeroSection>
        <Container>
          <Title variant="h3">
            FUND YOUR FUTURE
          </Title>
          <Subtitle variant="h5">
            Connecting innovators with investors to shape tomorrow
          </Subtitle>
          
          {!isLoggedIn && (
            <SignUpButton
              variant="contained"
              onClick={handleSignUp}
            >
              Get Started Now
            </SignUpButton>
          )}
          
          <StyledTabs
            value={tabValue}
            onChange={handleTabChange}
            centered
          >
            <Tab label="Startups Seeking Funding" />
            <Tab label="Available Funders" />
          </StyledTabs>

          <Grid container spacing={3}>
            {displayedData.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <BusinessCard data={item} index={index} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: '#008080',
                  },
                  '& .Mui-selected': {
                    backgroundColor: 'rgba(0, 128, 128, 0.1) !important',
                  },
                }}
              />
            </Box>
          )}
        </Container>
      </HeroSection>
    </Box>
  );
};

export default LandingPage;
