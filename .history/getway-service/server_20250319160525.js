const gateway = require('fast-gateway');

const PORT = 9091;

const server = gateway({
  routes: [
    {
      prefix: '/api/o',
      target: 'http://localhost:3000',
      hooks: {},
    },
    {
      prefix: '/api/p', // Route pour le microservice paiement-service
      target: 'http://localhost:3001',
      hooks: {},
    },
   
  ]
});

// Route pour la racine "/"
server.get('/', (req, res) => {
  res.send('Welcome to the API Gateway!');
});

server.start(PORT).then(() => {
  console.log(`🚀 API Gateway is running on http://localhost:${PORT}`);
});