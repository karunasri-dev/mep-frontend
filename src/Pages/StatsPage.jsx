import React, { useState, useEffect, Suspense, lazy } from "react";
import { Trophy, Users, Calendar } from "lucide-react";
import { getBullPairStatsAPI, getTeamStatsAPI } from "../services/stats/stats.api.js";
import toast from "react-hot-toast";

// Lazy load tabs for performance
const BullPairStatsTab = lazy(() => import("../components/stats/tabs/BullPairStatsTab"));
const TeamStatsTab = lazy(() => import("../components/stats/tabs/TeamStatsTab"));
const LeaderboardTab = lazy(() => import("../components/stats/tabs/LeaderboardTab"));

function TabButton({ id, label, icon: Icon, active, onClick }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-white text-blue-600 shadow-sm ring-1 ring-gray-200"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
      }`}
    >
      <Icon className={`w-4 h-4 ${active ? "text-blue-600" : "text-gray-500"}`} />
      {label}
    </button>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
}

export default function StatsPage() {
  const [activeTab, setActiveTab] = useState("bullpairs");
  const [bullPairStats, setBullPairStats] = useState([]);
  const [teamStats, setTeamStats] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === "bullpairs" && bullPairStats.length === 0) {
      fetchBullPairStats();
    } else if (activeTab === "teams" && teamStats.length === 0) {
      fetchTeamStats();
    }
  }, [activeTab]);

  const fetchBullPairStats = async () => {
    try {
      setLoading(true);
      const res = await getBullPairStatsAPI();
      setBullPairStats(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load bull pair statistics");
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamStats = async () => {
    try {
      setLoading(true);
      const res = await getTeamStatsAPI();
      setTeamStats(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load team statistics");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "bullpairs", label: "BullPair Stats", icon: Trophy, description: "Performance analysis of individual bull pairs" },
    { id: "teams", label: "Team Stats", icon: Users, description: "Team rankings and overall dominance" },
    { id: "leaderboard", label: "Day Leaderboard", icon: Calendar, description: "Event results and daily top performers" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Statistics</h1>
          <p className="text-gray-600">
            {tabs.find(t => t.id === activeTab)?.description}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 bg-gray-100/50 p-1.5 rounded-xl w-fit">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              id={tab.id}
              label={tab.label}
              icon={tab.icon}
              active={activeTab === tab.id}
              onClick={setActiveTab}
            />
          ))}
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          <Suspense fallback={<LoadingSpinner />}>
            {activeTab === "bullpairs" && (
              loading ? <LoadingSpinner /> : <BullPairStatsTab stats={bullPairStats} />
            )}

            {activeTab === "teams" && (
              loading ? <LoadingSpinner /> : <TeamStatsTab stats={teamStats} />
            )}

            {activeTab === "leaderboard" && (
              <LeaderboardTab />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
