import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import "./config/db.js";

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.middlewares();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.info(`🚀 Servidor iniciado en http://localhost:${this.port}`);
    });
  }
}
