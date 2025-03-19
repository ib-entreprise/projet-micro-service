const server = gateway({
  routes: [
    {
      prefix: '/', // Route racine
      target: 'http://localhost:3000', // Redirige vers un microservice par défaut
      hooks: {}
    },
    {
      prefix: '/orders',
      target: 'http://localhost:3000',
      hooks: {}
    },
    {
      prefix: '/paiements',
      target: 'http://localhost:3001',
      hooks: {}
    },
    {
      prefix: '/inventory',
      target: 'http://localhost:3002',
      hooks: {}
    }
  ]
});