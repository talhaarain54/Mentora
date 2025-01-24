const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        const response = await mongoose.connect(process.env.DB_CONNECT_URI);
        console.log("Connected to the database");
    } catch (error) {
        console.log("database connection error: ", error);
        
    }
}

module.exports = connectDatabase;