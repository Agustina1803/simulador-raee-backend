import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB;

if (!uri) {
  throw new Error("La variable MONGODB no está definida en el archivo .env");
}

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(uri);
    console.info("Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    throw error;
  }
};

export default connectDB;