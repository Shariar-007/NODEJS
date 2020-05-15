var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// for normal user authentication
var User = new Schema({
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    }
});

// for passport-based user authentication it has by default name and password fields thats why we don't write 
// name and password within it
// var User = new Schema({
//     admin: {
//         type: Boolean,
//         default: false
//     }
// });
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);