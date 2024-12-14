import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Chip,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import BusinessIcon from '@mui/icons-material/Business';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CategoryIcon from '@mui/icons-material/Category';
import { useAuth } from '../../contexts/AuthContext';
import StartupContactModal from '../contact/StartupContactModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)(({ theme }) => ({
  flex: 1,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const WelcomeSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const DashboardCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const StatCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const InvestorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [stats, setStats] = useState({
    totalStartups: 0,
    matchingStartups: 0,
    totalInvestmentNeeded: 0
  });

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/startups`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        
        const filteredStartups = response.data.filter(startup => 
          user.interests.includes(startup.industry)
        );
        
        setStartups(filteredStartups);
        setStats({
          totalStartups: response.data.length,
          matchingStartups: filteredStartups.length,
          totalInvestmentNeeded: filteredStartups.reduce((sum, startup) => 
            sum + startup.fundingNeeded, 0
          )
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching startups:', err);
        setError('Failed to load startups. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, [user.interests]);

  const handleContactClick = (startup) => {
    setSelectedStartup(startup);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error">{error}</Typography>
      </Box>
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
          Discover and connect with promising startups in your preferred industries
        </Typography>
      </WelcomeSection>

      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <StatCard>
            <BusinessIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4">{stats.totalStartups}</Typography>
            <Typography>Total Startups</Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard>
            <CategoryIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4">{stats.matchingStartups}</Typography>
            <Typography>Matching Your Interests</Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard>
            <MonetizationOnIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4">${stats.totalInvestmentNeeded.toLocaleString()}</Typography>
            <Typography>Total Investment Needed</Typography>
          </StatCard>
        </Grid>
      </Grid>

      {/* Preferences Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Your Investment Preferences</Typography>
        <Box display="flex" gap={1} flexWrap="wrap">
          {user.investmentPreferences.map((pref) => (
            <Chip
              key={pref}
              label={pref}
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
      </Box>

      {/* Matching Startups Section */}
      <Typography variant="h6" sx={{ mb: 2 }}>Matching Startups</Typography>
      <Grid container spacing={3}>
        {startups.map((startup) => (
          <Grid item xs={12} sm={6} md={4} key={startup._id}>
            <DashboardCard>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    {startup.startupName[0]}
                  </Avatar>
                  <Typography variant="h6" noWrap>{startup.startupName}</Typography>
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  {startup.industry}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {startup.description}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle2" color="primary">
                    ${startup.fundingNeeded.toLocaleString()} needed
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleContactClick(startup)}
                  >
                    Invest Now
                  </Button>
                </Box>
              </CardContent>
            </DashboardCard>
          </Grid>
        ))}
      </Grid>

      {/* Contact Modal */}
      <StartupContactModal
        open={!!selectedStartup}
        onClose={() => setSelectedStartup(null)}
        startup={selectedStartup}
      />
    </StyledContainer>
  );
};

export default InvestorDashboard;
