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
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-amber-600" />
            <div>
              <h1 className="text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 text-sm">Bull Race Management</p>
            </div>
          </div>
          {/* <Header /> */}

          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* NAVIGATION */}
      <nav
        className={`lg:block ${open ? "block" : "hidden"} bg-white border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col lg:flex-row gap-2">
          {adminTabs.map((tab) => (
            <NavLink
              key={tab.id}
              to={tab.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-amber-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
