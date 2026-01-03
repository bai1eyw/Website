import { useCart } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { loadStripe } from "@stripe/stripe-js";
import { apiRequest } from "@/lib/queryClient";

const stripePromise = loadStripe("pk_test_51P7Y7vP1Z4Vz5v8z7P7z7P7z7P7z7P7z7P7z7P7z7P7z7P7z7P7z7P7z7P7z7P7z7P7z7P7z7P7z7P7z7P7z7P");

export default function CheckoutPage() {
  const { items, total } = useCart();
  const { convert } = useCurrency();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await apiRequest("POST", "/api/create-checkout-session", { items });
      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      } else {
        throw new Error("Failed to create checkout session URL");
      }
    } catch (error: any) {
      toast({
        title: "Checkout failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
    <div className="max-w-xl mx-auto py-12 px-4">
      <div className="glass-card p-8 rounded-2xl space-y-8">
        <h2 className="text-3xl font-display font-bold text-white text-center">Checkout</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between text-lg text-gray-300">
            <span>Subtotal</span>
            <span>{convert(total).symbol}{convert(total).amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg text-gray-300">
            <span>Service Fee (10%)</span>
            <span>{convert(total * 0.1).symbol}{convert(total * 0.1).amount.toFixed(2)}</span>
          </div>
          <div className="h-px bg-white/10 my-4" />
          <div className="flex justify-between text-2xl font-bold text-white">
            <span>Total</span>
            <span>{convert(total * 1.1).symbol}{convert(total * 1.1).amount.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-center text-gray-400">
            You will be redirected to Stripe to securely complete your payment.
          </p>
          <Button 
            onClick={handleCheckout}
            disabled={loading}
            className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-white btn-glow rounded-xl"
          >
            {loading ? "Processing..." : `Pay ${convert(total * 1.1).symbol}${convert(total * 1.1).amount.toFixed(2)}`}
          </Button>
        </div>
        
        <p className="text-xs text-center text-muted-foreground">
          This is a secure 256-bit SSL encrypted payment processing through Stripe.
        </p>
      </div>
    </div>
  );
}
