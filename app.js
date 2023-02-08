require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const path = require('path');
const session = require('express-session');
const ejsMate = require('ejs-mate');

const app = express();

const userRoutes = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public/'));
app.use(flash());

app.use(
    require('express-session')({
        secret: 'this is my fifth fullstack',
        resave: false,
        saveUninitialized: false,
    })
);

app.use((req, res, next) => {
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.currentUser = req.user;
    next();
});

app.use('/', userRoutes);

app.listen(process.env.PORT, () => {
    console.log('Connected to port 70');
});