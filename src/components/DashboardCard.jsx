import { useState } from "react";
import { Link } from "react-router-dom";

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  accentBorder,
  bgTint,
  iconColor,
  to,
  pulse,
  onClick,
  expandable = false,
  actions = [],
  loading = false,
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    if (to) return;
    e.stopPropagation();
    if (onClick) onClick();
    else if (expandable) setOpen((prev) => !prev);
  };

  const Wrapper = to ? Link : "div";
  const iconClass = iconColor ? iconColor : "text-amber-700";
  const SafeIcon = typeof Icon === "function" ? Icon : null;

  return (
    <Wrapper
      to={to}
      onClick={handleClick}
      className={`block border border-stone-300 border-l-4 ${accentBorder}
        ${bgTint}
        p-6 rounded-lg transition-all
        hover:border-amber-600 hover:shadow-sm
        cursor-pointer`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-stone-600">{title}</p>
          {value !== undefined && (
            <p className="text-3xl font-serif text-stone-900 mt-1">
              {loading ? (
                <div className="h-8 bg-stone-200 rounded animate-pulse w-16"></div>
              ) : (
                value ?? "—"
              )}
            </p>
          )}
        </div>

        {pulse ? (
          <div className="relative w-12 h-12">
            <span
              className="absolute inset-0 rounded-full bg-red-500/40 animate-ping"
              style={{ animationDuration: "3s" }}
            />
            <Icon className={`relative z-10 w-12 h-12 ${iconClass}`} />
          </div>
        ) : (
          <Icon className={`w-6 h-6 ${iconClass}`} />
        )}
      </div>

      {open && actions.length > 0 && (
        <div className="mt-4 pt-3 flex gap-3">
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
              }}
              className="text-sm text-blue-700 hover:underline flex items-center gap-2"
            >
              <action.icon className={`w-6 h-6 ${action.color}`} />

              {/* {typeof action.icon === "function" && (
                <action.icon className={`w-6 h-6 ${action.color}`} />
              )} */}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </Wrapper>
  );
};

export default DashboardCard;
