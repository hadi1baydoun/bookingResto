import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import tablesRoute from "./routes/tables.js";
import restoRoute from "./routes/resto.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import resto from "./routes/resto.js"
dotenv.config(); // Load .env variables

const app = express();

// Use environment variables
const PORT = process.env.PORT || 8000; // Default to 8000 if PORT is not set
const MONGO_URL = process.env.MONGO_URL;

const connect = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        throw error;
    }
};




app.use(express.json())

// middlewares

app.use("/api/restos", resto);


app.use(cookieParser())
app.use(cors())

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/resto", restoRoute);
app.use("/api/tables", tablesRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong !"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})




// Start the server and connect to MongoDB
app.listen(PORT, () => {
    connect();
    console.log(`Server is running on port ${PORT}.`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
