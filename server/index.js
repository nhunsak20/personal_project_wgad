require('dotenv').config()

const express = require('express'),
    session = require('express-session'),
    massive = require('massive'),
    { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

const authCtrl = require('./controllers/authController'),
    midCtrl = require('./middliewares/check_user'),
    profileCtrl = require('./controllers/profileController'),
    shoppingCtrl = require('./controllers/shoppingController')

const app = express()

app.use(express.json())

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

// Authentication...
app.post('api/auth/login', midCtrl.check_user,authCtrl.login)
app.post('api/auth/register', authCtrl.register)
app.post('api/auth/logout', authCtrl.logout)
app.get('api/auth/check', midCtrl.check_user)

// Endpoint...
app.get('api/profile/:id', midCtrl.check_user, profileCtrl.getProfile)
app.put('api/profile/:id', midCtrl.check_user, profileCtrl.updateProfile)

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
