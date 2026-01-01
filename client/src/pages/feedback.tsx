import { motion } from "framer-motion";
import { Star, MessageSquare, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function FeedbackPage() {
  const { toast } = useToast();

  const handleFeedback = () => {
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! It has been received.",
    });
  };

  const testimonials = [
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
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white">Customer Feedback</h1>
        <p className="text-muted-foreground text-lg">Hear what our community has to say about our services.</p>
        <Button 
          onClick={handleFeedback}
          className="bg-primary hover:bg-primary/90 text-white btn-glow rounded-full px-8"
        >
          <MessageSquare className="mr-2 h-4 w-4" /> Leave Feedback
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-2xl relative"
          >
            <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, star) => (
                <Star 
                  key={star} 
                  className={`h-4 w-4 ${star < t.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`} 
                />
              ))}
            </div>
            <p className="text-gray-300 italic mb-6">"{t.content}"</p>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">{t.user}</span>
              <span className="text-muted-foreground">{t.date}</span>
            </div>
          </motion.div>
        ))}
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
