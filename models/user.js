const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");


// User Schemea
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
});

const User = module.exports = mongoose.model('User', UserSchema);

//module.exports allows us to access "getUserByID" from the outside
module.exports.getUserByID = (id, callback) => {
    //findByID is a mongoose func
    User.findById(id, callback);
}

module.exports.getUserByUsername = (username, callback) => {
    const query = {username : username}
    User.findOne(query, callback);
}

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
       bcrypt.hash(newUser.password, salt, (err, hash) => {
           if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
       });
   });
}