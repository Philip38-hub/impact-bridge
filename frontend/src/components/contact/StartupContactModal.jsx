import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Avatar,
  Tooltip,
  styled,
  Paper,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';
import BusinessIcon from '@mui/icons-material/Business';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DescriptionIcon from '@mui/icons-material/Description';

const ContactIcon = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  width: 40,
  height: 40,
}));

const InfoCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const StartupContactModal = ({ open, onClose, startup }) => {
  const [openMeetingForm, setOpenMeetingForm] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState({
    date: '',
    time: '',
    topic: '',
    message: ''
  });

  const handleContactClick = (method, value) => {
    switch (method) {
      case 'email':
        window.location.href = `mailto:${value}`;
        break;
      case 'whatsapp':
        window.open(`https://wa.me/${value?.replace(/[^0-9]/g, '')}`, '_blank');
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

  const handleMeetingSubmit = () => {
    // Here you would send the meeting request to your backend
    console.log('Meeting details:', meetingDetails);
    setOpenMeetingForm(false);
    // Show success message
    alert('Meeting request sent successfully!');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '80vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        bgcolor: 'primary.main',
        color: 'primary.contrastText'
      }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ width: 56, height: 56, bgcolor: 'white', color: 'primary.main' }}>
            {startup?.startupName?.[0]}
          </Avatar>
          <Box>
            <Typography variant="h6">{startup?.startupName}</Typography>
            <Typography variant="subtitle2">{startup?.industry}</Typography>
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{ color: 'inherit' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Contact Methods */}
          <Grid item xs={12}>
            <InfoCard>
              <Typography variant="h6" gutterBottom>
                Contact Methods
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                <Tooltip title="Send Email">
                  <ContactIcon
                    onClick={() => handleContactClick('email', startup?.email)}
                  >
                    <EmailIcon />
                  </ContactIcon>
                </Tooltip>
                <Tooltip title="WhatsApp">
                  <ContactIcon
                    onClick={() => handleContactClick('whatsapp', startup?.whatsapp)}
                  >
                    <WhatsAppIcon />
                  </ContactIcon>
                </Tooltip>
                <Tooltip title="LinkedIn Profile">
                  <ContactIcon
                    onClick={() => handleContactClick('linkedin', startup?.linkedin)}
                  >
                    <LinkedInIcon />
                  </ContactIcon>
                </Tooltip>
                <Tooltip title="Facebook Page">
                  <ContactIcon
                    onClick={() => handleContactClick('facebook', startup?.facebook)}
                  >
                    <FacebookIcon />
                  </ContactIcon>
                </Tooltip>
                <Tooltip title="Phone Call">
                  <ContactIcon
                    onClick={() => handleContactClick('phone', startup?.phone)}
                  >
                    <PhoneIcon />
                  </ContactIcon>
                </Tooltip>
                <Tooltip title="Schedule Zoom Meeting">
                  <ContactIcon onClick={() => setOpenMeetingForm(true)}>
                    <VideocamIcon />
                  </ContactIcon>
                </Tooltip>
              </Box>
            </InfoCard>
          </Grid>

          {/* Startup Info */}
          <Grid item xs={12} md={6}>
            <InfoCard>
              <Box display="flex" alignItems="center" gap={1}>
                <BusinessIcon color="primary" />
                <Typography variant="h6">Business Details</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Founded by {startup?.founderName}
              </Typography>
              <Divider />
              <Typography variant="body1">
                {startup?.description}
              </Typography>
            </InfoCard>
          </Grid>

          {/* Financial Info */}
          <Grid item xs={12} md={6}>
            <InfoCard>
              <Box display="flex" alignItems="center" gap={1}>
                <MonetizationOnIcon color="primary" />
                <Typography variant="h6">Financial Overview</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Funding Needed
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${startup?.fundingNeeded?.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Current Revenue
                  </Typography>
                  <Typography variant="h6">
                    ${startup?.revenue?.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Valuation
                  </Typography>
                  <Typography variant="h6">
                    ${startup?.valuation?.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </InfoCard>
          </Grid>
        </Grid>

        {/* Meeting Form Dialog */}
        <Dialog
          open={openMeetingForm}
          onClose={() => setOpenMeetingForm(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            Schedule a Zoom Meeting
          </DialogTitle>
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
              <Box display="flex" justifyContent="flex-end" gap={1}>
                <Button onClick={() => setOpenMeetingForm(false)}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleMeetingSubmit}
                >
                  Send Meeting Request
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
};

export default StartupContactModal;
