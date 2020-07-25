const mongoose = require("mongoose");
MONGO_URI = "mongodb+srv://ranjani:abc@db.r5rbu.mongodb.net/trainTickets?retryWrites=true&w=majority";
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;
