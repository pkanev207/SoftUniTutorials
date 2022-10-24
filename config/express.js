const express = require('express');
const { create } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const userSession = require('../middleware/userSession');
const trimBody = require('../middleware/trimBody');


module.exports = (app) => {
    app.engine('.hbs', create({ extname: '.hbs' }).engine);

    app.set('view engine', '.hbs');

    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser()); // secret can be set here
    app.use(userSession());
    app.use(trimBody('password'));
};