const mongoose = require("mongoose");

const connectDB = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true
    })
    console.log(`mongoDB connected`.cyan.underline.bold)


}
module.exports = connectDB;