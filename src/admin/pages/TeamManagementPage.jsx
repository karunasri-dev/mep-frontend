import { useEffect, useState } from "react";
import SearchFilterBar from "../components/TeamApproval/SearchFilterBar";
import UserCard from "../components/TeamApproval/TeamCard";
import { fetchAllTeams } from "../../services/team.service";
import toast from "react-hot-toast";

export default function TeamManagementPage() {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAllTeams();
        setTeams(data);
      } catch {
        toast.error("Failed to load teams");
      }
    };
    load();
  }, []);

  const filteredTeams = teams.filter((team) => {
    const s = searchTerm.toLowerCase();

    const matchesSearch =
      team.teamName.toLowerCase().includes(s) ||
      team.createdBy?.name?.toLowerCase().includes(s);

    const matchesStatus =
      filterStatus === "all" || team.status.toLowerCase() === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h2>Team Management</h2>

      <SearchFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        showStatusFilter
      />

      {filteredTeams.map((team) => (
        <UserCard
          key={team._id}
          user={{
            id: team._id,
            name: team.createdBy?.name,
            phone: team.createdBy?.mobileNumber,
            eventName: team.teamName,
            registrationDate: team.createdAt,
            status: team.status.toLowerCase(),
          }}
        />
      ))}
    </div>
  );
}
