import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Nav from './components/nav';
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
      <div className="bg-gray-300 w-full ">
        {/* Menu de navigation */}
          <Nav />

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