import { useCart } from "@/lib/cart";
import { motion } from "framer-motion";
import { CheckCircle2, Package, AlertCircle, Activity, Box, Zap, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function StatusPage() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["/api/products"],
    refetchInterval: 5000, // Refresh every 5 seconds for live status
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-display font-bold text-white uppercase tracking-tighter flex items-center justify-center gap-3">
          <Activity className="h-10 w-10 text-primary animate-pulse" />
          Live Stock Status
        </h1>
        <p className="text-zinc-500 text-sm font-light">Real time stock availability for all SB Services.</p>
      </div>

      <div className="glass-card p-8 rounded-none border border-white/5 space-y-6">
        <div className="flex items-center justify-between pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-mono tracking-widest text-white uppercase">Systems Operational</span>
          </div>
          <span className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-mono">Real-time Feed</span>
        </div>

        <div className="grid gap-4">
          {products.map((product, i) => {
            const productData = product as any;
            const isLowStock = productData.stock !== undefined && productData.stock < 10;
            const isOutOfStock = productData.stock === 0;

            return (
              <motion.div 
                key={productData.id} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-4 rounded-none bg-zinc-950/40 border border-white/5 hover:border-primary/30 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-black border border-white/10 overflow-hidden relative">
                    <img src={productData.image} alt={productData.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                  </div>
                  <div>
                    <span className="text-zinc-200 text-sm font-medium block uppercase tracking-tight group-hover:text-primary transition-colors">{productData.name}</span>
                    <span className="text-[9px] text-zinc-600 uppercase tracking-widest font-mono flex items-center gap-1">
                      <Box className="h-2 w-2" /> {productData.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-[8px] text-zinc-700 uppercase font-bold tracking-[0.2em] font-mono">Stock_Level</span>
                    <span className={`text-xs font-mono ${isOutOfStock ? 'text-red-500' : isLowStock ? 'text-yellow-500' : 'text-green-500'}`}>
                      {productData.stock !== undefined ? productData.stock.toLocaleString() : "UNLIMITED"}
                    </span>
                  </div>
                  
                  <div className={`flex items-center gap-2 px-3 py-1 border ${
                    isOutOfStock ? "text-red-500 border-red-500/50 bg-red-500/10" : 
                    isLowStock ? "text-yellow-500 border-yellow-500/50 bg-yellow-500/10" : 
                    "text-green-500 border-green-500/50 bg-green-500/10"
                  } rounded-none min-w-[80px] justify-center`}>
                    <Zap className="h-3 w-3" />
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em]">
                      {isOutOfStock ? "RESTOCK" : isLowStock ? "LOW" : "LIVE"}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="glass p-6 rounded-none border-white/5 text-center">
        <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest flex items-center justify-center gap-2">
          <Activity className="h-3 w-3" /> Status live // <a href="#" className="text-white hover:underline transition-all underline-offset-4">VIEW FULL LOGS</a>
        </p>
      </div>
    </div>
  );
}
