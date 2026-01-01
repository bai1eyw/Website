export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: "Donut" | "Steal a Brainrot" | "Services";
  image: string;
  features: string[];
  stock?: number;
}

export const PRODUCTS: Product[] = [
  {
    id: "d1",
    name: "Donut SMP Money 1m",
    description: "Join our Discord server. Open a ticket and provide your email and order...",
    price: 0.10,
    originalPrice: 0.05,
    category: "Donut",
    image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&auto=format&fit=crop&q=60",
    features: ["Instant Delivery", "Secure Transaction", "1m In-game Money"],
    stock: 3510
  },
  {
    id: "d2",
    name: "Skeleton Spawner",
    description: "Join our Discord server. Open a ticket and provide your email and order...",
    price: 0.12,
    originalPrice: 0.06,
    category: "Donut",
    image: "https://images.unsplash.com/photo-1621644340706-e17929424e8e?w=800&auto=format&fit=crop&q=60",
    features: ["Automatic Farm Compatible", "Infinite Skeletons", "Rare Item"],
    stock: 3718
  },
  {
    id: "d3",
    name: "Elytra",
    description: "Join our Discord server. Open a ticket and provide your email and order...",
    price: 25.00,
    originalPrice: 95.00,
    category: "Donut",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60",
    features: ["Infinite Flight", "Unbreaking III", "Mending"],
    stock: 3
  },
  {
    id: "d4",
    name: "Netherite Block",
    description: "Join our Discord server. Open a ticket and provide your email and order...",
    price: 8.50,
    originalPrice: 8.00,
    category: "Donut",
    image: "https://images.unsplash.com/photo-1614726365930-627c75da663e?w=800&auto=format&fit=crop&q=60",
    features: ["Pure Netherite", "Build Flex", "Highly Durable"],
    stock: 11
  }
];

export const CATEGORIES = ["All", "Donut", "Services"];
