mongoose = require('mongoose');
Schema = mongoose.Schema;



favoritesScema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dish'
    }]
}, {
    timestamps: true
});


var Favorites = mongoose.model('Favorites', favoritesScema);

module.exports = Favorites;