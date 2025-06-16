import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Box,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';
import toast from 'react-hot-toast';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rooms');
      setRooms(response.data);
    } catch (error) {
      toast.error('Error fetching rooms');
      console.error('Error fetching rooms:', error);
    }
  };

  const handleBookClick = (room) => {
    setSelectedRoom(room);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRoom(null);
    setCheckIn(null);
    setCheckOut(null);
    setError('');
  };

  const handleBooking = async () => {
    try {
      if (!checkIn || !checkOut) {
        const errorMessage = 'Please select both check-in and check-out dates';
        setError(errorMessage);
        toast.error(errorMessage);
        return;
      }

      if (checkIn >= checkOut) {
        const errorMessage = 'Check-out date must be after check-in date';
        setError(errorMessage);
        toast.error(errorMessage);
        return;
      }

      await axios.post('http://localhost:5000/api/bookings', {
        roomId: selectedRoom._id,
        checkIn,
        checkOut,
      });

      toast.success('Room booked successfully!');
      handleCloseDialog();
      fetchRooms(); // Refresh rooms to update availability
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error creating booking';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            mb: 4,
            textAlign: 'center'
          }}
        >
          Available Rooms
        </Typography>
        <Grid container spacing={3}>
          {rooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room._id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Room {room.roomNumber}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    Type: {room.type}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Capacity: {room.capacity} persons
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Price: ${room.price} per night
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Amenities: {room.amenities.join(', ')}
                  </Typography>
                  <Typography
                    color={room.isAvailable ? 'success.main' : 'error.main'}
                    sx={{ fontWeight: 'bold' }}
                  >
                    {room.isAvailable ? 'Available' : 'Not Available'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => handleBookClick(room)}
                    disabled={!room.isAvailable}
                    sx={{ 
                      mx: 2,
                      mb: 2,
                      backgroundColor: room.isAvailable ? 'primary.main' : 'grey.500',
                      '&:hover': {
                        backgroundColor: room.isAvailable ? 'primary.dark' : 'grey.600',
                      },
                    }}
                  >
                    Book Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog 
          open={openDialog} 
          onClose={handleCloseDialog}
          PaperProps={{
            sx: {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
            }
          }}
        >
          <DialogTitle>Book Room {selectedRoom?.roomNumber}</DialogTitle>
          <DialogContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Check-in Date"
                value={checkIn}
                onChange={setCheckIn}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" />
                )}
                minDate={new Date()}
              />
              <DatePicker
                label="Check-out Date"
                value={checkOut}
                onChange={setCheckOut}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" />
                )}
                minDate={checkIn || new Date()}
              />
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleBooking} variant="contained" color="primary">
              Confirm Booking
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Rooms; 