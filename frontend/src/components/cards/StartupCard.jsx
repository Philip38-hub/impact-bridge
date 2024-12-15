import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Chip,
  Grid,
  IconButton,
  useTheme,
  alpha
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
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

const MetricBox = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  
  .metric-icon {
    color: #008080;
    margin-right: 8px;
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  background: linear-gradient(135deg, #008080 0%, #004C4C 100%);
  color: white;
  padding: 24px;
`;

const StartupCard = ({ startup }) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const theme = useTheme();
  const isInvestor = user?.type === 'investor';

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInvest = () => {
    // TODO: Implement investment flow
    console.log('Invest in:', startup.name);
  };

  const metrics = [
    { icon: <TrendingUpIcon />, label: 'Revenue', value: `$${startup.revenue}` },
    { icon: <AttachMoneyIcon />, label: 'Valuation', value: `$${startup.valuation}` },
    { icon: <GroupsIcon />, label: 'Equity Offered', value: `${startup.equityOffered}%` },
  ];

  return (
    <>
      <StyledCard onClick={handleOpen}>
        <StyledCardMedia
          className="card-media"
          component="img"
          image={startup.logo || 'https://via.placeholder.com/300x200'}
          alt={startup.name}
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
              {startup.name}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mb: 2,
                minHeight: '40px',
                lineHeight: 1.6
              }}
            >
              {startup.shortDescription}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <StyledChip 
              label={startup.industry} 
              size="medium"
              sx={{ mr: 1, mb: 1 }}
            />
            <StyledChip 
              label={`$${startup.fundingGoal} Goal`}
              size="medium"
              color="primary"
            />
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
              View Details
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
        <StyledDialogTitle>{startup.name}</StyledDialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <img
                src={startup.logo || 'https://via.placeholder.com/400x300'}
                alt={startup.name}
                style={{ 
                  width: '100%', 
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                }}
              />
              
              <Box sx={{ mt: 4 }}>
                {metrics.map((metric, index) => (
                  <MetricBox key={index}>
                    <Box className="metric-icon">
                      {metric.icon}
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {metric.label}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {metric.value}
                      </Typography>
                    </Box>
                  </MetricBox>
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#008080' }}>
                About
              </Typography>
              <Typography 
                paragraph
                sx={{ 
                  mb: 4,
                  lineHeight: 1.8,
                  color: theme.palette.text.secondary
                }}
              >
                {startup.description}
              </Typography>
              
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#008080' }}>
                Team
              </Typography>
              <Typography 
                paragraph
                sx={{ 
                  mb: 4,
                  lineHeight: 1.8,
                  color: theme.palette.text.secondary
                }}
              >
                {startup.team}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#008080' }}>
                Traction
              </Typography>
              <Typography 
                paragraph
                sx={{ 
                  lineHeight: 1.8,
                  color: theme.palette.text.secondary
                }}
              >
                {startup.traction}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, bgcolor: 'background.default' }}>
          <Button onClick={handleClose} sx={{ borderRadius: '8px' }}>
            Close
          </Button>
          {isInvestor && (
            <Button 
              onClick={handleInvest}
              variant="contained"
              sx={{
                borderRadius: '8px',
                background: 'linear-gradient(45deg, #008080, #00a0a0)',
                px: 4,
                '&:hover': {
                  background: 'linear-gradient(45deg, #006666, #008080)',
                }
              }}
            >
              Invest Now
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StartupCard;
