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
import DashboardPage from "./pages/DashboardPage";
import TeamsPage from "./pages/TeamsPage";
import BullsPage from "./pages/BullsPage";
// import GenericPage from "./pages/GenericPage";

import Choice from "./pages/auth/Choice";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Otp from "./pages/auth/Otp";
import Success from "./pages/auth/Success";

import HomePage from "./Pages/HomePage";
import HomePage2 from "./Pages/HomePage2";
import HomePage3 from "./Pages/HomePage3";
import HomePage4 from "./Pages/HomePage4";

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
  return (
    <div className="h-screen bg-gray-200 md:pt-10 pt-4 pb-40">{children}</div>
  );
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
// function AdminLayout() {
//   return (
//     <Layout>
//       <Routes>
//         <Route path="/admin" element={<Navigate to="/admin/users" replace />} />
//         <Route path="/admin/users" element={<UserApprovals />} />
//         <Route path="/admin/events" element={<EventManagement />} />
//         <Route path="/admin/champions" element={<ChampionManagement />} />
//         <Route path="/admin/teams" element={<ActiveTeams />} />
//         <Route path="/admin/home" element={<Home />} />
//       </Routes>
//     </Layout>
//   );
// }

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

  const PUBLIC_PATHS = [
    "/",
    "/auth",
    "/auth/otp",
    "/auth/success",
    "/login",
    "/register",
    "/2",
    "/3",
    "/4",
  ];

  const isPublic = PUBLIC_PATHS.includes(location.pathname);
  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isPublic && (
        <PublicLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/2" element={<HomePage2 />} />
            <Route path="/3" element={<HomePage3 />} />
            <Route path="/4" element={<HomePage4 />} />

            <Route path="/auth" element={<Choice />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/otp" element={<Otp />} />
            <Route path="/auth/success" element={<Success />} />
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
