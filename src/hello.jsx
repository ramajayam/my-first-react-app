import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function HelloWorld() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Hello Guys!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Welcome to your first React webpage!
        </p>
        
        <div className="bg-white p-6 rounded-lg shadow-md inline-block">
          <p className="text-2xl font-semibold text-gray-700 mb-4">
            You clicked {count} times
          </p>
          <button 
            onClick={() => setCount(count + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition duration-200"
          >
            Click me!
          </button>
          <button 
            onClick={() => setCount(0)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded transition duration-200 ml-2"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default HelloWorld;