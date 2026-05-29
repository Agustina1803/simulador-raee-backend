import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/index.routes.js";

dotenv.config();

if (!process.env.MONGO_URI_SIMULADOR) {
  console.error("❌ MONGO_URI no está definido. Agrega la variable de entorno en Vercel o en .env.");
}

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch(err => console.error("❌ Error de conexión a MongoDB:", err));

const app = express();


app.use(cors());
app.use(express.json());


app.use("/api", router);


app.get("/", (req, res) => {
  res.send("Servidor funcionando en Vercel 🚀");
});


export default app;
