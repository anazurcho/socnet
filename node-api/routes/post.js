const router = require( 'express' ).Router();
const {
    Post
} = require( '../db/models' );


router.get( '/posts', ( req, res ) => {
    // get post list from database
    // Post.find( {} ).then( ( posts ) => {
    //     res.send( posts );
    // } );
    Post.find( {} ).then( ( posts ) => {
        res.send( posts );
    } ).catch( ( e ) => {
        res.send( e );
    } )
} );

router.post( '/posts', ( req, res ) => {
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

router.patch( '/posts/:id', ( req, res ) => {
    // update post later with id 
    console.log( req.body )
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

router.patch( '/posts/:id/addlike', ( req, res ) => {
    Post.findOneAndUpdate( {
        _id: req.params.id
    }, {

    } )
} )

router.delete( '/posts/:id', async ( req, res ) => {
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
    } catch ( e ) {
        console.log( e )
    }
    res.send( {
        'message': 'deleted successfully'
    } );

} );

router.delete( '/posts', async ( req, res ) => {
    // delete full post
    try {
        await Post.deleteMany( {} );
    } catch ( e ) {
        console.log( e )
    }
    res.send( {
        'message': 'deleted successfully'
    } );

} );

module.exports = router;