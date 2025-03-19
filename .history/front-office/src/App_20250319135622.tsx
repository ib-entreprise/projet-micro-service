import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Orders from './components/Orders';
import Payments from './components/Payments';

// Pages simples pour les autres routes
const Home = () => <h2>Home Page</h2>;
// const Payments = () => <h2>Payments Page</h2>;
const Inventory = () => <h2>Inventory Page</h2>;

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {/* Navbar */}
        <Navbar />

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