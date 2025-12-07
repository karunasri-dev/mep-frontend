import { NavLink } from "react-router-dom";
import { Users, Calendar, Trophy, Home } from "lucide-react";

const tabs = [
  { path: "/admin/home", label: "Home", icon: Home },
  { path: "/admin/users", label: "User Approvals", icon: Users },
  { path: "/admin/events", label: "Event Management", icon: Calendar },
  { path: "/admin/champions", label: "Champions", icon: Trophy },
];

export default function Sidebar({ mobileMenuOpen }) {
  return (
    <nav className={`mb-8 ${mobileMenuOpen ? "block" : "hidden"} lg:block`}>
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-amber-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
