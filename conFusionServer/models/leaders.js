mongoose = require('mongoose');
Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
Currency = mongoose.Types.Currency;

leaderScema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        default: ''
    },
    abbr: {
        type: String,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

var Leaders = mongoose.model('Leader', leaderScema);

module.exports = Leaders;