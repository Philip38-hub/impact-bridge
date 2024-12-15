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
import StartupContactModal from '../contact/StartupContactModal';

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
  const [selectedStartup, setSelectedStartup] = useState(null);
  const { user } = useAuth();
  const theme = useTheme();
  const isInvestor = user?.type === 'investor';

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleContactClick = (startup) => {
    setSelectedStartup(startup);
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
            <Button
              variant="contained"
              onClick={() => handleContactClick(startup)}
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
          </Box>
        </CardContent>
      </StyledCard>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }
        }}
      >
        <StyledDialogTitle>
          {startup.name}
        </StyledDialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Typography variant="body1" paragraph>
            {startup.description}
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            {metrics.map((metric, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <MetricBox>
                  <IconButton 
                    size="small" 
                    sx={{ 
                      mr: 1,
                      color: '#008080',
                      bgcolor: alpha('#008080', 0.1),
                      '&:hover': {
                        bgcolor: alpha('#008080', 0.2),
                      }
                    }}
                  >
                    {metric.icon}
                  </IconButton>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      {metric.label}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {metric.value}
                    </Typography>
                  </Box>
                </MetricBox>
              </Grid>
            ))}
          </Grid>

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
          {isInvestor && (
            <Button 
              variant="contained"
              onClick={() => handleContactClick(startup)}
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
    </>
  );
};

export default StartupCard;
