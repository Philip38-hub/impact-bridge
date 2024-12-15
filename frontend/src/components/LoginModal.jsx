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
  Tabs,
  Tab,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

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

const LoginModal = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
       // Call the SignIn API
       const response = await axios.get('http://localhost:8080/login', {
        params: { email, password }, // Pass email and password as query params
      });


      const user = response.data;
      console.log('Login successful:', user);
      
      if (user && user.class) {
        onClose();
        navigate(`/dashboard/${user.class}/${user.id}`);
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupClick = (type) => {
    onClose();
    navigate(`/signup/${type}`);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="login-modal"
      aria-describedby="login-form"
    >
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>

        {/* Tabs for Login/Signup */}
        <Tabs
          value={mode}
          onChange={(e, newValue) => setMode(newValue)}
          sx={{ mb: 3 }}
          centered
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab 
            label="Login" 
            value="login"
            sx={{ 
              fontFamily: 'Poppins',
              fontWeight: 500,
              textTransform: 'none'
            }}
          />
          <Tab 
            label="Sign Up" 
            value="signup"
            sx={{ 
              fontFamily: 'Poppins',
              fontWeight: 500,
              textTransform: 'none'
            }}
          />
        </Tabs>

        {mode === 'login' ? (
          <>
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                fontFamily: 'Poppins',
                fontWeight: 600,
                color: '#008080',
                textAlign: 'center'
              }}
            >
              Welcome Back
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <StyledTextField
                required
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: '#008080' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <StyledTextField
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: '#008080' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <SubmitButton
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                startIcon={<LoginIcon />}
              >
                {loading ? 'Logging in...' : 'Login'}
              </SubmitButton>
            </Form>

            <OrDivider>
              <Divider className="MuiDivider-root" />
              <Typography className="divider-text">or continue with</Typography>
              <Divider className="MuiDivider-root" />
            </OrDivider>

            <SocialButton
              variant="outlined"
              startIcon={<GoogleIcon sx={{ color: '#DB4437' }} />}
            >
              Continue with Google
            </SocialButton>

            <SocialButton
              variant="outlined"
              startIcon={<FacebookIcon sx={{ color: '#4267B2' }} />}
            >
              Continue with Facebook
            </SocialButton>
          </>
        ) : (
          <>
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                fontFamily: 'Poppins',
                fontWeight: 600,
                color: '#008080',
                textAlign: 'center'
              }}
            >
              Join Impact Bridge
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 3,
                textAlign: 'center',
                color: 'text.secondary'
              }}
            >
              Choose your account type to get started
            </Typography>

            <Stack spacing={2}>
              <Button
                variant="outlined"
                size="large"
                startIcon={<BusinessIcon />}
                onClick={() => handleSignupClick('startup')}
                sx={{
                  textTransform: 'none',
                  fontFamily: 'Poppins',
                  py: 1.5,
                  borderRadius: 2,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                Sign Up as a Startup
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<AccountBalanceIcon />}
                onClick={() => handleSignupClick('investor')}
                sx={{
                  textTransform: 'none',
                  fontFamily: 'Poppins',
                  py: 1.5,
                  borderRadius: 2,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                Sign Up as an Investor
              </Button>
            </Stack>
          </>
        )}
      </ModalContainer>
    </Modal>
  );
};

export default LoginModal;
