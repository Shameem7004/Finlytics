// import dotenv from "dotenv";
import "dotenv/config"
import app from "./app.js";
import prisma from "./config/prisma.js";

// dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await prisma.$connect();
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

startServer();