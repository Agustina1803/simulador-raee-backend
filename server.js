import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import simulacionRouter from "./routes/simulacion.routes.js";

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

   
    this.connectDatabase();

   
    this.middlewares();

   
    this.routes();
  }

  async connectDatabase() {
    try {
      await connectDB();
      console.log("✅ Conectado a la base de datos");
    } catch (error) {
      console.error("❌ Error al conectar DB:", error);
      process.exit(1); 
    }
  }

  middlewares() {
    
    const allowedOrigins = [
      "http://localhost:3000", 
      "https://simuladorraee2026.netlify.app" 
    ];

this.app.use(cors({
  origin: "https://simuladorraee2026.netlify.app",
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"]
}));
this.app.options("*", cors());

   
    this.app.use(morgan("dev"));

    
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

   
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  routes() {
    this.app.get("/", (req, res) => {
      res.send("Backend simulador funcionando 🚀");
    });

   this.app.use("/simulacion", simulacionRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.info(`✅ Servidor iniciado en http://127.0.0.1:${this.port}`);
    });
  }
}
