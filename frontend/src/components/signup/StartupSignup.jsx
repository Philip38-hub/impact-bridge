import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, MenuItem, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { industries, businessModels, businessStages } from '../../utils/constants';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}));

const StartupSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startupName: '',
    founderName: '',
    email: '',
    password: '',
    industry: '',
    businessModel: '',
    businessStage: '',
    description: '',
    impactToSociety: '',
    location: '',
    partners: '',
    referees: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup/startup`,
        formData
      );
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard/startup');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during signup');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: '#008080', fontWeight: 700 }}>
          Register Your Startup
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom sx={{ mb: 4 }}>
          Join our community of innovative startups making a difference
        </Typography>

        <StyledPaper>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Startup Name"
                  name="startupName"
                  value={formData.startupName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Founder Name"
                  name="founderName"
                  value={formData.founderName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  variant="outlined"
                >
                  {industries.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Business Model"
                  name="businessModel"
                  value={formData.businessModel}
                  onChange={handleChange}
                  required
                  variant="outlined"
                >
                  {businessModels.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Business Stage"
                  name="businessStage"
                  value={formData.businessStage}
                  onChange={handleChange}
                  required
                  variant="outlined"
                >
                  {businessStages.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  multiline
                  rows={3}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Impact to Society"
                  name="impactToSociety"
                  value={formData.impactToSociety}
                  onChange={handleChange}
                  required
                  multiline
                  rows={3}
                  variant="outlined"
                  helperText="Describe how your startup contributes to social or environmental impact"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Partners"
                  name="partners"
                  value={formData.partners}
                  onChange={handleChange}
                  multiline
                  rows={2}
                  variant="outlined"
                  helperText="List any key partners or collaborators (optional)"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Referees"
                  name="referees"
                  value={formData.referees}
                  onChange={handleChange}
                  multiline
                  rows={2}
                  variant="outlined"
                  helperText="Provide contact information for references (optional)"
                />
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Typography color="error" align="center">
                    {error}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    bgcolor: '#008080',
                    '&:hover': { bgcolor: '#006666' },
                    height: 48,
                  }}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </StyledPaper>
      </Box>
    </Container>
  );
};

export default StartupSignup;
