import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import DashboardPage from "./pages/DashboardPage";
import TeamsPage from "./pages/TeamsPage";
import BullsPage from "./pages/BullsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
// import GenericPage from "./pages/GenericPage";
// import ParallaxPage from "./Pages/ParallaxPage";

const GenericPage = ({ title, loading }) => {
  if (loading) return <ShimmerTable />;

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-600">
        Content for {title} will be displayed here.
      </p>
    </div>
  );
};

const AppContent = () => {
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const hideNavbarFooter =
    ["/login", "/register", "/forgot-password"].includes(location.pathname) ||
    location.pathname.startsWith("/admin");

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <>
          {hideNavbarFooter ? null : (
            <>
              <Header />
              <Navigation
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
              />
            </>
          )}

          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>

          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<DashboardPage loading={loading} />} />
              <Route path="/bulls" element={<BullsPage loading={loading} />} />
              <Route path="/teams" element={<TeamsPage loading={loading} />} />
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
          </main>
        </>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
export default App;
