const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET =
  '***';

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ status: 'error', data: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ status: 'ok', data: 'User created', user: newUser });
  } catch (error) {
    res.status(500).json({ status: 'error', data: error.message });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log('Login request received with:', req.body); // Log incoming request data

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: 'error', data: 'Email does not exist' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ status: 'error', data: 'Invalid password' });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ status: 'ok', data: token });
  } catch (error) {
    res.status(500).json({ status: 'error', data: error.message });
  }
};


exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ status: 'error', data: 'User not found' });
    }
    res.json({ status: 'ok', data: user });
  } catch (error) {
    res.status(500).json({ status: 'error', data: error.message });
  }
};


// Update user information
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
    if (!updatedUser) {
      return res.status(404).json({ status: 'error', data: 'User not found' });
    }
    res.json({ status: 'ok', data: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ status: 'error', data: error.message });
  }
};


// Reset password
exports.resetPassword = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  try {
    // Find the user in the database
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ status: 'error', data: 'User not found' });
    }

    // Verify the old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: 'error', data: 'Old password is incorrect' });
    }

    // Hash the new password and update it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ status: 'ok', data: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', data: error.message });
  }
};

