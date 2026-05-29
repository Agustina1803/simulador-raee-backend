import express from "express";
import { ejecutarSimulacion } from "../controllers/simulacionController.js";
import Simulacion from "../models/simulacion.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Ruta válida. Usa POST /api/simulacion para ejecutar la simulación y GET /api/simulacion/historial para ver el historial.",
  });
});

router.post("/", async (req, res) => {
  try {
    const { teclados, mouses, meses, aleatoria } = req.body;
    const resultados = await ejecutarSimulacion(teclados, mouses, meses, aleatoria);
    res.json(resultados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/historial", async (req, res) => {
  try {
    const historial = await Simulacion.find().sort({ createdAt: -1 });
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
