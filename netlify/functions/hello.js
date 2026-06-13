const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
        console.log("Using cached database connection");
        return cachedDb;
    }

    try {
        const db = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        cachedDb = db;
        console.log("New database connection established");
        return db;
    } catch (error) {
        console.error("Database connection failed", error);
        throw new Error("Database connection failed");
    }
}

exports.handler = async (event, context) => {
    try {
        await connectToDatabase();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Connected to MongoDB Atlas!" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
