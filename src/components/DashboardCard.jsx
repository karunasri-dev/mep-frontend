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
  onClick,
  expandable = false,
  actions = [],
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (to) return;
    if (onClick) onClick();
    else if (expandable) setOpen((prev) => !prev);
  };

  const Wrapper = to ? Link : "div";

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
              {value ?? "—"}
            </p>
          )}
        </div>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>

      {open && actions.length > 0 && (
        <div className="mt-4 space-y-2 border-t pt-3">
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
              }}
              className="block text-sm text-blue-700 hover:underline"
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </Wrapper>
  );
};

export default DashboardCard;
