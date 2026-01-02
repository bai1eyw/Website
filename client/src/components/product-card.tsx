import { Product } from "@/lib/products";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight, Tag, Box } from "lucide-react";
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
      <div className="relative h-48 overflow-hidden bg-black/40">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80"
        />
        <div className="absolute top-3 left-3 z-20">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-white/10 backdrop-blur-md border border-white/10 text-white uppercase tracking-wider">
            {product.category}
          </span>
        </div>
        {product.stock !== undefined && (
          <div className="absolute bottom-3 right-3 z-20">
            <span className="px-3 py-1 rounded-full text-[10px] font-medium bg-black/60 border border-white/5 text-gray-400">
              {product.stock} in stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-display font-bold text-lg text-white group-hover:text-primary transition-colors mb-2">
          {product.name}
        </h3>
        
        <p className="text-muted-foreground text-xs mb-6 flex-grow line-clamp-2 leading-relaxed">
          <Tag className="inline-block h-3 w-3 mr-1 text-primary/50" /> {product.description}
        </p>

        <div className="flex items-end justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white">
              €{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                €{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/products/${product.id}`} className="flex-1">
            <Button variant="outline" className="w-full h-9 text-xs border-white/10 hover:bg-white/5 hover:text-white text-white/80 rounded-lg">
              <ArrowRight className="mr-2 h-3 w-3" /> Details
            </Button>
          </Link>
          <Button 
            onClick={() => addToCart(product)}
            className="bg-primary hover:bg-primary/90 text-white border-none h-9 w-9 p-0 rounded-lg shadow-lg shadow-primary/20 flex items-center justify-center overflow-visible"
          >
            <ShoppingCart className="h-4 w-4 relative z-10" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
