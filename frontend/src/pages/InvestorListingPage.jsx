import React, { useEffect, useState } from 'react';
import CardGrid from '../components/cards/CardGrid';
import { Box, CircularProgress } from '@mui/material';
import axios from 'axios';

const InvestorListingPage = () => {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const response = await axios.get('https://localhost:8080/api/investors');
        setInvestors(response.data);
      } catch (error) {
        console.error('Error fetching investors:', error);
        // For now, let's use sample data if the API fails
        setInvestors(sampleInvestors);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestors();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return <CardGrid items={investors} type="investor" />;
};

// Sample data for development
const sampleInvestors = [
  {
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

export default InvestorListingPage;
