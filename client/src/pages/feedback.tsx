import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, Quote, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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
      date: "2 days ago"
    },
    {
      user: "MinecraftMaster",
      rating: 5,
      content: "SB Services is the only place I trust for Donut SMP items. Very professional support on Discord.",
      date: "1 week ago"
    },
    {
      user: "PixelPioneer",
      rating: 4,
      content: "Great service, only downside was the minor wait during maintenance, but support kept me updated.",
      date: "3 days ago"
    }
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newReview = {
      user: formData.get("username") as string || "Anonymous",
      rating: rating,
      content: formData.get("comment") as string || "Great service!",
      date: "Just now"
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
    <div className="max-w-5xl mx-auto space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white">Customer Feedback</h1>
        <p className="text-muted-foreground text-lg">Hear what our community has to say about our services.</p>
        
        <AnimatePresence mode="wait">
          {!isFormOpen ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Button 
                onClick={() => setIsFormOpen(true)}
                className="bg-primary hover:bg-primary/90 text-white btn-glow rounded-full px-8 h-12"
              >
                <MessageSquare className="mr-2 h-4 w-4" /> Leave a Review
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="glass-card p-8 rounded-3xl max-w-xl mx-auto text-left relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600" />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-4 right-4 text-muted-foreground hover:text-white"
                onClick={() => setIsFormOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold text-white">Share your experience</h3>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="transition-transform hover:scale-110 p-1"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                      >
                        <Star 
                          className={`h-8 w-8 ${
                            (hoverRating || rating) >= star 
                              ? "text-yellow-500 fill-yellow-500" 
                              : "text-zinc-800"
                          } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white text-sm">Your Name</Label>
                    <Input 
                      name="username" 
                      placeholder="Display name" 
                      required
                      className="bg-black/40 border-white/10 text-white focus:border-primary/50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white text-sm">Review Content</Label>
                    <Textarea 
                      name="comment" 
                      placeholder="What did you think of our service?" 
                      required
                      className="bg-black/40 border-white/10 text-white min-h-[100px] focus:border-primary/50" 
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 btn-glow">
                  <Send className="mr-2 h-4 w-4" /> Publish Review
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
              transition={{ duration: 0.4 }}
              className="glass-card p-6 rounded-2xl relative"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, star) => (
                  <Star 
                    key={star} 
                    className={`h-4 w-4 ${star < t.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-800'}`} 
                  />
                ))}
              </div>
              <p className="text-gray-300 italic mb-6 leading-relaxed">"{t.content}"</p>
              <div className="flex justify-between items-center text-xs mt-auto">
                <span className="font-bold text-white flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px]">
                    {t.user.charAt(0)}
                  </div>
                  {t.user}
                </span>
                <span className="text-muted-foreground">{t.date}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="glass p-12 rounded-3xl text-center space-y-6 border-white/5">
        <h2 className="text-2xl font-bold text-white">Trust is our Priority</h2>
        <div className="flex flex-wrap justify-center gap-12">
          <div className="space-y-1">
            <p className="text-4xl font-display font-bold text-primary">5000+</p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Orders Filled</p>
          </div>
          <div className="space-y-1">
            <p className="text-4xl font-display font-bold text-primary">4.9/5</p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Average Rating</p>
          </div>
          <div className="space-y-1">
            <p className="text-4xl font-display font-bold text-primary">24/7</p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Active Support</p>
          </div>
        </div>
      </div>
    </div>
  );
}
