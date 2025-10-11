const mongoose = require('mongoose');
const { startTransition } = require('react');

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Enter book is required"],
        unique: true,
        trim: true,
        maxlength: 200,
        lowercase: true
    },

    author: String,
    price: {
        type: Number,
        required: [true, "Book price is required"],
        min: [0, "Price cannot be negative"]
    },
    rating: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Book", bookSchema)