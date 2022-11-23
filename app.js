const express = require('express');
const path = require('path');
const methodOverride =require('method-override');
require('dotenv').config();
const session = require('express-session');
const cookies = require('cookie-parser');
const loggedUserMiddleware = require('./src/middlewares/loggedUserMiddleware');

const PORT = 3001 || process.env.PORT

const app = express();
app.use(session({
    secret: 'Soy Batman',
    resave: false,
    saveUninitialized: false,
}));

app.use(cookies());
app.use(loggedUserMiddleware);

const mainRouter = require('./src/routes/mainRoutes');
const adminRouter = require('./src/routes/adminRoutes');
const productsRouter = require('./src/routes/productsRoutes');
const userRouter = require('./src/routes/userRoutes');

app.set('views', path.resolve(__dirname, 'src/views'));
app.set('view engine', 'ejs');

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('method'));
app.use(express.json());


app.use('/', mainRouter);
app.use('/admin', adminRouter)
app.use('/products', productsRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
    res.status(404).render('404', {style: '/css/style.css'})
    next();
});

app.listen(PORT, () => {
    console.log(`aplicación lista y corriendo en el puerto ${PORT}. Que te sea leve y no reniegues demasiado 😁😁`);
})