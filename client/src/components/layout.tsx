import { Navbar } from "./navbar";
import bgImage from "@assets/generated_images/dark_abstract_glossy_grid_background_with_neon_purple_accents.png";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden text-foreground bg-black">
      {/* Subtle texture/grid layer instead of glossy image */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      
      {/* Overlay Gradient for deep dull black effect */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-zinc-950 via-black to-black pointer-events-none" />

      <Navbar />
      
      <main className="relative z-10 pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto min-h-[calc(100vh-100px)]">
        {children}
      </main>

      <footer className="relative z-10 border-t border-white/5 bg-zinc-950/50 backdrop-blur-md py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2024 SB Services. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
