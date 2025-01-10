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
  Paper,
  Paper,
  IconButton,
  Tooltip,
  Divider,
  Tooltip,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import BusinessIcon from '@mui/icons-material/Business';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CategoryIcon from '@mui/icons-material/Category';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useAuth } from '../../contexts/AuthContext';
import StartupContactModal from '../contact/StartupContactModal';
import StartupContactModal from '../contact/StartupContactModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StartupMatchingCards from './StartupMatchingCards';

const StyledContainer = styled(Container)(({ theme }) => ({
  flex: 1,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const GlassmorphicCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
const GlassmorphicCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.20)',
    boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.20)',
  },
}));

const WelcomeSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  padding: theme.spacing(4, 0),
}));

const StatCard = styled(GlassmorphicCard)(({ theme }) => ({
  padding: theme.spacing(3),
const WelcomeSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  padding: theme.spacing(4, 0),
}));

const StatCard = styled(GlassmorphicCard)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #008080 0%, #006666 100%)',
  color: '#fff',
  minHeight: 160,
}));

const StartupCard = styled(GlassmorphicCard)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderRadius: theme.spacing(2),
  '&.MuiChip-outlined': {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(1, 3),
  fontWeight: 600,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 128, 128, 0.2)',
  },
  background: 'linear-gradient(135deg, #008080 0%, #006666 100%)',
  color: '#fff',
  minHeight: 160,
}));

const StartupCard = styled(GlassmorphicCard)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderRadius: theme.spacing(2),
  '&.MuiChip-outlined': {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(1, 3),
  fontWeight: 600,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 128, 128, 0.2)',
  },
}));

const InvestorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const navigate = useNavigate();
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [stats, setStats] = useState({
    totalStartups: 0,
    matchingStartups: 0,
    totalInvestmentNeeded: 0,
    averageValuation: 0
    totalInvestmentNeeded: 0,
    averageValuation: 0
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
        
        const totalValuation = filteredStartups.reduce((sum, startup) => 
          sum + (startup.valuation || 0), 0
        );
        
        const totalValuation = filteredStartups.reduce((sum, startup) => 
          sum + (startup.valuation || 0), 0
        );
        
        setStartups(filteredStartups);
        setStats({
          totalStartups: response.data.length,
          matchingStartups: filteredStartups.length,
          totalInvestmentNeeded: filteredStartups.reduce((sum, startup) => 
            sum + (startup.fundingNeeded || 0), 0
          ),
          averageValuation: filteredStartups.length ? 
            Math.round(totalValuation / filteredStartups.length) : 0
            sum + (startup.fundingNeeded || 0), 0
          ),
          averageValuation: filteredStartups.length ? 
            Math.round(totalValuation / filteredStartups.length) : 0
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

  const handleContactClick = (startup) => {
    setSelectedStartup(startup);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} thickness={4} sx={{ color: '#008080' }} />
        <CircularProgress size={60} thickness={4} sx={{ color: '#008080' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error" variant="h6">{error}</Typography>
        <Typography color="error" variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <StyledContainer maxWidth="lg">
      <WelcomeSection>
        <Typography
          variant="h3"
          variant="h3"
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
          variant="h6"
          variant="h6"
          sx={{
            color: '#666',
            fontFamily: 'Poppins, sans-serif',
            maxWidth: '800px',
            margin: '0 auto',
            fontFamily: 'Poppins, sans-serif',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          Your personalized dashboard for discovering and connecting with promising startups
          Your personalized dashboard for discovering and connecting with promising startups
        </Typography>
      </WelcomeSection>

      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={3}>
          <StatCard>
            <BusinessIcon sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              {stats.totalStartups}
            </Typography>
            <Typography variant="subtitle1">Total Startups</Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard>
            <CategoryIcon sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              {stats.matchingStartups}
            </Typography>
            <Typography variant="subtitle1">Matching Your Interests</Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard>
            <MonetizationOnIcon sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              ${(stats.totalInvestmentNeeded / 1000000).toFixed(1)}M
            </Typography>
            <Typography variant="subtitle1">Total Investment Needed</Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard>
            <TrendingUpIcon sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              ${(stats.averageValuation / 1000000).toFixed(1)}M
            </Typography>
            <Typography variant="subtitle1">Average Valuation</Typography>
          </StatCard>
        </Grid>
      </Grid>

      {/* Preferences Section */}
      <GlassmorphicCard sx={{ mb: 6, py: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#008080', px: 3 }}>
          Your Investment Preferences
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box display="flex" gap={1} flexWrap="wrap" px={3}>
      <GlassmorphicCard sx={{ mb: 6, py: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#008080', px: 3 }}>
          Your Investment Preferences
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box display="flex" gap={1} flexWrap="wrap" px={3}>
          {user.investmentPreferences.map((pref) => (
            <StyledChip
            <StyledChip
              key={pref}
              label={pref}
              variant="outlined"
            />
          ))}
        </Box>
      </GlassmorphicCard>
      </GlassmorphicCard>

      {/* Matching Startups Section */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#008080' }}>
        Matching Startups
      </Typography>
      <StartupMatchingCards />

      {selectedStartup && (
        <StartupContactModal
          open={Boolean(selectedStartup)}
          startup={selectedStartup}
          onClose={() => setSelectedStartup(null)}
        />
      )}
    </StyledContainer>
  );
};

export default InvestorDashboard;
