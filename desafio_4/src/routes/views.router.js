import express from 'express';
import path from 'path';
import __dirname from '../utils/utils.js';
const router = express.Router()

//! Import clase ProductManager
import ProductManager from '../utils/productManager.js'
const productPathFile = path.join(__dirname, '..', 'public', 'productos.json')
const productManager = new ProductManager(productPathFile);

//! Endpoints

router.get('/', async(req, res) => {
    try {
        const arrayProductos = await productManager.getProducts()
        res.render('home', { arrayProductos })
    } catch (e) {
        res.status(500).send( "Error al consultar productos " + e.message);
    }
})


router.get("/realtimeproducts",(req,res)=>{
    res.render("realtimeproducts", {})
})


export default router