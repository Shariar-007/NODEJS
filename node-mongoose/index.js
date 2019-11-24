mongoose = require('mongoose');

Dishes = require('./models/dishes');

url = 'mongodb://localhost:27017/conFusion';

connect = mongoose.connect(url);
connect.then((db) => {

    console.log('Connected correctly to server');

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

    // another way
    Dishes.create({
            name: 'Uthappizza',
            description: 'test'
        })
        .then((dish) => {
            console.log(dish);
            return Dishes.find({}).exec();
        })
        .then((dishes) => {
            console.log(dishes);
            return Dishes.remove({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });

});