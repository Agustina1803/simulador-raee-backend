import express from "express";
import { ejecutarSimulacion } from "../controllers/simulacionController.js";
import Simulacion from "../models/Simulacion.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
     console.log("Body recibido:", req.body);
    const { teclados, mouses, meses, aleatoria } = req.body;
    const resultados = await ejecutarSimulacion(teclados, mouses, meses, aleatoria);
    res.json(resultados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/historial", async (req, res) => {
  const historial = await Simulacion.find().sort({ createdAt: -1 });;
  res.json(historial);
});

export default router;