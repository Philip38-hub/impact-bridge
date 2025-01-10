import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  Box, 
  Tabs, 
  Tab, 
  Grid, 
  Pagination, 
  Button, 
  Paper, 
  useTheme, 
  useMediaQuery,
  TextField,
  InputAdornment,
  MenuItem,
  IconButton,
} from '@mui/material';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import StartupCard from './cards/StartupCard';
import InvestorCard from './cards/InvestorCard';
import { useAuth } from '../contexts/AuthContext';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import GroupsIcon from '@mui/icons-material/Groups';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import WebIcon from '@mui/icons-material/Web';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import InsightsIcon from '@mui/icons-material/Insights';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { industries } from '../utils/constants';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const HeroSection = styled(Box)`
  background: linear-gradient(-45deg, #006666, #008080, #004C4C, #007373);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  padding: 120px 0 80px;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%);
    pointer-events: none;
  }
`;

const AnimatedTitle = styled(Typography)`
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 4rem;
  margin-bottom: 24px;
  background: linear-gradient(120deg, #FFFFFF 0%, #E0F2F2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${fadeIn} 1s ease-out;
  text-shadow: 0 0 30px rgba(255,255,255,0.1);

  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
`;

const AnimatedSubtitle = styled(Typography)`
  font-family: 'Roboto', sans-serif;
  color: #E0F2F2;
  margin-bottom: 40px;
  font-size: 1.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  animation: ${fadeIn} 1s ease-out 0.3s backwards;
  line-height: 1.6;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    padding: 0 20px;
  }
`;

const SignUpButton = styled(Button)`
  font-family: 'Poppins', sans-serif;
  text-transform: none;
  padding: 12px 32px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(45deg, #008080, #006666);
  color: white;
  transition: all 0.3s ease;
  height: 48px;
  display: flex;
  align-items: center;
  white-space: nowrap;

  @media (max-width: 600px) {
    padding: 10px 24px;
    font-size: 14px;
    height: 42px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    background: linear-gradient(45deg, #006666, #008080);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ViewCardsButton = styled(Button)`
  font-family: 'Poppins', sans-serif;
  text-transform: none;
  padding: 12px 32px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(45deg, #008080, #006666);
  color: white;
  transition: all 0.3s ease;
  height: 48px;
  display: flex;
  align-items: center;
  white-space: nowrap;

  @media (max-width: 600px) {
    padding: 10px 24px;
    font-size: 14px;
    height: 42px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    background: linear-gradient(45deg, #006666, #008080);
  }

  &:active {
    transform: translateY(0);
  }
`;

const StatsSection = styled(Box)`
  padding: 80px 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
  position: relative;
`;

const StatCard = styled(Paper)`
  padding: 32px 24px;
  text-align: center;
  transition: all 0.3s ease;
  height: 100%;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 30px rgba(0,128,128,0.15);
  }

  .stat-icon {
    animation: ${pulse} 2s infinite;
    color: #008080;
  }
`;

const StyledTabs = styled(Tabs)`
  margin: 40px 0;
  
  .MuiTab-root {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
    min-width: 160px;
    transition: all 0.3s ease;
    
    &.Mui-selected {
      color: #008080;
      font-weight: 600;
    }

    &:hover {
      color: #008080;
      opacity: 0.8;
    }
  }
  
  .MuiTabs-indicator {
    background-color: #008080;
    height: 3px;
    border-radius: 3px;
  }
`;

const ValuePropSection = styled(Box)`
  padding: 100px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(45deg, rgba(0,128,128,0.05) 0%, transparent 100%);
    transform: skewY(-6deg);
    transform-origin: top left;
  }
`;

const StartupValueSection = styled(Box)`
  padding: 100px 0;
  background: linear-gradient(135deg, #ffffff 0%, #f0f9f9 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(45deg, rgba(0,128,128,0.05) 0%, transparent 100%);
    transform: skewY(6deg);
    transform-origin: top right;
  }
`;

const BenefitCard = styled(Paper)(({ theme }) => ({
  padding: '2rem',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
  '.benefit-icon': {
    fontSize: '3rem',
    marginBottom: '1.5rem',
    color: '#006666',
  },
}));

const FeatureCard = styled(Box)`
  text-align: center;
  padding: 40px 24px;
  border-radius: 16px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;

  &:hover {
    transform: translateY(-5px);

    .feature-icon {
      transform: scale(1.1);
      color: #008080;
    }
  }

  .feature-icon {
    font-size: 48px;
    color: #006666;
    margin-bottom: 24px;
    transition: all 0.3s ease;
  }
