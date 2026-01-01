import { PRODUCTS } from "@/lib/products";
import { motion } from "framer-motion";
import { CheckCircle2, Package, AlertCircle } from "lucide-react";

export default function StatusPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-display font-bold text-white">Inventory Status</h1>
        <p className="text-muted-foreground">Real-time stock availability for all SB Services products.</p>
      </div>

      <div className="glass-card p-8 rounded-3xl space-y-6">
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xl font-medium text-white">Stock Database Active</span>
          </div>
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Updated just now</span>
        </div>

        <div className="grid gap-4">
          {PRODUCTS.map((product, i) => {
            const isLowStock = product.stock !== undefined && product.stock < 10;
            const isOutOfStock = product.stock === 0;

            return (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg overflow-hidden bg-black/50 border border-white/10">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover opacity-60" />
                  </div>
                  <div>
                    <span className="text-gray-300 font-medium block">{product.name}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">{product.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Stock Level</span>
                    <span className="text-sm font-mono text-white">
                      {product.stock !== undefined ? product.stock.toLocaleString() : "∞"}
                    </span>
                  </div>
                  
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${
                    isOutOfStock ? "text-red-500 border-red-500/20 bg-red-500/10" : 
                    isLowStock ? "text-yellow-500 border-yellow-500/20 bg-yellow-500/10" : 
                    "text-green-500 border-green-500/20 bg-green-500/10"
                  }`}>
                    {isOutOfStock ? <AlertCircle className="h-3 w-3" /> : 
                     isLowStock ? <Package className="h-3 w-3" /> : 
                     <CheckCircle2 className="h-3 w-3" />}
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {isOutOfStock ? "Out of Stock" : isLowStock ? "Low Stock" : "In Stock"}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="glass p-6 rounded-2xl border-white/5 text-center">
        <p className="text-sm text-muted-foreground">
          Inventory is updated every time a transaction is finalized. Need a bulk order? <a href="#" className="text-primary hover:underline">Contact Sales</a>.
        </p>
      </div>
    </div>
  );
}
