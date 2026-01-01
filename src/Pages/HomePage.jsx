import { ShimmerCardH } from "../components/ShimmerEffect";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import DashboardCard from "../components/DashboardCard";
import { useTeams } from "../context/TeamContext";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  History,
  YoutubeIcon,
  Contact,
  CalendarDays,
  Trophy,
} from "lucide-react";

const YOUTUBE_LIVE_URL = "https://www.youtube.com/@pnr0463?si=_w2AdJJgZFGfh7aO";
const INSTAGRAM_URL =
  "https://instagram.com/mana_edla_pandhalu?igsh=cnVkbDl2ZmVrMDVm";
const WHATSAPP_URL = "https://wa.me/9154143819";

const HomePage = ({ loading }) => {
  const navigate = useNavigate();
  const { teams } = useTeams();
  const activeBullsCount = teams?.bullPairs?.reduce(
    (acc, bullPair) => acc + bullPair.name,
    0
  );
  if (teams) {
    console.log("teams", teams);
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
        {[...Array(6)].map((_, i) => (
          <ShimmerCardH key={i} />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Active Owners",
      value: teams?.length || 0,
      icon: UserIcon,
      accentBorder: "border-emerald-600",
      bgTint: "bg-emerald-50",
      iconColor: "text-emerald-700",
      to: "/teams",
    },
    {
      title: "Active Bulls",
      value: activeBullsCount || 0,
      icon: Trophy,
      accentBorder: "border-red-600",
      bgTint: "bg-red-50",
      iconColor: "text-red-700",
    },
    {
      title: "Upcoming Events",
      value: 4, // replace with API later
      icon: CalendarDays,
      accentBorder: "border-blue-600",
      bgTint: "bg-blue-50",
      iconColor: "text-blue-700",
      to: "/events",
    },
    {
      title: "Live Events",
      value: 1,
      icon: YoutubeIcon,
      accentBorder: "border-amber-600",
      bgTint: "bg-amber-50",
      iconColor: "text-amber-700",
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
          label: "Instagram",
          onClick: () => window.open(INSTAGRAM_URL, "_blank"),
        },
        {
          label: "WhatsApp",
          onClick: () => window.open(WHATSAPP_URL, "_blank"),
        },
      ],
    },
  ];

  return (
    <>
      <Header />
      <Navigation />

      <div className="bg-stone-100 p-10 space-y-6 min-h-screen">
        <h2 className="text-2xl font-serif text-stone-800">
          Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <DashboardCard key={idx} {...card} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
