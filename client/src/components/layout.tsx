import { Navbar } from "./navbar";
import bgImage from "@assets/generated_images/dark_abstract_glossy_grid_background_with_neon_purple_accents.png";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden text-foreground">
      {/* Background Image Layer */}
      <div 
        className="fixed inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Overlay Gradient for better text readability */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/20 via-background/50 to-background pointer-events-none" />

      <Navbar />
      
      <main className="relative z-10 pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto min-h-[calc(100vh-100px)]">
        {children}
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-md py-8">
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
