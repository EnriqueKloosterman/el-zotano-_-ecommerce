const express = require('express');
const path = require('path');
require('dotenv').config();
const methodOverride = require('method-override');
// const session = require('express-session');
// const cookies = require('cookie-parser');


const PORT = process.env.PORT || 3001;
const app = express();
const mainRouter = require('./routes/mainRoutes');
const adminRouter = require('./routes/adminRoutes');

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

const publicPath = path.resolve(__dirname, '../public');
app.use('publicPath', express.static(publicPath));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('method'));
app.use(express.json());


app.use('/', mainRouter);
app.use('/admin', adminRouter)

app.listen(PORT, () => {
    console.log(`aplicacón lista y corriendo en el puerto ${PORT}. Que te sea leve y no reniegues demasiado 😁😁`);
})




