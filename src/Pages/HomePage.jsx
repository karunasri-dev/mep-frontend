import Header from "../components/Header";
import Navigation from "../components/Navigation";
import DashboardPage from "./DashboardPage";
import TeamsPage from "./TeamsPage";
import BullsPage from "./BullsPage";
import { ShimmerTable } from "../components/ShimmerEffect";

import { useState, useEffect } from "react";

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

// Main App Component
const Apps = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage loading={loading} />;
      case "teams":
        return <TeamsPage loading={loading} />;
      case "bulls":
        return <BullsPage loading={loading} />;
      case "drivers":
        return <GenericPage title="Drivers" loading={loading} />;
      case "events":
        return <GenericPage title="Events" loading={loading} />;
      case "statistics":
        return <GenericPage title="Statistics" loading={loading} />;
      default:
        return <DashboardPage loading={loading} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation
        activePage={activePage}
        setActivePage={setActivePage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main className="container mx-auto px-4 py-8">{renderPage()}</main>
    </div>
  );
};

export default Apps;
