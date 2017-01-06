require('colors');
var config = require('./package');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan')('dev');
var mongoose = require('mongoose').connect('mongodb://localhost/', (mongooseErr) => {
        if( mongooseErr ) {
            console.error('#ERROR#'.red,'Could not initilize mongoose!', mongooseErr);
        } else {
            console.info('Mongoose initilized!'.green.bold);
        }
    });

var sessions = require('client-sessions')({
    cookieName: config.name, // front-end cookie name, currently pulled from package.json, feel free to change
    secret: 'chris1990', // the encryption password : keep this safe
    requestKey: 'session', // req.session,
    duration: (86400 * 1000) * 7, // one week in milliseconds
    cookie: {
        ephemeral: false, // when true, cookie expires when browser is closed
        httpOnly: true, // when true, the cookie is not accesbile via front-end JavaScript
        secure: false // when true, cookie will only be read when sent over HTTPS
    }
});
var Exercise = require('./models/exercise.js');
 PORT = process.env.PORT || 3000;
// create our express app object
var app = express();
app.use(
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true })
);
app.post('/createExercise', (req, res) => {
    console.log("Body: ", req.body);

    // validate the data in the request body using the schema    
    var newExercise = new Exercise(req.body);

    // put the user data in the database
    newExercise.save((err, doc) => {
        if (err) {
            console.log("Error adding exercise to database ", err);
            res.send(err);
        } else {
            console.log("Added exercise to database! ", doc);
            res.send(doc);
        }
    });
});
// create a route to get exercises by type and difficulty
app.get('/api/exercise/:type/:difficulty', (req, res) => {
    console.log("Getting exercises", req.params.type);

    Exercise.find({
        type: req.params.type,
        difficulty: req.params.difficulty
    }, (err, data) => {
        if (err) {
            console.log("Error getting an exercise from the DB:", err);
            res.send(err);
        } else {
            console.log("Exercise retrieved from the database: ", data);
            res.send(data);
        }
    });
});
var Routes = require('./routes');

app.use(express.static('public'));
// mount body parser middleware
app.use(
    logger,
    sessions,
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true })
);



// every route needs a method, url, and route handler
// the (req, res) function is called a route handler
app.use((req, res, next) => {
    if (req.session.uid) {
        req.session.counter++;
    } else {
        req.session.counter = 0;
    }
    console.log("Session counter: ", req.session.counter);
    next();
});

Routes(app);


//listen for connections
app.listen(PORT, (err) => {
    if( err ) {
        console.error('#ERROR#'.red,'Could not start server! :(');
    } else {
        console.log('\nMEAN Auth Server UP!'.green.bold, 'PORT:'.yellow, PORT);
    }
});