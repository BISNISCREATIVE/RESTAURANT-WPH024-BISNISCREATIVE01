import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Mount mock API under /api
  // Note: mock routes implement endpoints like /api/auth/register, /api/resto, /api/resto/recommended, /api/orders, etc.
  const { handleMockApi } = require("./routes/mockApi");
  app.use("/api", handleMockApi);

  return app;
}
