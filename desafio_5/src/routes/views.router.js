import { Router } from 'express';
import productsModel from '../models/products.models.js';
import { isAuthenticated, isNotAuthenticated } from '../middleware/auth.js';

const router = Router()

router.get('/products', isAuthenticated, async(req, res) => {
    try {
        let productos = await productsModel.find().lean()
        res.render('products', { productos, user: req.session.user }); 
    } catch (e) {
        res.status(500).send( "Error al consultar productos " + e.message);
    } 
})

router.get('/login', isNotAuthenticated, (req, res) => {
    res.render('login'); 
})

router.get('/register', isNotAuthenticated, (req, res) => {
    res.render('register'); 
})

router.get('/profile', isAuthenticated, (req, res) => {
    res.render('perfil', { user: req.session.user }); 
})



export default router;