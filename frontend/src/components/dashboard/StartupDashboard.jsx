import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  flex: 1,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const WelcomeSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const StartupDashboard = () => {
  // TODO: Get user data from context/state
  const startupName = "Your Startup"; // This will be replaced with actual data

  return (
    <StyledContainer maxWidth="lg">
      <WelcomeSection>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            color: '#008080',
            marginBottom: 2,
          }}
        >
          Welcome back!
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: '#666',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          Manage your startup profile and connect with potential investors
        </Typography>
      </WelcomeSection>

      <Grid container spacing={3}>
        {/* Add dashboard content here */}
      </Grid>
    </StyledContainer>
  );
};

export default StartupDashboard;
