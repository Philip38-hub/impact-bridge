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
  Grid
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const StartupCard = ({ startup }) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const isInvestor = user?.type === 'investor';

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInvest = () => {
    // TODO: Implement investment flow
    console.log('Invest in:', startup.name);
  };

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
          image={startup.logo || 'https://via.placeholder.com/300x140'}
          alt={startup.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {startup.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {startup.shortDescription}
          </Typography>
          <Box sx={{ mt: 'auto' }}>
            <Chip 
              label={startup.industry} 
              size="small" 
              sx={{ mr: 1, mb: 1 }}
            />
            <Chip 
              label={`$${startup.fundingGoal}`} 
              size="small" 
              color="primary"
            />
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{startup.name}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <img
                src={startup.logo || 'https://via.placeholder.com/400x300'}
                alt={startup.name}
                style={{ width: '100%', borderRadius: '8px' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                About
              </Typography>
              <Typography paragraph>
                {startup.description}
              </Typography>
              
              <Typography variant="h6" gutterBottom>
                Industry
              </Typography>
              <Chip label={startup.industry} sx={{ mb: 2 }} />

              <Typography variant="h6" gutterBottom>
                Funding Goal
              </Typography>
              <Typography paragraph>
                ${startup.fundingGoal}
              </Typography>

              {isInvestor && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Financial Details
                  </Typography>
                  <Typography paragraph>
                    Revenue: ${startup.revenue}
                    <br />
                    Valuation: ${startup.valuation}
                    <br />
                    Equity Offered: {startup.equityOffered}%
                  </Typography>
                  
                  <Typography variant="h6" gutterBottom>
                    Team
                  </Typography>
                  <Typography paragraph>
                    {startup.team}
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Traction
                  </Typography>
                  <Typography paragraph>
                    {startup.traction}
                  </Typography>
                </>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {isInvestor && (
            <Button 
              onClick={handleInvest}
              variant="contained" 
              color="primary"
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
