import mongoose from "mongoose";

const simulacionSchema = new mongoose.Schema({
  teclados: Number,
  mouses: Number,
  meses: Number,
  reutilizados: Number,
  desmantelados: Number,
  materialesRecuperados: Number,
  porcentajeReutilizacion: String,
  tasaReciclaje: String,
  detalleMateriales: {
    metales: Number,
    plasticos: Number,
    otros: Number,
  },
  informe1: String,
  informe2: String,
  totalTiempoProcesamiento: Number,
  cantidadDeResiduosDescartados: Number,
  esAleatoria: Boolean
}, { timestamps: true });

export default mongoose.model("Simulacion", simulacionSchema);
