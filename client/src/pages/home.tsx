import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Star, Shield, Zap } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 3);

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
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-purple-600 opacity-70 blur-xl animate-pulse" />
          <span className="relative px-4 py-1.5 rounded-full bg-black/50 border border-white/10 text-sm font-medium text-white backdrop-blur-md">
            The #1 Marketplace for Digital Assets
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white max-w-4xl"
        >
          Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 text-glow">Gaming Experience</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl"
        >
          Premium scripts, exclusive SMP access, and high-quality digital goods. 
          Instant delivery. 24/7 Support. 100% Secure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link href="/products">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white btn-glow text-lg px-8 h-14 rounded-full">
              Browse Products <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/status">
            <Button size="lg" variant="outline" className="border-white/20 bg-black/20 hover:bg-white/10 text-white backdrop-blur-md text-lg px-8 h-14 rounded-full">
              Check Status
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Zap, title: "Instant Delivery", desc: "Get your products immediately after purchase via email." },
          { icon: Shield, title: "Secure Payments", desc: "Powered by Stripe and PayPal for 100% secure transactions." },
          { icon: Star, title: "Premium Quality", desc: "All products are verified and tested by our expert team." },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors"
          >
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-4">
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold text-white mb-2">Featured Products</h2>
            <p className="text-muted-foreground">Top rated items this week</p>
          </div>
          <Link href="/products">
            <Button variant="link" className="text-primary hover:text-primary/80">
              View All <ArrowRight className="ml-2 h-4 w-4" />
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
