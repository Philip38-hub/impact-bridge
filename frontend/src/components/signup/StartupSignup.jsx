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
    confirmPassword: '',
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

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { confirmPassword, ...dataToSubmit } = formData; // Remove confirmPassword from submission
      const response = await axios.post(
        'http://localhost:8080/signup/startup',
        dataToSubmit
      );
      if (response.data.id) {
        localStorage.setItem('token', response.data.id);
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
                  onChange={(e) => handleChange('startupName', e.target.value)}
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
                  onChange={(e) => handleChange('founderName', e.target.value)}
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
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  label="Password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  error={!!error && error.includes('password')}
                  helperText={error && error.includes('password') ? error : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  error={!!error && error.includes('password')}
                  helperText={error && error.includes('password') ? error : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Industry"
                  name="industry"
                  value={formData.industry}
                  onChange={(e) => handleChange('industry', e.target.value)}
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
                  onChange={(e) => handleChange('businessModel', e.target.value)}
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
                  onChange={(e) => handleChange('businessStage', e.target.value)}
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
                  onChange={(e) => handleChange('location', e.target.value)}
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
                  onChange={(e) => handleChange('description', e.target.value)}
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
                  onChange={(e) => handleChange('impactToSociety', e.target.value)}
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
                  onChange={(e) => handleChange('partners', e.target.value)}
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
                  onChange={(e) => handleChange('referees', e.target.value)}
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
