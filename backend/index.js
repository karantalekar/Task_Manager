import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/task.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on http://localhost:5000`)
);
