import React, { useState, useEffect } from 'react';

const Orders = () => {
  // État pour stocker la liste des commandes
  const [orders, setOrders] = useState([]);
  // État pour le formulaire
  const [newOrder, setNewOrder] = useState({ ref: '', total: '' });

  // Simuler une API pour récupérer et ajouter des commandes
  useEffect(() => {
    // Récupérer les commandes initiales
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/orders'); // Remplacez par l'URL de votre API
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  // Ajouter une nouvelle commande
  const handleAddOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });
      const data = await response.json();
      setOrders([...orders, data]); // Ajouter la nouvelle commande à la liste
      setNewOrder({ ref: '', total: '' }); // Réinitialiser le formulaire
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {/* Formulaire pour ajouter une commande */}
      <form onSubmit={handleAddOrder} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Reference"
            value={newOrder.ref}
            onChange={(e) => setNewOrder({ ...newOrder, ref: e.target.value })}
            className="p-2 border rounded-md"
            required
          />
          <input
            type="number"
            placeholder="Total"
            value={newOrder.total}
            onChange={(e) => setNewOrder({ ...newOrder, total: e.target.value })}
            className="p-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Order
        </button>
      </form>

      {/* Liste des commandes */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Order List</h2>
        <ul className="space-y-2">
          {orders.map((order) => (
            <li
              key={order.id}
              className="p-3 bg-gray-100 rounded-md flex justify-between items-center"
            >
              <div>
                <strong>{order.ref}</strong> - ${order.total}
              </div>
              <button
                onClick={() => {
                  // Supprimer une commande (exemple)
                  setOrders(orders.filter((o) => o.id !== order.id));
                }}
                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Orders;