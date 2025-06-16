import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Alert,
} from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings/my-bookings');
      setBookings(response.data);
    } catch (error) {
      const errorMessage = 'Error fetching bookings';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error fetching bookings:', error);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await axios.put(`http://localhost:5000/api/bookings/${bookingId}/cancel`);
        toast.success('Booking cancelled successfully!');
        fetchBookings(); // Refresh bookings after cancellation
      } catch (error) {
        const errorMessage = 'Error cancelling booking';
        setError(errorMessage);
        toast.error(errorMessage);
        console.error('Error cancelling booking:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Bookings
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={3}>
        {bookings.map((booking) => (
          <Grid item xs={12} key={booking._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  Room {booking.room.roomNumber}
                </Typography>
                <Typography color="text.secondary">
                  Type: {booking.room.type}
                </Typography>
                <Typography>
                  Check-in: {formatDate(booking.checkIn)}
                </Typography>
                <Typography>
                  Check-out: {formatDate(booking.checkOut)}
                </Typography>
                <Typography>
                  Total Price: ${booking.totalPrice}
                </Typography>
                <Typography
                  color={
                    booking.status === 'confirmed'
                      ? 'success.main'
                      : booking.status === 'cancelled'
                      ? 'error.main'
                      : 'warning.main'
                  }
                >
                  Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Typography>
                {booking.status === 'confirmed' && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleCancelBooking(booking._id)}
                    sx={{ mt: 2 }}
                  >
                    Cancel Booking
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
        {bookings.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary">
              No bookings found
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Bookings; 