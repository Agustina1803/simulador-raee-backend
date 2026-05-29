import { Router } from "express";
import simulacionRoutes from "./simulacion.routes.js";

const router = Router();


router.use("/simulacion", simulacionRoutes);

export default router;
