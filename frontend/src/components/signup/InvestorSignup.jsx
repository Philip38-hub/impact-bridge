import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
  Grid,
  Paper,
  Autocomplete,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { impactAreas } from '../../utils/constants';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}));

const InvestorSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    organization: '',
    position: '',
    investmentPreferences: [],
    impactAreas: [],
    minimumInvestment: '',
    maximumInvestment: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImpactAreasChange = (event, newValue) => {
    setFormData({ ...formData, impactAreas: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup/investor`,
        formData
      );
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard/investor');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during signup');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: '#008080', fontWeight: 700 }}>
          Register as an Investor
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom sx={{ mb: 4 }}>
          Join our community of impact investors making a difference
        </Typography>

        <StyledPaper>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
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
                  label="Organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Minimum Investment ($)"
                  name="minimumInvestment"
                  type="number"
                  value={formData.minimumInvestment}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: '$',
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Maximum Investment ($)"
                  name="maximumInvestment"
                  type="number"
                  value={formData.maximumInvestment}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: '$',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="impact-areas"
                  options={impactAreas}
                  value={formData.impactAreas}
                  onChange={handleImpactAreasChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Impact Areas"
                      required
                      helperText="Select the areas where you want to make an impact"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                        sx={{ 
                          borderColor: '#008080',
                          color: '#008080'
                        }}
                      />
                    ))
                  }
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

export default InvestorSignup;
