import { useCart } from "@/lib/cart";
import { motion } from "framer-motion";
import { CheckCircle2, Package, AlertCircle } from "lucide-react";

export default function StatusPage() {
  const { products } = useCart();
  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-display font-bold text-white uppercase tracking-tighter">Inventory_Status</h1>
        <p className="text-zinc-500 text-sm font-light">Real-time stock availability for all SB Services protocols.</p>
      </div>

      <div className="glass-card p-8 rounded-none border border-white/5 space-y-6">
        <div className="flex items-center justify-between pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-zinc-100 animate-pulse" />
            <span className="text-sm font-mono tracking-widest text-white uppercase">Database_Active</span>
          </div>
          <span className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-mono">Realtime // Sync</span>
        </div>

        <div className="grid gap-4">
          {products.map((product, i) => {
            const isLowStock = product.stock !== undefined && product.stock < 10;
            const isOutOfStock = product.stock === 0;

            return (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-4 rounded-none bg-zinc-950/40 border border-white/5"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-black border border-white/5">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover opacity-40 grayscale" />
                  </div>
                  <div>
                    <span className="text-zinc-200 text-sm font-medium block uppercase tracking-tight">{product.name}</span>
                    <span className="text-[9px] text-zinc-600 uppercase tracking-widest font-mono">{product.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-[8px] text-zinc-700 uppercase font-bold tracking-[0.2em] font-mono">Stock_Val</span>
                    <span className="text-xs font-mono text-zinc-400">
                      {product.stock !== undefined ? product.stock.toLocaleString() : "INF"}
                    </span>
                  </div>
                  
                  <div className={`flex items-center gap-2 px-3 py-1 border ${
                    isOutOfStock ? "text-zinc-800 border-zinc-800/50 bg-black" : 
                    isLowStock ? "text-zinc-500 border-zinc-500/50 bg-black" : 
                    "text-zinc-100 border-zinc-100/50 bg-black"
                  } rounded-none`}>
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em]">
                      {isOutOfStock ? "VOID" : isLowStock ? "WARN" : "OK"}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="glass p-6 rounded-none border-white/5 text-center">
        <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
          SYSTEM_AUTO_SYNC_ENABLED // <a href="#" className="text-white hover:underline transition-all underline-offset-4">LOGS</a>
        </p>
      </div>
    </div>
  );
}
