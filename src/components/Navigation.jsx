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

const Navigation = () => {
  // Navigation OWNS its state now (correct design)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      path: "/statistics",
    },
    { id: "register", label: "Register", icon: UserSquare2, path: "/register" },
  ];

  return (
    <>
      {/* ===== Mobile Header ===== */}
      <div className="lg:hidden bg-white shadow-md px-4 py-3 flex justify-between items-center sticky top-0 z-50">
        <span className="font-semibold text-gray-700">Menu</span>

        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          className="text-gray-700 p-2"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ===== Desktop Navigation ===== */}
      <nav className="hidden lg:block bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end={item.path === "/"} // important for root route
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-6 py-4 font-medium transition-all
                    ${
                      isActive
                        ? "text-orange-600 border-b-4 border-orange-600 bg-orange-50"
                        : "text-gray-600 hover:text-orange-500 hover:bg-gray-50"
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

      {/* ===== Mobile Navigation ===== */}
      {mobileMenuOpen && (
        <nav className="lg:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-2">
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
                        ? "text-orange-600 bg-orange-50"
                        : "text-gray-600 hover:bg-gray-50"
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
