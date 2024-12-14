import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MessageIcon from '@mui/icons-material/Message';
import LoginModal from './LoginModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StyledAppBar = styled(AppBar)`
  background-color: white;
  box-shadow: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Typography)`
  font-family: 'Montserrat, sans-serif';
  color: #008080;
  font-weight: 700;
  font-size: 24px;
  flex-grow: 1;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;

  &:hover {
    transform: scale(1.02);
    color: #006666;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const AuthButton = styled(Button)`
  font-family: 'Poppins, sans-serif';
  text-transform: none;
  padding: 8px 20px;
  margin-left: 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  .MuiSvgIcon-root {
    font-size: 20px;
    transition: transform 0.2s ease;
  }

  &:hover .MuiSvgIcon-root {
    transform: translateX(2px);
  }

  &:active {
    transform: scale(0.98);
  }

  .button-text {
    @media (max-width: 600px) {
      display: none;
    }
  }

  @media (max-width: 600px) {
    padding: 8px;
    min-width: unset;
    margin-left: 8px;
  }
`;

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  color: '#008080',
  marginLeft: theme.spacing(1),
  '&:hover': {
    backgroundColor: 'rgba(0, 128, 128, 0.04)',
  },
}));

const WelcomeText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  color: '#666',
  marginRight: theme.spacing(2),
  '@media (max-width: 600px)': {
    display: 'none',
  },
}));

const Header = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const userType = localStorage.getItem('userType');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/');
    handleClose();
  };

  const handleSettings = () => {
    navigate('/settings');
    handleClose();
  };

  const handleProfile = () => {
    navigate('/profile');
    handleClose();
  };

  const handleMessages = () => {
    navigate('/messages');
    handleClose();
  };

  const handleLogoClick = () => {
    if (isLoggedIn) {
      navigate(userType === 'startup' ? '/startup-dashboard' : '/investor-dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <Logo onClick={handleLogoClick}>
          Impact Bridge
        </Logo>

        {isLoggedIn ? (
          <>
            {userType === 'startup' && (
              <WelcomeText variant="body1">
                Welcome, {userData?.startupName || 'Startup'}!
              </WelcomeText>
            )}
            
            {userType === 'startup' && (
              <IconButtonStyled onClick={handleMessages}>
                <MessageIcon />
              </IconButtonStyled>
            )}

            <IconButtonStyled onClick={handleMenu}>
              <AccountCircleIcon />
            </IconButtonStyled>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleProfile}>
                <AccountCircleIcon sx={{ mr: 1 }} /> Profile
              </MenuItem>
              <MenuItem onClick={handleSettings}>
                <SettingsIcon sx={{ mr: 1 }} /> Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <AuthButton
              variant="outlined"
              color="primary"
              onClick={() => setLoginOpen(true)}
            >
              <LoginIcon />
              <span className="button-text">Sign In</span>
            </AuthButton>
            <AuthButton
              variant="contained"
              color="primary"
              onClick={() => navigate('/signup')}
            >
              <PersonAddIcon />
              <span className="button-text">Sign Up</span>
            </AuthButton>
          </>
        )}

        <LoginModal
          open={loginOpen}
          onClose={() => setLoginOpen(false)}
          onLogin={() => setLoginOpen(false)}
        />
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
