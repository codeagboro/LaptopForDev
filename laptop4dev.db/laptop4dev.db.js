const mongoose = require("mongoose")

// connect to the database using mongodb compass
mongoose.set("strictQuery", false)
exports.connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/recipientDB")
        console.log("connected to Laptop4Dev DB")
    } catch (error) {
        console.log(error);
    }
};