import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.middlewares();
  }

  middlewares() {
    this.app.use(async (req, res, next) => {
      try {
        await connectDB();
        next();
      } catch (error) {
        console.error("Error connecting to DB:", error);
        res.status(500).json({ message: "Database connection error" });
      }
    });

    this.app.use(
      cors({
        origin: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      })
    );
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    console.log(__filename);
    console.log(__dirname);
    this.app.use(express.static(path.join(__dirname, "../public")));

    this.app.get("/", (req, res) => {
      res.send("Backend Estudio Jurídico funcionando");
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.info(`server inciiado: http://127.0.0.1:${this.port}`);
    });
  }
}
