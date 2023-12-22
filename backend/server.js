import express from "express";
import dotenv from "dotenv";
// importing routes
import userRoutes from "./routes/userRoutes.js";
// importing Middlewaer
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
// importing DB
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is ready");
});

// routes
app.use("/api/v1/users", userRoutes);

// middleware
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 8000;
    const local_ip = process.env.LOCAL_IP || `0.0.0.0`;

    app.listen(port, local_ip, () => {
      console.log(`Server is running on port ${local_ip}:${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process with an error code of 1 (failure)
  }
};

startServer();
