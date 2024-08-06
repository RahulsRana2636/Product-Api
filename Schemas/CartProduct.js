const mongoose = require('mongoose');

const cartProductSchema = new mongoose.Schema({
    name: String,
    price: String,
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required : true
    },
    quantity: Number,
});

module.exports = mongoose.model("cartproducts", cartProductSchema);