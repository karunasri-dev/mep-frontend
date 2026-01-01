import { useState } from "react";
import TeamsHeader from "../components/ActiveTeams/TeamsHeader";
import TeamsSearchBar from "../components/ActiveTeams/TeamsSearchBar";
import TeamCard from "../components/ActiveTeams/TeamCard";
import { useNavigate } from "react-router-dom";

export default function ActiveTeams() {
  const navigate = useNavigate();

  const onBack = () => {
    navigate("/admin/");
  };
  const onNavigateToTeamDetails = (teamId) => {
    navigate(`/admin/teams-details/${teamId}`);
  };
  const [searchTerm, setSearchTerm] = useState("");

  const teams = [
    {
      id: "1",
      name: "Thunder Riders",
      owner: "Rajesh Kumar",
      bullName: "Thunderbolt",
      location: "Mangalore",
      members: 8,
      eventsParticipated: 12,
      wins: 5,
      status: "active",
      image: "🐂",
    },
    {
      id: "2",
      name: "Lightning Storm",
      owner: "Suresh Patil",
      bullName: "Lightning",
      location: "Udupi",
      members: 6,
      eventsParticipated: 10,
      wins: 3,
      status: "active",
      image: "⚡",
    },
    {
      id: "3",
      name: "Desert Warriors",
      owner: "Mahesh Naik",
      bullName: "Storm",
      location: "Kundapur",
      members: 7,
      eventsParticipated: 15,
      wins: 7,
      status: "active",
      image: "🏜️",
    },
    {
      id: "4",
      name: "Coastal Champions",
      owner: "Prakash Shetty",
      bullName: "Cyclone",
      location: "Surathkal",
      members: 9,
      eventsParticipated: 18,
      wins: 9,
      status: "active",
      image: "🌊",
    },
    {
      id: "5",
      name: "Mountain Kings",
      owner: "Ganesh Hegde",
      bullName: "Thunder",
      location: "Dharmasthala",
      members: 5,
      eventsParticipated: 8,
      wins: 2,
      status: "active",
      image: "⛰️",
    },
    {
      id: "6",
      name: "River Runners",
      owner: "Anil Rao",
      bullName: "Rapids",
      location: "Manipal",
      members: 7,
      eventsParticipated: 11,
      wins: 4,
      status: "active",
      image: "🌊",
    },
    {
      id: "7",
      name: "Forest Flames",
      owner: "Kiran Poojary",
      bullName: "Blaze",
      location: "Karkala",
      members: 6,
      eventsParticipated: 9,
      wins: 3,
      status: "active",
      image: "🔥",
    },
  ];

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fbf6ee] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif text-stone-800 font-medium">
              Active Teams
            </h1>
            <p className="text-stone-600 mt-1">
              Manage and view all registered teams
            </p>
          </div>
          <button
            onClick={onBack}
            className="px-4 py-2 text-amber-700 hover:bg-amber-50 rounded-lg transition-colors font-medium"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Search Bar Wrapper */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
          <TeamsSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onClick={() => onNavigateToTeamDetails(team.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
