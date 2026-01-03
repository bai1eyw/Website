import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { ShoppingCart, User, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [location] = useLocation();
  const { itemCount } = useCart();
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const currencies: ("USD" | "GBP" | "EUR" | "JPY")[] = ["USD", "GBP", "EUR", "JPY"];

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Status", path: "/status" },
    { name: "Feedback", path: "/feedback" },
  ];

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="nav-pill flex items-center gap-2 md:gap-6">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="glass border-r-white/10 bg-black/80 text-white">
              <div className="flex flex-col gap-4 mt-10">
                {navItems.map((item) => (
                  <Link key={item.path} href={item.path} className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    location === item.path ? "text-primary" : "text-white/70"
                  )} onClick={() => setIsOpen(false)}>
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="font-display font-bold text-xl md:text-2xl tracking-tighter text-white mr-4 flex items-center gap-2">
            <span className="text-white underline decoration-white underline-offset-4">SB</span>Services
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path} className={cn(
                  "text-[10px] font-mono tracking-[0.2em] uppercase transition-all hover:text-white relative group",
                  location === item.path ? "text-white" : "text-zinc-500"
                )}>
                {item.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full",
                  location === item.path ? "w-full" : ""
                )} />
            </Link>
          ))}
        </div>

        <div className="h-6 w-px bg-white/10 mx-2" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Currency Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 px-2">
                <Globe className="h-4 w-4" />
                <span className="text-[10px] font-mono tracking-widest uppercase">{currency}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass border-white/10 bg-black/80 text-white">
              {currencies.map((c) => (
                <DropdownMenuItem
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={cn(
                    "text-[10px] font-mono tracking-widest uppercase hover:bg-white/10 cursor-pointer",
                    currency === c ? "text-primary" : "text-white/70"
                  )}
                >
                  {c}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="h-6 w-px bg-white/10 mx-1" />

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="text-white relative hover:bg-white/10 hover:text-primary transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-primary transition-colors">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
