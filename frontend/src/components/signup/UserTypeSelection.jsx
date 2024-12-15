import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Fade,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const PageWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const Footer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  borderTop: '1px solid rgba(0, 0, 0, 0.1)',
}));

const FooterText = styled(Typography)(({ theme }) => ({
  color: '#666',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '0.875rem',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  marginBottom: theme.spacing(4),
  color: '#008080',
  fontWeight: 700,
}));

const CardsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
  justifyContent: 'center',
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: 300,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 8px 24px rgba(0, 128, 128, 0.15)',
  },
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 600,
  fontSize: '1.25rem',
  marginTop: theme.spacing(2),
  color: '#008080',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(0, 128, 128, 0.1)',
  borderRadius: '50%',
  padding: theme.spacing(2),
  display: 'inline-flex',
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textTransform: 'none',
  fontFamily: 'Poppins, sans-serif',
  padding: '8px 24px',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateX(4px)',
    '& .MuiSvgIcon-root': {
      transform: 'translateX(4px)',
    },
  },
  '& .MuiSvgIcon-root': {
    transition: 'transform 0.2s ease',
    marginLeft: theme.spacing(1),
  },
}));

const UserTypeSelection = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  const handleNavigation = (path) => {
    setIsVisible(false);
    setTimeout(() => {
      navigate(path);
    }, 300); // Wait for fade out animation to complete
  };

  return (
    <Fade in={isVisible} timeout={300}>
      <PageWrapper>
        <StyledContainer maxWidth="lg">
          <Title variant="h4">
            Choose Your Role
          </Title>
          <Typography
            variant="subtitle1"
            sx={{
              color: '#666',
              fontFamily: 'Roboto, sans-serif',
              marginBottom: 4,
            }}
          >
            Select how you want to join Impact Bridge
          </Typography>

          <CardsContainer>
            <StyledCard onClick={() => handleNavigation('/signup/startup')}>
              <CardContent sx={{ textAlign: 'center' }}>
                <IconWrapper>
                  <BusinessIcon sx={{ fontSize: 40, color: '#008080' }} />
                </IconWrapper>
                <CardTitle>
                  Startup Owner
                </CardTitle>
                <Typography
                  sx={{
                    color: '#666',
                    fontFamily: 'Open Sans, sans-serif',
                    marginY: 2,
                  }}
                >
                  Register your startup and connect with potential investors to fuel your growth
                </Typography>
                <StyledButton
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    backgroundColor: '#008080',
                    '&:hover': {
                      backgroundColor: '#006666',
                    },
                  }}
                >
                  Register as Startup
                </StyledButton>
              </CardContent>
            </StyledCard>

            <StyledCard onClick={() => handleNavigation('/signup/investor')}>
              <CardContent sx={{ textAlign: 'center' }}>
                <IconWrapper>
                  <AccountBalanceIcon sx={{ fontSize: 40, color: '#008080' }} />
                </IconWrapper>
                <CardTitle>
                  Investor
                </CardTitle>
                <Typography
                  sx={{
                    color: '#666',
                    fontFamily: 'Open Sans, sans-serif',
                    marginY: 2,
                  }}
                >
                  Discover promising startups and investment opportunities in various sectors
                </Typography>
                <StyledButton
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    backgroundColor: '#008080',
                    '&:hover': {
                      backgroundColor: '#006666',
                    },
                  }}
                >
                  Register as Investor
                </StyledButton>
              </CardContent>
            </StyledCard>
          </CardsContainer>
        </StyledContainer>
      </PageWrapper>
    </Fade>
  );
};

export default UserTypeSelection;
