const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Register Badge
router.post('/register-badge', async (req, res) => {
  try {
    const { title, firstName, lastName, position, company, businessArena, employees, streetNr, additionalInformation, zipCode, place, country, code, phoneNumber, yourEmail, password, acceptTerms } = req.body;

    // Check if user already exists based on yourEmail (assuming email is unique)
    const existingUser = await User.findOne({ email: yourEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    if (!acceptTerms) {
      return res.status(400).json({ message: 'You must accept the Terms and Conditions.' });
    }

    const user = new User({
      title,
      firstName,
      lastName,
      position,
      company,
      businessArena,
      employees,
      streetNr,
      additionalInformation,
      zipCode,
      place,
      country,
      code,
      phoneNumber,
      email: yourEmail,
      password
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        title: user.title,
        firstName: user.firstName,
        lastName: user.lastName,
        position: user.position,
        company: user.company,
        businessArena: user.businessArena,
        employees: user.employees,
        streetNr: user.streetNr,
        additionalInformation: user.additionalInformation,
        zipCode: user.zipCode,
        place: user.place,
        country: user.country,
        code: user.code,
        phoneNumber: user.phoneNumber,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 