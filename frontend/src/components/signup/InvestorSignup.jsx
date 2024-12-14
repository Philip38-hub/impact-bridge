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

const investmentPreferenceOptions = [
  'Seed Stage',
  'Early Stage',
  'Growth Stage',
  'Late Stage',
  'Pre-IPO',
];

const interestOptions = [
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

const InvestorSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    portfolioSize: 0,
    investmentPreferences: [],
    interests: []
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'investmentPreferences' || name === 'interests') {
      setFormData(prev => ({
        ...prev,
        [name]: Array.isArray(value) ? value : [value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'portfolioSize' ? Number(value) : value
      }));
    }
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
        `${import.meta.env.VITE_API_URL}/api/auth/signup/investor`,
        {
          ...signupData,
          type: 'investor'
        }
      );
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      navigate('/dashboard/investor');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'An error occurred during registration');
    }
  };

  return (
    <StyledContainer maxWidth="md">
      <Title variant="h4">
        Register as an Investor
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
              label="Portfolio Size ($)"
              name="portfolioSize"
              type="number"
              value={formData.portfolioSize}
              onChange={handleChange}
            />

            <TextField
              required
              fullWidth
              select
              SelectProps={{ multiple: true }}
              label="Investment Preferences"
              name="investmentPreferences"
              value={formData.investmentPreferences}
              onChange={handleChange}
            >
              {investmentPreferenceOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              required
              fullWidth
              select
              SelectProps={{ multiple: true }}
              label="Industries of Interest"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
            >
              {interestOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>

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

export default InvestorSignup;
