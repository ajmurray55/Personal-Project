require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session  = require('express-session');
const app = express();

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING, CHECKOUT_STRING} = process.env;

const stripe = require("stripe")(CHECKOUT_STRING);
const uuid = require("uuid/v4");

const {login, register, logout, userSession} = require('./Controller/authCtrl')
const {getAllPhones, getOnePhone} = require('./Controller/phoneCtrl')
const {addToCart, remove, getAllCart, getTotal, getCartTotal, deleteAllCart} = require('./Controller/cartCtrl')


app.use(express.json());


massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('Connected to your DB')
}).catch(err => console.log(err));

app.use(session({
    secret:SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

// AUTH ENDPOINTS
app.post('/auth/register', register)
app.post('/auth/login', login)
app.get('/auth/user_session', userSession)
app.get('/auth/logout', logout)
// phoneCtrl ENDPOINTS
app.get("/api/all_phones", getAllPhones)
app.get("/api/phone/:id", getOnePhone)
// cartCtrl ENDPOINTS
app.get("/api/cart/:user_id", getAllCart)
app.get("/api/cart_total/:id", getCartTotal)
app.put("/api/total/:id", getTotal)
app.post("/api/cart/:id", addToCart)
app.put("/api/cart/:cart_id", remove)
app.delete("/api/all_cart/:user_id", deleteAllCart)


const path = require('path'); 

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(SERVER_PORT, () => console.log(`Running on Server Port ${SERVER_PORT}`));