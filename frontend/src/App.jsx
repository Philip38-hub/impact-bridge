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
import StartupListingPage from './pages/StartupListingPage';
import InvestorListingPage from './pages/InvestorListingPage';
import AddStartup from './components/AddStartup';
import EditStartup from './components/EditStartup';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

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
    <Router>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <PageWrapper>
              <Header />
              <ContentWrapper>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/signup" element={<UserTypeSelection />} />
                  <Route path="/signup/startup" element={<StartupSignup />} />
                  <Route path="/signup/investor" element={<InvestorSignup />} />
                  <Route path="/startups" element={<StartupListingPage />} />
                  <Route path="/investors" element={<InvestorListingPage />} />
                  <Route 
                    path="/dashboard/startup" 
                    element={
                      <ProtectedRoute userType="startup">
                        <StartupDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/dashboard/investor" 
                    element={
                      <ProtectedRoute userType="investor">
                        <InvestorDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/add-startup" 
                    element={
                      <ProtectedRoute userType="startup">
                        <AddStartup />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/edit-startup" 
                    element={
                      <ProtectedRoute userType="startup">
                        <EditStartup />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </ContentWrapper>
              <Footer />
            </PageWrapper>
          </AuthProvider>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;
