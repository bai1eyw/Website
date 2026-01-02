import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, Quote, X, Send, UserCircle, ShieldCheck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function FeedbackPage() {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  
  const [testimonials, setTestimonials] = useState([
    {
      user: "DragonSlayer99",
      rating: 5,
      content: "Insanely fast delivery! Got my Skeleton Spawner in literally 2 minutes. The price is unmatched.",
      date: "2 days ago",
      verified: true
    },
    {
      user: "MinecraftMaster",
      rating: 5,
      content: "SB Services is the only place I trust for Donut SMP items. Very professional support on Discord.",
      date: "1 week ago",
      verified: true
    },
    {
      user: "PixelPioneer",
      rating: 4,
      content: "Great service, only downside was the minor wait during maintenance, but support kept me updated.",
      date: "3 days ago",
      verified: true
    }
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newReview = {
      user: formData.get("username") as string || "Anonymous",
      rating: rating,
      content: formData.get("comment") as string || "Great service!",
      date: "Just now",
      verified: false
    };

    setTestimonials([newReview, ...testimonials]);
    setIsFormOpen(false);
    setRating(5);
    
    toast({
      title: "Review Published",
      description: "Thank you for your feedback! Your review is now visible.",
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-20 py-10">
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-widest"
        >
          <Heart className="h-3 w-3 fill-primary" /> Community Driven
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter">
          What they <span className="text-primary italic">think</span>
        </h1>
        <p className="text-zinc-500 text-xl max-w-2xl mx-auto font-light">Join over 100+ satisfied customers who upgraded their gameplay with SB Services.</p>
        
        <AnimatePresence mode="wait">
          {!isFormOpen ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="pt-6"
            >
              <Button 
                onClick={() => setIsFormOpen(true)}
                size="lg"
                className="bg-white text-black hover:bg-primary hover:text-white transition-all duration-500 rounded-full px-10 h-14 group"
              >
                <MessageSquare className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" /> 
                WRITE A REVIEW
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="glass-card p-10 rounded-3xl max-w-2xl mx-auto text-left relative overflow-hidden border-primary/20"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-primary animate-gradient-x" />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-6 right-6 text-zinc-500 hover:text-white hover:bg-white/10"
                onClick={() => setIsFormOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4 text-center">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Share your journey</h3>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="transition-all hover:scale-125 p-1"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                      >
                        <Star 
                          className={`h-10 w-10 ${
                            (hoverRating || rating) >= star 
                              ? "text-primary fill-primary drop-shadow-[0_0_10px_rgba(var(--primary),0.5)]" 
                              : "text-zinc-800"
                          } transition-all duration-300`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-3">
                    <Label className="text-zinc-400 text-xs uppercase tracking-widest ml-1">Identity</Label>
                    <Input 
                      name="username" 
                      placeholder="e.g. DreamLover42" 
                      required
                      className="bg-black/60 border-white/10 text-white focus:border-primary/50 h-12 rounded-xl" 
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-zinc-400 text-xs uppercase tracking-widest ml-1">Your Story</Label>
                    <Textarea 
                      name="comment" 
                      placeholder="Tell us how we helped your SMP experience..." 
                      required
                      className="bg-black/60 border-white/10 text-white min-h-[120px] focus:border-primary/50 rounded-xl resize-none" 
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-xl text-lg tracking-tight btn-glow">
                  <Send className="mr-3 h-5 w-5" /> PUBLISH TESTIMONIAL
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.user + t.date + i}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl relative group hover:border-primary/30 transition-all duration-500"
            >
              <Quote className="absolute top-6 right-6 h-12 w-12 text-primary/5 group-hover:text-primary/10 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, star) => (
                  <Star 
                    key={star} 
                    className={`h-5 w-5 ${star < t.rating ? 'text-primary fill-primary' : 'text-zinc-800'}`} 
                  />
                ))}
              </div>

              <p className="text-zinc-300 text-lg leading-relaxed mb-8 font-light italic">"{t.content}"</p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-primary font-bold text-xl group-hover:scale-110 transition-transform">
                  {t.user.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base tracking-tight">{t.user}</span>
                    {t.verified && <ShieldCheck className="h-4 w-4 text-primary fill-primary/10" />}
                  </div>
                  <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">{t.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="glass-card p-16 rounded-[40px] text-center space-y-10 border-white/5 bg-gradient-to-b from-transparent to-primary/5">
        <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tighter">Verified Excellence</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          <div className="space-y-2">
            <p className="text-6xl font-display font-bold text-white drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]">100+</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Orders Fulfilled</p>
          </div>
          <div className="space-y-2">
            <p className="text-6xl font-display font-bold text-white drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]">4.9/5</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Community Rating</p>
          </div>
          <div className="space-y-2">
            <p className="text-6xl font-display font-bold text-white drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]">24/7</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Elite Support</p>
          </div>
        </div>
      </div>
    </div>
  );
}
