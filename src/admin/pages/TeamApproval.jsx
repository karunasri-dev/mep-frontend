import { useEffect, useState } from "react";
import SearchFilterBar from "../components/TeamApproval/SearchFilterBar";
import TeamCard from "../components/TeamApproval/TeamCard";
import {
  fetchPendingTeamsAPI,
  decideTeamAPI,
} from "../../services/teams/index";
import toast from "react-hot-toast";

export default function TeamApproval() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // 🔹 FETCH PENDING TEAMS
  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await fetchPendingTeamsAPI();
        setTeams(data);
      } catch (err) {
        toast.error(err.message || "Failed to load pending teams");
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  // 🔹 APPROVE
  const handleApprove = async (teamId) => {
    try {
      await decideTeamAPI(teamId, "APPROVED");
      setTeams((prev) => prev.filter((t) => t._id !== teamId));
      toast.success("Team approved");
    } catch (err) {
      toast.error(err.message || "Approval failed");
    }
  };

  // 🔹 REJECT
  const handleReject = async (teamId) => {
    const reason = prompt("Enter rejection reason");
    if (!reason) return;

    try {
      await decideTeam(teamId, "REJECTED", reason);
      setTeams((prev) => prev.filter((t) => t._id !== teamId));
      toast.success("Team rejected");
    } catch (err) {
      toast.error(err.message || "Rejection failed");
    }
  };

  // 🔹 FILTERING (FRONTEND-ONLY)
  const filteredTeams = teams.filter((team) => {
    const s = searchTerm.toLowerCase();

    const matchesSearch =
      team.teamName.toLowerCase().includes(s) ||
      team.createdBy?.name?.toLowerCase().includes(s);

    const matchesFilter =
      filterStatus === "all" || team.status.toLowerCase() === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const pendingCount = teams.length;

  if (loading) {
    return <div className="text-center py-12">Loading pending teams…</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-gray-900 mb-2">Team Approvals</h2>
        <p className="text-gray-600">
          Review and approve team registrations
          {pendingCount > 0 && (
            <span className="ml-2 inline-flex px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
              {pendingCount} pending
            </span>
          )}
        </p>
      </div>

      <SearchFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <div className="space-y-4">
        {filteredTeams.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No pending teams found
          </div>
        ) : (
          filteredTeams.map((team) => (
            <TeamCard
              key={team._id}
              user={{
                id: team._id,
                name: team.createdBy?.name,
                phone: team.createdBy?.mobileNumber,
                eventName: team.teamName,
                registrationDate: team.createdAt,
                status: team.status.toLowerCase(),
              }}
              onApprove={() => handleApprove(team._id)}
              onReject={() => handleReject(team._id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
