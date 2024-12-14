import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  Box,
  styled,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
}));

const Form = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  marginTop: theme.spacing(2),
  textAlign: 'center',
}));

const industries = [
  'Technology',
  'Healthcare',
  'Education',
  'E-commerce',
  'Fintech',
  'Clean Energy',
  'Agriculture',
  'Transportation',
  'Real Estate',
  'Other',
];

const StartupSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    startupName: '',
    founderName: '',
    industry: '',
    description: '',
    fundingNeeded: 0,
    revenue: 0,
    valuation: 0
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['fundingNeeded', 'revenue', 'valuation'].includes(name) ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { confirmPassword, ...signupData } = formData;
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup/startup`,
        {
          ...signupData,
          type: 'startup'
        }
      );
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      navigate('/dashboard/startup');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'An error occurred during registration');
    }
  };

  return (
    <StyledContainer maxWidth="md">
      <Title variant="h4">
        Register Your Startup
      </Title>

      <StyledPaper>
        {error && (
          <ErrorMessage variant="body2">
            {error}
          </ErrorMessage>
        )}

        <Form onSubmit={handleSubmit}>
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { md: '1fr 1fr' } }}>
            <TextField
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            
            <TextField
              required
              fullWidth
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <TextField
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />

            <TextField
              required
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <TextField
              required
              fullWidth
              label="Startup Name"
              name="startupName"
              value={formData.startupName}
              onChange={handleChange}
            />

            <TextField
              required
              fullWidth
              label="Founder Name"
              name="founderName"
              value={formData.founderName}
              onChange={handleChange}
            />

            <TextField
              required
              fullWidth
              select
              label="Industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
            >
              {industries.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              required
              fullWidth
              label="Funding Needed ($)"
              name="fundingNeeded"
              type="number"
              value={formData.fundingNeeded}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Current Revenue ($)"
              name="revenue"
              type="number"
              value={formData.revenue}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Valuation ($)"
              name="valuation"
              type="number"
              value={formData.valuation}
              onChange={handleChange}
            />
          </Box>

          <TextField
            required
            fullWidth
            multiline
            rows={4}
            label="Business Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />

          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Register
          </SubmitButton>
        </Form>
      </StyledPaper>
    </StyledContainer>
  );
};

export default StartupSignup;
