const gateway = require('fast-gateway');

const PORT = 9091;

const server = gateway({
  routes: [
    {
      prefix: '/api/o',
      target: 'http://order-service:3000', // Nom du service Docker pour order-service
      hooks: {},
    },
    {
      prefix: '/api/p',
      target: 'http://paiement-service:3001', // Nom du service Docker pour paiement-service
      hooks: {},
    },
    {
      prefix: '/api/i',
      target: 'http://inventory-service:3002', // Nom du service Docker pour inventory-service
      hooks: {},
    },
  ],
});

// Route pour la racine "/"
server.get('/', (req, res) => {
  res.send('Welcome to the API Gateway!');
});

server.start(PORT).then(() => {
  console.log(`🚀 API Gateway is running on http://localhost:${PORT}`);
});