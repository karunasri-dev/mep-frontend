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
      onClick: onNavigateToTeams,
    },
    {
      id: "total-events",
      title: "Total Events",
      value: "12",
      subtitle: "Events this season",
      icon: Calendar,
    },
    {
      id: "upcoming-events",
      title: "Upcoming Events",
      value: "5",
      subtitle: "Next 30 days",
      icon: TrendingUp,
    },
    {
      id: "live-events",
      title: "Live Events",
      value: "2",
      subtitle: "Currently ongoing",
      icon: Radio,
      pulse: true,
    },
    {
      id: "statistics",
      title: "Statistics",
      value: "1.2K",
      subtitle: "Total participants",
      icon: BarChart3,
    },
    {
      id: "champions",
      title: "Champions",
      value: "8",
      subtitle: "Winners this season",
      icon: Award,
    },
  ];

  const activities = [
    {
      action: "New team registration",
      team: "Thunder Riders",
      time: "5 minutes ago",
    },
    {
      action: "Event completed",
      team: "Summer Bull Race",
      time: "2 hours ago",
    },
    {
      action: "Champion updated",
      team: "Lightning Storm",
      time: "5 hours ago",
    },
    {
      action: "User approved",
      team: "Rajesh Kumar",
      time: "1 day ago",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-serif font-medium text-stone-900 mb-4">Welcome to Bull Race Management</h1>
        <p className="text-stone-600 max-w-2xl mx-auto text-lg">
          Monitor and manage all aspects of your bull racing events from this
          comprehensive dashboard.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <CardItem key={card.id} {...card} />
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-12">
        <h3 className="text-xl font-serif text-stone-800 font-medium mb-6 px-1">Quick Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickStat
            label="Pending Approvals"
            value="18 Users"
            icon="⏳"
          />
          <QuickStat
            label="Total Prize Pool"
            value="₹42,00,000"
            icon="💰"
          />
          <QuickStat
            label="Completion Rate"
            value="94.5%"
            icon="📊"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-12 bg-white rounded-xl shadow-sm border border-stone-200 p-8">
        <h3 className="text-xl font-serif text-stone-800 font-medium mb-6">Recent Activity</h3>

        <div className="space-y-4">
          {activities.map((a, i) => (
            <RecentActivityItem key={i} {...a} />
          ))}
        </div>
      </div>
    </div>
  );
}
