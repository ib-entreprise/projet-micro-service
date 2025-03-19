 


 
const gateway = require('fast-gateway');

const PORT = 9091;

const server = gateway({
  routes: [
    {
      prefix: '/orders',
      target: 'http://localhost:3000/orders',
      hooks: {}
    },
   
  ]
});
 
// Route personnalisée pour la racine ("/")
server.get('/', (req, res) => {
  res.send('Welcome to the API Gateway!');
});


server.start(PORT).then(() => {
  console.log(`🚀 API Gateway is running on http://localhost:${PORT}`);
});
