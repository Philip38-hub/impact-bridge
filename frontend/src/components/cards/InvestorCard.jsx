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
  Grid
} from '@mui/material';

const InvestorCard = ({ investor }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card 
        sx={{ 
          maxWidth: 345,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: 6
          }
        }}
        onClick={handleOpen}
      >
        <CardMedia
          component="img"
          height="140"
          image={investor.photo || 'https://via.placeholder.com/300x140'}
          alt={investor.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {investor.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {investor.title}
          </Typography>
          <Box sx={{ mt: 'auto' }}>
            {investor.interests.slice(0, 2).map((interest, index) => (
              <Chip 
                key={index}
                label={interest} 
                size="small" 
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{investor.name}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <img
                src={investor.photo || 'https://via.placeholder.com/300x400'}
                alt={investor.name}
                style={{ width: '100%', borderRadius: '8px' }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Professional Background
              </Typography>
              <Typography paragraph>
                {investor.background}
              </Typography>

              <Typography variant="h6" gutterBottom>
                Investment Focus
              </Typography>
              <Box sx={{ mb: 2 }}>
                {investor.interests.map((interest, index) => (
                  <Chip 
                    key={index}
                    label={interest} 
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Box>

              <Typography variant="h6" gutterBottom>
                Investment Range
              </Typography>
              <Typography paragraph>
                ${investor.minInvestment} - ${investor.maxInvestment}
              </Typography>

              <Typography variant="h6" gutterBottom>
                Portfolio Highlights
              </Typography>
              <Typography paragraph>
                {investor.portfolio}
              </Typography>

              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Typography>
                Email: {investor.email}
                {investor.linkedin && (
                  <>
                    <br />
                    LinkedIn: <a href={investor.linkedin} target="_blank" rel="noopener noreferrer">Profile</a>
                  </>
                )}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InvestorCard;
