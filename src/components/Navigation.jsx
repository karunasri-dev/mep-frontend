import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  UserSquare2,
  Trophy,
  Calendar,
  BarChart3,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navigation = () => {
  // Navigation OWNS its state now (correct design)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { isLogin } = useAuth() || {};

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/" },
    { id: "bulls", label: "Bulls & Owners", icon: Users, path: "/bulls" },
    { id: "teams", label: "Teams", icon: UserSquare2, path: "/teams" },
    { id: "drivers", label: "Drivers", icon: Trophy, path: "/drivers" },
    { id: "events", label: "Events", icon: Calendar, path: "/events" },
    {
      id: "statistics",
      label: "Statistics",
      icon: BarChart3,
      path: "/stats",
    },
    {
      id: `${isLogin ? "profile" : "register"}`,
      label: `${isLogin ? "Profile" : "Register"}`,
      icon: UserSquare2,
      path: `${isLogin ? "/profile" : "/register"}`,
    },
  ];

  return (
    <>
      <div className="lg:hidden bg-white/80 backdrop-blur-md border-b border-stone-200 px-4 py-3 flex justify-between items-center sticky top-0 z-50">
        <span className="font-semibold text-stone-700">Menu</span>

        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          className="text-stone-700 p-2 rounded-md hover:bg-stone-100"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav className="hidden lg:block bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end={item.path === "/"} // important for root route
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-6 py-4 font-medium transition-all rounded-lg
                    ${
                      isActive
                        ? "text-amber-700 bg-amber-50 border border-amber-100 shadow-sm"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <nav className="lg:hidden bg-white/80 backdrop-blur-md border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `w-full flex items-center space-x-3 px-4 py-3 font-medium transition-all rounded-lg mb-1
                    ${
                      isActive
                        ? "text-amber-700 bg-amber-50 border border-amber-100"
                        : "text-stone-600 hover:bg-stone-50"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
};

export default Navigation;
