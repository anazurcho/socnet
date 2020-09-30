const express = require( 'express' );
const app = express();

const { mongoose } = require( './db/mongoose' );

const bodyParser = require( 'body-parser' );

app.use( bodyParser.json() );
// to load dffb
const jwt = require( 'jsonwebtoken' );

// import routes
const userRoute = require( './routes/user' );
const postRoute = require( './routes/post' );

// import middlewares
app.use( '', userRoute );
app.use( '', postRoute );

// CORS HEADERS MIDDLEWARE
app.use( function ( req, res, next ) {
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header( "Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE" );
    res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id" );

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
} );

app.post('/register', ( req, res ) =>{
    let email = req.body.email;
    let password = req.body.password;

    let newUser = new User({
        email,
        password
    }) 
    if (User.count({email:email})){
        res.send( {
            'message': 'user exists'
        });
    }else{
        newUser.save().then((postDoc)=>{
        res.send(postDoc);
    })
    }
 
} )

app.post('/login', ( req, res ) =>{
    let email = req.body.email;
    let password = req.body.password;

    let loginUser = new User({
        email,
        password
    }) 
    if (User.count({email:email, password:password})){
        User.count({
                    email: email,
                    password: password
                    }, {
            $set: req.body
        }).then( () => {
            res.send( {
                'message': 'updated successfully'
            } );
        } );
        
        res.send({
            'message': 'cannot login'
        });
    }else{
       res.send({'message':'cannot access'})
    }
     
} )

app.get('/users',(req,res) => {
    User.find( {} ).then( ( users ) => {
        res.send( users );
    } ).catch( ( e ) => {
        res.send( e );
    } )
})


app.listen( 3000, () => {
    console.log( 'Server listens 3000' );
} );