var mongoose = require('mongoose');

// create a user schema and model
var userSchema = mongoose.Schema({
    name : String,
    email: String,
    avatar: String,
    completed : Array,
    creations : Array,
    skipped: Array,
    comments: Array,
    created: {type: Date, default: ()=>{return Date.now()}} 
});
var User = mongoose.model('User', userSchema);

// we need to module.export the model so we can access it in other js files, like the server
module.exports = User;