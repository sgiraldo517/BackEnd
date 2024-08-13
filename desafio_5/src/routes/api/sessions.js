import { Router } from 'express';
import userModel from '../../models/users.models.js'

const router = Router();

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        const newUser = new userModel({ first_name, last_name, email, age, password });
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        res.status(500).send('Error al registrar usuario');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        req.session.user = {
            id: 1,
            first_name: "Admin User",
            email: "adminCoder@coder.com",
            rol: "admin"
        }
        res.redirect('/products');
    } else {
        try {
            let user = await userModel.findOne({ email });
            if (!user) return res.status(404).send('Usuario no encontrado');
            req.session.user = {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                age: user.age,
                rol: user.rol
            };
            res.redirect('/products');
        } catch (err) {
            res.status(500).send('Error al iniciar sesión');
        }
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/login');
    });
});

export default router;