import mongoose from "mongoose";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<void> {
  if (cached.conn) {
    console.log("Already connected to DB");
    return;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: process.env.DB_NAME,
    });
  }

  cached.conn = await cached.promise;
  console.log("✅ DB connected successfully");
}

export default dbConnect;