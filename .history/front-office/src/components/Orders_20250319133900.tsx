import React, { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ ref: '', total: '' });

  // Récupérer les commandes via le gateway
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:9091/api/o/orders'); // Via le gateway
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  // Ajouter une nouvelle commande via le gateway
  const handleAddOrder = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending data:', newOrder); // Inspectez les données ici
      const response = await fetch('http://localhost:9091/api/o/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to add order: ${response.statusText}`);
      }
  
      const data = await response.json();
      setOrders([...orders, data]);
      setNewOrder({ ref: '', total: '' });
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  // Supprimer une commande via le gateway
  const handleDeleteOrder = async (id) => {
    try {
      const response = await fetch(`http://localhost:9091/api/o/orders/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete order: ${response.statusText}`);
      }

      setOrders(orders.filter((order) => order.id !== id)); // Mettre à jour la liste des commandes
    } catch (error) {
      console.error('Error deleting order:', error);
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
            className="p-2 border rounded-md w-full"
            required
          />
          <input
            type="number"
            placeholder="Total"
            value={newOrder.total}
            onChange={(e) => setNewOrder({ ...newOrder, total: parseFloat(e.target.value) || 0 })}
            className="p-2 border rounded-md w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-black rounded-md hover:bg-blue-600 transition duration-300"
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
                onClick={() => handleDeleteOrder(order.id)}
                className="px-4 py-2 bg-blue-500 text-black rounded-md hover:bg-blue-600 transition duration-300"
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