import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <h2>Home Page</h2>;
}

function Orders() {
  return <h2>Orders Page</h2>;
}

function Payments() {
  return <h2>Payments Page</h2>;
}

function Inventory() {
  return <h2>Inventory Page</h2>;
}

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {/* Menu de navigation */}
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Front Office</h1>
            <ul className="flex space-x-4">
              <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
              <li><Link to="/orders" className="hover:text-blue-200">Orders</Link></li>
              <li><Link to="/payments" className="hover:text-blue-200">Payments</Link></li>
              <li><Link to="/inventory" className="hover:text-blue-200">Inventory</Link></li>
            </ul>
          </div>
        </nav>

        {/* Contenu principal */}
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;