`;

const ContentContainer = styled(Container)`
  animation: ${fadeIn} 1s ease-out;
`;

const CardsSection = styled(Box)`
  padding: 80px 0;
  background: linear-gradient(135deg, #ffffff 0%, #f0f9f9 100%);
  min-height: 600px;
`;

const SearchFilterContainer = styled(Box)`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SearchBar = styled(TextField)`
  .MuiOutlinedInput-root {
    background: white;
    border-radius: 50px;
    
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: #008080;
    }
    
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #008080;
    }
  }
`;

const FilterBar = styled(Box)`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const LandingPage = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const itemsPerPage = 6;
  const [showCards, setShowCards] = useState(false);
  const [startups, setStartups] = useState([]);
  const [investors, setInvestors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [startupsRes, investorsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/startups/featured`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/investors/featured`)
        ]);
        
        setStartups(startupsRes.data);
        setInvestors(investorsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    const currentData = tabValue === 0 ? startups : investors;
    return currentData.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesIndustry = selectedIndustry === '' || 
        (item.industry && item.industry === selectedIndustry);

      return matchesSearch && matchesIndustry;
    });
  }, [tabValue, startups, investors, searchQuery, selectedIndustry]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleIndustryChange = (event) => {
    setSelectedIndustry(event.target.value);
    setPage(1);
  };

  const scrollToCards = () => {
    setShowCards(true);
    document.getElementById('cards-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box>
      <HeroSection>
        <ContentContainer>
          <AnimatedTitle variant="h1">
            Transform Your Investment Portfolio
          </AnimatedTitle>
          <AnimatedSubtitle variant="h5">
            Join an exclusive community of visionary investors backing the next generation of world-changing startups. 
            Discover curated opportunities with exceptional growth potential.
          </AnimatedSubtitle>
          
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 1, sm: 2 }, 
            justifyContent: 'center', 
            mt: 4,
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            px: { xs: 2, sm: 0 }
          }}>
            {!user ? (
              <>
                <SignUpButton
                  variant="contained"
                  onClick={() => navigate('/signup')}
                >
                  Begin Your Investment Journey
                </SignUpButton>
                <ViewCardsButton
                  variant="contained"
                  onClick={scrollToCards}
                >
                  View Opportunities
                </ViewCardsButton>
              </>
            ) : (
              <ViewCardsButton
                variant="contained"
                onClick={scrollToCards}
              >
                View Opportunities
              </ViewCardsButton>
            )}
          </Box>
        </ContentContainer>
      </HeroSection>

      <StatsSection>
        <ContentContainer>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard elevation={3}>
                <TrendingUpIcon className="stat-icon" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h3" sx={{ mb: 1, color: '#008080', fontWeight: 'bold' }}>
                  25%
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                  Average Portfolio Growth
                </Typography>
              </StatCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard elevation={3}>
                <RocketLaunchIcon className="stat-icon" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h3" sx={{ mb: 1, color: '#008080', fontWeight: 'bold' }}>
                  100+
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                  Vetted Startups
                </Typography>
              </StatCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard elevation={3}>
                <GroupsIcon className="stat-icon" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h3" sx={{ mb: 1, color: '#008080', fontWeight: 'bold' }}>
                  500+
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                  Jobs created
                </Typography>
              </StatCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard elevation={3}>
                <MonetizationOnIcon className="stat-icon" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h3" sx={{ mb: 1, color: '#008080', fontWeight: 'bold' }}>
                  $50M+
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                  Total Investments
                </Typography>
              </StatCard>
            </Grid>
          </Grid>
        </ContentContainer>
      </StatsSection>

      <ValuePropSection>
        <ContentContainer>
          <Typography 
            variant="h3" 
            sx={{ 
              mb: 6, 
              textAlign: 'center', 
              color: '#006666', 
              fontWeight: 'bold',
              position: 'relative',
              zIndex: 1
            }}
          >
            Why Leading Investors Choose Us
          </Typography>
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <FeatureCard>
                <SecurityIcon className="feature-icon" />
                <Typography variant="h5" sx={{ mb: 2, color: '#006666', fontWeight: 'bold' }}>
                  Rigorous Due Diligence
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                  Every startup undergoes comprehensive vetting by our expert team, ensuring you invest with confidence.
                </Typography>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard>
                <SpeedIcon className="feature-icon" />
                <Typography variant="h5" sx={{ mb: 2, color: '#006666', fontWeight: 'bold' }}>
                  Streamlined Process
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                  From discovery to investment, our platform makes the entire process efficient and transparent.
                </Typography>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard>
                <EmojiObjectsIcon className="feature-icon" />
                <Typography variant="h5" sx={{ mb: 2, color: '#006666', fontWeight: 'bold' }}>
                  Expert Insights
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                  Access detailed market analysis and expert recommendations to make informed investment decisions.
                </Typography>
              </FeatureCard>
            </Grid>
          </Grid>
        </ContentContainer>
      </ValuePropSection>

      <StartupValueSection>
        <ContentContainer>
          <Typography 
            variant="h3" 
            sx={{ 
              mb: 3, 
              textAlign: 'center', 
              color: '#006666', 
              fontWeight: 'bold',
              position: 'relative',
              zIndex: 1
            }}
          >
            For Startups
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 6, 
              textAlign: 'center', 
              color: 'text.secondary',
              maxWidth: '800px',
              mx: 'auto',
              position: 'relative',
              zIndex: 1
            }}
          >
            Join our platform and accelerate your growth with exclusive benefits
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <BenefitCard elevation={0}>
                <BusinessIcon className="benefit-icon" />
                <Typography variant="h5" sx={{ mb: 2, color: '#006666', fontWeight: 'bold' }}>
                  Professional Website
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                  Get a custom-built website at a reduced fee when you join our platform. Stand out with a professional online presence that attracts investors.
                </Typography>
              </BenefitCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <BenefitCard elevation={0}>
                <PeopleIcon className="benefit-icon" />
                <Typography variant="h5" sx={{ mb: 2, color: '#006666', fontWeight: 'bold' }}>
                  Investor Network
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                  Connect with our curated network of impact investors. Get matched with investors who share your vision and can help scale your business.
                </Typography>
              </BenefitCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <BenefitCard elevation={0}>
                <InsightsIcon className="benefit-icon" />
                <Typography variant="h5" sx={{ mb: 2, color: '#006666', fontWeight: 'bold' }}>
                  Growth Support
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                  Access expert mentorship, market insights, and growth resources. Benefit from our ecosystem of successful entrepreneurs and industry experts.
                </Typography>
              </BenefitCard>
            </Grid>
          </Grid>
          {!user && (
            <Box sx={{ textAlign: 'center', mt: 6, position: 'relative', zIndex: 1 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/signup')}
                sx={{
                  borderRadius: '50px',
                  padding: '12px 40px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #008080, #00a0a0)',
                  textTransform: 'none',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #006666, #008080)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0,128,128,0.25)',
                  },
                }}
              >
                Join as a Startup
              </Button>
            </Box>
          )}
        </ContentContainer>
      </StartupValueSection>

      <Box id="cards-section" sx={{ py: 8, minHeight: '100vh' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" sx={{ mb: 2, textAlign: 'center' }}>
              {tabValue === 0 ? 'Featured Startups' : 'Featured Investors'}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
              {tabValue === 0 
                ? 'Discover innovative startups making a difference' 
                : 'Connect with investors who share your vision'}
            </Typography>

            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  variant="outlined"
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FilterListIcon />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="">All Industries</MenuItem>
                  {industries.map((industry) => (
                    <MenuItem key={industry} value={industry}>
                      {industry}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <Tabs
              value={tabValue}
              onChange={(e, newValue) => {
                setTabValue(newValue);
                setPage(1);
              }}
              centered
              sx={{ mb: 4 }}
            >
              <Tab 
                label="Startups" 
                icon={<RocketLaunchIcon />} 
                iconPosition="start"
              />
              <Tab 
                label="Investors" 
                icon={<BusinessIcon />} 
                iconPosition="start"
              />
            </Tabs>
          </Box>

          <Grid container spacing={3}>
            {displayedData.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                {tabValue === 0 ? (
                  <StartupCard startup={item} />
                ) : (
                  <InvestorCard investor={item} />
                )}
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
              />
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
