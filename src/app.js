import express from "express";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// health check route of the server
app.get("/", (req, res) => {
    res.send("Finlytics backend API is running...");
});

export default app;