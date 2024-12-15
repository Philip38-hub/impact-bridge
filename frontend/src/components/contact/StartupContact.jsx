import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Tooltip,
  Avatar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from '../LoginModal';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const ContactCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const ContactIcon = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  width: 48,
  height: 48,
}));

const StartupContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMeetingDialog, setOpenMeetingDialog] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState({
    date: '',
    time: '',
    topic: '',
    message: ''
  });

  const isInvestor = user?.type === 'investor';
  const isLoggedIn = !!user;

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        if (!isLoggedIn) {
          setError('Please log in to view startup details');
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/startups/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        setStartup(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching startup:', err);
        setError('Failed to load startup details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStartup();
  }, [id, isLoggedIn]);

  const handleMeetingSubmit = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (!isInvestor) {
      setError('Only investors can schedule meetings');
      return;
    }
    try {
      // Here you would typically send the meeting request to your backend
      setOpenMeetingDialog(false);
      // You could also show a success message
      alert('Meeting request sent successfully!');
    } catch (err) {
      setError('Failed to send meeting request. Please try again later.');
    }
  };

  const handleContactClick = (method, value) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (!isInvestor) {
      setError('Only investors can contact startups');
      return;
    }

    switch (method) {
      case 'email':
        window.location.href = `mailto:${value}`;
        break;
      case 'whatsapp':
        window.open(`https://wa.me/${value.replace(/[^0-9]/g, '')}`, '_blank');
        break;
      case 'linkedin':
        window.open(value, '_blank');
        break;
      case 'facebook':
        window.open(value, '_blank');
        break;
      case 'phone':
        window.location.href = `tel:${value}`;
        break;
      default:
        break;
    }
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isLoggedIn) {
    return (
      <StyledContainer maxWidth="lg">
        <Box display="flex" flexDirection="column" alignItems="center" gap={2} my={4}>
          <LockIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
          <Typography variant="h5" align="center">
            Please log in to view startup details
          </Typography>
          <Button
            variant="contained"
            onClick={() => setShowLoginModal(true)}
            sx={{
              bgcolor: '#008080',
              '&:hover': {
                bgcolor: '#006666',
              },
            }}
          >
            Login
          </Button>
          <LoginModal 
            open={showLoginModal} 
            handleClose={handleLoginClose}
          />
        </Box>
      </StyledContainer>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <StyledContainer maxWidth="lg">
      {/* Startup Info Section */}
      <Box mb={4}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}
            >
              {startup?.startupName?.[0]}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" gutterBottom>
              {startup?.startupName}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {startup?.industry}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {!isInvestor && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Only investors can contact startups. Please update your profile type to investor to access contact features.
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Contact Methods */}
        {isInvestor && (
          <Grid item xs={12} md={6}>
            <ContactCard>
              <Typography variant="h6" gutterBottom>
                Contact Methods
              </Typography>
              <Grid container spacing={2}>
                <Grid item>
                  <Tooltip title="Send Email">
                    <ContactIcon
                      onClick={() => handleContactClick('email', startup?.email)}
                    >
                      <EmailIcon />
                    </ContactIcon>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="WhatsApp">
                    <ContactIcon
                      onClick={() => handleContactClick('whatsapp', startup?.phone)}
                    >
                      <WhatsAppIcon />
                    </ContactIcon>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="LinkedIn Profile">
                    <ContactIcon
                      onClick={() => handleContactClick('linkedin', startup?.linkedin)}
                    >
                      <LinkedInIcon />
                    </ContactIcon>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Facebook Page">
                    <ContactIcon
                      onClick={() => handleContactClick('facebook', startup?.facebook)}
                    >
                      <FacebookIcon />
                    </ContactIcon>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Phone Call">
                    <ContactIcon
                      onClick={() => handleContactClick('phone', startup?.phone)}
                    >
                      <PhoneIcon />
                    </ContactIcon>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Schedule Video Call">
                    <ContactIcon onClick={() => setOpenMeetingDialog(true)}>
                      <VideocamIcon />
                    </ContactIcon>
                  </Tooltip>
                </Grid>
              </Grid>
            </ContactCard>
          </Grid>
        )}

        {/* Startup Details */}
        <Grid item xs={12} md={isInvestor ? 6 : 12}>
          <ContactCard>
            <Typography variant="h6" gutterBottom>
              Startup Details
            </Typography>
            <Typography variant="body1" paragraph>
              {startup?.description}
            </Typography>
            <Box mt={2}>
              <Typography variant="subtitle1" gutterBottom>
                Investment Details
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Funding Goal: ${startup?.fundingGoal?.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Equity Offered: {startup?.equityOffered}%
              </Typography>
            </Box>
          </ContactCard>
        </Grid>
      </Grid>

      {/* Meeting Dialog */}
      <Dialog open={openMeetingDialog} onClose={() => setOpenMeetingDialog(false)}>
        <DialogTitle>Schedule a Meeting</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              label="Date"
              type="date"
              fullWidth
              value={meetingDetails.date}
              onChange={(e) => setMeetingDetails({ ...meetingDetails, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Time"
              type="time"
              fullWidth
              value={meetingDetails.time}
              onChange={(e) => setMeetingDetails({ ...meetingDetails, time: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Topic"
              fullWidth
              value={meetingDetails.topic}
              onChange={(e) => setMeetingDetails({ ...meetingDetails, topic: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Message"
              fullWidth
              multiline
              rows={4}
              value={meetingDetails.message}
              onChange={(e) => setMeetingDetails({ ...meetingDetails, message: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMeetingDialog(false)}>Cancel</Button>
          <Button onClick={handleMeetingSubmit} variant="contained" color="primary">
            Send Request
          </Button>
        </DialogActions>
      </Dialog>

      <LoginModal 
        open={showLoginModal} 
        handleClose={handleLoginClose}
      />
    </StyledContainer>
  );
};

export default StartupContact;
