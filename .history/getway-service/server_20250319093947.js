const gateway = require('fast-gateway');
const PORT = 1024;


const server = gateway({
  routes: [
    {
      prefix: '/',
      target: 'http://localhost:3000'
    },
    {
      prefix: '/orders', 
      target: 'http://localhost:3000', 
      hooks: {} 
    },
    {
      prefix: '/payments', 
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


server.get('/', (req, res) => {
  res.send('Welcome to the API Gateway!');
});


server.start(PORT).then(() => {
  console.log(`🚀 API Gateway is running on http://localhost:${PORT}`);
});