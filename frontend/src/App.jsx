import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box, styled } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import UserTypeSelection from './components/signup/UserTypeSelection';
import StartupSignup from './components/signup/StartupSignup';
import InvestorSignup from './components/signup/InvestorSignup';
import StartupDashboard from './components/dashboard/StartupDashboard';
import InvestorDashboard from './components/dashboard/InvestorDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const PageWrapper = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const ContentWrapper = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <PageWrapper>
            <Header />
            <ContentWrapper>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<UserTypeSelection />} />
                <Route path="/signup/startup" element={<StartupSignup />} />
                <Route path="/signup/investor" element={<InvestorSignup />} />
                <Route 
                  path="/startup-dashboard" 
                  element={
                    <ProtectedRoute allowedUserType="startup">
                      <StartupDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/investor-dashboard" 
                  element={
                    <ProtectedRoute allowedUserType="investor">
                      <InvestorDashboard />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </ContentWrapper>
            <Footer />
          </PageWrapper>
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
