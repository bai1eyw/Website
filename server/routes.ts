import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  setupAuth(app);

  app.get("/api/products", async (_req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.post("/api/create-checkout-session", async (req, res) => {
    const { items } = req.body;

    try {
      const line_items = items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(parseFloat(item.price) * 100),
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${req.headers.origin}/order-status?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
      });

      res.json({ url: session.url });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/checkout-session/:id", async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.retrieve(req.params.id, {
        expand: ["line_items"],
      });

      if (session.payment_status === "paid" && session.metadata?.processed !== "true") {
        const lineItems = session.line_items?.data || [];
        for (const item of lineItems) {
          const allProducts = await storage.getProducts();
          const product = allProducts.find(p => p.name === item.description);
          
          if (product && product.stock !== undefined) {
            // Deduct the quantity purchased from the stock
            const quantityPurchased = item.quantity || 0;
            const newStock = Math.max(0, product.stock - quantityPurchased);
            await storage.updateProductStock(product.id, newStock);
          }
        }
        
        await stripe.checkout.sessions.update(req.params.id, {
          metadata: { processed: "true" }
        });
      }

      res.json({ status: session.payment_status });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/feedback", async (_req, res) => {
    const feedback = await storage.getFeedback();
    res.json(feedback);
  });

  app.post("/api/feedback", async (req, res) => {
    const f = await storage.createFeedback({
      ...req.body,
    });
    res.status(201).json(f);
  });

  return httpServer;
}
