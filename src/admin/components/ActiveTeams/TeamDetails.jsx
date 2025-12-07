import { ArrowLeft } from "lucide-react";
import TeamHero from "./TeamHero";
import TeamStats from "./TeamStats";
import RecentEvents from "./RecentEvents";
import TeamMembers from "./TeamMembers";
import BullInfo from "./BullInfo";

export default function TeamDetails({ teamId, onBack }) {
  // your mock team data remains same here
  const team = {
    id: teamId,
    name: "Thunder Riders",
    owner: "Rajesh Kumar",
    bullName: "Thunderbolt",
    location: "Mangalore, Karnataka",
    established: "2020",
    members: 8,
    totalEvents: 12,
    wins: 5,
    podiums: 9,
    image: "🐂",
    description:
      "One of the most competitive teams in the coastal region, known for their exceptional training techniques and championship-winning performances.",
    stats: {
      winRate: "41.7%",
      bestTime: "2:34.12",
      totalPrizes: "₹18,50,000",
      currentRank: 3,
    },
    recentEvents: [
      {
        name: "Summer Bull Race 2024",
        date: "2024-08-15",
        position: 1,
        prize: "₹5,00,000",
      },
      {
        name: "Coastal Championship",
        date: "2024-09-20",
        position: 3,
        prize: "₹2,00,000",
      },
      {
        name: "Monsoon Cup",
        date: "2024-10-05",
        position: 2,
        prize: "₹3,50,000",
      },
      {
        name: "Winter Festival",
        date: "2024-11-12",
        position: 5,
        prize: "₹50,000",
      },
    ],
    teamMembers: [
      { name: "Rajesh Kumar", role: "Owner & Trainer" },
      { name: "Suresh Patil", role: "Assistant Trainer" },
      { name: "Mahesh Naik", role: "Handler" },
      { name: "Ganesh Hegde", role: "Veterinarian" },
      { name: "Anil Rao", role: "Nutritionist" },
      { name: "Kiran Poojary", role: "Equipment Manager" },
      { name: "Mohan Bhandary", role: "Support Staff" },
      { name: "Prakash Shetty", role: "Support Staff" },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Teams
      </button>

      <TeamHero team={team} />
      <TeamStats stats={team.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentEvents events={team.recentEvents} />
        </div>

        <TeamMembers members={team.teamMembers} />
      </div>

      <BullInfo team={team} />
    </div>
  );
}
