import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";

export default function StatusPage() {
  const systems = [
    { name: "Payment Gateway", status: "Operational", color: "text-green-500", icon: CheckCircle2 },
    { name: "Digital Delivery", status: "Operational", color: "text-green-500", icon: CheckCircle2 },
    { name: "Discord Bot", status: "Maintenance", color: "text-yellow-500", icon: Clock },
    { name: "SMP API", status: "Operational", color: "text-green-500", icon: CheckCircle2 },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-display font-bold text-white">System Status</h1>
        <p className="text-muted-foreground">Current status of all SB Services infrastructure.</p>
      </div>

      <div className="glass-card p-8 rounded-3xl space-y-6">
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xl font-medium text-white">All Systems Operational</span>
          </div>
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Updated 2m ago</span>
        </div>

        <div className="grid gap-4">
          {systems.map((system, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
              <span className="text-gray-300 font-medium">{system.name}</span>
              <div className={`flex items-center gap-2 ${system.color}`}>
                <system.icon className="h-4 w-4" />
                <span className="text-sm font-bold">{system.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass p-6 rounded-2xl border-white/5 text-center">
        <p className="text-sm text-muted-foreground">
          Experiencing an issue not listed here? <a href="#" className="text-primary hover:underline">Open a ticket</a> on our Discord.
        </p>
      </div>
    </div>
  );
}
