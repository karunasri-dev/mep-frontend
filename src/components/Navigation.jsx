import { Link, useLocation } from "react-router-dom";
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

const Navigation = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const location = useLocation();
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
    {
      id: "register",
      label: "Register",
      icon: UserSquare2,
      path: "/register",
      style: "md:ml-50",
    },
  ];

  return (
    <>
      <div className="lg:hidden bg-white shadow-md px-4 py-3 flex justify-between items-center">
        <span className="font-semibold text-gray-700">Menu</span>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-700 p-2"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav className="hidden lg:block bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all ${item.style?.trim()} ${
                    active
                      ? "text-orange-600 border-b-4 border-orange-600 bg-orange-50"
                      : "text-gray-600 hover:text-orange-500 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <nav className="lg:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 font-medium transition-all rounded-lg mb-1 ${
                    location.pathname === item.path
                      ? "text-orange-600 bg-orange-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
};

export default Navigation;
