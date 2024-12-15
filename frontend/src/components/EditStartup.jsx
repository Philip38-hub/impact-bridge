import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Grid, Button, Alert, MenuItem, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { industries, businessModels, businessStages } from '../utils/constants';

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
    founderName: '',
    industry: '',
    businessModel: '',
    businessStage: '',
    location: '',
    description: '',
    impactToSociety: '',
    partners: '',
    referees: '',
    fundingNeeded: '',
    revenue: '',
    valuation: '',
    phone: '',
    linkedin: '',
    facebook: '',
    whatsapp: '',
    zoomId: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        startupName: user.startupName || '',
        founderName: user.founderName || '',
        industry: user.industry || '',
        businessModel: user.businessModel || '',
        businessStage: user.businessStage || '',
        location: user.location || '',
        description: user.description || '',
        impactToSociety: user.impactToSociety || '',
        partners: user.partners || '',
        referees: user.referees || '',
        fundingNeeded: user.fundingNeeded || '',
        revenue: user.revenue || '',
        valuation: user.valuation || '',
        phone: user.phone || '',
        linkedin: user.linkedin || '',
        facebook: user.facebook || '',
        whatsapp: user.whatsapp || '',
        zoomId: user.zoomId || '',
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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Startup Name"
                name="startupName"
                value={formData.startupName}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Founder Name"
                name="founderName"
                value={formData.founderName}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
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

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Business Model"
                name="businessModel"
                value={formData.businessModel}
                onChange={handleChange}
                required
              >
                {businessModels.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Business Stage"
                name="businessStage"
                value={formData.businessStage}
                onChange={handleChange}
                required
              >
                {businessStages.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
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

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Impact to Society"
                name="impactToSociety"
                value={formData.impactToSociety}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Partners"
                name="partners"
                value={formData.partners}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Referees"
                name="referees"
                value={formData.referees}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
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

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Current Revenue ($)"
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Valuation ($)"
                name="valuation"
                value={formData.valuation}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ color: '#006666', mt: 2 }}>
                Contact Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="LinkedIn Profile"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Facebook Profile"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="WhatsApp Number"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Zoom ID"
                name="zoomId"
                value={formData.zoomId}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 3 }}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{
                    color: '#006666',
                    borderColor: '#006666',
                    '&:hover': {
                      borderColor: '#004c4c',
                      backgroundColor: 'rgba(0, 102, 102, 0.04)',
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: '#006666',
                    '&:hover': {
                      bgcolor: '#004c4c',
                    },
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </StyledPaper>
    </Container>
  );
};

export default EditStartup;
