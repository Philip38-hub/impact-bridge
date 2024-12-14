import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  MenuItem,
  InputAdornment,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import CategoryIcon from '@mui/icons-material/Category';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StyledContainer = styled(Container)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  color: '#008080',
  fontWeight: 700,
  marginBottom: theme.spacing(4),
  textAlign: 'center',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(6),
  },
  borderRadius: 12,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    '&.Mui-focused': {
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: '12px',
  fontFamily: 'Poppins, sans-serif',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'translateY(0) scale(0.98)',
  },
}));

const investorTypes = [
  'Angel Investor',
  'Venture Capital',
  'Private Equity',
  'Corporate Investor',
  'Impact Investor',
  'Other',
];

const investmentPreferences = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'E-commerce',
  'Clean Energy',
  'Agriculture',
  'Transportation',
  'Real Estate',
  'Other',
];

const InvestorSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    password: '',
    confirmPassword: '',
    investorType: '',
    investmentPreference: '',
    minInvestmentAmount: '',
    maxInvestmentAmount: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup/investor`, formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userType', 'investor');
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
    }
  };

  return (
    <StyledContainer maxWidth="md">
      <Title variant="h4">
        Register as Investor
      </Title>

      <StyledPaper>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <StyledTextField
            fullWidth
            label="Organization Name"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBalanceIcon sx={{ color: '#008080' }} />
                </InputAdornment>
              ),
            }}
          />

          <StyledTextField
            fullWidth
            label="Contact Person Name"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: '#008080' }} />
                </InputAdornment>
              ),
            }}
          />

          <StyledTextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: '#008080' }} />
                </InputAdornment>
              ),
            }}
          />

          <StyledTextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#008080' }} />
                </InputAdornment>
              ),
            }}
          />

          <StyledTextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#008080' }} />
                </InputAdornment>
              ),
            }}
          />

          <StyledTextField
            fullWidth
            select
            label="Investor Type"
            name="investorType"
            value={formData.investorType}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CategoryIcon sx={{ color: '#008080' }} />
                </InputAdornment>
              ),
            }}
          >
            {investorTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </StyledTextField>

          <StyledTextField
            fullWidth
            select
            label="Investment Preference"
            name="investmentPreference"
            value={formData.investmentPreference}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CategoryIcon sx={{ color: '#008080' }} />
                </InputAdornment>
              ),
            }}
          >
            {investmentPreferences.map((preference) => (
              <MenuItem key={preference} value={preference}>
                {preference}
              </MenuItem>
            ))}
          </StyledTextField>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <StyledTextField
              fullWidth
              label="Minimum Investment"
              name="minInvestmentAmount"
              type="number"
              value={formData.minInvestmentAmount}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MonetizationOnIcon sx={{ color: '#008080' }} />
                  </InputAdornment>
                ),
                endAdornment: <InputAdornment position="end">USD</InputAdornment>,
              }}
            />

            <StyledTextField
              fullWidth
              label="Maximum Investment"
              name="maxInvestmentAmount"
              type="number"
              value={formData.maxInvestmentAmount}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MonetizationOnIcon sx={{ color: '#008080' }} />
                  </InputAdornment>
                ),
                endAdornment: <InputAdornment position="end">USD</InputAdornment>,
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/signup')}
              sx={{
                color: '#008080',
                borderColor: '#008080',
                '&:hover': {
                  borderColor: '#006666',
                  backgroundColor: 'rgba(0, 128, 128, 0.04)',
                },
              }}
            >
              Back
            </Button>
            <SubmitButton
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#008080',
                '&:hover': {
                  backgroundColor: '#006666',
                },
              }}
            >
              Register as Investor
            </SubmitButton>
          </Box>
        </form>
      </StyledPaper>
    </StyledContainer>
  );
};

export default InvestorSignup;
