import Server from './server.js';
import router from './routes/index.routes.js';  

const server = new Server();
server.app.use('/api', router);


//server.listen();


 export default server.app;

