import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, CreditCard, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { type Product } from "@shared/schema";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total, clearCart, purchase } = useCart();
  const [_, setLocation] = useLocation();
  const { data: user } = useQuery({ queryKey: ["/api/user"] });

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 space-y-6">
        <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tighter">Your cart is empty</h2>
        <p className="text-zinc-500 font-light">Looks like you haven't added anything yet.</p>
        <Link href="/products">
          <Button className="bg-white text-black hover:bg-zinc-200 rounded-none h-12 px-8 uppercase tracking-widest font-bold">
            <ShoppingBag className="mr-2 h-4 w-4 text-black" /> Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-display font-bold text-white uppercase tracking-tighter">Shopping Cart</h1>
            <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-[0.2em]">{cart.length} ITEMS_LOADED</span>
          </div>
          
          <AnimatePresence mode="popLayout">
            {cart.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-6 p-6 bg-zinc-950/40 border border-white/5 hover:border-white/10 transition-all group"
              >
                <div className="h-24 w-24 shrink-0 bg-black border border-white/5 overflow-hidden">
                  <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover grayscale opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500" />
                </div>
                
                <div className="flex-grow space-y-1">
                  <h3 className="font-bold text-white uppercase tracking-tight text-lg">{item.product.name}</h3>
                  <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">{item.product.category}</p>
                  <p className="text-primary font-mono font-bold mt-2">€{Number(item.product.price).toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-4 bg-black/40 border border-white/5 h-12 px-3">
                  <Button 
                    variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-white font-mono">{item.quantity}</span>
                  <Button 
                    variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <Button 
                  variant="ghost" size="icon" 
                  className="text-zinc-700 hover:text-red-500 transition-colors"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8 rounded-none border border-white/5 space-y-8">
            <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-400 border-b border-white/5 pb-4">Order Review</h2>
            
            <div className="space-y-4 font-mono text-xs">
              <div className="flex justify-between text-zinc-500 uppercase">
                <span>Subtotal</span>
                <span className="text-zinc-300">€{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-500 uppercase">
                <span>Processing</span>
                <span className="text-primary">FREE</span>
              </div>
              <div className="h-px bg-white/5 my-6" />
              <div className="flex justify-between items-end">
                <span className="text-sm font-bold text-white uppercase tracking-tighter">Total</span>
                <span className="text-3xl font-display font-bold text-white tracking-tighter">€{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                className="w-full h-14 bg-primary hover:bg-primary/90 text-black btn-glow text-sm font-bold tracking-widest uppercase rounded-none group"
                onClick={() => setLocation(user ? "/checkout" : "/login")}
              >
                <CreditCard className="mr-3 h-5 w-5 text-black" /> {user ? "Checkout" : "Login to Checkout"}
              </Button>
              <p className="text-[9px] text-zinc-600 font-mono text-center uppercase tracking-widest">
                Secured transaction // manual delivery
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 opacity-20 p-4">
            <div className="h-1 flex-1 bg-white/10" />
            <div className="text-[8px] text-white font-mono uppercase tracking-[0.4em]">Auth Verified</div>
            <div className="h-1 flex-1 bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
