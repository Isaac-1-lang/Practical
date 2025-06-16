import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';
import toast from 'react-hot-toast';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    roomNumber: '',
    type: 'Single',
    price: '',
    capacity: '',
    amenities: '',
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rooms');
      setRooms(response.data);
    } catch (error) {
      setError('Error fetching rooms');
    }
  };

  const handleOpenDialog = (room = null) => {
    if (room) {
      setEditingRoom(room);
      setFormData({
        roomNumber: room.roomNumber,
        type: room.type,
        price: room.price,
        capacity: room.capacity,
        amenities: room.amenities.join(', '),
      });
    } else {
      setEditingRoom(null);
      setFormData({
        roomNumber: '',
        type: 'Single',
        price: '',
        capacity: '',
        amenities: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingRoom(null);
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const roomData = {
        ...formData,
        price: Number(formData.price),
        capacity: Number(formData.capacity),
        amenities: formData.amenities.split(',').map(item => item.trim()),
      };

      if (editingRoom) {
        await axios.put(`http://localhost:5000/api/rooms/${editingRoom._id}`, roomData);
        toast.success('Room updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/rooms', roomData);
        toast.success('Room added successfully!');
      }

      handleCloseDialog();
      fetchRooms();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error saving room';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await axios.delete(`http://localhost:5000/api/rooms/${roomId}`);
        toast.success('Room deleted successfully!');
        fetchRooms();
      } catch (error) {
        const errorMessage = 'Error deleting room';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Grid item xs>
          <Typography variant="h4" component="h1">
            Room Management
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog()}
          >
            Add New Room
          </Button>
        </Grid>
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  Room {room.roomNumber}
                </Typography>
                <Typography color="text.secondary">
                  Type: {room.type}
                </Typography>
                <Typography variant="body2">
                  Capacity: {room.capacity} persons
                </Typography>
                <Typography variant="body2">
                  Price: ${room.price} per night
                </Typography>
                <Typography variant="body2">
                  Amenities: {room.amenities.join(', ')}
                </Typography>
                <Typography
                  color={room.isAvailable ? 'success.main' : 'error.main'}
                >
                  {room.isAvailable ? 'Available' : 'Not Available'}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  color="primary"
                  onClick={() => handleOpenDialog(room)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(room._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingRoom ? 'Edit Room' : 'Add New Room'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Room Number"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Room Type</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                label="Room Type"
              >
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Double">Double</MenuItem>
                <MenuItem value="Suite">Suite</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Price per Night"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Capacity"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Amenities (comma-separated)"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              helperText="Enter amenities separated by commas"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingRoom ? 'Update' : 'Add'} Room
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RoomManagement; 