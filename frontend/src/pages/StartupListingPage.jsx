import React, { useEffect, useState } from 'react';
import CardGrid from '../components/cards/CardGrid';
import { Box, CircularProgress } from '@mui/material';
import axios from 'axios';

const StartupListingPage = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/startups`);
        setStartups(response.data);
      } catch (error) {
        console.error('Error fetching startups:', error);
        // For now, let's use sample data if the API fails
        setStartups(sampleStartups);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return <CardGrid items={startups} type="startup" />;
};

// Sample data for development
const sampleStartups = [
  {
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

export default StartupListingPage;
