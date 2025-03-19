const gateway = require('fast-gateway');

const PORT = 9091;

const server = gateway({
  routes: [
    {
      prefix: '/orders',
      target: 'http://localhost:3000',
      hooks: {},
      rewritePath: (req) => req.url.replace(/^\/orders/, '') // Supprime '/orders'
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