import { useState } from "react";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { CATEGORIES } from "@/lib/products";

export default function ProductsPage() {
  const { products } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2 uppercase tracking-tighter">Market Stock</h1>
          <p className="text-zinc-500 text-sm font-light">Browse our services.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-zinc-600" />
          <Input
            placeholder="SEARCH INDEX..."
            className="pl-9 bg-zinc-950 border-white/5 text-xs text-white placeholder:text-zinc-700 font-mono rounded-none focus:border-white/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            onClick={() => setActiveCategory(category)}
            className={
              activeCategory === category 
                ? "bg-white text-black hover:bg-zinc-200 border-none rounded-none text-[10px] font-mono tracking-widest h-8"
                : "bg-transparent border-white/5 text-zinc-500 hover:text-white hover:bg-white/5 rounded-none text-[10px] font-mono tracking-widest h-8"
            }
          >
            {category.toUpperCase()}
          </Button>
        ))}
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-zinc-600 font-mono text-xs">
          <p>No stock left.</p>
          <Button 
            variant="link" 
            onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
            className="text-white mt-4 underline decoration-zinc-800 hover:decoration-white transition-all underline-offset-4"
          >
            RESET_FILTERS
          </Button>
        </div>
      )}
    </div>
  );
}
