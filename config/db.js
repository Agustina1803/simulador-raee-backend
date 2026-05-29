import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI_SIMULADOR;

if (!uri) {
  throw new Error("La variable MONGO_URI_SIMULADOR no está definida en el archivo .env");
}

mongoose.connect(uri, {
  dbName: "test",
})
  .then(() => console.info("✅ Conectado a MongoDB Atlas - DB: test"))
  .catch((error) => console.error("❌ Error al conectar a MongoDB:", error.message));

export default mongoose;
