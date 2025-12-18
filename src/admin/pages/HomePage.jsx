import {
  Users,
  Calendar,
  TrendingUp,
  Radio,
  BarChart3,
  Award,
} from "lucide-react";
import CardItem from "../components/Home/CardItem";
import QuickStat from "../components/Home/QuickStat";
import RecentActivityItem from "../components/Home/RecentAvtivityItem";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const onNavigateToTeams = () => {
    navigate("/admin/teams");
  };
  const cards = [
    {
      id: "active-teams",
      title: "Active Teams",
      value: "24",
      subtitle: "Teams currently registered",
      icon: Users,
      gradient: "from-blue-500 to-blue-700",
      bgPattern: "from-blue-50 to-blue-100",
      onClick: onNavigateToTeams,
      pulse: false,
    },
    {
      id: "total-events",
      title: "Total Events",
      value: "12",
      subtitle: "Events this season",
      icon: Calendar,
      gradient: "from-purple-500 to-purple-700",
      bgPattern: "from-purple-50 to-purple-100",
    },
    {
      id: "upcoming-events",
      title: "Upcoming Events",
      value: "5",
      subtitle: "Next 30 days",
      icon: TrendingUp,
      gradient: "from-green-500 to-green-700",
      bgPattern: "from-green-50 to-green-100",
    },
    {
      id: "live-events",
      title: "Live Events",
      value: "2",
      subtitle: "Currently ongoing",
      icon: Radio,
      gradient: "from-red-500 to-red-700",
      bgPattern: "from-red-50 to-red-100",
      pulse: true,
    },
    {
      id: "statistics",
      title: "Statistics",
      value: "1.2K",
      subtitle: "Total participants",
      icon: BarChart3,
      gradient: "from-orange-500 to-orange-700",
      bgPattern: "from-orange-50 to-orange-100",
    },
    {
      id: "champions",
      title: "Champions",
      value: "8",
      subtitle: "Winners this season",
      icon: Award,
      gradient: "from-amber-500 to-amber-700",
      bgPattern: "from-amber-50 to-amber-100",
    },
  ];

  const activities = [
    {
      action: "New team registration",
      team: "Thunder Riders",
      time: "5 minutes ago",
      color: "bg-blue-500",
    },
    {
      action: "Event completed",
      team: "Summer Bull Race",
      time: "2 hours ago",
      color: "bg-green-500",
    },
    {
      action: "Champion updated",
      team: "Lightning Storm",
      time: "5 hours ago",
      color: "bg-amber-500",
    },
    {
      action: "User approved",
      team: "Rajesh Kumar",
      time: "1 day ago",
      color: "bg-purple-500",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="mb-12 text-center">
        <h1 className="text-gray-900 mb-4">Welcome to Bull Race Management</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Monitor and manage all aspects of your bull racing events from this
          comprehensive dashboard.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.id}
              onClick={card.onClick}
              className={`border border-stone-300 bg-white p-6
          hover:border-amber-600 transition
          ${card.onClick ? "cursor-pointer" : ""}`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-stone-700 font-medium">{card.title}</h3>

                <Icon className="w-5 h-5 text-amber-700" />
              </div>

              {/* Value */}
              <div className="text-4xl font-serif text-stone-900 mb-1">
                {card.value}
              </div>

              {/* Subtitle */}
              <p className="text-sm text-stone-500">{card.subtitle}</p>

              {/* Indicator */}
              {card.onClick && (
                <p className="mt-4 text-sm text-amber-700 font-medium">
                  View details →
                </p>
              )}
              {card.pulse && (
                <span className="text-xs text-red-700 font-medium">● LIVE</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickStat
          label="Pending Approvals"
          value="18 Users"
          icon="⏳"
          color="yellow"
        />
        <QuickStat
          label="Total Prize Pool"
          value="₹42,00,000"
          icon="💰"
          color="green"
        />
        <QuickStat
          label="Completion Rate"
          value="94.5%"
          icon="📊"
          color="blue"
        />
      </div>

      {/* Recent Activity */}
      <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Recent Activity</h3>

        <div className="space-y-3">
          {activities.map((a, i) => (
            <RecentActivityItem key={i} {...a} />
          ))}
        </div>
      </div>
    </div>
  );
}
