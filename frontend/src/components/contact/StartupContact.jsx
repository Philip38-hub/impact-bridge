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
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

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
  const [meetingDetails, setMeetingDetails] = useState({
    date: '',
    time: '',
    topic: '',
    message: ''
  });

  useEffect(() => {
    const fetchStartup = async () => {
      try {
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
  }, [id]);

  const handleMeetingSubmit = async () => {
    // Here you would typically send the meeting request to your backend
    // For now, we'll just close the dialog
    setOpenMeetingDialog(false);
    // You could also show a success message
    alert('Meeting request sent successfully!');
  };

  const handleContactClick = (method, value) => {
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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
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

      <Grid container spacing={3}>
        {/* Contact Methods */}
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
            </Grid>
          </ContactCard>
        </Grid>

        {/* Schedule Meeting */}
        <Grid item xs={12} md={6}>
          <ContactCard>
            <Typography variant="h6" gutterBottom>
              Schedule a Meeting
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <VideocamIcon color="primary" />
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenMeetingDialog(true)}
                startIcon={<VideocamIcon />}
              >
                Schedule Zoom Meeting
              </Button>
            </Box>
          </ContactCard>
        </Grid>

        {/* Startup Details */}
        <Grid item xs={12}>
          <ContactCard>
            <Typography variant="h6" gutterBottom>
              Startup Details
            </Typography>
            <Typography variant="body1" paragraph>
              {startup?.description}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" color="textSecondary">
                  Funding Needed
                </Typography>
                <Typography variant="h6">
                  ${startup?.fundingNeeded?.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" color="textSecondary">
                  Revenue
                </Typography>
                <Typography variant="h6">
                  ${startup?.revenue?.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" color="textSecondary">
                  Valuation
                </Typography>
                <Typography variant="h6">
                  ${startup?.valuation?.toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </ContactCard>
        </Grid>
      </Grid>

      {/* Meeting Dialog */}
      <Dialog 
        open={openMeetingDialog} 
        onClose={() => setOpenMeetingDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Schedule a Zoom Meeting</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Date"
              type="date"
              value={meetingDetails.date}
              onChange={(e) => setMeetingDetails({ ...meetingDetails, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Time"
              type="time"
              value={meetingDetails.time}
              onChange={(e) => setMeetingDetails({ ...meetingDetails, time: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Topic"
              value={meetingDetails.topic}
              onChange={(e) => setMeetingDetails({ ...meetingDetails, topic: e.target.value })}
              fullWidth
            />
            <TextField
              label="Message"
              value={meetingDetails.message}
              onChange={(e) => setMeetingDetails({ ...meetingDetails, message: e.target.value })}
              multiline
              rows={4}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMeetingDialog(false)}>Cancel</Button>
          <Button onClick={handleMeetingSubmit} variant="contained" color="primary">
            Send Meeting Request
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default StartupContact;
