mongoose = require('mongoose');
Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
Currency = mongoose.Types.Currency;

promotionScema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
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

var Promotions = mongoose.model('Promotion', promotionScema);

module.exports = Promotions;