export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Donut" | "Steal a Brainrot" | "Services";
  image: string;
  features: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Donut SMP Access",
    description: "Premium access to the exclusive Donut SMP server with priority queue and special perks.",
    price: 19.99,
    category: "Donut",
    image: "https://images.unsplash.com/photo-1624138784181-dc7f5b759b6d?w=800&auto=format&fit=crop&q=60",
    features: ["Priority Queue", "Custom Tag", "Kit Access", "Private Discord Channel"]
  },
  {
    id: "2",
    name: "Brainrot Bundle",
    description: "The ultimate collection of meme-tier assets and scripts for your next project.",
    price: 29.99,
    category: "Steal a Brainrot",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60",
    features: ["100+ Assets", "Exclusive Scripts", "Lifetime Updates", "Community Access"]
  },
  {
    id: "3",
    name: "Donut VIP+",
    description: "Lifetime VIP+ rank on Donut SMP. Stand out from the crowd.",
    price: 49.99,
    category: "Donut",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=60",
    features: ["All SMP Access Features", "Gold Name", "Fly Command", "5x Home Sets"]
  },
  {
    id: "4",
    name: "Skibidi Script Pack",
    description: "Don't ask questions. Just get the scripts. Top tier performance.",
    price: 14.99,
    category: "Steal a Brainrot",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60",
    features: ["Optimized Code", "Plug & Play", "Glitch Effects", "No Refunds"]
  }
];

export const CATEGORIES = ["All", "Donut", "Steal a Brainrot", "Services"];
