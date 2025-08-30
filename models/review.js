const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
    comment: {
        type: String,
        required: [true, "Review comment cannot be empty."]
    },
    rating: {
        type: Number,
        min: [1, "Rating must be at least 1."],
        max: [5, "Rating cannot exceed 5."],
        required: [true, "Rating is required."]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});


module.exports = model("Review", reviewSchema);
