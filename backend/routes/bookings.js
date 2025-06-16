const router = require('express').Router();
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const auth = require('../middleware/auth');

// Get all bookings for a user
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('room')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const { roomId, checkIn, checkOut } = req.body;

    // Check if room exists and is available
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    if (!room.isAvailable) {
      return res.status(400).json({ message: 'Room is not available' });
    }

    // Calculate total price
    const days = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const totalPrice = room.price * days;

    const booking = new Booking({
      user: req.user.id,
      room: roomId,
      checkIn,
      checkOut,
      totalPrice
    });

    // Update room availability
    room.isAvailable = false;
    await room.save();

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cancel booking
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Update room availability
    const room = await Room.findById(booking.room);
    room.isAvailable = true;
    await room.save();

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 