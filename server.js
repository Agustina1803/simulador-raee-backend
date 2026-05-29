import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/index.routes.js";

dotenv.config();

const mongoUri = process.env.MONGO_URI_SIMULADOR;
let mongoConnectionError = null;

if (!mongoUri) {
  console.error("❌ No se encontró MONGO_URI_SIMULADOR. Agrega esa variable de entorno en Vercel o en .env.");
} else {
  mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    dbName: "test",
  })
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => {
    mongoConnectionError = err.message;
    console.error("❌ Error de conexión a MongoDB:", err.message);
  });
}

const app = express();


app.use(cors());
app.use(express.json());

app.get("/api/debug", (req, res) => {
  res.json({
    hasMongoUriEnv: Boolean(process.env.MONGO_URI_SIMULADOR),
    mongooseReadyState: mongoose.connection.readyState,
    mongooseStateText: ["disconnected", "connected", "connecting", "disconnecting"][mongoose.connection.readyState] || "unknown",
    mongoConnectionError,
  });
});

app.use("/api", (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(500).json({
      error: "Aún no hay conexión a la base de datos. Revisa MONGO_URI_SIMULADOR en Vercel.",
    });
  }
  next();
});

app.use("/api", router);


app.get("/", (req, res) => {
  res.send("Servidor funcionando en Vercel 🚀");
});


export default app;
