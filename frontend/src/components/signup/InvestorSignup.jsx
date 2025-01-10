import React, { useState } from 'react';
import {
  Box,
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Typography,
  Container,
  MenuItem,
  Grid,
  Paper,
  Autocomplete,
  Chip,
  Grid,
  Paper,
  Autocomplete,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { impactAreas } from '../../utils/constants';
import { impactAreas } from '../../utils/constants';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}));

const InvestorSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    position: '',
    organization: '',
    position: '',
    investmentPreferences: [],
    impactAreas: [],
    minimumInvestment: '',
    maximumInvestment: '',
    investmentStage: '',
    investmentPhilosophy: '',
    referenceLinks: '',
  });
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate password match
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { confirmPassword, ...dataToSubmit } = formData; // Remove confirmPassword from submission
      const { confirmPassword, ...dataToSubmit } = formData; // Remove confirmPassword from submission
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup/investor`,
        dataToSubmit
      );
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard/investor');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during signup');
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
                  onChange={(e) => handleChange('name', e.target.value)}
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
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
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
                  onChange={(e) => handleChange('organization', e.target.value)}
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
                  onChange={(e) => handleChange('position', e.target.value)}
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
                  onChange={(e) => handleChange('minimumInvestment', e.target.value)}
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
                  onChange={(e) => handleChange('maximumInvestment', e.target.value)}
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
                  onChange={(_, newValue) => handleChange('impactAreas', newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Impact Areas"
                      placeholder="Select impact areas"
                      error={!!error && error.includes('impactAreas')}
                      helperText={error && error.includes('impactAreas') ? error : ''}
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                      const tagProps = getTagProps({ index });
                      delete tagProps.key; // Remove key from spread props
                      return (
                        <Chip
                          key={index}
                          label={option}
                          {...tagProps}
                          sx={{
                            backgroundColor: '#e0f2f1',
                            color: '#006666',
                            '& .MuiChip-deleteIcon': {
                              color: '#006666',
                              '&:hover': {
                                color: '#004c4c',
                              },
                            },
                          }}
                        />
                      );
                    })
                  }
                  isOptionEqualToValue={(option, value) => option === value}
                  filterSelectedOptions
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
        <StyledPaper>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
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
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
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
                  onChange={(e) => handleChange('organization', e.target.value)}
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
                  onChange={(e) => handleChange('position', e.target.value)}
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
                  onChange={(e) => handleChange('minimumInvestment', e.target.value)}
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
                  onChange={(e) => handleChange('maximumInvestment', e.target.value)}
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
                  onChange={(_, newValue) => handleChange('impactAreas', newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Impact Areas"
                      placeholder="Select impact areas"
                      error={!!error && error.includes('impactAreas')}
                      helperText={error && error.includes('impactAreas') ? error : ''}
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                      const tagProps = getTagProps({ index });
                      delete tagProps.key; // Remove key from spread props
                      return (
                        <Chip
                          key={index}
                          label={option}
                          {...tagProps}
                          sx={{
                            backgroundColor: '#e0f2f1',
                            color: '#006666',
                            '& .MuiChip-deleteIcon': {
                              color: '#006666',
                              '&:hover': {
                                color: '#004c4c',
                              },
                            },
                          }}
                        />
                      );
                    })
                  }
                  isOptionEqualToValue={(option, value) => option === value}
                  filterSelectedOptions
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
