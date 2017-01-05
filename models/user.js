const SALTY_BITS = 10;

var mongoose = require('mongoose');

// create a user schema and model

bcrypt = require('bcryptjs'),
    UserSchema = new mongoose.Schema({
    name:  String,
    email: {
            type: String,
            unique: true
            },
    password: String,
    completed : Array,
    creations : Array,
    skipped: Array,
    comments: Array,
    created: {
            type: Number,
            default: () => Date.now()
            }
 });
UserSchema.pre('save', function(next) { // don't use an arrow function here, we need the scope!
    var user = this; // this is why we can't use an arrow function  here, again we need the scope

    // only hash the password if it has been modified (for updating users)
    if( !user.isModified('password') ) {
        return next();
    }
    // generate a salt value to encrypt our password
    bcrypt.genSalt(SALTY_BITS, (saltErr, salt) => { // used to guarentee uniqueness
        if(saltErr) {
            return next(saltErr);
        }

        console.info('SALT generated!'.yellow, salt);

        // now let's hash this bad boy!
        bcrypt.hash(user.password, salt, (hashErr, hashedPassword) => {
            if( hashErr ) {
                return next(hashErr);
            }
            // over-ride the plain text password with the hashed one
            user.password = hashedPassword;
            next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);