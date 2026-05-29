import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/index.routes.js"; 

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
