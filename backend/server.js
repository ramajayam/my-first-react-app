const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Task = require('./taskModel');

const app = express();
const PORT = 3001;

// 🔥 NEW: MongoDB connection string
const MONGODB_URI = 'mongodb+srv://ramajayamarumugam_db_user:c0WNCvMsPIsXXbf6@cluster0.rmfzwsx.mongodb.net/?appName=Cluster0';

// Middleware
app.use(cors());
app.use(express.json());

// 🔥 NEW: Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working! 🎉' });
});

// 🔥 NEW: Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// 🔥 NEW: Create a new task
app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task({
      text: req.body.text,
      completed: false
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});