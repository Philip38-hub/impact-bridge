import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  borderTop: '1px solid rgba(0, 0, 0, 0.1)',
  backgroundColor: 'white',
}));

const FooterText = styled(Typography)(({ theme }) => ({
  color: '#666',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '0.875rem',
}));

const Footer = () => {
  return (
    <StyledFooter>
      <FooterText>
        &copy; ImpactBridge 2024
      </FooterText>
    </StyledFooter>
  );
};

export default Footer;
