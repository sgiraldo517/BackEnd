import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/api/sessions.js';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import initializePassport from './config/passport.config.js'

const app = express();
const PORT = 8080;

mongoose.connect("mongodb+srv://Sofia:coder123@cluster0.kmcttd1.mongodb.net/desafio_5?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => { console.log("Conectado a la base de datos"); })
    .catch(error => console.error("Error en la conexion", error));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://Sofia:coder123@cluster0.kmcttd1.mongodb.net/desafio_5?retryWrites=true&w=majority&appName=Cluster0' }),
}));

initializePassport();
app.use(passport.initialize())
app.use(passport.session());


app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
