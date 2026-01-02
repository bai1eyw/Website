import { useRoute } from "wouter";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, ShieldCheck, Zap, Minus, Plus } from "lucide-react";
import NotFound from "@/pages/not-found";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProductDetailsPage() {
  const [match, params] = useRoute("/products/:id");
  const { addToCart, products } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  if (!match) return <NotFound />;
  
  const product = products.find(p => p.id === params.id);
  if (!product) return <NotFound />;

  const increment = () => {
    if (product.stock !== undefined && quantity < product.stock) {
      setQuantity(q => q + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pt-8">
      {/* Image Side */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative aspect-video lg:aspect-square rounded-none overflow-hidden glass-card border border-white/5"
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover grayscale opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
      </motion.div>

      {/* Content Side */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-8"
      >
        <div>
          <span className="inline-block px-3 py-1 rounded-none text-[10px] font-mono tracking-widest text-zinc-500 mb-4 border border-white/5 uppercase">
            {product.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 uppercase tracking-tighter">{product.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <p className="text-3xl font-mono text-white font-bold">€{product.price.toFixed(2)}</p>
            {product.stock !== undefined && (
              <span className={`px-3 py-1 rounded-none text-[10px] font-mono tracking-widest border ${
                product.stock === 0 ? "text-zinc-800 border-zinc-800/50" : 
                product.stock < 10 ? "text-zinc-500 border-zinc-500/50" : 
                "text-zinc-300 border-white/10"
              }`}>
                {product.stock} Stock
              </span>
            )}
          </div>
        </div>

        <p className="text-lg text-zinc-500 font-light leading-relaxed">
          {product.description}
        </p>

        <div className="space-y-4">
          <h3 className="font-mono text-zinc-600 uppercase tracking-[0.2em] text-[10px]">Services</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-xs text-zinc-400 font-mono uppercase tracking-tight">
                <div className="h-4 w-4 rounded-none bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500 shrink-0">
                  <Check className="h-2 w-2" />
                </div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="h-px bg-white/5 my-8" />

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex items-center bg-zinc-950 border border-white/5 h-14 px-4 w-full sm:w-auto">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-zinc-500 hover:text-white"
              onClick={decrement}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center text-white font-mono text-lg">{quantity}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-zinc-500 hover:text-white"
              onClick={increment}
              disabled={product.stock !== undefined && quantity >= product.stock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <Button 
            size="lg" 
            onClick={() => addToCart(product, quantity)}
            disabled={product.stock === 0}
            className="flex-1 w-full sm:w-auto h-14 text-sm font-bold bg-white hover:bg-zinc-200 text-black rounded-none uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <ShoppingCart className="h-5 w-5" /> Add to basket
          </Button>
        </div>

        <div className="flex gap-6 text-[10px] text-zinc-600 font-mono uppercase tracking-widest pt-4">
          <div className="flex items-center gap-2">
            <Zap className="h-3 w-3" /> Auto DL
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3 w-3" /> Secure Protocol
          </div>
        </div>
      </motion.div>
    </div>
  );
}
