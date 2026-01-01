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
    image: "https://imagedelivery.net/HL_Fwm__tlvUGLZF2p74xw/ecdd28c1-58ae-46e1-e26e-8cafda67a700/public",
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
    image: "https://imagedelivery.net/HL_Fwm__tlvUGLZF2p74xw/1d51c0ff-d8d1-4c15-9d97-ff8b779ab400/public",
    features: ["Automatic Farm Compatible", "Infinite Skeletons"],
    stock: 84
  },
  {
    id: "d3",
    name: "Elytra",
    description: "Join our Discord server. Open a ticket and provide your email and order...",
    price: 25.00,
    originalPrice: 95.00,
    category: "Donut",
    image: "https://imagedelivery.net/HL_Fwm__tlvUGLZF2p74xw/32c23974-8ae3-4008-174b-4c024a974c00/public",
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
    image: "https://imagedelivery.net/HL_Fwm__tlvUGLZF2p74xw/acfc0704-e07d-4ef2-9d5f-15e0183ce000/public",
    features: ["Pure Netherite", "Build Flex", "Highly Durable"],
    stock: 11
  }
];

export const CATEGORIES = ["All", "Donut"];
