import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Grid, Button, Alert, MenuItem, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { industries } from '../utils/constants';

const StyledPaper = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  marginTop: theme.spacing(4),
}));

const EditStartup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    startupName: '',
    industry: '',
    description: '',
    fundingNeeded: '',
    revenue: '',
    valuation: '',
    equityOffered: '',
    team: '',
    traction: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        startupName: user.startupName || '',
        industry: user.industry || '',
        description: user.description || '',
        fundingNeeded: user.fundingNeeded || '',
        revenue: user.revenue || '',
        valuation: user.valuation || '',
        equityOffered: user.equityOffered || '',
        team: user.team || '',
        traction: user.traction || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/startups/${user._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/startup-dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update startup');
    }
  };

  const handleCancel = () => {
    navigate(`/dashboard/${user.type}`);
  };

  return (
    <Container maxWidth="md">
      <StyledPaper>
        <Typography variant="h4" gutterBottom sx={{ 
          color: '#008080', 
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 600,
          mb: 3 
        }}>
          Edit Startup Profile
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Startup updated successfully! Redirecting...
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Startup Name"
                name="startupName"
                value={formData.startupName}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
              >
                {industries.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Funding Needed ($)"
                name="fundingNeeded"
                value={formData.fundingNeeded}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Current Revenue ($)"
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Valuation ($)"
                name="valuation"
                value={formData.valuation}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Equity Offered (%)"
                name="equityOffered"
                value={formData.equityOffered}
                onChange={handleChange}
                InputProps={{
                  inputProps: { min: 0, max: 100 }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Team Description"
                name="team"
                value={formData.team}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Traction & Milestones"
                name="traction"
                value={formData.traction}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{
                  color: '#666',
                  borderColor: '#666',
                  '&:hover': {
                    borderColor: '#444',
                    color: '#444'
                  }
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: '#008080',
                  '&:hover': {
                    bgcolor: '#006666'
                  }
                }}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </StyledPaper>
    </Container>
  );
};

export default EditStartup;
