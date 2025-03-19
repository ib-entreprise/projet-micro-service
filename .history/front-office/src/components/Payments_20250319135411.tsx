import React, { useState, useEffect } from 'react';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({ amount: '', status: '' });

  // Récupérer les paiements via le gateway
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:9091/api/p/paiements'); // Via le gateway
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };
    fetchPayments();
  }, []);

  // Ajouter un nouveau paiement via le gateway
  const handleAddPayment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9091/api/p/paiements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPayment),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add payment');
      }

      const data = await response.json();
      setPayments([...payments, data]);
      setNewPayment({ amount: '', status: '' });
    } catch (error) {
      console.error('Error adding payment:', error);
    }
  };

  // Supprimer un paiement via le gateway
  const handleDeletePayment = async (id) => {
    try {
      await fetch(`http://localhost:9091/api/p/paiements/${id}`, {
        method: 'DELETE',
      });
      setPayments(payments.filter((payment) => payment.id !== id));
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Payments</h1>

      {/* Formulaire pour ajouter un paiement */}
      <form onSubmit={handleAddPayment} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Amount"
            value={newPayment.amount}
            onChange={(e) =>
              setNewPayment({ ...newPayment, amount: parseFloat(e.target.value) || 0 })
            }
            className="p-2 border rounded-md w-full"
            required
          />
          <input
            type="text"
            placeholder="Status (e.g., Paid, Pending)"
            value={newPayment.status}
            onChange={(e) => setNewPayment({ ...newPayment, status: e.target.value })}
            className="p-2 border rounded-md w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-black rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Payment
        </button>
      </form>

      {/* Liste des paiements */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Payment List</h2>
        <ul className="space-y-2">
          {payments.map((payment) => (
            <li
              key={payment.id}
              className="p-3 bg-gray-100 rounded-md flex justify-between items-center"
            >
              <div>
                <strong>${payment.amount}</strong> - {payment.status}
              </div>
              <button
                onClick={() => handleDeletePayment(payment.id)}
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

export default Payments;