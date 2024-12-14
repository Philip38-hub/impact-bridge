require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const startupRoutes = require('./routes/startups');
const investorRoutes = require('./routes/investors');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Vite's default port
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/startups', startupRoutes);
app.use('/api/investors', investorRoutes);

// MongoDB connection options
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, mongoOptions)
  .then(() => {})
  .catch(err => {
    process.exit(1); // Exit if MongoDB connection fails
  });

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {});

mongoose.connection.on('error', (err) => {});

mongoose.connection.on('disconnected', () => {});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {});
