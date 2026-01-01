import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Wallet } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { items, total } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");

  if (items.length === 0) {
    return (
      <div className="text-center py-20 space-y-6">
        <h2 className="text-2xl font-bold text-white">Cart is empty</h2>
        <Link href="/products">
          <Button>Return to Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-white">Contact Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <Input id="email" placeholder="you@example.com" className="bg-black/20 border-white/10 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discord" className="text-white">Discord Username</Label>
                <Input id="discord" placeholder="user#1234" className="bg-black/20 border-white/10 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-white">Payment Method</h2>
          <RadioGroup defaultValue="card" onValueChange={setPaymentMethod} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <RadioGroupItem value="card" id="card" className="peer sr-only" />
              <Label
                htmlFor="card"
                className="flex flex-col items-center justify-between rounded-xl border-2 border-white/10 bg-black/40 p-4 hover:bg-white/5 hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
              >
                <CreditCard className="mb-3 h-6 w-6" />
                Card
              </Label>
            </div>
            <div>
              <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
              <Label
                htmlFor="paypal"
                className="flex flex-col items-center justify-between rounded-xl border-2 border-white/10 bg-black/40 p-4 hover:bg-white/5 hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
              >
                <Wallet className="mb-3 h-6 w-6" />
                PayPal
              </Label>
            </div>
          </RadioGroup>
        </div>

        {paymentMethod === 'card' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4 p-6 glass rounded-xl"
          >
            <div className="space-y-2">
              <Label className="text-white">Card Number</Label>
              <Input placeholder="0000 0000 0000 0000" className="bg-black/40 border-white/10 text-white font-mono" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Expiry</Label>
                <Input placeholder="MM/YY" className="bg-black/40 border-white/10 text-white font-mono" />
              </div>
              <div className="space-y-2">
                <Label className="text-white">CVC</Label>
                <Input placeholder="123" className="bg-black/40 border-white/10 text-white font-mono" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="space-y-6">
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4">Order Review</h3>
          <div className="space-y-3 mb-6">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-300">{item.name} x{item.quantity}</span>
                <span className="text-white font-mono">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="h-px bg-white/10 my-4" />
          <div className="flex justify-between text-xl font-bold text-white mb-6">
            <span>Total</span>
            <span>${(total * 1.1).toFixed(2)}</span>
          </div>
          
          <Button className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-white btn-glow rounded-xl">
            Pay ${(total * 1.1).toFixed(2)}
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-4">
            This is a secure 256-bit SSL encrypted payment.
          </p>
        </div>
      </div>
    </div>
  );
}
