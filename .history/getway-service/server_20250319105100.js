 


 
const gateway = require('fast-gateway');

const PORT = 9091;

const server = gateway({
  routes: [
    {
      prefix: '/orders',
      target: 'http://order-service:8081',
      hooks: {}
    },
    {
      prefix: '/payments',
      target: 'http://payement-service:8082',
      hooks: {}
    },
     {
        prefix: '/mystering',
        target: 'http://getway:9091/',
        hooks: {}
      }
  ]
});
 
// Route personnalisée pour la racine ("/")
server.get('/', (req, res) => {
  res.send('Welcome to the API Gateway!');
});


server.start(PORT).then(() => {
  console.log(`🚀 API Gateway is running on http://localhost:${PORT}`);
});
