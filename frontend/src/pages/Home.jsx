import { Container, Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Box textAlign="center">
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Hotel Management
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Your one-stop solution for hotel room bookings and management
        </Typography>
        {user ? (
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/rooms"
              sx={{ mr: 2 }}
            >
              View Rooms
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              component={RouterLink}
              to="/bookings"
            >
              My Bookings
            </Button>
          </Box>
        ) : (
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/login"
              sx={{ mr: 2 }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              component={RouterLink}
              to="/register"
            >
              Register
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Home; 