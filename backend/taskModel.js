const mongoose = require('mongoose');

// Define what a task looks like
const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

// Create the model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;