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
            minlength: 1,
            trim: true,
            unique: true
        },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    sessions: [ {
        token: {
            type: String,
            // required: true
        },
        expiresAt: {
            type: Number,
            required: true
        }
    } ],
    authentificated:{
        type:Boolean,
        default:false,
    }
} )

const User = mongoose.model( 'User', UserSchema );
module.exports = {
    User
}