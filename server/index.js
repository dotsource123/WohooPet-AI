// index.js or server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/user.js";
import petRoutes from "./routes/pet.js";
import travelRoutes from "./routes/travelRoutes.js";
import articleRoutes from "./routes/articles.js"; 
import aiHealthRouter from "./routes/ai-health.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/pet", petRoutes);
app.use("/api/travel", travelRoutes);
app.use("/api/articles", articleRoutes); 
app.use("/api/ai-health", aiHealthRouter);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));