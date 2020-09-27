const express = require( 'express' );
const app = express();

const {
    mongoose
} = require( './db/mongoose' );

const bodyParser = require( 'body-parser' );

app.use( bodyParser.json() );
// to load dffb
const {
    Post,
    User
} = require( './db/models' );
const jwt = require( 'jsonwebtoken' );

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


app.get( '/posts', ( req, res ) => {
    // get post list from database
    // Post.find( {} ).then( ( posts ) => {
    //     res.send( posts );
    // } );
    Post.find({}).then((posts)=>{
        res.send(posts);
    }).catch((e)=>{
        res.send(e);
    })
} );

app.post( '/posts', ( req, res ) => {
    // add new post in list included id
    let title = req.body.title;
    let content = req.body.content;

    let newPost = new Post( {
        title,
        content
    } );
    newPost.save().then( ( postDoc ) => {
        // მთლიანი სია პოსტების წამოვა დამატების მერე აიდიებიაანა
        res.send( postDoc );
    } )

} );

app.patch( '/posts/:id', ( req, res ) => {
    // update post later with id 
    console.log(req.body)
    Post.findOneAndUpdate( {
        _id: req.params.id,
        // _userId: req.user_id
    }, {
        $set: req.body
    } ).then( () => {
        res.send( {
            'message': 'updated successfully'
        } );
    } );
} );
app.patch('/posts/:id/addlike',(req,res)=>{
    Post.findOneAndUpdate({
        _id:req.params.id
    },{
        
    })
})

app.delete( '/posts/:id', async ( req, res ) => {
    // delete post later with id 
    try {
        Post.findOneAndRemove( {
        _id: req.params.id,
        // _userId: req.user_id
    } ).then( ( removedPostDoc ) => {
        res.send( removedPostDoc );
        res.send( {
            'message': 'deleted successfully'
        } );
    } )
    }
    catch(e) {
        console.log(e)
    }
    res.send( {
            'message': 'deleted successfully'
    } );

} );

app.delete( '/posts', async ( req, res ) => {
    // delete full post
    try {
        await Post.deleteMany({});
    }
    catch(e){
        console.log(e)
    }
    res.send( {
            'message': 'deleted successfully'
        } );
    
});

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