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
  IconButton,
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
import { useAuth } from '../../contexts/AuthContext';
import StartupContactModal from '../contact/StartupContactModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
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
        
        setStartups(filteredStartups);
        setStats({
          totalStartups: response.data.length,
          matchingStartups: filteredStartups.length,
          totalInvestmentNeeded: filteredStartups.reduce((sum, startup) => 
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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} thickness={4} sx={{ color: '#008080' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error" variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <StyledContainer maxWidth="lg">
      <WelcomeSection>
        <Typography
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
          sx={{
            color: '#666',
            fontFamily: 'Poppins, sans-serif',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          Your personalized dashboard for discovering and connecting with promising startups
        </Typography>
      </WelcomeSection>

      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <BusinessIcon sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>{stats.totalStartups}</Typography>
            <Typography variant="subtitle1">Total Startups</Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <CategoryIcon sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>{stats.matchingStartups}</Typography>
            <Typography variant="subtitle1">Matching Interests</Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <MonetizationOnIcon sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              ${(stats.totalInvestmentNeeded / 1000000).toFixed(1)}M
            </Typography>
            <Typography variant="subtitle1">Total Investment Needed</Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <TrendingUpIcon sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
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
          {user.investmentPreferences.map((pref) => (
            <StyledChip
              key={pref}
              label={pref}
              variant="outlined"
            />
          ))}
        </Box>
      </GlassmorphicCard>

      {/* Matching Startups Section */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#008080' }}>
        Matching Startups
      </Typography>
      <Grid container spacing={3}>
        {startups.map((startup) => (
          <Grid item xs={12} sm={6} md={4} key={startup._id}>
            <StartupCard>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar 
                  sx={{ 
                    bgcolor: '#008080',
                    width: 56,
                    height: 56,
                    mr: 2,
                    fontSize: '1.5rem'
                  }}
                >
                  {startup.startupName[0]}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {startup.startupName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {startup.industry}
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="body2" sx={{ mb: 2, minHeight: 60 }}>
                {startup.description?.slice(0, 120)}...
              </Typography>
              
              <Box sx={{ mt: 'auto' }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Seeking: ${(startup.fundingNeeded / 1000000).toFixed(1)}M
                    </Typography>
                  </Grid>
                </Grid>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Box>
                    <Tooltip title="Save for later">
                      <IconButton size="small" sx={{ mr: 1 }}>
                        <FavoriteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Share">
                      <IconButton size="small">
                        <ShareIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <ActionButton
                    variant="contained"
                    onClick={() => handleContactClick(startup)}
                    sx={{
                      bgcolor: '#008080',
                      '&:hover': {
                        bgcolor: '#006666',
                      },
                    }}
                  >
                    Contact
                  </ActionButton>
                </Box>
              </Box>
            </StartupCard>
          </Grid>
        ))}
      </Grid>

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
