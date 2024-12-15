import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  MenuItem,
  Grid,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StyledPaper = styled(Paper)`
  padding: 32px;
  margin-top: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled(Button)`
  margin-top: 24px;
  padding: 12px 32px;
  font-family: 'Poppins, sans-serif';
  text-transform: none;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

const industries = [
  'Technology',
  'Healthcare',
  'Education',
  'Finance',
  'Retail',
  'Manufacturing',
  'Agriculture',
  'Energy',
  'Transportation',
  'Real Estate',
  'Other'
];

const AddStartup = () => {
  const navigate = useNavigate();
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
      await axios.post(
        `http://loaclhost:8080/signup/startup`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/startup-dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add startup');
    }
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
          Add New Startup
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Startup added successfully! Redirecting...
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
          </Grid>

          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Add Startup
            </StyledButton>
            <StyledButton
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => navigate('/startup-dashboard')}
            >
              Cancel
            </StyledButton>
          </Box>
        </form>
      </StyledPaper>
    </Container>
  );
};

export default AddStartup;
