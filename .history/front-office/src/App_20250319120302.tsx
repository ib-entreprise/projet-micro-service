import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <div className="bg-gray-100 min-h-screen">
      {/* Menu de navigation */}
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Front Office</h1>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:text-blue-200">Home</a></li>
            <li><a href="/orders" className="hover:text-blue-200">Orders</a></li>
            <li><a href="/payments" className="hover:text-blue-200">Payments</a></li>
            <li><a href="/inventory" className="hover:text-blue-200">Inventory</a></li>
          </ul>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Welcome to the Front Office</h2>
        <p>This is the main content area.</p>
      </main>
    </div>
    </>
  )
}

export default App
