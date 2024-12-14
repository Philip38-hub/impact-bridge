import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  Alert,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 400,
  backgroundColor: theme.palette.background.paper,
  borderRadius: 12,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  padding: theme.spacing(4),
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'translate(-50%, -51%)',
  }
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: 8,
  top: 8,
  transition: 'transform 0.2s ease, background-color 0.2s ease',
  '&:hover': {
    transform: 'rotate(90deg)',
    backgroundColor: 'rgba(0, 0, 0, 0.04)'
  },
  '&:active': {
    transform: 'rotate(90deg) scale(0.95)'
  }
}));

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: 20
});

const OrDivider = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  margin: '24px 0',
  '& .MuiDivider-root': {
    flexGrow: 1
  },
  '& .divider-text': {
    margin: '0 16px',
    color: '#666',
    fontFamily: 'Poppins',
    fontSize: '0.875rem'
  }
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    },
    '&.Mui-focused': {
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  padding: '12px',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)'
  },
  '&:active': {
    transform: 'translateY(0) scale(0.98)'
  }
}));

const SocialButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: '12px',
  marginBottom: '12px',
  display: 'flex',
  justifyContent: 'flex-start',
  gap: '12px',
  textTransform: 'none',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  fontFamily: 'Poppins',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    transform: 'translateY(-2px)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
  },
  '&:active': {
    transform: 'translateY(0) scale(0.98)'
  },
  '& .MuiSvgIcon-root': {
    transition: 'transform 0.2s ease'
  },
  '&:hover .MuiSvgIcon-root': {
    transform: 'scale(1.1)'
  }
}));

const LoginModal = ({ open, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password,
      });
      
      const { token, userType } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userType', userType);
      onLogin(userType);
      onClose();
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login');
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} login clicked`);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="login-modal-title"
    >
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>

        <Typography
          id="login-modal-title"
          variant="h5"
          component="h2"
          sx={{
            mb: 3,
            fontFamily: 'Montserrat',
            fontWeight: 600,
            color: '#008080',
            transition: 'color 0.2s ease',
            '&:hover': {
              color: '#006666'
            }
          }}
        >
          Sign In
        </Typography>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 2,
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
              }
            }}
          >
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <StyledTextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: '#008080' }} />
                </InputAdornment>
              )
            }}
            sx={{
              '& label': { fontFamily: 'Roboto' },
              '& input': { fontFamily: 'Open Sans' }
            }}
          />
          <StyledTextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#008080' }} />
                </InputAdornment>
              )
            }}
            sx={{
              '& label': { fontFamily: 'Roboto' },
              '& input': { fontFamily: 'Open Sans' }
            }}
          />
          <SubmitButton
            type="submit"
            variant="contained"
            fullWidth
            endIcon={<LoginIcon />}
            sx={{
              backgroundColor: '#008080',
              fontFamily: 'Poppins',
              '&:hover': {
                backgroundColor: '#006666'
              }
            }}
          >
            Sign In
          </SubmitButton>
        </Form>

        <OrDivider>
          <Divider />
          <Typography className="divider-text">
            OR
          </Typography>
          <Divider />
        </OrDivider>

        <Box sx={{ mt: 2 }}>
          <SocialButton
            onClick={() => handleSocialLogin('google')}
            startIcon={<GoogleIcon />}
            sx={{ color: '#DB4437' }}
          >
            Continue with Google
          </SocialButton>
          <SocialButton
            onClick={() => handleSocialLogin('facebook')}
            startIcon={<FacebookIcon />}
            sx={{ color: '#4267B2' }}
          >
            Continue with Facebook
          </SocialButton>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default LoginModal;
