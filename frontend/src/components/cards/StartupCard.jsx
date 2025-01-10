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
  alpha,
  Alert,
  Tooltip
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BusinessIcon from '@mui/icons-material/Business';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import StartupContactModal from '../contact/StartupContactModal';
import LoginModal from '../LoginModal';

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
  background: #FFFFFF;
  border: 1px solid rgba(0, 128, 128, 0.1);
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
  font-weight: 600;
  background: ${props => props.color === 'primary' 
    ? 'linear-gradient(45deg, #008080, #00a0a0)' 
    : '#FFFFFF'};
  border: 1px solid ${props => props.color === 'primary' 
    ? 'transparent' 
    : 'rgba(0, 128, 128, 0.2)'};
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

const StartupCard = ({ startup, isStartupDashboard = false }) => {
  const [open, setOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = useAuth();
  const theme = useTheme();
  const theme = useTheme();
  const isInvestor = user?.type === 'investor';
  const isLoggedIn = !!user;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleContactClick = (e, startup) => {
    e.stopPropagation(); // Prevent card from opening
    if (!isLoggedIn && !isStartupDashboard) {
      setShowLoginModal(true);
      return;
    }
    if (!isInvestor && !isStartupDashboard) {
      return;
    }
    setSelectedStartup(startup);
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
  };

  const metrics = [
    { icon: <TrendingUpIcon />, label: 'Revenue', value: `$${startup.revenue}`, requiresAuth: !isStartupDashboard },
    { icon: <AttachMoneyIcon />, label: 'Valuation', value: `$${startup.valuation}`, requiresAuth: !isStartupDashboard },
    { icon: <GroupsIcon />, label: 'Equity Offered', value: `${startup.equityOffered}%`, requiresAuth: !isStartupDashboard },
  ];

  const renderMetricValue = (metric) => {
    if (!isLoggedIn && !isStartupDashboard && metric.requiresAuth) {
      return (
        <Tooltip title="Login to view details">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LockIcon sx={{ fontSize: 16, mr: 1 }} />
            <Typography variant="body2">Login to view</Typography>
          </Box>
        </Tooltip>
      );
    }
    return metric.value;
  };

  const renderActionButton = () => {
    if (isStartupDashboard) {
      return (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={(e) => {
              e.stopPropagation();
              // Add edit functionality here
            }}
            startIcon={<EditIcon />}
            sx={{
              flex: 1,
              borderColor: '#008080',
              color: '#008080',
              '&:hover': {
                borderColor: '#006666',
                bgcolor: 'rgba(0, 128, 128, 0.1)',
              },
              borderRadius: '8px',
              textTransform: 'none',
              py: 1,
            }}
          >
            Edit Details
          </Button>
          <Button
            variant="outlined"
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
            startIcon={<VisibilityIcon />}
            sx={{
              flex: 1,
              borderColor: '#008080',
              color: '#008080',
              '&:hover': {
                borderColor: '#006666',
                bgcolor: 'rgba(0, 128, 128, 0.1)',
              },
              borderRadius: '8px',
              textTransform: 'none',
              py: 1,
            }}
          >
            Preview
          </Button>
        </Box>
      );
    }

    if (isInvestor) {
      return (
        <Button
          variant="contained"
          onClick={(e) => handleContactClick(e, startup)}
          fullWidth
          sx={{
            bgcolor: '#008080',
            '&:hover': {
              bgcolor: '#006666',
            },
            borderRadius: '8px',
            textTransform: 'none',
            py: 1,
          }}
        >
          Invest Now
        </Button>
      );
    }

    if (!isLoggedIn) {
      return (
        <Button
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            setShowLoginModal(true);
          }}
          fullWidth
          sx={{
            bgcolor: 'rgba(0, 128, 128, 0.1)',
            color: '#008080',
            '&:hover': {
              bgcolor: 'rgba(0, 128, 128, 0.2)',
            },
            borderRadius: '8px',
            textTransform: 'none',
            py: 1,
          }}
        >
          Login to Invest
        </Button>
      );
    }

    return null;
  };

  return (
    <>
      <StyledCard onClick={handleOpen}>
        <StyledCardMedia
          className="card-media"
      <StyledCard onClick={handleOpen}>
        <StyledCardMedia
          className="card-media"
          component="img"
          image={startup.logo || 'https://via.placeholder.com/300x200'}
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
                fontWeight: 700,
                color: '#1A1A1A',
                mb: 1,
                fontSize: '1.25rem',
                letterSpacing: '-0.01em'
              }}
            >
              {startup.name}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                mb: 2,
                minHeight: '40px',
                lineHeight: 1.6,
                color: '#4A4A4A',
                fontSize: '0.9rem',
                fontWeight: 500
              }}
            >
              {isStartupDashboard || isLoggedIn 
                ? startup?.shortDescription 
                : startup?.shortDescription 
                  ? `${startup.shortDescription.substring(0, 100)}... Login to read more`
                  : 'Login to view startup description'}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: '#666666',
                fontWeight: 600,
                fontSize: '0.875rem',
                mb: 2
              }}
            >
              <BusinessIcon sx={{ fontSize: '1.1rem', color: '#008080' }} />
              {startup.industry}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <StyledChip 
              label={startup.industry} 
              size="medium"
              size="medium"
              sx={{ mr: 1, mb: 1 }}
            />
            <StyledChip 
              label={`$${startup.fundingGoal} Goal`}
              size="medium"
            <StyledChip 
              label={`$${startup.fundingGoal} Goal`}
              size="medium"
              color="primary"
            />
          </Box>

          {renderActionButton()}

          {!isLoggedIn && !isStartupDashboard && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Login to see full details and investment options
            </Alert>
          )}
        </CardContent>
      </StyledCard>
      </StyledCard>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            background: '#FFFFFF',
            border: '1px solid rgba(0, 128, 128, 0.1)',
          }
        }}
      >
        <StyledDialogTitle>
          {startup.name}
        </StyledDialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Typography variant="body1" paragraph>
            {isStartupDashboard || isLoggedIn ? startup.description : 'Login to view full description'}
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            {metrics.map((metric, index) => (
              <Grid item xs={12} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 1.5,
                    borderRadius: 1,
                    bgcolor: 'rgba(0, 128, 128, 0.04)',
                    border: '1px solid rgba(0, 128, 128, 0.1)'
                  }}
                >
                  <Box sx={{ color: '#008080', display: 'flex' }}>
                    {metric.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#666666',
                        fontWeight: 600,
                        display: 'block',
                        fontSize: '0.75rem',
                        mb: 0.5
                      }}
                    >
                      {metric.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        color: '#1A1A1A',
                        fontSize: '0.875rem'
                      }}
                    >
                      {renderMetricValue(metric)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          {(isStartupDashboard || isLoggedIn) && (
            <>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Team
              </Typography>
              <Typography variant="body2" paragraph>
                {startup.team}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Traction
              </Typography>
              <Typography variant="body2" paragraph>
                {startup.traction}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleClose}
            variant="outlined"
            sx={{
              borderRadius: '8px',
              borderColor: '#008080',
              color: '#008080',
              '&:hover': {
                borderColor: '#006666',
                bgcolor: 'rgba(0,128,128,0.1)',
              }
            }}
          >
            Close
          </Button>
          {isInvestor && !isStartupDashboard && (
            <Button 
              variant="contained"
              onClick={(e) => handleContactClick(e, startup)}
              sx={{
                borderRadius: '8px',
                background: 'linear-gradient(45deg, #008080, #00a0a0)',
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

      {selectedStartup && (
        <StartupContactModal
          open={Boolean(selectedStartup)}
          startup={selectedStartup}
          onClose={() => setSelectedStartup(null)}
        />
      )}

      {!isStartupDashboard && (
        <LoginModal 
          open={showLoginModal} 
          handleClose={handleLoginClose}
        />
      )}
    </>
  );
};

export default StartupCard;
