import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.route.js";
import sendRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";

const app = express();

const PORT = ENV.PORT || 3000;
app.use(express.json()); // for req.body

// getting the correct directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//routes
app.use("/api/auth", authRoutes);
app.use("/api/message", sendRoutes);

//global error handler middleware for handling err from the controllers
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || "Internal Server Error",
    ...(ENV.NODE_ENV === "development" && { stack: err.stack }), // include stack trace in development mode
  });
});

// Serve static files in production (deployment) from the backend
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  // For any other route, serve the index.html file
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  connectDB();
});
