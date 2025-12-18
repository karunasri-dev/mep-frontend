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
    {
      id: "8",
      name: "Golden Eagles",
      owner: "Mohan Bhandary",
      bullName: "Eagle",
      location: "Puttur",
      members: 8,
      eventsParticipated: 14,
      wins: 6,
      status: "active",
      image: "🦅",
    },
  ];

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.bullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <TeamsHeader onBack={onBack} activeCount={teams.length} />

      <TeamsSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTeams.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No teams found matching your search
          </div>
        ) : (
          filteredTeams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onClick={() => onNavigateToTeamDetails(team.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
