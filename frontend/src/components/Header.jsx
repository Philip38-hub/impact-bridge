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
  Tooltip,
  useScrollTrigger,
  Slide
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MessageIcon from '@mui/icons-material/Message';
import LoginModal from './LoginModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'white',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.3s ease',
  '&.elevated': {
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  }
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  color: '#008080',
  fontWeight: 700,
  fontSize: 24,
  flexGrow: 1,
  cursor: 'pointer',
  transition: 'color 0.2s ease',
  userSelect: 'none',
  '&:hover': {
    color: '#006666'
  }
}));

const WelcomeText = styled(Typography)(({ theme }) => ({
  color: '#333',
  marginRight: 16,
  fontFamily: 'Poppins, sans-serif',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}));

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  color: '#008080',
  margin: '0 4px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 128, 128, 0.1)',
    transform: 'translateY(-2px)'
  },
  '&:active': {
    transform: 'translateY(0)'
  }
}));

const AuthButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  textTransform: 'none',
  padding: '8px 20px',
  borderRadius: 8,
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: 'none'
  },
  '.button-text': {
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}));

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const getDisplayName = () => {
    if (!user) return 'User';
    if (user.startupName) return user.startupName;
    if (user.founderName) return user.founderName;
    if (user.name) return user.name;
    return 'User';
  };

  return (
    <HideOnScroll>
      <StyledAppBar position="sticky" className={isScrolled ? 'elevated' : ''}>
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
                      borderRadius: 2,
                      minWidth: 180,
                      '& .MuiMenuItem-root': {
                        padding: '10px 20px',
                        borderRadius: 1,
                        gap: 1,
                        transition: 'background-color 0.2s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 128, 128, 0.1)',
                        },
                      },
                    },
                  }}
                >
                  <MenuItem onClick={handleProfileClick}>
                    <AccountCircleIcon sx={{ color: '#008080' }} />
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <SettingsIcon sx={{ color: '#008080' }} />
                    Settings
                  </MenuItem>
                  {user.type === 'startup' && (
                    <MenuItem onClick={handleMenuClose}>
                      <MessageIcon sx={{ color: '#008080' }} />
                      Messages
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ color: '#008080' }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <AuthButton 
                variant="contained" 
                onClick={handleLoginOpen}
                sx={{ 
                  backgroundColor: '#008080',
                  '&:hover': { backgroundColor: '#006666' }
                }}
              >
                <LoginIcon />
                <span className="button-text">Login</span>
              </AuthButton>
            )}
          </Box>
        </Toolbar>
        <LoginModal 
          open={loginOpen} 
          onClose={handleLoginClose}
        />
      </StyledAppBar>
    </HideOnScroll>
  );
};

export default Header;
