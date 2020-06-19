express = require('express');
bodyParser = require('body-parser');
mongoose = require('mongoose');
cors = require('./cors');
authenticate = require('../authenticate');
Favorites = require('../models/favorites');

favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());



favoriteRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Favorites.find({ user: req.user._id })
            .populate('user')
            .populate('dishes')
            .then((favorite) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
    })
    // .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {

//     Favorites.countDocuments({ user: req.user._id })
//         .then((count) => {
//             if (count == 0) {
//                 Favorites.create({ user: rew.user._id })
//                     .then((favorite) => {
//                         favorite.dishes.push(req.body._id);
//                         favorite.save()
//                             .then((favorite) => {
//                                 res.statusCode = 200;
//                                 res.setHeader('Content-Type', 'application/json');
//                                 res.json(favorite);
//                             });
//                     });

//             } else {
//                 Favorites.findOne({ user: rew.user._id })
//                     .then((favorites) => {
//                         if (favorites.dishes.indexOf(req.body._id) > -1) {
//                             console.log('Not Updated Favorites!');
//                             res.json(favorites);
//                         } else {
//                             favorites.dishes.push(req.body._id);
//                             favorites.save()
//                                 .then((favorites) => {
//                                     res.statusCode = 200;
//                                     res.setHeader('Content-Type', 'application/json');
//                                     res.json(favorites);
//                                 });
//                         }
//                     });
//             }
//         }, (err) => next(err))
//         .catch((err) => next(err));

// })

.post(cors.corsWithOptions, authenticate.verifyUser, function(req, res, next) {
    Favorites.findOne({ 'user': req.user._id }, function(err, favorite) {
        if (err) throw err;
        if (!favorite) {
            Favorites.create(req.body, function(err, favorite) {
                if (err) throw err;
                console.log('Favorite created!');
                favorite.user = req.user._id;
                favorite.dishes.push(req.body._id);
                favorite.save(function(err, favorite) {
                    if (err) throw err;
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                });
            });
        } else {
            var dish = req.body._id;

            if (favorite.dishes.indexOf(dish) == -1) {
                favorite.dishes.push(dish);
            }
            favorite.save(function(err, favorite) {
                if (err) throw err;
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            });
        }
    });
})

.delete(cors.corsWithOptions, authenticate.verifyUser, function(req, res, next) {
    Favorites.remove({ 'user': req.user._id }, function(err, resp) {
        if (err) throw err;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    });
});

// .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.varifyAdmin, (req, res, next) => {
//         res.statusCode = 403;
//         res.end('PUT operation not supported on /dishes');
//     })
//     .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.varifyAdmin, (req, res, next) => {
//         Favorites.user.id(req.user._id).remove()
//             .then((resp) => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(resp);
//             }, (err) => next(err))
//             .catch((err) => next(err));
//     });

module.exports = favoriteRouter;