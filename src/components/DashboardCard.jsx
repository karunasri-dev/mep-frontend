import { Link } from "react-router-dom";

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  accentBorder,
  bgTint,
  iconColor,
  to,
}) => {
  const Wrapper = to ? Link : "div";

  return (
    <Wrapper
      to={to}
      className={`block border border-stone-300 border-l-4 ${accentBorder}
                  ${bgTint}
                  p-6 transition hover:border-amber-600
                  ${to ? "cursor-pointer" : ""}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-stone-600">{title}</p>
          <p className="text-3xl font-serif text-stone-900 mt-1">
            {value ?? "—"}
          </p>
        </div>

        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
    </Wrapper>
  );
};

export default DashboardCard;
