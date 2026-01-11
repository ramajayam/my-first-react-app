import React, { useState, useEffect } from 'react';

function TodoList() {
  // State to store our tasks (now objects with text and completed status)
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Load tasks from localStorage when component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem('myTodoTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
      console.log('✅ Loaded tasks from database:', JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('myTodoTasks', JSON.stringify(tasks));
      console.log('💾 Saved tasks to database:', tasks);
    }
  }, [tasks]);

  // Function to add a new task
  const addTask = () => {
    if (inputValue.trim() !== '') {
      // Create new task object with text and completed status
      const newTask = {
        text: inputValue,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setInputValue(''); // Clear input after adding
    }
  };

  // 🔥 NEW: Function to toggle task completion
  const toggleComplete = (indexToToggle) => {
    setTasks(tasks.map((task, index) => {
      if (index === indexToToggle) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  // Function to delete a task
  const deleteTask = (indexToDelete) => {
    setTasks(tasks.filter((task, index) => index !== indexToDelete));
  };

  // Function to clear all tasks
  const clearAllTasks = () => {
    setTasks([]);
    localStorage.removeItem('myTodoTasks');
    console.log('🗑️ Cleared all tasks from database');
  };

  // 🔥 NEW: Calculate statistics
  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>My To-Do List 📝</h1>
      <p style={{ color: '#666', fontSize: '14px' }}>
        ✅ Tasks are saved automatically to your browser's database!
      </p>
      
      {/* 🔥 NEW: Progress indicator */}
      {totalCount > 0 && (
        <div style={{ 
          marginBottom: '20px', 
          padding: '10px', 
          backgroundColor: '#e8f5e9',
          borderRadius: '5px',
          textAlign: 'center'
        }}>
          <strong>{completedCount} of {totalCount} tasks completed</strong>
          {completedCount === totalCount && totalCount > 0 && (
            <span style={{ marginLeft: '10px' }}>🎉 All done!</span>
          )}
        </div>
      )}

      {/* Input and Add button */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Enter a task..."
          style={{ padding: '10px', width: '70%', fontSize: '16px' }}
        />
        <button 
          onClick={addTask}
          style={{ 
            padding: '10px 20px', 
            marginLeft: '10px', 
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>

      {/* Display list of tasks */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task, index) => (
          <li 
            key={index}
            style={{ 
              padding: '12px', 
              marginBottom: '10px', 
              backgroundColor: task.completed ? '#f0f0f0' : '#fff',
              border: task.completed ? '2px solid #4CAF50' : '2px solid #ddd',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            {/* 🔥 NEW: Checkbox to mark complete */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(index)}
              style={{ 
                marginRight: '12px', 
                width: '20px', 
                height: '20px',
                cursor: 'pointer'
              }}
            />
            
            {/* Task text with conditional styling */}
            <span style={{ 
              flex: 1,
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? '#888' : '#000',
              fontSize: '16px'
            }}>
              {task.text}
            </span>

            {/* Delete button */}
            <button 
              onClick={() => deleteTask(index)}
              style={{ 
                padding: '5px 10px', 
                backgroundColor: '#ff4444', 
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Empty state message */}
      {tasks.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>
          No tasks yet. Add one above to get started! 🚀
        </p>
      )}

      {/* Clear all button */}
      {tasks.length > 0 && (
        <button 
          onClick={clearAllTasks}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#666', 
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Clear All Tasks
        </button>
      )}
    </div>
  );
}

export default TodoList;
