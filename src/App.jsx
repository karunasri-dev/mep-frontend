import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import DashboardPage from "./pages/DashboardPage";
import TeamsPage from "./pages/TeamsPage";
import BullsPage from "./pages/BullsPage";
import Choice from "./pages/auth/Choice";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Otp from "./pages/auth/Otp";
import Success from "./pages/auth/Success";
import HomePage from "./Pages/HomePage";
import HomePage2 from "./Pages/HomePage2";
import HomePage3 from "./Pages/HomePage3";
import HomePage4 from "./Pages/HomePage4";

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
    [
      "/",
      "/auth",
      "/auth/otp",
      "/auth/success",
      "/login",
      "/register",
      "/2",
      "/3",
      "/4",
    ].includes(location.pathname) || location.pathname.startsWith("/admin");

  return (
    <>
      {hideNavbarFooter ? (
        <div className="h-screen bg-gray-200 md:pt-10 pt-4 pb-40">
          <Routes>
            <Route path="/auth" element={<Choice />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/otp" element={<Otp />} />
            <Route path="/auth/success" element={<Success />} />
            {/* <Route path="/forgot-password" element={<LoginPage />} /> */}

            <Route path="/" element={<HomePage />} />
            <Route path="/2" element={<HomePage2 />} />
            <Route path="/3" element={<HomePage3 />} />
            <Route path="/4" element={<HomePage4 />} />
          </Routes>
        </div>
      ) : null}
      <div className="min-h-screen bg-gray-100">
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

          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route
                path="/dashboard"
                element={<DashboardPage loading={loading} />}
              />
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
