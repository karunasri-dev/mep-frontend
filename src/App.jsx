import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./components/Header";
import Navigation from "./components/Navigation";

// user pages
import DashboardPage from "./Pages/DashboardPage";
import TeamsPage from "./pages/TeamsPage";
import BullsPage from "./pages/BullsPage";
// import GenericPage from "./pages/GenericPage";

import Choice from "./pages/auth/Choice";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import HomePage from "./Pages/HomePage";

// admin pages
import Dashboard from "./admin/pages/DashboardLayout";
import Layout from "./admin/components/Layout/Layout";
import UserApprovals from "./admin/pages/UserApprovals";
import EventManagement from "./admin/pages/EventManagement";
import ChampionManagement from "./admin/pages/ChampionManagment";
import ActiveTeams from "./admin/pages/ActiveTeams";
import TeamDetails from "./admin/components/ActiveTeams/TeamDetails";
import Home from "./admin/pages/HomePage";

import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const GenericPage = ({ title, loading }) => {
  if (loading) return <ShimmerTable />;
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {" "}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>{" "}
      <p className="text-gray-600">
        {" "}
        Content for {title} will be displayed here.{" "}
      </p>{" "}
    </div>
  );
};
/* -------------------------
      PUBLIC ROUTES LAYOUT
------------------------- */
function PublicLayout({ children }) {
  return <div className="min-h-screen bg-gray-200 ">{children}</div>;
}

/* -------------------------
      USER ROUTES LAYOUT
------------------------- */
function UserLayout({ children, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Navigation
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

/* -------------------------
      ADMIN ROUTES LAYOUT
------------------------- */

function AdminRoutes() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route element={<Dashboard />}>
        <Route index element={<Navigate to="users" replace />} />
        <Route path="/admin/users" element={<UserApprovals />} />
        <Route path="/admin/events" element={<EventManagement />} />
        <Route path="/admin/champions" element={<ChampionManagement />} />
        <Route
          path="/admin/teams"
          element={
            <ActiveTeams
              onNavigateToTeamDetails={(id) =>
                navigate(`/admin/teams-details/${id}`)
              }
              onBack={() => navigate("/admin/home")}
            />
          }
        />
        <Route path="/admin/teams-details/:id" element={<TeamDetails />} />
        <Route
          path="/admin/home"
          element={<Home onNavigateToTeams={() => navigate("/admin/teams")} />}
        />
      </Route>
    </Routes>
  );
}
/* -------------------------
          MAIN APP
------------------------- */
function AppContent() {
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLogin } = useAuth() || {};
  const location = useLocation();

  const PUBLIC_PATHS = ["/", "/auth", "/login", "/register"];

  const isPublic = PUBLIC_PATHS.includes(location.pathname);
  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      {isPublic && (
        <PublicLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/auth" element={<Choice />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </PublicLayout>
      )}

      {!isPublic && !isAdmin && (
        <UserLayout
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        >
          <Routes>
            <Route
              path="/dashboard"
              element={<DashboardPage loading={loading} />}
            />
            <Route path="/teams" element={<TeamsPage loading={loading} />} />
            <Route path="/bulls" element={<BullsPage loading={loading} />} />

            <Route
              path="/drivers"
              element={<GenericPage title="Drivers" loading={loading} />}
            />
            <Route
              path="/events"
              element={<GenericPage title="Events" loading={loading} />}
            />
            <Route
              path="/statistics"
              element={<GenericPage title="Statistics" loading={loading} />}
            />
          </Routes>
        </UserLayout>
      )}

      {isAdmin && <AdminRoutes />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
