require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname)));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/myapp')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Connection failed', err));

// Use user routes
app.use('/', userRoutes);

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '❌ Internal Server Error' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
