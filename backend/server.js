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

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    console.log('📋 Fetched tasks:', tasks.length);
    res.json(tasks);
  } catch (error) {
    console.error('❌ Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Create a new task
app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task({
      text: req.body.text,
      completed: false
    });
    const savedTask = await newTask.save();
    console.log('✅ Created task:', savedTask);
    res.json(savedTask);
  } catch (error) {
    console.error('❌ Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// 🔥 NEW: Update a task (toggle completion)
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true } // Return the updated document
    );
    console.log('✅ Updated task:', updatedTask);
    res.json(updatedTask);
  } catch (error) {
    console.error('❌ Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// 🔥 NEW: Delete a specific task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id);
    console.log('🗑️ Deleted task:', result);
    res.json({ message: 'Task deleted', result });
  } catch (error) {
    console.error('❌ Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// 🔥 NEW: Delete all tasks
app.delete('/api/tasks', async (req, res) => {
  try {
    const result = await Task.deleteMany({});
    console.log('🗑️ Deleted all tasks. Count:', result.deletedCount);
    res.json({ message: 'All tasks deleted', deletedCount: result.deletedCount });
  } catch (error) {
    console.error('❌ Error deleting all tasks:', error);
    res.status(500).json({ error: 'Failed to delete all tasks' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});