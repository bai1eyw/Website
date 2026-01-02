import { users, type User, type InsertUser, products, type Product, type InsertProduct, orders, type Order, type InsertOrder, feedback, type Feedback, type InsertFeedback } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  
  createOrder(order: InsertOrder, items: {productId: string, quantity: number, price: string}[]): Promise<Order>;
  updateProductStock(id: string, newStock: number): Promise<void>;
  seedProducts(products: InsertProduct[]): Promise<void>;
  getOrder(id: string): Promise<Order | undefined>;
  updateOrder(id: string, status: string): Promise<Order>;
  
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  getFeedback(): Promise<Feedback[]>;
  
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new (PostgresSessionStore as any)({
      conObject: {
        connectionString: process.env.DATABASE_URL,
      },
      createTableIfMissing: true,
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createOrder(insertOrder: InsertOrder, items: {productId: string, quantity: number, price: string}[]): Promise<Order> {
    const [order] = await db.insert(orders).values(insertOrder).returning();
    
    for (const item of items) {
      await db.insert(orderItems).values({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      });
      
      const product = await this.getProduct(item.productId);
      if (product && product.stock !== undefined) {
        const newStock = Math.max(0, product.stock - item.quantity);
        await this.updateProductStock(item.productId, newStock);
      }
    }
    
    return order;
  }

  async updateProductStock(id: string, stock: number): Promise<void> {
    await db.update(products).set({ stock }).where(eq(products.id, id));
  }

  async seedProducts(insertProducts: InsertProduct[]): Promise<void> {
    const existing = await this.getProducts();
    if (existing.length === 0) {
      for (const p of insertProducts) {
        await db.insert(products).values(p);
      }
    }
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async updateOrder(id: string, status: string): Promise<Order> {
    const [order] = await db.update(orders).set({ status }).where(eq(orders.id, id)).returning();
    return order;
  }

  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const [f] = await db.insert(feedback).values(insertFeedback).returning();
    return f;
  }

  async getFeedback(): Promise<Feedback[]> {
    return await db.select().from(feedback);
  }
}

export const storage = new DatabaseStorage();
