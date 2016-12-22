var mongoose = require('mongoose');

// create a user schema and model
var exerciseSchema = mongoose.Schema({
    difficulty : String,
    name : {type:String, unique:true},
    solutions: Array,
    instructions : String,
    answers: Array,
    hint: String,
    type: String,
    rating: Number,
    creator: String,
    comments: Array,
    //id:{type: Number, default: ()=>{return Date().getTime().toString(36)}},
    created: {type: Date, default: ()=>{return Date.now()}} 
});
var Exercise = mongoose.model('Exercise', exerciseSchema);

// we need to module.export the model so we can access it in other js files, like the server
module.exports = Exercise;