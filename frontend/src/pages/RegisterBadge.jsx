import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Grid,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const RegisterBadge = () => {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    position: '',
    company: '',
    businessArena: '',
    employees: '',
    streetNr: '',
    additionalInformation: '',
    zipCode: '',
    place: '',
    country: '',
    code: '',
    phoneNumber: '',
    yourEmail: '',
    acceptTerms: false,
  });
  const [error, setError] = useState('');
  const { registerBadge } = useAuth(); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.acceptTerms) {
      setError('You must accept the Terms and Conditions.');
      toast.error('You must accept the Terms and Conditions.');
      return;
    }

    try {
      const result = await registerBadge(formData); 
      if (result.success) {
        toast.success('Registration successful! Badge created.');
        navigate('/success-page'); // Navigate to a success page or login
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    } catch (err) {
      toast.error('An error occurred during registration');
      setError('An error occurred during registration');
    }
  };

  const titles = ['Mr.', 'Ms.', 'Mx.', 'Dr.', 'Prof.'];
  const positions = ['Manager', 'Developer', 'Designer', 'CEO', 'Other'];
  const employeeNumbers = ['1-10', '11-50', '51-200', '201-500', '500+'];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            borderRadius: '15px',
            overflow: 'hidden',
          }}
        >
          {/* Left Section: General Information */}
          <Box sx={{ flex: 1, pr: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              General Information
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                select
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              >
                {titles.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <TextField
                select
                margin="normal"
                required
                fullWidth
                id="position"
                label="Position"
                name="position"
                value={formData.position}
                onChange={handleChange}
              >
                {positions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                margin="normal"
                required
                fullWidth
                id="company"
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="businessArena"
                label="Business Arena"
                name="businessArena"
                value={formData.businessArena}
                onChange={handleChange}
              />
              <TextField
                select
                margin="normal"
                required
                fullWidth
                id="employees"
                label="Employees"
                name="employees"
                value={formData.employees}
                onChange={handleChange}
              >
                {employeeNumbers.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>

          {/* Right Section: Contact Details */}
          <Box sx={{ flex: 1, pl: 4, backgroundColor: '#3f51b5', color: 'white', p: 4, borderRadius: '0 15px 15px 0' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Contact Details
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="streetNr"
              label="Street + Nr"
              name="streetNr"
              value={formData.streetNr}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="additionalInformation"
              label="Additional Information"
              name="additionalInformation"
              value={formData.additionalInformation}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="zipCode"
                  label="Zip Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="place"
                  label="Place"
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
                />
              </Grid>
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              id="country"
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
            />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="code"
                  label="Code +"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
                />
              </Grid>
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              id="yourEmail"
              label="Your Email"
              name="yourEmail"
              type="email"
              value={formData.yourEmail}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  name="acceptTerms"
                  color="primary"
                  sx={{ color: 'white' }}
                />
              }
              label={
                <Typography variant="body2" sx={{ color: 'white' }}>
                  I do accept the <span style={{ textDecoration: 'underline' }}>Terms and Conditions</span> of your site.
                </Typography>
              }
              sx={{ mt: 2, mb: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: 'white', color: '#3f51b5', '&:hover': { backgroundColor: '#e0e0e0' } }}
            >
              Register Badge
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterBadge; 