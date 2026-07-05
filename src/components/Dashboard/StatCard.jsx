
export default function StatCard({ title, value, icon: Icon, description, badge }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex items-start justify-between">
      <div className="space-y-2">
        <span className="text-sm font-medium text-slate-500 block">{title}</span>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold tracking-tight text-slate-900">{value}</span>
          {badge && (
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${badge.className}`}>
              {badge.text}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-slate-400 font-medium">{description}</p>
        )}
      </div>
      {Icon && (
        <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-slate-700">
          <Icon className="h-6 w-6 text-slate-500" />
        </div>
      )}
    </div>
  );
}
