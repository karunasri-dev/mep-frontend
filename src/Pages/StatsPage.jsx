import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Trophy, Users, Calendar, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  getBullPairStatsAPI,
  getTeamStatsAPI,
  getDayLeaderboardAPI,
} from "../services/stats/stats.api.js";
import toast from "react-hot-toast";

const COLORS = [
  "#f59e0b",
  "#10b981",
  "#f87171",
  "#60a5fa",
  "#a78bfa",
  "#ec4899",
  "#14b8a6",
  "#eab308",
];

export default function StatsPage() {
  const [activeTab, setActiveTab] = useState("bullpairs");
  const [bullPairStats, setBullPairStats] = useState([]);
  const [teamStats, setTeamStats] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  useEffect(() => {
    if (activeTab === "bullpairs") {
      fetchBullPairStats();
    } else if (activeTab === "teams") {
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

  const fetchLeaderboard = async () => {
    if (!selectedEvent || !selectedDay) return;

    try {
      setLoading(true);
      const res = await getDayLeaderboardAPI(selectedEvent, selectedDay);
      setLeaderboard(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "bullpairs", label: "BullPair Stats", icon: Trophy },
    { id: "teams", label: "Team Stats", icon: Users },
    { id: "leaderboard", label: "Day Leaderboard", icon: Calendar },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Statistics</h1>
        <p className="text-gray-600">
          Performance insights from completed games
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "bullpairs" && (
        <BullPairStatsTab stats={bullPairStats} loading={loading} />
      )}

      {activeTab === "teams" && (
        <TeamStatsTab stats={teamStats} loading={loading} />
      )}

      {activeTab === "leaderboard" && (
        <LeaderboardTab
          leaderboard={leaderboard}
          loading={loading}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          onFetch={fetchLeaderboard}
        />
      )}
    </div>
  );
}

function BullPairStatsTab({ stats, loading }) {
  if (loading) {
    return <div className="text-center py-8">Loading statistics...</div>;
  }

  if (stats.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No completed games yet
      </div>
    );
  }

  // Data for charts
  const winRateData = stats.map((s) => ({
    name: s.bullPairName,
    winRate: s.winRate,
    wins: s.totalWins,
  }));

  const performanceData = stats.map((s) => ({
    name: s.bullPairName,
    distance: s.maxDistance || 0,
    avgDistance: s.avgDistance || 0,
    rockWeight: s.maxRockWeight || 0,
  }));

  const distanceTimeData = stats.map((s) => ({
    name: s.bullPairName,
    distance: s.maxDistance || 0,
    time: s.bestTime || 0,
    prize: s.totalPrizeWon || 0,
  }));

  return (
    <div className="space-y-8">
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Win Rate Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Win Rate by BullPair
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={winRateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="winRate" fill="#f59e0b" name="Win Rate %" />
              <Bar dataKey="wins" fill="#10b981" name="Total Wins" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Performance Metrics Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance Metrics
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="distance" fill="#60a5fa" name="Max Distance (m)" />
              <Bar
                dataKey="avgDistance"
                fill="#a78bfa"
                name="Avg Distance (m)"
              />
              <Bar dataKey="rockWeight" fill="#ec4899" name="Max Rock (kg)" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Distance vs Time Scatter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Distance vs Time Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 80, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="distance" name="Distance (m)" />
              <YAxis dataKey="time" name="Best Time (s)" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter
                name="BullPairs"
                data={distanceTimeData}
                fill="#f59e0b"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Prize Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Prize Money Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.filter((s) => s.totalPrizeWon > 0)}
                dataKey="totalPrizeWon"
                nameKey="bullPairName"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {stats.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Detailed Statistics
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  BullPair Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plays
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Wins
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Win %
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Best Distance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Best Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Max Rock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Prize
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.map((stat, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {stat.bullPairName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stat.teamName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stat.totalPlays}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stat.totalWins}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stat.winRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stat.maxDistance}m
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stat.bestTime}s
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stat.maxRockWeight}kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{stat.totalPrizeWon}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

function TeamStatsTab({ stats, loading }) {
  if (loading) {
    return <div className="text-center py-8">Loading statistics...</div>;
  }

  if (stats.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No completed games yet
      </div>
    );
  }

  // Data for charts
  const performanceData = stats.map((s) => ({
    name: s.teamName,
    plays: s.totalBullPairPlays || 0,
    wins: s.totalWins || 0,
    prize: s.totalPrizeWon || 0,
  }));

  const prizeData = stats.map((s) => ({
    name: s.teamName,
    prize: s.totalPrizeWon || 0,
  }));

  return (
    <div className="space-y-8">
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Performance Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Team Performance Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="plays" fill="#60a5fa" name="Total Plays" />
              <Bar dataKey="wins" fill="#10b981" name="Total Wins" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Total Wins Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Wins Distribution by Team
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.filter((s) => s.totalWins > 0)}
                dataKey="totalWins"
                nameKey="teamName"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {stats.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Prize Money by Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Total Prize Money Earned
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={prizeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="prize" fill="#f59e0b" name="Prize (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Average Distance by Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Average Distance Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={stats.map((s) => ({
                name: s.teamName,
                avgDistance: s.avgDistance || 0,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="avgDistance"
                fill="#a78bfa"
                name="Avg Distance (m)"
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Detailed Team Statistics
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Plays
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Wins
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Prize
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Distance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Best BullPair
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.map((stat, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {stat.teamName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stat.totalBullPairPlays}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stat.totalWins}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{stat.totalPrizeWon}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stat.avgDistance}m
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stat.bestBullPair}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

function LeaderboardTab({
  leaderboard,
  loading,
  selectedEvent,
  setSelectedEvent,
  selectedDay,
  setSelectedDay,
  onFetch,
}) {
  // Chart data for leaderboard
  const leaderboardChartData = leaderboard.map((entry, index) => ({
    rank: index + 1,
    bullPair: entry.bullPair.substring(0, 10) + "...", // Truncate for chart
    distance: entry.distanceMeters || 0,
    time: entry.timeSeconds || 0,
    rockWeight: entry.rockWeightKg || 0,
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Select Event and Day
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Event</option>
            {/* Placeholder options - replace with real data */}
            <option value="event1">Event 1</option>
            <option value="event2">Event 2</option>
          </select>

          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!selectedEvent}
          >
            <option value="">Select Day</option>
            {/* Placeholder options - replace with real data */}
            <option value="day1">Day 1</option>
            <option value="day2">Day 2</option>
          </select>

          <button
            onClick={onFetch}
            disabled={!selectedEvent || !selectedDay || loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Get Leaderboard"}
          </button>
        </div>
      </div>

      {leaderboard.length > 0 && (
        <>
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Distance Performance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Distance Performance Ranking
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={leaderboardChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rank" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="distance" fill="#10b981" name="Distance (m)" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Distance vs Time Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Distance vs Time Scatter
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="distance" name="Distance (m)" />
                  <YAxis dataKey="time" name="Time (s)" />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter
                    name="Performances"
                    data={leaderboardChartData}
                    fill="#f59e0b"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Rock Weight Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Rock Weight Used
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={leaderboardChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rank" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="rockWeight"
                    stroke="#ec4899"
                    name="Rock Weight (kg)"
                    strokeWidth={2}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Time Performance Line Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Time Performance by Rank
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={leaderboardChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rank" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="time"
                    stroke="#60a5fa"
                    name="Time (s)"
                    strokeWidth={2}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Leaderboard Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Detailed Leaderboard
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      BullPair
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Team
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Distance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rock Weight
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Winner
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaderboard.map((entry, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-50 ${
                        entry.isWinner ? "bg-yellow-50" : ""
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.bullPair}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.team}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.distanceMeters}m
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.timeSeconds}s
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.rockWeightKg}kg
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {entry.isWinner ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Winner
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {!loading && leaderboard.length === 0 && selectedEvent && selectedDay && (
        <div className="text-center py-8 text-gray-500">
          No completed games for this day
        </div>
      )}
    </div>
  );
}
