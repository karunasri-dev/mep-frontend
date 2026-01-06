import { CardSkeleton } from "../components/ShimmerEffect";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import DashboardCard from "../components/DashboardCard";
import { useTeams } from "../context/TeamContext";
import { useNavigate } from "react-router-dom";
import { getAllEvents } from "../services/events/event.api";
import { getDashboardCountsAPI } from "../services/dashboard/dashboard.api";
import {
  UserIcon,
  History,
  YoutubeIcon,
  Contact,
  CalendarDays,
  Trophy,
  Instagram,
} from "lucide-react";
import { useState, useEffect } from "react";

const YOUTUBE_LIVE_URL = "https://www.youtube.com/@pnr0463?si=_w2AdJJgZFGfh7aO";
const INSTAGRAM_URL =
  "https://instagram.com/mana_edla_pandhalu?igsh=cnVkbDl2ZmVrMDVm";
const WHATSAPP_URL = "https://wa.me/9154143819";

const HomePage = ({ loading }) => {
  const navigate = useNavigate();
  const { teams } = useTeams();
  const [dashboardCounts, setDashboardCounts] = useState({
    activeTeams: 0,
    activeBulls: 0,
    totalEvents: 0,
  });
  const [countsLoading, setCountsLoading] = useState(true);

  // Fetch dashboard counts on component mount
  useEffect(() => {
    const fetchDashboardCounts = async () => {
      try {
        const response = await getDashboardCountsAPI();
        setDashboardCounts(response.data.data);
      } catch (error) {
        console.error("Failed to fetch dashboard counts:", error);
        // Fallback to local calculations if API fails
        const activeBullsCount =
          teams.reduce((acc, team) => acc + team.bullPairs.length, 0) * 2;
        setDashboardCounts({
          activeTeams: teams.length,
          activeBulls: activeBullsCount,
          totalEvents: 4, // fallback
        });
      } finally {
        setCountsLoading(false);
      }
    };

    fetchDashboardCounts();
  }, [teams]);

  const events = getAllEvents();

  console.log("events", events.data);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
        {[...Array(6)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Active Owners",
      value: countsLoading ? "..." : dashboardCounts.activeTeams,
      icon: UserIcon,
      accentBorder: "border-emerald-600",
      bgTint: "bg-emerald-50",
      iconColor: "text-emerald-700",
      to: "/teams",
    },
    {
      title: "Active Bulls",
      value: countsLoading ? "..." : dashboardCounts.activeBulls,
      icon: Trophy,
      accentBorder: "border-red-600",
      bgTint: "bg-red-50",
      iconColor: "text-red-700",
    },
    {
      title: "Total Events",
      value: countsLoading ? "..." : dashboardCounts.totalEvents,
      icon: CalendarDays,
      accentBorder: "border-blue-600",
      bgTint: "bg-blue-50",
      iconColor: "text-blue-700",
      to: "/events",
    },
    {
      title: "Youtube Live",
      icon: YoutubeIcon,
      accentBorder: "border-amber-600",
      bgTint: "bg-amber-50",
      iconColor: "text-amber-700",
      pulse: true,

      onClick: () => window.open(YOUTUBE_LIVE_URL, "_blank"),
    },
    {
      title: "History",
      icon: History,
      accentBorder: "border-violet-600",
      bgTint: "bg-violet-50",
      iconColor: "text-violet-700",
      onClick: () => navigate("/history"),
    },
    {
      title: "Contact & Help",
      icon: Contact,
      accentBorder: "border-teal-600",
      bgTint: "bg-teal-50",
      iconColor: "text-teal-700",
      expandable: true,
      actions: [
        {
          icon: Instagram,
          label: "Instagram",
          color: "text-rose-500",
          onClick: () => window.open(INSTAGRAM_URL, "_blank"),
        },
        {
          icon: Contact,
          label: "WhatsApp",
          color: "text-green-500",
          onClick: () => window.open(WHATSAPP_URL, "_blank"),
        },
      ],
    },
  ];

  return (
    <>
      <Header />
      <Navigation />

      <div className="min-h-screen bg-[#fbf6ee]">
        <div className="max-w-7xl mx-auto p-10 space-y-6">
          <h2 className="text-2xl font-serif text-stone-800">
            Dashboard Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, idx) => (
              <DashboardCard
                key={idx}
                {...card}
                loading={card.value === "..."}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
