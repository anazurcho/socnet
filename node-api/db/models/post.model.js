// file for connection to mongoDB
const mongoose = require( 'mongoose' );

const PostSchema = new mongoose.Schema( {
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    content: {
        type: String,
        required: true,
        minlength: 1
    }, 
    rating:{
        default:0,
        type: Number
    }

    // _userId: {
    //     type: mongoose.Types.ObjectId,
    //     required: True
    // }
})

const Post = mongoose.model( 'Post', PostSchema );
module.exports = { Post }


