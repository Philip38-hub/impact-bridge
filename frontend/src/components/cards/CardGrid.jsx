import React from 'react';
import { Grid, Container, Typography } from '@mui/material';
import StartupCard from './StartupCard';
import InvestorCard from './InvestorCard';

const CardGrid = ({ items, type }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {type === 'startup' ? 'Featured Startups' : 'Featured Investors'}
      </Typography>
      <Grid container spacing={4}>
        {items.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            {type === 'startup' ? (
              <StartupCard startup={item} />
            ) : (
              <InvestorCard investor={item} />
            )}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CardGrid;
