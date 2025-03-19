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
      url: `http://localhost:3000${req.originalUrl}`, // Utilisez req.originalUrl
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
      url: `http://localhost:3001${req.originalUrl}`, // Utilisez req.originalUrl
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
      url: `http://localhost:3002${req.originalUrl}`, // Utilisez req.originalUrl
      data: req.body,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.use('/orders', async (req, res) => {
    console.log(`Received request: ${req.method} ${req.originalUrl}`);
    try {
      const response = await axios({
        method: req.method,
        url: `http://localhost:3000${req.originalUrl}`,
        data: req.body,
      });
      console.log(`Response from order-service:`, response.data);
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error(`Error from order-service:`, error.message);
      res.status(error.response?.status || 500).json({ error: error.message });
    }
});
  
// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Gateway running on http://localhost:${PORT}`);
});
