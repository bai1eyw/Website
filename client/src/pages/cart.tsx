import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, CreditCard, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [_, setLocation] = useLocation();

  if (items.length === 0) {
    return (
      <div className="text-center py-20 space-y-6">
        <h2 className="text-3xl font-display font-bold text-white">Your cart is empty</h2>
        <p className="text-muted-foreground">Looks like you haven't added anything yet.</p>
        <Link href="/products">
          <Button className="bg-primary text-white">
            <ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-3xl font-display font-bold text-white mb-6">Shopping Cart</h1>
        
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass p-4 rounded-xl flex gap-4 items-center"
            >
              <div className="h-20 w-20 rounded-lg overflow-hidden shrink-0 bg-black/50">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </div>
              
              <div className="flex-grow">
                <h3 className="font-bold text-white">{item.name}</h3>
                <p className="text-primary font-mono">${item.price}</p>
              </div>

              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" size="icon" className="h-8 w-8 rounded-full border-white/10 hover:bg-white/10 text-white"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-white">{item.quantity}</span>
                <Button 
                  variant="outline" size="icon" className="h-8 w-8 rounded-full border-white/10 hover:bg-white/10 text-white"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <Button 
                variant="ghost" size="icon" 
                className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="glass-card p-6 rounded-2xl h-fit space-y-6">
        <h2 className="text-xl font-bold text-white">Order Summary</h2>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Taxes (est.)</span>
            <span>${(total * 0.1).toFixed(2)}</span>
          </div>
          <div className="h-px bg-white/10 my-4" />
          <div className="flex justify-between text-lg font-bold text-white">
            <span>Total</span>
            <span>${(total * 1.1).toFixed(2)}</span>
          </div>
        </div>

        <Button 
          className="w-full h-12 bg-primary hover:bg-primary/90 text-black btn-glow text-lg font-bold group"
          onClick={() => setLocation("/checkout")}
        >
          <CreditCard className="mr-2 h-5 w-5 text-black" /> Proceed to Checkout
        </Button>
        
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <CreditCard className="h-3 w-3" /> Secure Checkout powered by Stripe
        </div>
      </div>
    </div>
  );
}
