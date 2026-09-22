const StatCard = ({ label, value, icon: Icon, accent = 'text-backwater-700' }) => (
  <div className="rounded-2xl border border-backwater-100 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-charcoal-800/70">{label}</p>
      {Icon && <Icon size={18} className={accent} />}
    </div>
    <p className="mt-2 font-display text-2xl font-semibold text-backwater-900">{value}</p>
  </div>
);

export default StatCard;
