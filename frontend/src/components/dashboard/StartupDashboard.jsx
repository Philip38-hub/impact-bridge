import React from 'react';
import { Box, Container, Typography, Grid, CircularProgress, IconButton, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)(({ theme }) => ({
  flex: 1,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const WelcomeSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const DetailCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.9)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const DetailRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
  '&:last-child': {
    marginBottom: 0,
  },
}));

const DetailLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: '#006666',
  minWidth: '140px',
  marginRight: theme.spacing(2),
}));

const DetailValue = styled(Typography)(({ theme }) => ({
  color: '#444',
  flex: 1,
}));

const EditButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: '#008080',
  color: 'white',
  '&:hover': {
    backgroundColor: '#006666',
  },
}));

const StartupDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

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

  const handleEdit = () => {
    navigate('/edit-startup');
  };

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
        <Grid item xs={12}>
          <DetailCard>
            <Typography variant="h5" sx={{ mb: 3, color: '#008080', fontWeight: 600 }}>
              Your Startup Details
            </Typography>
            
            <EditButton onClick={handleEdit} size="medium">
              <EditIcon />
            </EditButton>

            <DetailRow>
              <DetailLabel>Startup Name</DetailLabel>
              <DetailValue>{user.startupName}</DetailValue>
            </DetailRow>

            <DetailRow>
              <DetailLabel>Founder</DetailLabel>
              <DetailValue>{user.founderName}</DetailValue>
            </DetailRow>

            <DetailRow>
              <DetailLabel>Industry</DetailLabel>
              <DetailValue>{user.industry}</DetailValue>
            </DetailRow>

            <DetailRow>
              <DetailLabel>Description</DetailLabel>
              <DetailValue>{user.description}</DetailValue>
            </DetailRow>

            {user.fundingNeeded && (
              <DetailRow>
                <DetailLabel>Funding Needed</DetailLabel>
                <DetailValue>${user.fundingNeeded.toLocaleString()}</DetailValue>
              </DetailRow>
            )}

            {user.revenue && (
              <DetailRow>
                <DetailLabel>Revenue</DetailLabel>
                <DetailValue>${user.revenue.toLocaleString()}</DetailValue>
              </DetailRow>
            )}

            {user.valuation && (
              <DetailRow>
                <DetailLabel>Valuation</DetailLabel>
                <DetailValue>${user.valuation.toLocaleString()}</DetailValue>
              </DetailRow>
            )}
          </DetailCard>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default StartupDashboard;
