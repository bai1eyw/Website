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
    stock: 142
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
    stock: 84
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
  },
  {
    id: "b1",
    name: "Brainrot Script V2",
    description: "Advanced scripts for the ultimate brainrot experience. Custom UI included.",
    price: 15.00,
    category: "Steal a Brainrot",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&auto=format&fit=crop&q=60",
    features: ["Custom UI", "Low Latency", "Frequent Updates"],
    stock: 24
  }
];

export const CATEGORIES = ["All", "Donut", "Steal a Brainrot"];
