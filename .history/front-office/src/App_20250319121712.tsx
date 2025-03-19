import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Nav from './components/Nav';
import Orders from './components/Orders.tsx';

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
        <main className="  p-4">
         
        </main>
      </div>
       <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
    </Router>
  );
}

export default App;