import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem,
  Tooltip 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MessageIcon from '@mui/icons-material/Message';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LoginModal from './LoginModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

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

const WelcomeText = styled(Typography)`
  color: #333;
  margin-right: 16px;
  font-family: 'Poppins, sans-serif';
`;

const IconButtonStyled = styled(IconButton)`
  color: #008080;
  margin: 0 4px;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
    background-color: rgba(0, 128, 128, 0.1);
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  .button-text {
    display: inline-block;
    @media (max-width: 600px) {
      display: none;
    }
  }
`;

const Header = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    console.log('Current user data:', user);
  }, [user]);
  
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate(`/dashboard/${user.type}`);
  };

  const handleAddStartup = () => {
    navigate('/add-startup');
  };

  const getDisplayName = () => {
    if (!user) return 'User';
    if (user.startupName) return user.startupName;
    if (user.founderName) return user.founderName;
    if (user.name) return user.name;
    return 'User';
  };

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <Logo variant="h6" onClick={() => navigate('/')}>
          Impact Bridge
        </Logo>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user ? (
            <>
              <WelcomeText variant="body1">
                Welcome, {getDisplayName()}
              </WelcomeText>
              {user.type === 'startup' && (
                <Tooltip title="Add New Business" arrow placement="bottom">
                  <IconButtonStyled 
                    onClick={handleAddStartup}
                    sx={{ 
                      color: '#008080',
                      '&:hover': { 
                        backgroundColor: 'rgba(0, 128, 128, 0.1)',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    <AddCircleIcon />
                  </IconButtonStyled>
                </Tooltip>
              )}
              <Tooltip title="Messages" arrow placement="bottom">
                <IconButtonStyled>
                  <MessageIcon />
                </IconButtonStyled>
              </Tooltip>
              <Tooltip title="Settings" arrow placement="bottom">
                <IconButtonStyled>
                  <SettingsIcon />
                </IconButtonStyled>
              </Tooltip>
              <Tooltip title="Account Menu" arrow placement="bottom">
                <IconButtonStyled onClick={handleMenuOpen}>
                  <AccountCircleIcon />
                </IconButtonStyled>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 1.5,
                    '& .MuiMenuItem-root': {
                      padding: '10px 20px',
                      transition: 'background-color 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 128, 128, 0.1)',
                      },
                    },
                  },
                }}
              >
                <MenuItem onClick={handleProfileClick}>
                  <AccountCircleIcon sx={{ mr: 1, color: '#008080' }} /> Profile
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <SettingsIcon sx={{ mr: 1, color: '#008080' }} /> Settings
                </MenuItem>
                {user.type === 'startup' && (
                  <MenuItem onClick={handleMenuClose}>
                    <MessageIcon sx={{ mr: 1, color: '#008080' }} /> Messages
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 1, color: '#008080' }} /> Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <AuthButton 
                variant="outlined" 
                color="primary" 
                onClick={handleLoginOpen}
                sx={{ borderColor: '#008080', color: '#008080' }}
              >
                <LoginIcon />
                <span className="button-text">Login</span>
              </AuthButton>
              <AuthButton 
                variant="contained" 
                onClick={() => navigate('/signup')}
                sx={{ 
                  backgroundColor: '#008080',
                  '&:hover': { backgroundColor: '#006666' }
                }}
              >
                <PersonAddIcon />
                <span className="button-text">Sign Up</span>
              </AuthButton>
            </>
          )}
        </Box>
      </Toolbar>
      <LoginModal 
        open={loginOpen} 
        onClose={handleLoginClose}
      />
    </StyledAppBar>
  );
};

export default Header;
