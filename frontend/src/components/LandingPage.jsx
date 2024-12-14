import React, { useState } from 'react';
import { Container, Typography, Box, Tabs, Tab, Grid, Pagination, Button } from '@mui/material';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import StartupCard from './cards/StartupCard';
import InvestorCard from './cards/InvestorCard';
import { useAuth } from '../contexts/AuthContext';

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
  const { user } = useAuth();
  const itemsPerPage = 6;

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

  // Sample data for development
  const startups = [
    {
      id: 1,
      name: "EcoTech Solutions",
      logo: "https://via.placeholder.com/300x140",
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
      logo: "https://via.placeholder.com/300x140",
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
      logo: "https://via.placeholder.com/300x140",
      shortDescription: "AI-powered healthcare diagnostics platform",
      description: "HealthAI is revolutionizing medical diagnostics with our AI-powered platform that helps doctors make faster, more accurate diagnoses.",
      industry: "HealthTech",
      fundingGoal: "3000000",
      revenue: "800000",
      valuation: "15000000",
      equityOffered: 18,
      team: "Founded by Dr. John Smith (Former Head of Radiology at Mayo Clinic) and Lisa Zhang (AI Expert)",
      traction: "In use at 10 major hospitals with 95% accuracy rate in initial trials"
    }
  ];

  const investors = [
    {
      id: 1,
      name: "Sarah Johnson",
      photo: "https://via.placeholder.com/300x140",
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
      photo: "https://via.placeholder.com/300x140",
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
      photo: "https://via.placeholder.com/300x140",
      title: "Sustainable Investment Director",
      background: "Former Environmental Consultant with an MBA from Stanford. Focused on sustainable and renewable energy investments.",
      interests: ["Renewable Energy", "Sustainable Agriculture", "Clean Tech"],
      minInvestment: "500000",
      maxInvestment: "5000000",
      portfolio: "Portfolio companies have collectively reduced carbon emissions by 1M tons annually",
      email: "maria.rodriguez@example.com",
      linkedin: "https://linkedin.com/in/mariarodriguez"
    }
  ];

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
          
          {!user && (
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
            {displayedData.map((item) => (
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
