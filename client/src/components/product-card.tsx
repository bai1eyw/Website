import { Product } from "@/lib/products";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 z-20">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md border border-white/10 text-white">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-bold text-xl text-white group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <span className="font-mono text-primary font-bold text-lg">
            ${product.price}
          </span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-6 flex-grow line-clamp-2">
          {product.description}
        </p>

        <div className="flex gap-3 mt-auto">
          <Link href={`/products/${product.id}`} className="flex-1">
            <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:text-white text-white/80">
              Details <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button 
            onClick={() => addToCart(product)}
            className="bg-primary hover:bg-primary/90 text-white border-none shadow-lg shadow-primary/20 btn-glow"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
