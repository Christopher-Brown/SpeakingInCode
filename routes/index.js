var Auth = require('./auth'),
    express = require('express');

module.exports = (app) => {
    app.get('/logout', Auth.logout);        // logout route + redirect

    app.post('/login', Auth.login);         // login form submission
    app.post('/register', Auth.register);   // register form submission

    app.get('/dashboard.html', Auth.session); // protect the dashboard page - only send it, if the user has a valid session
    
};
