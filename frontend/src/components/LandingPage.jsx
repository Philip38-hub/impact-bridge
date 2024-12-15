import React, { useState, useEffect } from 'react';
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
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const itemsPerPage = 6;
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  // Sample data for development
  const startups = [
    {
      id: 1,
      name: "EcoTech Solutions",
      logo: "https://images.unsplash.com/photo-1483985974936-5a7a25c7c7c5?auto=format&fit=crop&w=300&h=140",
      shortDescription: "Developing sustainable energy solutions for urban communities",
      description: "EcoTech Solutions is pioneering innovative renewable energy technologies that make sustainable living accessible to urban communities. Our solutions combine solar power with AI-driven optimization.",
      industry: "Clean Energy",
      fundingGoal: "2000000",
      revenue: "500000",
      valuation: "10000000",
      equityOffered: 15,
      team: "Founded by Dr. Sarah Chen (PhD in Renewable Energy) and James Wilson (Former Tesla Engineer)",
      traction: "Currently serving 5 communities with successful pilot programs showing 40% energy cost reduction"
    },
    {
      id: 2,
      name: "AgriSmart",
      logo: "https://images.unsplash.com/photo-1534361960057-4a34a7a2fb14?auto=format&fit=crop&w=300&h=140",
      shortDescription: "Smart farming solutions for sustainable agriculture",
      description: "AgriSmart leverages IoT and AI to help farmers optimize crop yields while minimizing resource usage. Our system provides real-time monitoring and predictive analytics.",
      industry: "AgTech",
      fundingGoal: "1500000",
      revenue: "300000",
      valuation: "7000000",
      equityOffered: 12,
      team: "Led by Michael Brown (20 years in AgTech) and Dr. Emily Rodriguez (Agricultural Science)",
      traction: "Partnership with 50+ farms, showing average yield increase of 25%"
    },
    {
      id: 3,
      name: "HealthAI",
      logo: "https://images.unsplash.com/photo-1494790108377-85e24f1ff573?auto=format&fit=crop&w=300&h=140",
      shortDescription: "AI-powered healthcare diagnostics platform",
      description: "HealthAI is revolutionizing medical diagnostics with our AI-powered platform that helps doctors make faster, more accurate diagnoses.",
      industry: "HealthTech",
      fundingGoal: "3000000",
      revenue: "800000",
      valuation: "15000000",
      equityOffered: 18,
      team: "Founded by Dr. John Smith (Former Head of Radiology at Mayo Clinic) and Lisa Zhang (AI Expert)",
      traction: "In use at 10 major hospitals with 95% accuracy rate in initial trials"
    },
    {
      id: 4,
      name: "EcoHarvest Solutions",
      logo: "https://images.unsplash.com/photo-1534361960057-4a34a7a2fb14?auto=format&fit=crop&w=300&h=140",
      shortDescription: "Smart agricultural solutions for sustainable farming practices",
      description: "EcoHarvest Solutions provides innovative solutions to farmers, enabling them to optimize crop yields and reduce resource usage. Our system includes real-time monitoring and predictive analytics.",
      industry: "AgTech",
      fundingGoal: "1000000",
      revenue: "200000",
      valuation: "5000000",
      equityOffered: 10,
      team: "Led by Dr. Jane Doe (PhD in Agricultural Science) and Dr. Bob Smith (Former CEO of AgTech Solutions)",
      traction: "In use at 20+ farms, showing average yield increase of 30%"
    },
    {
      id: 5,
      name: "GreenTech Solutions",
      logo: "https://images.unsplash.com/photo-1534361960057-4a34a7a2fb14?auto=format&fit=crop&w=300&h=140",
      shortDescription: "Developing sustainable technologies for renewable energy",
      description: "GreenTech Solutions is pioneering innovative renewable energy technologies that make sustainable living accessible to urban communities. Our solutions combine solar power with AI-driven optimization.",
      industry: "Clean Energy",
      fundingGoal: "1500000",
      revenue: "300000",
      valuation: "7000000",
      equityOffered: 12,
      team: "Founded by Dr. Maria Rodriguez (PhD in Renewable Energy) and Dr. John Doe (Former CEO of Energy Solutions)",
      traction: "Currently serving 3 communities with successful pilot programs showing 35% energy cost reduction"
    },
    {
      id: 6,
      name: "AgroTech Innovations",
      logo: "https://images.unsplash.com/photo-1534361960057-4a34a7a2fb14?auto=format&fit=crop&w=300&h=140",
      shortDescription: "Smart farming solutions for sustainable agriculture",
      description: "AgroTech Innovations provides innovative solutions to farmers, enabling them to optimize crop yields while minimizing resource usage. Our system includes real-time monitoring and predictive analytics.",
      industry: "AgTech",
      fundingGoal: "2000000",
      revenue: "400000",
      valuation: "10000000",
      equityOffered: 15,
      team: "Led by Dr. Michael Brown (PhD in Agricultural Science) and Dr. Emily Chen (AI Expert)",
      traction: "In use at 15+ farms, showing average yield increase of 45%"
    },
    {
      id: 7,
      name: "EduReach",
      logo: "https://images.unsplash.com/photo-1534361960057-4a34a7a2fb14?auto=format&fit=crop&w=300&h=140",
      shortDescription: "Digital education platform making learning accessible to all",
      description: "EduReach is revolutionizing education with our AI-powered platform that helps teachers create personalized learning experiences for students.",
      industry: "EdTech",
      fundingGoal: "2500000",
      revenue: "600000",
      valuation: "15000000",
      equityOffered: 18,
      team: "Founded by Dr. Sarah Lee (PhD in Education) and Dr. John Chen (AI Expert)",
      traction: "In use at 50+ schools, showing average student performance improvement of 20%"
    },
    {
      id: 8,
      name: "FoodTech Solutions",
      logo: "https://images.unsplash.com/photo-1534361960057-4a34a7a2fb14?auto=format&fit=crop&w=300&h=140",
      shortDescription: "Developing plant-based meat alternatives using sustainable ingredients",
      description: "FoodTech Solutions is pioneering innovative plant-based meat alternatives that make sustainable living accessible to urban communities. Our solutions combine sustainable ingredients with AI-driven optimization.",
      industry: "FoodTech",
      fundingGoal: "3000000",
      revenue: "800000",
      valuation: "15000000",
      equityOffered: 18,
      team: "Founded by Dr. Jane Doe (PhD in Food Science) and Dr. Bob Smith (Former CEO of FoodTech Solutions)",
      traction: "In use at 50+ restaurants, showing average sales increase of 30%"
    },
    {
      id: 9,
      name: "SmartWater Systems",
      logo: "https://images.unsplash.com/photo-1534361960057-4a34a7a2fb14?auto=format&fit=crop&w=300&h=140",
      shortDescription: "IoT-based water management solutions for efficient resource utilization",
      description: "SmartWater Systems provides innovative solutions to farmers, enabling them to optimize crop yields while minimizing resource utilization. Our system includes real-time monitoring and predictive analytics.",
      industry: "WaterTech",
      fundingGoal: "2000000",
      revenue: "400000",
      valuation: "10000000",
      equityOffered: 15,
      team: "Led by Dr. Michael Brown (PhD in Hydrology) and Dr. Emily Chen (AI Expert)",
      traction: "In use at 15+ farms, showing average yield increase of 40%"
    }
  ];

  const investors = [
    {
      id: 1,
      name: "Sarah Johnson",
      photo: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=300&h=140",
      title: "Impact Investment Partner",
      background: "15+ years of experience in venture capital with a focus on sustainable technologies and social impact ventures.",
      interests: ["Clean Energy", "AgTech", "Social Impact"],
      minInvestment: "250000",
      maxInvestment: "2000000",
      portfolio: "Led investments in 20+ successful startups including GreenTech Solutions and SocialImpact AI",
      email: "sarah.johnson@example.com",
      linkedin: "https://linkedin.com/in/sarahjohnson"
    },
    {
      id: 2,
      name: "David Chen",
      photo: "https://images.unsplash.com/photo-1494790108377-85e24f1ff573?auto=format&fit=crop&w=300&h=140",
      title: "Angel Investor & Mentor",
      background: "Serial entrepreneur turned investor with 3 successful exits. Passionate about mentoring early-stage startups.",
      interests: ["HealthTech", "EdTech", "AI/ML"],
      minInvestment: "100000",
      maxInvestment: "1000000",
      portfolio: "Early investor in HealthAI and EduTech Pioneers. Active mentor at Y Combinator.",
      email: "david.chen@example.com",
      linkedin: "https://linkedin.com/in/davidchen"
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      photo: "https://images.unsplash.com/photo-1534361960057-4a34a7a2fb14?auto=format&fit=crop&w=300&h=140",
      title: "Sustainable Investment Director",
      background: "Former Environmental Consultant with an MBA from Stanford. Focused on sustainable and renewable energy investments.",
      interests: ["Renewable Energy", "Sustainable Agriculture", "Clean Tech"],
      minInvestment: "500000",
      maxInvestment: "5000000",
      portfolio: "Portfolio companies have collectively reduced carbon emissions by 1M tons annually",
      email: "maria.rodriguez@example.com",
      linkedin: "https://linkedin.com/in/mariarodriguez"
    },
    {
      id: 4,
      name: "John Lee",
      photo: "https://images.unsplash.com/photo-1525130413817-d45c1d127c42?auto=format&fit=crop&w=300&h=140",
      title: "Impact Investor",
      background: "10+ years of experience in venture capital with a focus on sustainable technologies and social impact ventures.",
      interests: ["Clean Energy", "AgTech", "Social Impact"],
      minInvestment: "250000",
      maxInvestment: "2000000",
      portfolio: "Led investments in 15+ successful startups including GreenTech Solutions and SocialImpact AI",
      email: "john.lee@example.com",
      linkedin: "https://linkedin.com/in/johnlee"
    },
    {
      id: 5,
      name: "Emily Chen",
      photo: "https://images.unsplash.com/photo-1531711678821-21233fa099b1?auto=format&fit=crop&w=300&h=140",
      title: "Angel Investor & Mentor",
      background: "Serial entrepreneur turned investor with 2 successful exits. Passionate about mentoring early-stage startups.",
      interests: ["HealthTech", "EdTech", "AI/ML"],
      minInvestment: "100000",
      maxInvestment: "1000000",
      portfolio: "Early investor in HealthAI and EduTech Pioneers. Active mentor at Y Combinator.",
      email: "emily.chen@example.com",
      linkedin: "https://linkedin.com/in/emilychen"
    },
    {
      id: 6,
      name: "Michael Brown",
      photo: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=300&h=140",
      title: "Sustainable Investment Director",
      background: "Former Environmental Consultant with an MBA from Stanford. Focused on sustainable and renewable energy investments.",
      interests: ["Renewable Energy", "Sustainable Agriculture", "Clean Tech"],
      minInvestment: "500000",
      maxInvestment: "5000000",
      portfolio: "Portfolio companies have collectively reduced carbon emissions by 1M tons annually",
      email: "michael.brown@example.com",
      linkedin: "https://linkedin.com/in/michaelbrown"
    },
    {
      id: 7,
      name: "Jane Doe",
      photo: "https://images.unsplash.com/photo-1531628486411-5edb890c9b4e?auto=format&fit=crop&w=300&h=140",
      title: "Impact Investment Partner",
      background: "15+ years of experience in venture capital with a focus on sustainable technologies and social impact ventures.",
      interests: ["Clean Energy", "AgTech", "Social Impact"],
      minInvestment: "250000",
      maxInvestment: "2000000",
      portfolio: "Led investments in 20+ successful startups including GreenTech Solutions and SocialImpact AI",
      email: "jane.doe@example.com",
      linkedin: "https://linkedin.com/in/janedoe"
    },
    {
      id: 8,
      name: "Bob Smith",
      photo: "https://images.unsplash.com/photo-1534361960057-4a34a7a2fb14?auto=format&fit=crop&w=300&h=140",
      title: "Angel Investor & Mentor",
      background: "Serial entrepreneur turned investor with 3 successful exits. Passionate about mentoring early-stage startups.",
      interests: ["HealthTech", "EdTech", "AI/ML"],
      minInvestment: "100000",
      maxInvestment: "1000000",
      portfolio: "Early investor in HealthAI and EduTech Pioneers. Active mentor at Y Combinator.",
      email: "bob.smith@example.com",
      linkedin: "https://linkedin.com/in/bobsmith"
    },
    {
      id: 9,
      name: "Lisa Nguyen",
      photo: "https://images.unsplash.com/photo-1525130413817-d45c1d127c42?auto=format&fit=crop&w=300&h=140",
      title: "Sustainable Investment Director",
      background: "Former Environmental Consultant with an MBA from Stanford. Focused on sustainable and renewable energy investments.",
      interests: ["Renewable Energy", "Sustainable Agriculture", "Clean Tech"],
      minInvestment: "500000",
      maxInvestment: "5000000",
      portfolio: "Portfolio companies have collectively reduced carbon emissions by 1M tons annually",
      email: "lisa.nguyen@example.com",
      linkedin: "https://linkedin.com/in/lisanguyen"
    },
    {
      id: 10,
      name: "David Kim",
      photo: "https://images.unsplash.com/photo-1531711678821-21233fa099b1?auto=format&fit=crop&w=300&h=140",
      title: "Impact Investor",
      background: "10+ years of experience in venture capital with a focus on sustainable technologies and social impact ventures.",
      interests: ["Clean Energy", "AgTech", "Social Impact"],
      minInvestment: "250000",
      maxInvestment: "2000000",
      portfolio: "Led investments in 15+ successful startups including GreenTech Solutions and SocialImpact AI",
      email: "david.kim@example.com",
      linkedin: "https://linkedin.com/in/davidkim"
    },
    {
      id: 11,
      name: "Sophia Patel",
      photo: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=300&h=140",
      title: "Angel Investor & Mentor",
      background: "Serial entrepreneur turned investor with 2 successful exits. Passionate about mentoring early-stage startups.",
      interests: ["HealthTech", "EdTech", "AI/ML"],
      minInvestment: "100000",
      maxInvestment: "1000000",
      portfolio: "Early investor in HealthAI and EduTech Pioneers. Active mentor at Y Combinator.",
      email: "sophia.patel@example.com",
      linkedin: "https://linkedin.com/in/sophiapatel"
    }
  ];

  const currentData = tabValue === 0 ? startups : investors;
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedData = currentData.slice(startIndex, startIndex + itemsPerPage);

  // Filter data based on search query and industry
  const filterData = (data) => {
    return data.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesIndustry = selectedIndustry === '' || 
        (item.industry && item.industry === selectedIndustry);

      return matchesSearch && matchesIndustry;
    });
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
            gap: 2, 
            justifyContent: 'center', 
            mt: 4,
            alignItems: 'center' 
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

      <CardsSection id="cards-section">
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            sx={{ 
              mb: 4, 
              textAlign: 'center', 
              color: '#006666', 
              fontWeight: 'bold' 
            }}
          >
            Explore Opportunities
          </Typography>

          <SearchFilterContainer>
            <SearchBar
              fullWidth
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#008080' }} />
                  </InputAdornment>
                ),
              }}
            />
            <FilterBar>
              <TextField
                select
                label="Industry"
                value={selectedIndustry}
                onChange={handleIndustryChange}
                sx={{ minWidth: 200 }}
              >
                <MenuItem value="">All Industries</MenuItem>
                {industries.map((industry) => (
                  <MenuItem key={industry} value={industry}>
                    {industry}
                  </MenuItem>
                ))}
              </TextField>
            </FilterBar>
          </SearchFilterContainer>

          <StyledTabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            sx={{ mb: 4 }}
          >
            <Tab label="Startups" />
            <Tab label="Investors" />
          </StyledTabs>

          <Grid container spacing={3}>
            {filterData(displayedData).map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
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
                onChange={handlePageChange}
                color="primary"
                size={isMobile ? 'small' : 'large'}
              />
            </Box>
          )}
        </Container>
      </CardsSection>
    </Box>
  );
};

export default LandingPage;
