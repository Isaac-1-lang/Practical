# Hotel Management System

A simple hotel management system with authentication and CRUD operations for room bookings.

## Features

- User authentication (register/login)
- View available rooms
- Book rooms with check-in and check-out dates
- View and manage bookings
- Cancel bookings
- Responsive Material-UI design

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React
- Material-UI
- React Router
- Axios
- Date-fns

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hotel-management
JWT_SECRET=your-secret-key
```

4. Start the development servers:

```bash
# Start backend server (from backend directory)
npm start

# Start frontend server (from frontend directory)
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Rooms
- GET /api/rooms - Get all rooms
- GET /api/rooms/:id - Get single room
- POST /api/rooms - Create room (protected)
- PUT /api/rooms/:id - Update room (protected)
- DELETE /api/rooms/:id - Delete room (protected)

### Bookings
- GET /api/bookings/my-bookings - Get user's bookings
- POST /api/bookings - Create booking
- PUT /api/bookings/:id/cancel - Cancel booking

## Contributing

Feel free to submit issues and enhancement requests! 