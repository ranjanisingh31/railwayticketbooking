const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookingSchema = new Schema({
    numberOfSeats: Number,
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model(
    "bookingDetail",
    bookingSchema,
    "bookingDetails"
);
