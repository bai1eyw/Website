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

  app.get("/api/feedback", async (_req, res) => {
    const feedback = await storage.getFeedback();
    res.json(feedback);
  });

  app.post("/api/orders", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const { items, total } = req.body;
    
    const order = await storage.createOrder({
      userId: req.user.id,
      total: total.toString(),
      status: "pending"
    }, items);
    
    res.status(201).json(order);
  });

  // Seed products
  const PRODUCTS_SEED = [
    {
      name: "Donut SMP Money 1m",
      description: "Join our Discord server. Open a ticket and provide your email and order...",
      price: "0.10",
      category: "Donut",
      image: "https://imagedelivery.net/HL_Fwm__tlvUGLZF2p74xw/ecdd28c1-58ae-46e1-e26e-8cafda67a700/public",
      stock: 50,
      features: ["Instant Delivery", "Secure Transaction", "1m In-game Money"]
    },
    {
      name: "Skeleton Spawner",
      description: "Join our Discord server. Open a ticket and provide your email and order...",
      price: "0.12",
      category: "Donut",
      image: "https://imagedelivery.net/HL_Fwm__tlvUGLZF2p74xw/1d51c0ff-d8d1-4c15-9d97-ff8b779ab400/public",
      stock: 20,
      features: ["Automatic Farm Compatible", "Infinite Skeletons"]
    }
  ];
  await storage.seedProducts(PRODUCTS_SEED as any);

  return httpServer;
}
