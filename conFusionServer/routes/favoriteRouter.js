const user = require('../models/user');

express = require('express');
bodyParser = require('body-parser');
mongoose = require('mongoose');
cors = require('./cors');
authenticate = require('../authenticate');
Favorites = require('../models/favorites');
Users = require('../models/user');

favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());


favoriteRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        // if(req)
        Favorites.find({
                user: req.user._id
            })
            .populate('user')
            .populate('dishes')
            .then((favorite) => {
                if (favorite != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);

                } else {
                    err = new Error('Favorite list of ' + req.user._id + ' is empty.');
                    err.status = 404;
                    return next(err);
                }
            })
    })

.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({
            user: req.user._id
        })
        .then((favorite) => {
            if (favorite) {
                // console.log(favorite);
                // console.log(req.body.dishes);
                req.body.dishes.forEach(item => {
                    // console.log(favorite.dishes.indexOf(item));
                    // console.log(item);
                    if (favorite.dishes.indexOf(item) == -1) {
                        favorite.dishes.push(item);
                    }
                });
                favorite.save()
                    .then((favorite) => {
                        console.log('New item inserted.');
                        // if you dont want to show detail as a response then uncomment below code and comment out the below block
                        // =========================================================
                        // res.statusCode = 200;
                        // res.setHeader('Content-Type', 'application/json');
                        // res.json(favorite);
                        // =========================================================

                        // if you want to show the detail response then use this block 
                        // =========================================================
                        Favorites.findById(favorite._id)
                            .populate('user')
                            .populate('dishes')
                            .then((fav) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(fav);
                                // console.log(fav);
                            });
                        // =========================================================
                    });

            } else {
                req.body.user = req.user._id;
                console.log(req.body);
                Favorites.create(req.body)
                    .then((favorite) => {
                        console.log('Favorite List Created ');
                        // if you dont want to show detail as a response then uncomment below code and comment out the below block
                        // =========================================================
                        // res.statusCode = 200;
                        // res.setHeader('Content-Type', 'application/json');
                        // res.json(favorite);
                        // =========================================================

                        // if you want to show the detail response then use this block 
                        // =========================================================
                        Favorites.findById(favorite._id)
                            .populate('user')
                            .populate('dishes')
                            .then((fav) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(fav);
                                // console.log(fav);
                            }, (err) => next(err))
                            .catch((err) => next(err));
                        // =========================================================
                    });
            }
        })
})


.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})

.delete(cors.corsWithOptions, authenticate.verifyUser, function(req, res, next) {
    Favorites.remove({
        'user': req.user._id
    }, function(err, resp) {
        if (err) throw err;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    });
});

favoriteRouter.route('/:dishId')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Favorites.find({
                'user': req.user._id
            })
            .populate('user')
            .populate({
                path: 'dishes',
                match: {
                    _id: req.params.dishId
                }
            })
            .then(favorite => {
                // console.log(favorite);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            });
    })

.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({
            user: req.user._id
        })
        .then(favorite => {
            if (favorite) {
                if (favorite.dishes.indexOf(req.params.dishId) == -1) {
                    favorite.dishes.push(req.params.dishId);

                    favorite.save()
                        .then((favorite) => {
                            console.log('New item inserted.');
                            // if you dont want to show detail as a response then uncomment below code and comment out the below block
                            // =========================================================
                            // res.statusCode = 200;
                            // res.setHeader('Content-Type', 'application/json');
                            // res.json(favorite);
                            // =========================================================

                            // if you want to show the detail response then use this block 
                            // =========================================================
                            Favorites.findById(favorite._id)
                                .populate('user')
                                .populate('dishes')
                                .then((fav) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(fav);
                                    // console.log(fav);
                                });
                            // =========================================================
                        });
                } else {
                    err = new Error('Dish ' + req.params.dishId + ' already exists');
                    err.status = 409;
                    return next(err);
                }

            } else {
                req.body.user = req.user._id;
                req.body.dishes = [req.params.dishId];
                // console.log(req.body);
                Favorites.create(req.body)
                    .then((favorite) => {
                        console.log('Favorite List Created ');
                        // if you dont want to show detail as a response then uncomment below code and comment out the below block
                        // =========================================================
                        // res.statusCode = 200;
                        // res.setHeader('Content-Type', 'application/json');
                        // res.json(favorite);
                        // =========================================================

                        // if you want to show the detail response then use this block 
                        // =========================================================
                        Favorites.findById(favorite._id)
                            .populate('user')
                            .populate('dishes')
                            .then((fav) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(fav);
                                // console.log(fav);
                            }, (err) => next(err))
                            .catch((err) => next(err));
                        // =========================================================
                    });

            }
        });
})


.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ 'user': req.user._id })
        .then(favorite => {
            // console.log(favorite);
            if (favorite) {
                if (favorite.dishes.indexOf(req.params.dishId) > -1) {
                    favorite.dishes.remove(req.params.dishId);
                    favorite.save()
                        .then(favorite => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite);
                        });

                } else {
                    err = new Error('Dish ' + req.params.dishId + ' No Found');
                    err.status = 404;
                    return next(err);
                }
            } else {
                err = new Error('Favorite list is empty.');
                err.status = 404;
                return next(err);
            }

        });
})


