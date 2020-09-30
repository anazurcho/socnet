// file for connection to mongoDB
const mongoose = require( 'mongoose' );

const UserSchema = new mongoose.Schema( {
    name: {
        type: String,
        // required: true,
        minlength: 1
    },
    email: {
            type: String,
            required: true,
            unique: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    
} )

const User = mongoose.model( 'User', UserSchema );
module.exports = {
    User
}