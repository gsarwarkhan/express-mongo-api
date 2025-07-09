const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register a new user
exports.register = async (req, res) => {
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
};

// Get all users (hide password)
exports.getAll = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: '❌ Something went wrong' });
  }
}; 