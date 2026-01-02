import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  setupAuth(app);

  app.get("/api/products", async (_req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.post("/api/products/purchase", async (req, res) => {
    const { items } = req.body;
    if (!Array.isArray(items)) return res.status(400).send("Invalid items");

    try {
      const results = await Promise.all(
        items.map(item => storage.updateProductStock(item.id, item.quantity))
      );
      res.json(results);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  });

  app.get("/api/feedback", async (_req, res) => {
    const feedback = await storage.getFeedback();
    res.json(feedback);
  });

  app.post("/api/feedback", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const f = await storage.createFeedback({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json(f);
  });

  return httpServer;
}
