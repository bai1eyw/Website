import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Star, Shield, Zap, ShoppingBag } from "lucide-react";
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
            SB Services
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white max-w-4xl"
        >
          Your journy Starts <span className="text-white font-mono italic underline decoration-zinc-800 underline-offset-8">Here</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl font-light tracking-wide"
        >
          Fast, Fair, Trustworthy
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link href="/products">
            <Button size="lg" className="bg-white hover:bg-zinc-200 text-black font-bold text-sm px-8 h-12 rounded-none tracking-widest transition-all">
              <ShoppingBag className="mr-2 h-4 w-4" /> Browse products <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/status">
            <Button size="lg" variant="outline" className="border-white/10 bg-transparent hover:bg-white/5 text-white text-sm px-8 h-12 rounded-none tracking-widest transition-all">
              <Zap className="mr-2 h-4 w-4 text-primary" /> Check status
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Zap, title: "Fast", desc: "Instant delivery." },
          { icon: Shield, title: "Fair", desc: "Cheap prices to suit everyone." },
          { icon: Star, title: "Trustworthy", desc: "Trusted by many people in the donutsmp commununity." },
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
            <h2 className="text-2xl font-display font-bold text-white mb-2 uppercase tracking-tighter">Services</h2>
            <div className="h-0.5 w-12 bg-white/10" />
          </div>
          <Link href="/products">
            <Button variant="link" className="text-zinc-400 hover:text-white text-xs font-mono uppercase tracking-widest">
              View all
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