// ===========================================================================================================
// this is alternate way of get post put and delete call but having some issue getting an extra value of null
// ===========================================================================================================


// favoriteRouter.route('/')
//     .options(cors.corsWithOptions, (req, res) => {
//         res.sendStatus(200);
//     })
//     .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
//         Favorites.find({
//                 user: req.user._id
//             })
//             .populate('user')
//             .populate('dishes')
//             .then((favorite) => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(favorite);
//             })
//     })

// .post(cors.corsWithOptions, authenticate.verifyUser, function(req, res, next) {
//     Favorites.findOne({
//         'user': req.user._id
//     }, function(err, favorite) {
//         if (err) throw err;
//         if (!favorite) {
//             Favorites.create(req.body, function(err, favorite) {
//                 if (err) throw err;
//                 console.log('Favorite created!');
//                 favorite.user = req.user._id;
//                 favorite.dishes.push(req.body._id);
//                 favorite.save(function(err, favorite) {
//                     if (err) throw err;
//                     res.statusCode = 200;
//                     res.setHeader('Content-Type', 'application/json');
//                     res.json(favorite);
//                 });
//             });
//         } else {
//             var dish = req.body._id;

//             if (favorite.dishes.indexOf(dish) == -1) {
//                 favorite.dishes.push(dish);
//             }
//             favorite.save(function(err, favorite) {
//                 if (err) throw err;
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(favorite);
//             });
//         }
//     });
// })

// .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /favorites');
// })

// .delete(cors.corsWithOptions, authenticate.verifyUser, function(req, res, next) {
//     Favorites.remove({
//         'user': req.user._id
//     }, function(err, resp) {
//         if (err) throw err;
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(resp);
//     });
// });


// favoriteRouter.route('/:dishId')
//     .options(cors.corsWithOptions, (req, res) => {
//         res.sendStatus(200);
//     })
//     .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
//         Favorites.find({
//             'user': req.user._id
//         }, function(err, favorites) {
//             var favorite = favorites ? favorites[0] : null;
//             if (favorite) {
//                 var flag = false;
//                 for (var i = (favorite.dishes.length - 1); i >= 0; i--) {
//                     if (favorite.dishes[i] == req.params.dishId) {
//                         flag = true;
//                         Dishes.findById(req.params.dishId)
//                             .then((dish_) => {
//                                 Users.findById(req.user._id)
//                                     .then(user_ => {
//                                         res.statusCode = 200;
//                                         res.setHeader('Content-Type', 'application/json');
//                                         res.json({ dishe: dish_, user: user_ });
//                                     })
//                             })
//                     }
//                 }
//                 if (flag == false) {
//                     err = new Error('Dish ' + req.params.dishId + ' is not found.');
//                     err.status = 404;
//                     return next(err);
//                 }
//             } else {
//                 err = new Error('NOT FOUND');
//                 err.status = 404;
//                 return next(err);
//             }
//         })
//     })

// .post(cors.corsWithOptions, authenticate.verifyUser, function(req, res, next) {
//     Favorites.findOne({
//         'user': req.user._id
//     }, function(err, favorite) {
//         if (err) throw err;
//         if (!favorite) {
//             Favorites.create(function(err, favorite) {
//                 if (err) throw err;
//                 console.log('Favorite created!');
//                 favorite.user = req.user._id;
//                 favorite.dishes.push(req.params.dishId);
//                 favorite.save(function(err, favorite) {
//                     if (err) throw err;
//                     res.statusCode = 200;
//                     res.setHeader('Content-Type', 'application/json');
//                     res.json(favorite);
//                 });
//             });
//         } else {
//             if (favorite.dishes.indexOf(req.params.dishId) == -1) {
//                 favorite.dishes.push(dishId);
//             }
//             favorite.save(function(err, favorite) {
//                 if (err) throw err;
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(favorite);
//             });
//         }
//     });
// })

// .delete(cors.corsWithOptions, authenticate.verifyUser, function(req, res, next) {
//     Favorites.find({
//         'user': req.user._id
//     }, function(err, favorites) {
//         var favorite = favorites ? favorites[0] : null;
//         if (favorite) {
//             for (var i = (favorite.dishes.length - 1); i >= 0; i--) {
//                 if (favorite.dishes[i] == req.params.dishId) {
//                     favorite.dishes.remove(req.params.dishId);
//                 }
//             }
//             favorite.save((err, favorite) => {
//                 if (err) {
//                     err = new Error('Dish ' + req.params.dishId + ' is not found.');
//                     err.status = 404;
//                     return next(err);
//                 }
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(favorite);
//             });
//         } else {
//             err = new Error('NOT FOUND');
//             err.status = 404;
//             return next(err);
//         }
//     })
// });


module.exports = favoriteRouter;