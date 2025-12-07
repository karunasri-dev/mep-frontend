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

export default function Home({ onNavigateToTeams }) {
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

      {/* Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <CardItem key={card.id} {...card} />
        ))}
      </div> */}
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={card.onClick}
              className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ${
                card.onClick ? "cursor-pointer" : ""
              }`}
            >
              {/* Background Pattern */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${card.bgPattern} opacity-50`}
              />

              {/* Decorative Circle */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white opacity-10 rounded-full" />
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white opacity-10 rounded-full" />

              {/* Content */}
              <div className="relative p-6">
                {/* Icon */}
                <div
                  className={`inline-flex p-4 rounded-2xl bg-linear-to-br ${
                    card.gradient
                  } shadow-lg mb-4 ${card.pulse ? "animate-pulse" : ""}`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Live Indicator */}
                {card.pulse && (
                  <div className="absolute top-6 right-6 flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <span className="text-red-600 text-sm">LIVE</span>
                  </div>
                )}

                {/* Value */}
                <div className="mb-2">
                  <div
                    className={`text-5xl bg-linear-to-r ${card.gradient} bg-clip-text text-transparent`}
                  >
                    {card.value}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-gray-900 mb-1">{card.title}</h3>

                {/* Subtitle */}
                <p className="text-gray-600">{card.subtitle}</p>

                {/* Click Indicator */}
                {card.onClick && (
                  <div className="mt-4 flex items-center gap-2 text-gray-500 text-sm">
                    <span>Click to view details</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Bottom Accent */}
              <div className={`h-1 bg-linear-to-r ${card.gradient}`} />
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
