import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Check, CreditCard, ShoppingBag, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

export default function CheckoutPage() {
  const { cart: items, total, purchase } = useCart();
  const [, setLocation] = useLocation();
  const { data: user } = useQuery<any>({ queryKey: ["/api/user"] });

  const handleCheckout = async () => {
    await purchase();
    setLocation("/");
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-6">
        <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20">
          <ShieldCheck className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-display font-bold text-white uppercase">Authentication Required</h1>
        <p className="text-zinc-500">You must be logged in to proceed to checkout.</p>
        <Button onClick={() => setLocation("/login")} size="lg" className="w-full bg-white text-black hover:bg-primary hover:text-white transition-all rounded-xl h-14 group">
          <ShieldCheck className="mr-2 h-5 w-5 text-black group-hover:text-white" /> LOG IN TO CONTINUE
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20 space-y-6">
        <h1 className="text-4xl font-display font-bold text-white uppercase tracking-tighter">Your Bag is Empty</h1>
        <Button onClick={() => setLocation("/products")} className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 btn-glow">
          <ShoppingBag className="mr-2 h-4 w-4" /> CONTINUE SHOPPING
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-display font-bold text-white uppercase tracking-tighter">Checkout</h1>
            <p className="text-zinc-500 text-sm font-light uppercase tracking-widest">Finalize your order // Secured Transaction</p>
          </div>

          <Card className="glass-card border-white/10 bg-black/40 rounded-3xl overflow-hidden">
            <CardHeader className="bg-white/5 border-b border-white/10">
              <CardTitle className="text-sm font-mono uppercase tracking-widest text-zinc-400">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {items.map((item: any) => (
                  <div key={item.product.id} className="flex justify-between items-center p-6 bg-black/20 hover:bg-white/5 transition-colors">
                    <div className="flex gap-4 items-center">
                      <div className="h-12 w-12 bg-black border border-white/10 rounded-lg overflow-hidden">
                        <img src={item.product.image} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white uppercase tracking-tight">{item.product.name}</p>
                        <p className="text-[10px] text-zinc-500 font-mono">QTY: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-mono text-primary">€{(Number(item.product.price) * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="p-8 bg-primary/5 space-y-4">
                <div className="flex justify-between text-xs text-zinc-500 uppercase tracking-widest font-mono">
                  <span>Subtotal</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-zinc-500 uppercase tracking-widest font-mono">
                  <span>Processing</span>
                  <span className="text-primary">FREE</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                  <span className="text-sm font-bold text-white uppercase">Grand Total</span>
                  <span className="text-2xl font-display font-bold text-white tracking-tighter">€{total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8 flex flex-col justify-center">
          <div className="glass-card p-8 rounded-[40px] border-primary/20 space-y-8 bg-gradient-to-b from-primary/10 to-transparent">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Payment Selection</h2>
              <p className="text-zinc-400 text-sm leading-relaxed font-light italic">
                Payment is required before delivery. Our team will verify the transaction and deliver your items in-game within 5-15 minutes.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-black/40 border border-primary/30 rounded-2xl">
                <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-bold text-white uppercase tracking-widest">Manual Confirmation</span>
              </div>
              
              <div className="p-6 bg-primary/5 rounded-2xl border border-white/5 space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Zap className="h-4 w-4" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">Priority Processing</span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed font-mono uppercase">
                  By clicking pay, you agree to our <a href="/tos" className="text-white underline underline-offset-4">TOS</a> and <a href="/privacy" className="text-white underline underline-offset-4">Privacy Policy</a>.
                </p>
              </div>
            </div>

            <Button 
              onClick={handleCheckout}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-black font-bold h-16 rounded-2xl text-xl btn-glow group"
            >
              COMPLETE PAYMENT <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform text-black" />
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-6 opacity-30">
             <div className="h-px flex-1 bg-white/10" />
             <div className="text-[10px] text-white font-mono uppercase tracking-[0.3em]">Secure Gateway</div>
             <div className="h-px flex-1 bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
