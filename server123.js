var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var User = require('./models/user.js');
var Exercise = require('./models/exercise.js')
var PORT = process.env.PORT || 3000;
var config = require('./package')

// create our express app object
var app = express();

// connect to mongoose
mongoose.connect("mongodb://localhost/SpeakingInCode", (err)=>{
    if(err){
        console.log("Error connecting to mongo", err);
    } else {
        console.log("Connected to database!");
    }
});

// mount body parser middleware
app.use(bodyParser.json(), bodyParser.urlencoded({extended:true}));

// mount static fileserver middleware
app.use(express.static('public'));

// every route needs a method, url, and route handler
// the (req, res) function is called a route handler
app.post('/createExercise', (req, res)=>{
    console.log("Body: ", req.body);

    // validate the data in the request body using the schema    
    var newExercise = new Exercise(req.body);

    // put the user data in the database
    newExercise.save((err, doc) => {
        if(err) {
            console.log("Error adding exercise to database ", err);
            res.send(err);
        } else {
            console.log("Added exercise to database! ", doc);
            res.send(doc);
        }
    });
});

app.post('/users', (req, res)=>{
    console.log("Body: ", req.body);

    // validate the data in the request body using the schema    
    var newUser = new User(req.body);

    // put the user data in the database
    newUser.save((err, doc) => {
        if(err) {
            console.log("Error adding to database ", err);
            res.send(err);
        } else {
            console.log("Added person to database! ", doc);
            res.send(doc);
        }
    });
});

// create a route to get exercises by type and difficulty
app.get('/api/exercise/:type/:difficulty', (req, res)=>{
    console.log("Getting exercises", req.params.type);

    Exercise.find({ type:req.params.type, difficulty:req.params.difficulty}, (err, data) =>{
        if(err){
            console.log("Error getting an exercise from the DB:", err);
            res.send(err);
        } else {
            console.log("Exercise retrieved from the database: ", data);
            res.send(data);
        }
    });
});

// create a route to get profiles by name
app.get('/api/user/:name', (req, res)=>{
    console.log("Name requested: ", req.params.name);

    User.findOne({ name: req.params.name }, (err, data) =>{
        if(err){
            console.log("Error getting a user from the database: ", err);
            res.send(err);
        } else {
            console.log("User retrieved from the database: ", data);
            res.send(data);
        }
    });
});

//listen for connections
app.listen(PORT, (err)=>{
    if(err) {
        console.log("Error starting server: ", err);
    } else {
        console.log("Server started on port ", PORT);
    }
})