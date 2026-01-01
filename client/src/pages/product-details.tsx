import { useRoute } from "wouter";
import { PRODUCTS } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, ShieldCheck, Zap } from "lucide-react";
import NotFound from "@/pages/not-found";
import { motion } from "framer-motion";

export default function ProductDetailsPage() {
  const [match, params] = useRoute("/products/:id");
  const { addToCart } = useCart();
  
  if (!match) return <NotFound />;
  
  const product = PRODUCTS.find(p => p.id === params.id);
  if (!product) return <NotFound />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pt-8">
      {/* Image Side */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden glass-card"
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      </motion.div>

      {/* Content Side */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-8"
      >
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-primary/20 text-primary mb-4 border border-primary/20">
            {product.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">{product.name}</h1>
          <p className="text-3xl font-mono text-primary font-bold">${product.price}</p>
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed">
          {product.description}
        </p>

        <div className="space-y-4">
          <h3 className="font-bold text-white uppercase tracking-wider text-sm">Features</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Check className="h-3 w-3" />
                </div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="h-px bg-white/10 my-8" />

        <div className="flex gap-4">
          <Button 
            size="lg" 
            onClick={() => addToCart(product)}
            className="flex-1 h-14 text-lg bg-primary hover:bg-primary/90 text-white btn-glow rounded-xl"
          >
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
        </div>

        <div className="flex gap-6 text-xs text-muted-foreground pt-4">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-500" /> Instant Delivery
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-green-500" /> Secure Payment
          </div>
        </div>
      </motion.div>
    </div>
  );
}
