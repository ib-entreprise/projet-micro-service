const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 4000;

// Middleware pour parser JSON
app.use(express.json());

// Route pour le microservice order
app.use('/orders', async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `http://localhost:3000/orders${req.url}`, // URL du microservice order
      data: req.body,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Route pour le microservice payment
app.use('/payments', async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `http://localhost:3001/payments${req.url}`, // URL du microservice payment
      data: req.body,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Route pour le microservice inventory
app.use('/inventory', async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `http://localhost:3002${req.url}`, // URL du microservice inventory
      data: req.body,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Gateway running on http://localhost:${PORT}`);
});