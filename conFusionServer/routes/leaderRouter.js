express = require('express');
bodyParser = require('body-parser');

mongoose = require('mongoose');
Leaders = require('../models/leaders');

leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

// leaderRouter.route('/')
//     .all((req, res, next) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/plain');
//         next();
//     })
//     .get((req, res, next) => {
//         res.end('Will send all the leaders to you!');
//     })
//     .post((req, res, next) => {
//         res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
//     })
//     .put((req, res, next) => {
//         res.statusCode = 403;
//         res.end('PUT operation not supported on /leaders');
//     })
//     .delete((req, res, next) => {
//         res.end('Deleting all leaders');
//     });

// leaderRouter.route('/:id')
//     .all((req, res, next) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/plain');
//         next();
//     })
//     .get((req, res, next) => {
//         res.end('Will send details of the leader: ' + req.params.id + ' to you!');
//     })
//     .post((req, res, next) => {
//         res.statusCode = 403;
//         res.end('POST operation not supported on /leader/' + req.params.id);
//     })
//     .put((req, res, next) => {
//         res.write('Updating the leader: ' + req.params.id + '\n');
//         res.end('Will update the leader: ' + req.body.name + ' with details: ' + req.body.description);
//     })
//     .delete((req, res, next) => {
//         res.end('Deleting leader: ' + req.params.id);
//     });
leaderRouter.route('/')
    .get((req, res, next) => {
        Leaders.find({})
            .then((leaders) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leaders);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Leaders.create(req.body)
            .then((leader) => {
                console.log('Leader Created ', leader);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /leaders');
    })
    .delete((req, res, next) => {
        Leaders.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


leaderRouter.route('/:id')
    .get((req, res, next) => {
        Leaders.findById(req.params.id)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /leader/' + req.params.id);
    })
    .put((req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Leaders.findByIdAndRemove(req.params.id)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = leaderRouter;