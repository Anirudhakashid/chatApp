import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { MONGODB_URI } = process.env;
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    const conn = await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Connected Successfully:", conn.connection.host);
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
    process.exit(1); // 1 -> failed, 0 -> success
  }
};
