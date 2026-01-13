import React, { useState, useEffect } from 'react';

// API Base URL - points to our EC2 backend
const API_URL = 'http://13.58.112.70:3001';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);

  // Load tasks from backend when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tasks`);
      const data = await response.json();
      setTasks(data);
      console.log('✅ Loaded tasks from cloud database:', data);
      setLoading(false);
    } catch (error) {
      console.error('❌ Error loading tasks:', error);
      setLoading(false);
    }
  };

  // Function to add a new task
  const addTask = async () => {
    if (inputValue.trim() !== '') {
      try {
        const response = await fetch(`${API_URL}/api/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: inputValue }),
        });
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
        setInputValue('');
        console.log('✅ Added task to cloud database:', newTask);
      } catch (error) {
        console.error('❌ Error adding task:', error);
      }
    }
  };

  // Function to toggle task completion
  const toggleComplete = async (taskId, currentStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !currentStatus }),
      });
      const updatedTask = await response.json();
      
      setTasks(tasks.map(task => 
        task._id === taskId ? updatedTask : task
      ));
      console.log('✅ Updated task in cloud database:', updatedTask);
    } catch (error) {
      console.error('❌ Error updating task:', error);
    }
  };

  // Function to delete a task
  const deleteTask = async (taskId) => {
    try {
      await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter(task => task._id !== taskId));
      console.log('✅ Deleted task from cloud database');
    } catch (error) {
      console.error('❌ Error deleting task:', error);
    }
  };

  // Function to clear all tasks
  const clearAllTasks = async () => {
    try {
      await fetch(`${API_URL}/api/tasks`, {
        method: 'DELETE',
      });
      setTasks([]);
      console.log('🗑️ Cleared all tasks from cloud database');
    } catch (error) {
      console.error('❌ Error clearing tasks:', error);
    }
  };

  // Calculate statistics
  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading tasks... ⏳</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>My To-Do List 📝</h1>
      <p style={{ color: '#666', fontSize: '14px' }}>
        ☁️ Tasks are saved to the cloud database (MongoDB)!
      </p>
      
      {/* Progress indicator */}
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
        {tasks.map((task) => (
          <li 
            key={task._id}
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
            {/* Checkbox to mark complete */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task._id, task.completed)}
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
              onClick={() => deleteTask(task._id)}
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