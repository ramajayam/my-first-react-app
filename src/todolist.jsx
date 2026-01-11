import React, { useState, useEffect } from 'react';

function TodoList() {
  // State to store our tasks
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // 🔥 NEW: Load tasks from localStorage when component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem('myTodoTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
      console.log('Loaded tasks from database:', JSON.parse(savedTasks));
    }
  }, []); // Empty array means this runs once when component loads

  // 🔥 NEW: Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('myTodoTasks', JSON.stringify(tasks));
      console.log('Saved tasks to database:', tasks);
    }
  }, [tasks]); // Runs whenever 'tasks' changes

  // Function to add a new task
  const addTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, inputValue]);
      setInputValue(''); // Clear input after adding
    }
  };

  // Function to delete a task
  const deleteTask = (indexToDelete) => {
    setTasks(tasks.filter((task, index) => index !== indexToDelete));
  };

  // 🔥 NEW: Function to clear all tasks
  const clearAllTasks = () => {
    setTasks([]);
    localStorage.removeItem('myTodoTasks');
    console.log('Cleared all tasks from database');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>My To-Do List 📝</h1>
      <p style={{ color: '#666', fontSize: '14px' }}>
        ✅ Tasks are saved automatically to your browser's database!
      </p>
      
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
          style={{ padding: '10px 20px', marginLeft: '10px', fontSize: '16px' }}
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
              padding: '10px', 
              marginBottom: '10px', 
              backgroundColor: '#f0f0f0',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>{task}</span>
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

      {/* 🔥 NEW: Clear all button */}
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

      {/* Task counter */}
      <p style={{ marginTop: '20px', color: '#666' }}>
        Total tasks: {tasks.length}
      </p>
    </div>
  );
}

export default TodoList;