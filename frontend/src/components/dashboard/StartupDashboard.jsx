import React from 'react';
import { Box, Container, Typography, Grid, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContext';

const StyledContainer = styled(Container)(({ theme }) => ({
  flex: 1,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const WelcomeSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const StartupDashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <StyledContainer maxWidth="lg">
        <Typography variant="h6" color="error">
          Error: Unable to load user data. Please try logging in again.
        </Typography>
      </StyledContainer>
    );
  }

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
          Welcome back, {user.name}!
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
        <Grid item xs={12}>
          <Box p={2} bgcolor="#f5f5f5" borderRadius={2}>
            <Typography variant="h6" gutterBottom>
              Your Startup Details
            </Typography>
            <Typography>
              <strong>Founder:</strong> {user.founderName}
            </Typography>
            <Typography>
              <strong>Industry:</strong> {user.industry}
            </Typography>
            <Typography>
              <strong>Description:</strong> {user.description}
            </Typography>
            {user.fundingNeeded && (
              <Typography>
                <strong>Funding Needed:</strong> ${user.fundingNeeded.toLocaleString()}
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default StartupDashboard;
