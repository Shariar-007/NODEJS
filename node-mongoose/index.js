mongoose = require('mongoose');

Dishes = require('./models/dishes');

url = 'mongodb://localhost:27017/conFusion';

connect = mongoose.connect(url);
connect.then((db) => {

    console.log('Connected correctly to server');

    // ===>> Mongoose Part 1

    // var newDish = Dishes({
    //     name: 'Uthappizza',
    //     description: 'test'
    // });

    // newDish.save().then((dish) => {
    //         console.log(dish);

    //         return Dishes.find({}).exec();
    //     })
    //     .then((dishes) => {
    //         console.log(dishes);

    //         return Dishes.remove({});
    //     })
    //     .then(() => {
    //         return mongoose.connection.close();
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    // ===>> Mongoose Part 2
    // Dishes.create({
    //         name: 'Uthappizza',
    //         description: 'test'
    //     })
    //     .then((dish) => {
    //         console.log(dish);
    //         return Dishes.find({}).exec();
    //     })
    //     .then((dishes) => {
    //         console.log(dishes);
    //         return Dishes.remove({});
    //     })
    //     .then(() => {
    //         return mongoose.connection.close();
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    // ===>> Mongoose Part 3
    Dishes.create({
            name: 'Uthappizza',
            description: 'test'
        })
        .then((dish) => {
            console.log(dish);

            return Dishes.findByIdAndUpdate(dish._id, { $set: { description: 'Updated test' } }, {
                    new: true
                })
                .exec();
        })
        .then((dish) => {
            console.log(dish);

            dish.comments.push({
                rating: 5,
                comment: 'I\'m getting a sinking feeling!',
                author: 'Leonardo di Carpaccio'
            });

            return dish.save();
        })
        .then((dish) => {
            console.log(dish);

            return Dishes.remove({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });
});