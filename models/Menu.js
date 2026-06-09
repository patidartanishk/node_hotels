const mongoose = require('mongoose');

const menuiteamSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ['sweet','spicy','sour']
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    ingredients: {
        type: [String],
        default: []
    },
    num_sold: {
        type: Number,
        default: 0
    }
})

const menuiteam = mongoose.model('menuiteam',menuiteamSchema);
module.exports = menuiteam;