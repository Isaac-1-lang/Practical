import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Rooms from './pages/Rooms';
import RoomManagement from './pages/RoomManagement';
import Bookings from './pages/Bookings';
import RegisterBadge from './pages/RegisterBadge';
import { Box } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Box
            sx={{
              minHeight: '100vh',
              backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <Toaster position="top-right" />
            <Navbar />
            <Box sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              minHeight: 'calc(100vh - 64px)', // Subtract navbar height
              pt: 2,
              pb: 4
            }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register-badge" element={<RegisterBadge />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/rooms"
                  element={
                    <PrivateRoute>
                      <Rooms />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/manage-rooms"
                  element={
                    <PrivateRoute>
                      <RoomManagement />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/bookings"
                  element={
                    <PrivateRoute>
                      <Bookings />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Box>
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
