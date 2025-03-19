import React, { useState, useEffect } from 'react';

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [newItem, setNewItem] = useState({ nom: '', author: '' });

  // Récupérer les éléments d'inventaire via le gateway
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('http://localhost:9091/api/i/inventories'); // Via le gateway
        const data = await response.json();
        setInventoryItems(data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };
    fetchInventory();
  }, []);

  // Ajouter un nouvel élément d'inventaire via le gateway
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9091/api/i/inventories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add item');
      }

      const data = await response.json();
      setInventoryItems([...inventoryItems, data]);
      setNewItem({ nom: '', author: '' }); // Réinitialiser le formulaire
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Supprimer un élément d'inventaire via le gateway
  const handleDeleteItem = async (id) => {
    try {
      await fetch(`http://localhost:9091/api/i/inventories/${id}`, {
        method: 'DELETE',
      });
      setInventoryItems(inventoryItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>

      {/* Formulaire pour ajouter un élément d'inventaire */}
      <form onSubmit={handleAddItem} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nom"
            value={newItem.nom}
            onChange={(e) => setNewItem({ ...newItem, nom: e.target.value })}
            className="p-2 border rounded-md w-full"
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={newItem.author}
            onChange={(e) => setNewItem({ ...newItem, author: e.target.value })}
            className="p-2 border rounded-md w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-black rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Item
        </button>
      </form>

      {/* Liste des éléments d'inventaire */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Inventory List</h2>
        <ul className="space-y-2">
          {inventoryItems.map((item) => (
            <li
              key={item.id}
              className="p-3 bg-gray-100 rounded-md flex justify-between items-center"
            >
              <div>
                <strong>{item.nom}</strong> - by {item.author || 'Unknown'}
              </div>
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
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

export default Inventory;