export default function AdminHomePage() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-on-surface-variant">Total Bookings</p>
        <p className="mt-2 font-display text-3xl font-semibold text-primary">128</p>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-on-surface-variant">Active Customers</p>
        <p className="mt-2 font-display text-3xl font-semibold text-primary">86</p>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-on-surface-variant">Revenue This Week</p>
        <p className="mt-2 font-display text-3xl font-semibold text-primary">$4,920</p>
      </div>
    </div>
  );
}
