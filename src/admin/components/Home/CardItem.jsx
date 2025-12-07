export default function CardItem({
  id,
  title,
  value,
  subtitle,
  icon: Icon,
  gradient,
  bgPattern,
  onClick,
  pulse,
}) {
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      {/* Background Pattern */}
      <div
        className={`absolute inset-0 bg-linear-to-br ${bgPattern} opacity-50`}
      />

      {/* Decorative Circles */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-white opacity-10 rounded-full" />
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-white opacity-10 rounded-full" />

      {/* Content */}
      <div className="relative p-6">
        <div
          className={`inline-flex p-4 rounded-2xl bg-linear-to-br ${gradient} shadow-lg mb-4 ${
            pulse ? "animate-pulse" : ""
          }`}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>

        {pulse && (
          <div className="absolute top-6 right-6 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-red-600 text-sm">LIVE</span>
          </div>
        )}

        <div className="mb-2">
          <div
            className={`text-5xl bg-linear-to-r ${gradient} bg-clip-text text-transparent`}
          >
            {value}
          </div>
        </div>

        <h3 className="text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600">{subtitle}</p>

        {onClick && (
          <div className="mt-4 flex items-center gap-2 text-gray-500 text-sm">
            <span>Click to view details</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        )}
      </div>

      <div className={`h-1 bg-=linear-to-r ${gradient}`} />
    </div>
  );
}
