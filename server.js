import express from "express";
import cors from "cors";
import mongoose from "mongoose";   
import dotenv from "dotenv";
import dns from "dns";
import simulacionRoutes from "./routes/simulacion.js";

dotenv.config();


dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
app.use(cors());
app.use(express.json());

console.log("Mongo URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error al conectar:", err));

app.use("/api/simulacion", simulacionRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
