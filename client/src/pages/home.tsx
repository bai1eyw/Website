import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Star, Shield, Zap } from "lucide-react";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/product-card";

export default function Home() {
  const { products } = useCart();
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center space-y-8 pt-12 md:pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative inline-block"
        >
          <span className="relative px-4 py-1.5 rounded-full bg-zinc-900 border border-white/5 text-[10px] font-mono tracking-[0.2em] text-zinc-400 uppercase">
            SB_PROTOCOL // V4.2
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white max-w-4xl"
        >
          Elevate Your <span className="text-blue-500 font-mono italic text-glow">Experience</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-blue-100/60 max-w-2xl font-light tracking-wide"
        >
          Premium digital assets and exclusive access protocols. 
          Verified. Secure. Instant.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link href="/products">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-8 h-12 rounded-none tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              BROWSE_PRODUCTS <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/status">
            <Button size="lg" variant="outline" className="border-blue-500/30 bg-blue-950/20 hover:bg-blue-500/10 text-blue-400 text-sm px-8 h-12 rounded-none tracking-widest">
              CHECK_STATUS
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Zap, title: "INSTANT_DL", desc: "Automated distribution protocol active." },
          { icon: Shield, title: "SECURE_GATE", desc: "Encryption layer V4 enabled." },
          { icon: Star, title: "PREMIUM_AUTH", desc: "All assets verified by system root." },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 border border-white/5 hover:border-white/10 transition-colors rounded-none"
          >
            <div className="h-10 w-10 bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 mb-6">
              <feature.icon className="h-5 w-5" />
            </div>
            <h3 className="text-xs font-mono font-bold text-white mb-2 tracking-widest uppercase">{feature.title}</h3>
            <p className="text-zinc-500 text-sm font-light leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-2xl font-display font-bold text-white mb-2 uppercase tracking-tighter">Featured_Assets</h2>
            <div className="h-0.5 w-12 bg-white/10" />
          </div>
          <Link href="/products">
            <Button variant="link" className="text-zinc-400 hover:text-white text-xs font-mono uppercase tracking-widest">
              VIEW_ALL_INDEX
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
