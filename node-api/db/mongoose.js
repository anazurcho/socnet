// file for connection to mongoDB
const mongoose = require( 'mongoose' );

mongoose.Promise = global.Promise;
mongoose.connect( 'mongodb://localhost:27017/TaskManager', {
    useNewUrlParser: true
} ).then( () => {
    console.log( "Connected to db  :)" );
} ).catch( ( e ) => {
    console.log( "Error while connecting db" );
    console.log( e );
} );

// mongoose.set('UseCreateIndex', true);
// mongoose.set('UseFindAndModify', false);
module.exports = {
    mongoose
};