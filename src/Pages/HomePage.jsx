import { ShimmerCardH } from "../components/ShimmerEffect";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import DashboardCard from "../components/DashboardCard";
import {
  UserIcon,
  History,
  YoutubeIcon,
  Contact,
  CalendarDays,
  Trophy,
} from "lucide-react";

const HomePage = ({ loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ShimmerCardH key={i} />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Active Owners",
      value: 156,
      icon: UserIcon,
      accentBorder: "border-emerald-600",
      bgTint: "bg-emerald-50",
      iconColor: "text-emerald-700",
      to: "/teams",
    },
    {
      title: "Active Bulls",
      value: 156,
      icon: Trophy,
      accentBorder: "border-red-600",
      bgTint: "bg-red-50",
      iconColor: "text-red-700",
    },
    {
      title: "Upcoming Events",
      value: 4,
      icon: CalendarDays,
      accentBorder: "border-blue-600",
      bgTint: "bg-blue-50",
      iconColor: "text-blue-700",
    },
    {
      title: "Live Events",
      value: 1,
      icon: YoutubeIcon,
      accentBorder: "border-amber-600",
      bgTint: "bg-amber-50",
      iconColor: "text-amber-700",
    },
    {
      title: "History",
      value: null,
      icon: History,
      accentBorder: "border-violet-600",
      bgTint: "bg-violet-50",
      iconColor: "text-violet-700",
    },
    {
      title: "Contact & Help",
      value: null,
      icon: Contact,
      accentBorder: "border-teal-600",
      bgTint: "bg-teal-50",
      iconColor: "text-teal-700",
    },
  ];

  return (
    <>
      <Header />
      <Navigation />

      <div className="bg-stone-100 p-10 space-y-6">
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
