import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import testRoutes from "./dev/test.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// health check route of the server
app.get("/", (req, res) => {
    res.send("Finlytics backend API is running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);

export default app;