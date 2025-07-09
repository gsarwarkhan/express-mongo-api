const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/myapp')
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Connection failed", err));

// ✅ Define User Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);

// ✅ API: Register New User with Encrypted Password
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.send('✅ User registered successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Error registering user');
  }
});

// ✅ API: Get All Users (Hide Password)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: '❌ Something went wrong' });
  }
});

// ✅ Start Server
app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
