const router = require( 'express' ).Router();
const {
    User
} = require( '../db/models' );
const bcrypt = require( "bcrypt" );
const jwt = require( "jsonwebtoken" );


router.post( "/register",   ( req, res, next ) => {
    User.find( {
            email: req.body.email
        } )
        .exec()
        .then( user => {
            if ( user.length >= 1 ) {
                return res.status( 409 ).json( {
                    message: "Mail exists"
                } );
            } else {
                bcrypt.hash( req.body.password, 10, ( err, hash ) => {
                    if ( err ) {
                        return res.status( 500 ).json( {
                            error: err
                        } );
                    } else {
                        const user = new User( {
                            email: req.body.email,
                            password: hash
                        } );
                        user
                            .save()
                            .then( result => {
                                console.log( result );
                                res.status( 201 ).json( {
                                    message: "User created"
                                } );
                            } )
                            .catch( err => {
                                console.log( err );
                                res.status( 500 ).json( {
                                    error: err
                                } );
                            } );
                    }
                } );
            }
        } );
} );

router.post( "/login",  ( req, res, next ) => {
    User.find( {
            email: req.body.email
        } )
        .exec()
        .then( user => {
            if ( user.length < 1 ) {
                return res.status( 401 ).json( {
                    message: "Auth failed"
                } );
            }
            bcrypt.compare( req.body.password, user[ 0 ].password, ( err, result ) => {
                if ( err ) {
                    return res.status( 401 ).json( {
                        message: "Auth failed"
                    } );
                }
                if ( result ) {
                    // const token = jwt.sign( {
                    //         email: user[0].email,
                    //         userId: user[0]._id
                    //     },
                    //     process.env.JWT_KEY, {
                    //         expiresIn: "1h"
                    //     }
                    // );
                    return res.status(200).json( {
                        message: "Auth successful",
                        token: `tokenFor${req.body.email}"`                    } );
                }
                res.status( 401 ).json( {
                    message: "Auth failed"
                } );
            } );
        } )
        .catch( err => {
            console.log( err );
            res.status( 500 ).json( {
                error: err
            } );
        } );
} );







// router.post( '/login', ( req, res ) => {
//     let email = req.body.email;
//     let password = req.body.password;

//     let loginUser = new User( {
//         email,
//         password
//     } )
//     if ( User.count( {
//             email: email,
//             password: password
//         } ) ) {
//         User.count( {
//             email: email,
//             password: password
//         }, {
//             $set: req.body
//         } ).then( () => {
//             res.send( {
//                 'message': 'updated successfully'
//             } );
//         } );

//         res.send( {
//             'message': 'cannot login'
//         } );
//     } else {
//         res.send( {
//             'message': 'cannot access'
//         } )
//     }

// } )

router.get( '/users', ( req, res ) => {
    User.find( {} ).then( ( users ) => {
        res.send( users );
    } ).catch( ( e ) => {
        res.send( e );
    } )
} )

router.delete( '/users', async ( req, res ) => {
    try {
        await User.deleteMany( {} );
    } catch ( e ) {
        res.send( e );
    }
    res.send( {
        'message': 'deleted successfully'
    } );
} )

router.delete( '/users/:id', async ( req, res ) => {
    try {
        await User.findByIdAndDelete({
            _id:req.params.id
        });
    } catch ( e ) {
        res.send( e );
    }
    res.send( {
        'message': 'deleted successfully'
    } );
} )


module.exports = router;