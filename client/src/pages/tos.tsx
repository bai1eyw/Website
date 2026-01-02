export default function TOSPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 space-y-12 text-zinc-300">
      <div className="space-y-4 text-center">
        <h1 className="text-5xl font-display font-bold text-white uppercase tracking-tighter">Terms of Service</h1>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em]">Last Updated: January 2026</p>
      </div>

      <div className="glass-card p-10 rounded-3xl space-y-8 border-white/5 leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-primary font-mono text-sm">01.</span> Acceptance
          </h2>
          <p>By accessing SB Services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-primary font-mono text-sm">02.</span> Virtual Goods
          </h2>
          <p>All items sold are virtual goods for use within the Donut SMP Minecraft server. These items have no real-world monetary value and cannot be exchanged for cash.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-primary font-mono text-sm">03.</span> Delivery
          </h2>
          <p>Delivery is typically completed within 5-15 minutes of purchase. Please ensure your in-game username is correct. We are not responsible for items sent to incorrect usernames provided by the buyer.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-primary font-mono text-sm">04.</span> Refunds
          </h2>
          <p>Due to the nature of virtual goods, all sales are final. Refunds are only issued if we are unable to fulfill an order within 24 hours.</p>
        </section>
      </div>
    </div>
  );
}
