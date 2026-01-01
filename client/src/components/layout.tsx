import { Navbar } from "./navbar";
import bgImage from "@assets/generated_images/dark_abstract_glossy_grid_background_with_neon_purple_accents.png";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden text-foreground bg-animate-dull">
      {/* Subtle texture/grid layer */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
      
      {/* Muted Grain Overlay */}
      <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] mix-blend-soft-light" />

      <Navbar />
      
      <main className="relative z-10 pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto min-h-[calc(100vh-100px)]">
        {children}
      </main>

      <footer className="relative z-10 border-t border-white/5 bg-black/50 backdrop-blur-md py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-zinc-500 font-mono tracking-widest">
          <p className="uppercase">&copy; 2026 DonutSMP. All rights reserved. </p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">TOS</a>
            <a href="#" className="hover:text-white transition-colors">privacy and security</a>
            <a href="#" className="hover:text-white transition-colors">SB Services</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
