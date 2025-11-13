// Navigation Component
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

const Navigation = ({
  activePage,
  setActivePage,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "bulls", label: "Bulls & Owners", icon: Users },
    { id: "teams", label: "Teams", icon: UserSquare2 },
    { id: "drivers", label: "Drivers", icon: Trophy },
    { id: "events", label: "Events", icon: Calendar },
    { id: "statistics", label: "Statistics", icon: BarChart3 },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden bg-white shadow-md px-4 py-3 flex justify-between items-center">
        <span className="font-semibold text-gray-700">Menu</span>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-700 p-2"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all ${
                    activePage === item.id
                      ? "text-orange-600 border-b-3 border-orange-600 bg-orange-50"
                      : "text-gray-600 hover:text-orange-500 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="lg:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 font-medium transition-all rounded-lg mb-1 ${
                    activePage === item.id
                      ? "text-orange-600 bg-orange-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
};

export default Navigation;
