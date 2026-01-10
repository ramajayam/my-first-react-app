import React, { useState } from 'react';

function TodoList() {
  // State to store our tasks
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

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

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>My To-Do List</h1>
      
      {/* Input and Add button */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
    </div>
  );
}

export default TodoList;