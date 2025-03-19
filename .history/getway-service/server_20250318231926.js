const gateway = require('fast-gateway');
const PORT = 1024;

// Configuration du gateway
const server = gateway({
  routes: [
    {
      prefix: '/orders', // Préfixe pour les requêtes liées aux commandes
      target: 'http://localhost:3000', // URL du microservice order-service
      hooks: {} // Hooks personnalisés (optionnels)
    },
    {
      prefix: '/payments', // Préfixe pour les requêtes liées aux paiements
      target: 'http://localhost:3001', // URL du microservice payment-service
      hooks: {} // Hooks personnalisés (optionnels)
    },
    {
      prefix: '/inventory', // Préfixe pour les requêtes liées à l'inventaire
      target: 'http://localhost:3002', // URL du microservice inventory-service
      hooks: {} // Hooks personnalisés (optionnels)
    }
  ]
});

// Route personnalisée pour la racine ("/")
server.get('/', (req, res) => {
  res.send('Welcome to the API Gateway!');
});

// Démarrer le serveur
server.start(PORT).then(() => {
  console.log(`🚀 API Gateway is running on http://localhost:${PORT}`);
});