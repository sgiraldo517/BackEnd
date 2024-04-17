//! Import clase ProductManager
const ProductManager = require('./productManager.js')

//! Creación de los productos
const productManager = new ProductManager()
// productManager.addProduct("Producto 1", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
//         .then(() => productManager.addProduct("Producto 2", "Este es un producto prueba", 400, "Sin imagen", "cfg456", 78))
//         .then(() => productManager.addProduct("Producto 3", "Este es un producto prueba", 600, "Sin imagen", "kjl789", 40))
//         .then(() => productManager.addProduct("Producto 4", "Este es un producto prueba", 100, "Sin imagen", "qws234", 35))
//         .then(() => productManager.addProduct("Producto 5", "Este es un producto prueba", 300, "Sin imagen", "mjh789", 85))
//         .then(() => productManager.addProduct("Producto 6", "Este es un producto prueba", 250, "Sin imagen", "ert398", 75))
//         .then(() => productManager.addProduct("Producto 7", "Este es un producto prueba", 330, "Sin imagen", "bdu765", 15))
//         .then(() => productManager.addProduct("Producto 8", "Este es un producto prueba", 700, "Sin imagen", "xgt786", 95))
//         .then(() => productManager.addProduct("Producto 9", "Este es un producto prueba", 800, "Sin imagen", "bjy045", 45))
//         .then(() => productManager.addProduct("Producto 10", "Este es un producto prueba", 225, "Sin imagen", "azf436", 5))
//         .catch(error => console.error("Error adding products:", error));

//! Creacion del servidor
const express = require('express');
const app = express()
const PORT = 8080

//* Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

//! Endpoints
app.get('/products', async(req, res) => {
    try {
        let limit = parseInt(req.query.limit)
        const arrayProductos = await productManager.getProducts()
        if(!limit) {
            res.json(arrayProductos)
        } else {
            const arrayFiltrado = arrayProductos.slice(0, limit)
            res.json(arrayFiltrado)
        }
    } catch (err) {
        console.error("Error al consultar productos", err)
    }
})

app.get('/products/:pid', async(req, res) =>{
    try {
        let productId = parseInt(req.params.pid)
        const productoBuscado = await productManager.getProductById(productId)
        if(productId){
            res.json(productoBuscado)
        }
    } catch (err) {
        console.log(err)
    }
})

//! Event Listener
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
