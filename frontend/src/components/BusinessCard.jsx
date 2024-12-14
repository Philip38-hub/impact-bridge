import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

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

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-in-out;
  animation: ${fadeIn} 0.5s ease-out;
  
  &:hover {
    transform: translateY(-8px);
  }
`;

const CardTitle = styled(Typography)`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #008080;
  margin-bottom: 8px;
`;

const CardDescription = styled(Typography)`
  font-family: 'Open Sans', sans-serif;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 16px;
  flex-grow: 1;
`;

const BusinessCard = ({ data, index }) => {
  return (
    <StyledCard 
      elevation={1}
      sx={{ 
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={data.image}
        alt={data.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <CardTitle variant="h6">
          {data.name}
        </CardTitle>
        <CardDescription>
          {data.description}
        </CardDescription>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip 
            label={data.industry} 
            size="small" 
            sx={{ 
              backgroundColor: '#E6F2F2',
              color: '#008080',
              fontFamily: 'Poppins',
              fontSize: '12px'
            }} 
          />
          <Chip 
            label={`$${data.fundingNeeded}`} 
            size="small"
            sx={{ 
              backgroundColor: '#FFE9E3',
              color: '#FF6F3C',
              fontFamily: 'Poppins',
              fontSize: '12px'
            }} 
          />
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default BusinessCard;
