export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 space-y-12 text-zinc-300">
      <div className="space-y-4 text-center">
        <h1 className="text-5xl font-display font-bold text-white uppercase tracking-tighter">Privacy Policy</h1>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em]">Last Updated: January 2026</p>
      </div>

      <div className="glass-card p-10 rounded-3xl space-y-8 border-white/5 leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-primary font-mono text-sm">01.</span> Data Collection
          </h2>
          <p>We collect minimal data required to fulfill your orders: your in-game username and transaction details. We do not store your personal identity or financial information directly.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-primary font-mono text-sm">02.</span> Security
          </h2>
          <p>We use industry-standard encryption to protect your account data and order history. Your password is hashed before being stored in our database.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-primary font-mono text-sm">03.</span> Cookies
          </h2>
          <p>We use essential cookies to keep you logged in and remember your shopping cart between sessions on your device.</p>
        </section>
      </div>
    </div>
  );
}
