import express from 'express';
import path from 'path';
import __dirname from './utils/utils.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import viwesRouter from './routes/views.router.js'

//! Import clase ProductManager
import ProductManager from './utils/productManager.js'
const productPathFile = path.join(__dirname,'..', 'public', 'productos.json')
const productManager = new ProductManager(productPathFile)

const app = express();
const PORT = 8080
const httpServer = app.listen(PORT, console.log(`Server running on port ${PORT}`));
const socketServer = new Server(httpServer)

//* Midleware
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

//* Inicializacion del motor
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/../views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/../public'));

//* Routes
app.use('/', viwesRouter);

//* Websocket
socketServer.on('connection', async(socketClient) => {
    console.log("Cliente conectado") 
    const realTimeViewProducts = await productManager.getProducts()
    socketServer.emit("mostrarProductos", realTimeViewProducts)

    socketClient.on('deleteProduct', async(productId) => {
        console.log(productId);
        await productManager.deleteProduct(productId)
        const realTimeViewProducts = await productManager.getProducts()
        socketServer.emit("mostrarProductos", realTimeViewProducts)
    })

    
})

