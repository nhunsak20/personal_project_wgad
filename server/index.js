require('dotenv').config()

const express = require('express'),
    session = require('express-session'),
    massive = require('massive'),
    path = require('path'),
    { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

const authCtrl = require('./controllers/authController'),
    midCtrl = require('./middliewares/user_middleware'),
    profileCtrl = require('./controllers/profileController'),
    shoppingCtrl = require('./controllers/shoppingController'),
    eventCtrl = require('./controllers/eventController'),
    cartCtrl = require('./controllers/cartController'),
    mailCtrl = require('./controllers/nodemailerController'),
    stripeCtrl = require('./controllers/stripeController')

const app = express()

app.use(express.json())
app.use(express.static(`${__dirname}/../build`))

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        rejectUnauthorized: false,
        secret: SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    })
)



/* ---------------------- */
/* --  Authentication  -- */
/* ---------------------- */

app.post('/api/auth/login',authCtrl.login)
app.post('/api/auth/register', authCtrl.register)
app.post('/api/auth/logout', authCtrl.logout)
app.get('/api/auth/check', midCtrl.check_user)

/* --------------------- */
/* ----  Endpoints  ---- */
/* --------------------- */

/* ----  Profiles  ---- */
app.get('/api/profile/:id', midCtrl.isLogged, profileCtrl.getProfile)
app.put('/api/profile/:id', midCtrl.isLogged, profileCtrl.updateProfile)
app.post('/api/profile', midCtrl.isLogged, profileCtrl.newProfile)

/* ----  Shoppings  ---- */
app.get('/api/products', shoppingCtrl.getProducts)
app.get('/api/products/:id', shoppingCtrl.getProduct)
app.post('/api/products', midCtrl.isAdmin, shoppingCtrl.new)
app.put('/api/products/:id', midCtrl.isAdmin, shoppingCtrl.update)
app.delete('/api/products/:id', midCtrl.isAdmin, midCtrl.isAdmin, shoppingCtrl.remove)

/* -------  Carts ------- */
app.get('/api/shop/carts', cartCtrl.getCart)
app.post('/api/shop/carts', cartCtrl.addCart)
app.post('/api/shop/carts/product/:product_id', cartCtrl.updateCart)
app.post('/api/shop/carts/products/:product_id', cartCtrl.removeOneCart)
app.post('/api/shop/carts/clear', cartCtrl.removeAllCart)
app.post('/purchased/:id', midCtrl.isLogged, cartCtrl.confirmOrder)

/* ------  Events ------ */

app.get('/api/events', eventCtrl.getEvents)
app.get('/api/events/:id', eventCtrl.getEvent)
app.get('/api/courses', eventCtrl.getCourses)
app.put('/api/events/:id', midCtrl.isAdmin, eventCtrl.update)
app.post('/api/events', midCtrl.isAdmin, eventCtrl.new)
app.delete('/api/events/:id', midCtrl.isAdmin, eventCtrl.remove)

/* ----  Nodemailer ---- */

app.post('/send', mailCtrl.purchased)

/* ----  Stripes ---- */

app.post('/charge', stripeCtrl.pay)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
})


massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(dbObj => {
    app.set('db', dbObj)
    console.log('Database connected!')
    app.listen(SERVER_PORT, () => console.log(`Server running on port: ${SERVER_PORT}`))
}).catch(err => {
    console.log(`Cannot found Database connected! Error: ${err}`)
})
