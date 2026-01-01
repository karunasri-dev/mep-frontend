import { useState } from "react";
import { Menu, X, Trophy } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../../components/Header";

const adminTabs = [
  { id: "home", label: "Dashboard Home", path: "/admin/home" },
  { id: "teams", label: "Teams", path: "/admin/teams" },
  { id: "users", label: "User Approvals", path: "/admin/users" },
  { id: "events", label: "Event Management", path: "/admin/events" },
  { id: "champions", label: "Champions", path: "/admin/champions" },
];

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fbf6ee]">
      {/* HEADER */}
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-lg">
              <Trophy className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-stone-900 font-serif font-bold text-xl leading-none">Admin Dashboard</h1>
              <p className="text-stone-500 text-xs font-medium tracking-wide mt-1">BULL RACE MANAGEMENT</p>
            </div>
          </div>
          {/* <Header /> */}

          <button
            className="lg:hidden p-2 rounded-md hover:bg-stone-100 text-stone-600"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* NAVIGATION */}
      <nav
        className={`lg:block ${open ? "block" : "hidden"} bg-white border-b border-stone-200`}
      >
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col lg:flex-row gap-1">
          {adminTabs.map((tab) => (
            <NavLink
              key={tab.id}
              to={tab.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${
                  isActive
                    ? "bg-amber-50 text-amber-700 shadow-sm border border-amber-100"
                    : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                }`
              }
              onClick={() => setOpen(false)}
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
