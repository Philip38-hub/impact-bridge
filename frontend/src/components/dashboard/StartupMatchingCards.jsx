import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Chip,
  Grid,
  Pagination,
  Fade,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import BusinessIcon from '@mui/icons-material/Business';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StartupContactModal from '../contact/StartupContactModal';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.25)',
  },
}));

const CardImageWrapper = styled(CardMedia)(({ theme }) => ({
  paddingTop: '56.25%', // 16:9 aspect ratio
  position: 'relative',
  backgroundColor: '#f5f5f5',
}));

const CardOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: 'rgba(0, 128, 128, 0.9)',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(0, 128, 128, 1)',
  },
}));

const sampleStartups = [
  {
    id: 1,
    name: "EcoTech Solutions",
    image: "https://source.unsplash.com/800x600/?sustainability",
    industry: "Clean Energy",
    description: "Revolutionizing renewable energy storage solutions for sustainable future.",
    fundingNeeded: 500000,
    location: "Nairobi, Kenya",
  },
  {
    id: 2,
    name: "HealthBridge Africa",
    image: "https://source.unsplash.com/800x600/?healthcare",
    industry: "Healthcare",
    description: "Bringing affordable healthcare solutions to rural communities.",
    fundingNeeded: 750000,
    location: "Lagos, Nigeria",
  },
  {
    id: 3,
    name: "AgroTech Innovations",
    image: "https://source.unsplash.com/800x600/?agriculture",
    industry: "Agriculture",
    description: "Smart farming solutions for small-scale farmers in Africa.",
    fundingNeeded: 300000,
    location: "Accra, Ghana",
  },
  {
    id: 4,
    name: "EduReach",
    image: "https://source.unsplash.com/800x600/?education",
    industry: "Education",
    description: "Digital education platform making learning accessible to all.",
    fundingNeeded: 400000,
    location: "Kampala, Uganda",
  },
  {
    id: 5,
    name: "FinTech Connect",
    image: "https://source.unsplash.com/800x600/?finance",
    industry: "Financial Technology",
    description: "Innovative financial solutions for the unbanked population.",
    fundingNeeded: 600000,
    location: "Kigali, Rwanda",
  },
  {
    id: 6,
    name: "WaterPure Tech",
    image: "https://source.unsplash.com/800x600/?water",
    industry: "Clean Technology",
    description: "Advanced water purification solutions for urban and rural areas.",
    fundingNeeded: 450000,
    location: "Dar es Salaam, Tanzania",
  },
];

const StartupMatchingCards = () => {
  const [page, setPage] = useState(1);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const cardsPerPage = 3;
  const totalPages = Math.ceil(sampleStartups.length / cardsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleContactClick = (startup) => {
    setSelectedStartup(startup);
  };

  const getCurrentStartups = () => {
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    return sampleStartups.slice(start, end);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          color: '#008080',
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        Matching Startups
      </Typography>

      <Grid container spacing={3}>
        {getCurrentStartups().map((startup) => (
          <Grid item xs={12} md={4} key={startup.id}>
            <Fade in timeout={500}>
              <StyledCard>
                <CardImageWrapper
                  image={startup.image}
                  title={startup.name}
                >
                  <CardOverlay>
                    <StyledChip
                      icon={<BusinessIcon sx={{ color: 'white' }} />}
                      label={startup.industry}
                      size="small"
                    />
                    <Box>
                      <IconButton size="small" sx={{ color: 'white' }}>
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton size="small" sx={{ color: 'white' }}>
                        <ShareIcon />
                      </IconButton>
                    </Box>
                  </CardOverlay>
                </CardImageWrapper>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {startup.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {startup.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <MonetizationOnIcon sx={{ color: '#008080', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Funding Needed: ${startup.fundingNeeded.toLocaleString()}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontStyle: 'italic' }}
                  >
                    {startup.location}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleContactClick(startup)}
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
              </StyledCard>
            </Fade>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#008080',
            },
            '& .Mui-selected': {
              bgcolor: '#008080 !important',
              color: 'white !important',
            },
          }}
        />
      </Box>

      {selectedStartup && (
        <StartupContactModal
          open={Boolean(selectedStartup)}
          startup={selectedStartup}
          onClose={() => setSelectedStartup(null)}
        />
      )}
    </Box>
  );
};

export default StartupMatchingCards;
