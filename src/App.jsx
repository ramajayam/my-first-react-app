import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HelloWorld from './hello'
import TodoList from './todolist'

function App() {
  return (
    <div>
      <TodoList />
    </div>
  );
}

export default App;