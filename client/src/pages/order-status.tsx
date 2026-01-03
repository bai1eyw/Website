import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function OrderStatusPage() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const sessionId = searchParams.get("session_id");

  const { data: session, isLoading } = useQuery({
    queryKey: ["/api/checkout-session", sessionId],
    queryFn: async () => {
      const res = await fetch(`/api/checkout-session/${sessionId}`);
      if (!res.ok) throw new Error("Failed to fetch session");
      return res.json();
    },
    enabled: !!sessionId,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <p className="text-gray-400 font-mono uppercase tracking-widest">Verifying Payment...</p>
      </div>
    );
  }

  const isPaid = session?.status === "paid";

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 rounded-2xl text-center space-y-6 border border-white/5"
      >
        {isPaid ? (
          <>
            <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto" />
            <h1 className="text-3xl font-display font-bold text-white uppercase tracking-tighter">Payment Successful</h1>
            <p className="text-gray-400">Your order has been confirmed. Thank you for your purchase!</p>
          </>
        ) : (
          <>
            <XCircle className="h-20 w-20 text-red-500 mx-auto" />
            <h1 className="text-3xl font-display font-bold text-white uppercase tracking-tighter">Payment Required</h1>
            <p className="text-gray-400">It looks like the payment hasn't been completed yet. Please try again or contact support if you have issues.</p>
          </>
        )}

        <div className="pt-6 space-y-3">
          <Link href="/">
            <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white btn-glow rounded-xl uppercase tracking-widest font-bold">
              Return Home
            </Button>
          </Link>
          {!isPaid && (
            <Link href="/cart">
              <Button variant="outline" className="w-full h-12 border-white/10 text-white hover:bg-white/5 rounded-xl uppercase tracking-widest font-bold">
                Back to Cart
              </Button>
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
}
