const gateway = require('fast-gateway');
const PORT = 9091;

// Configuration du gateway
const server = gateway({
  routes: [
    {
      prefix: '/orders', // Préfixe pour les requêtes liées aux commandes
      target: 'http://localhost:3000', // URL de base du microservice order-service (sans /orders)
      hooks: {
        onRequest: (req, res) => {
          console.log(`Request received for ${req.url}`);
        },
        onResponse: (req, res, response) => {
          console.log(`Response sent for ${req.url}:`, response);
        }
      }
    }
  ]
});

// Démarrer le serveur
server.start(PORT).then(() => {
  console.log(`🚀 API Gateway is running on http://localhost:${PORT}`);
});