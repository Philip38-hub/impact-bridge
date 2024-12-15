import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Chip,
  Grid,
  IconButton,
  useTheme,
  alpha
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import WorkIcon from '@mui/icons-material/Work';
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
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  overflow: hidden;
  animation: ${fadeIn} 0.6s ease-out;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0,128,128,0.15);

    .card-media {
      transform: scale(1.05);
    }

    .arrow-icon {
      transform: translateX(4px);
      color: #008080;
    }
  }
`;

const StyledCardMedia = styled(CardMedia)`
  height: 200px;
  transition: transform 0.6s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60%;
    background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%);
  }
`;

const StyledChip = styled(Chip)`
  font-weight: 500;
  background: ${props => props.color === 'primary' 
    ? 'linear-gradient(45deg, #008080, #00a0a0)' 
    : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,128,128,0.15);
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  background: linear-gradient(135deg, #008080 0%, #004C4C 100%);
  color: white;
  padding: 24px;
`;

const ContactButton = styled(Button)`
  transition: all 0.3s ease;
  border-radius: 8px;
  text-transform: none;
  font-weight: 500;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,128,128,0.15);
  }
`;

const InvestorCard = ({ investor }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleContact = (type) => {
    switch (type) {
      case 'email':
        window.location.href = `mailto:${investor.email}`;
        break;
      case 'linkedin':
        window.open(investor.linkedin, '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <StyledCard onClick={handleOpen}>
        <StyledCardMedia
          className="card-media"
          component="img"
          image={investor.photo || 'https://via.placeholder.com/300x200'}
          alt={investor.name}
        />
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Typography 
              gutterBottom 
              variant="h5" 
              component="div"
              sx={{ 
                fontWeight: 600,
                color: theme.palette.text.primary,
                mb: 1
              }}
            >
              {investor.name}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                mb: 2,
                fontWeight: 500
              }}
            >
              {investor.title}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            {investor.interests.slice(0, 2).map((interest, index) => (
              <StyledChip 
                key={index}
                label={interest} 
                size="medium"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>

          <Box 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 'auto'
            }}
          >
            <Typography 
              variant="body2" 
              color="primary"
              sx={{ 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              View Profile
              <ArrowForwardIcon 
                className="arrow-icon" 
                sx={{ 
                  ml: 1, 
                  fontSize: 18,
                  transition: 'all 0.3s ease'
                }} 
              />
            </Typography>
          </Box>
        </CardContent>
      </StyledCard>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            overflow: 'hidden'
          }
        }}
      >
        <StyledDialogTitle>{investor.name}</StyledDialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <img
                src={investor.photo || 'https://via.placeholder.com/300x400'}
                alt={investor.name}
                style={{ 
                  width: '100%', 
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                }}
              />
              
              <Box sx={{ mt: 4 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#008080' }}>
                    Investment Range
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccountBalanceWalletIcon sx={{ color: '#008080', mr: 1 }} />
                    <Typography>
                      ${investor.minInvestment} - ${investor.maxInvestment}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#008080' }}>
                    Contact
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <ContactButton
                      variant="outlined"
                      startIcon={<EmailIcon />}
                      onClick={() => handleContact('email')}
                    >
                      Email
                    </ContactButton>
                    <ContactButton
                      variant="outlined"
                      startIcon={<LinkedInIcon />}
                      onClick={() => handleContact('linkedin')}
                    >
                      LinkedIn
                    </ContactButton>
                  </Box>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#008080' }}>
                Professional Background
              </Typography>
              <Typography 
                paragraph
                sx={{ 
                  mb: 4,
                  lineHeight: 1.8,
                  color: theme.palette.text.secondary
                }}
              >
                {investor.background}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#008080' }}>
                Investment Focus
              </Typography>
              <Box sx={{ mb: 3 }}>
                {investor.interests.map((interest, index) => (
                  <StyledChip 
                    key={index}
                    label={interest} 
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Box>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#008080' }}>
                Portfolio Highlights
              </Typography>
              <Typography 
                paragraph
                sx={{ 
                  lineHeight: 1.8,
                  color: theme.palette.text.secondary
                }}
              >
                {investor.portfolio}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, bgcolor: 'background.default' }}>
          <Button 
            onClick={handleClose}
            sx={{ 
              borderRadius: '8px',
              textTransform: 'none'
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InvestorCard;
