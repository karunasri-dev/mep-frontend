import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import ResetPassword from "./Pages/auth/ResetPassword";

import HomePage from "./Pages/HomePage";
import Header from "./components/Header";
import Navigation from "./components/Navigation";

// user pages
import TeamsPage from "./Pages/TeamsPage";
import BullsPage from "./Pages/BullsPage";
import TeamDetailsPage from "./Pages/TeamDetailsPage";
import DriversPage from "./Pages/DriversPage";
import ProfilePage from "./Pages/ProfilePage";
import EventPage from "./Pages/EventPage";
import EventDetailsPage from "./Pages/EventDetailsPage";
import EventTeamDetailsPage from "./Pages/EventTeamDetailsPage";
import StatsPage from "./Pages/StatsPage";

// admin pages
import Dashboard from "./admin/pages/DashboardLayout";
import TeamApproval from "./admin/pages/TeamApproval";
import EventManagement from "./admin/pages/EventManagement";
import ChampionManagement from "./admin/pages/ChampionManagment";
import ActiveTeams from "./admin/pages/ActiveTeams";
import TeamDetails from "./admin/components/ActiveTeams/TeamDetails";
import Home from "./admin/pages/HomePage";
import AdminEventRegistrations from "./admin/pages/AdminEventRegistration";

// import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { ShimmerTable } from "./components/ShimmerEffect";

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
    <div className="min-h-screen bg-[#fbf6ee]">
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
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <Dashboard />{" "}
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="home" replace />} />
        <Route path="team-approval" element={<TeamApproval />} />
        <Route path="events" element={<EventManagement />} />
        <Route path="events/:eventId" element={<EventDetailsPage />} />
        {/* <Route path="champions" element={<ChampionManagement />} /> */}
        <Route path="teams" element={<ActiveTeams />} />
        <Route path="teams-details/:id" element={<TeamDetails />} />
        <Route path="home" element={<Home />} />
        <Route path="registrations" element={<AdminEventRegistrations />} />
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route
              path="/unauthorized"
              element={<div>Unauthorized Access</div>}
            />
          </Routes>
        </PublicLayout>
      )}

      {!isPublic && !isAdmin && (
        <UserLayout
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        >
          <Routes>
            <Route path="/teams" element={<TeamsPage loading={loading} />} />
            <Route path="/bulls" element={<BullsPage loading={loading} />} />

            <Route
              path="/drivers"
              element={<DriversPage loading={loading} />}
            />
            <Route path="/events" element={<EventPage loading={loading} />} />
            <Route
              path="/events/:id"
              element={<EventDetailsPage loading={loading} />}
            />
            <Route
              path="/events/:eventId/teams/:teamId"
              element={<EventTeamDetailsPage loading={loading} />}
            />
            <Route path="/stats" element={<StatsPage />} />
            <Route
              path="/teams/:id"
              element={<TeamDetailsPage loading={loading} />}
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage loading={loading} />
                </ProtectedRoute>
              }
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
