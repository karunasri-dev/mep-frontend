import { useEffect, useState, useMemo } from "react";
import SearchFilterBar from "../components/TeamApproval/SearchFilterBar";
import TeamCard from "../components/TeamApproval/TeamCard";
import {
  fetchPendingTeamsAPI,
  decideTeamAPI,
  fetechTeamsByStatus,
} from "../../services/teams/index";
import toast from "react-hot-toast";

export default function TeamApproval() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("pending");

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
      await decideTeamAPI(teamId, "REJECTED", reason);
      setTeams((prev) => prev.filter((t) => t._id !== teamId));
      toast.success("Team rejected");
    } catch (err) {
      toast.error(err.message || "Rejection failed");
    }
  };

  // 🔹 FILTERING (FRONTEND-ONLY)
  const filteredTeams = useMemo(() => {
    if (filterStatus === "approved" || filterStatus === "rejected")
      return fetechTeamsByStatus(filterStatus);

    return teams.filter((team) =>
      team.teamName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [teams, searchTerm, filterStatus]);

  const pendingCount = teams.length; // valid now

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbf6ee] flex justify-center items-center">
        <p className="text-stone-600 font-serif">Loading pending teams...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf6ee] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif text-stone-800 font-medium mb-2">
              Team Approvals
            </h1>
            <p className="text-stone-600">
              Review and approve team registrations
              {pendingCount > 0 && (
                <span className="ml-2 inline-flex px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
                  {pendingCount} pending
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Search Bar Wrapper */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
          <SearchFilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        </div>

        <div className="space-y-4">
          {filterStatus !== "pending" ? (
            <div className="text-center py-12 text-stone-500 bg-white rounded-xl border border-stone-200">
              Approved and rejected teams are not available yet
            </div>
          ) : (
            filteredTeams.map((team) => (
              <TeamCard
                key={team._id}
                user={{
                  id: team._id,
                  name: team.teamName,
                  email: team.createdBy?.email,
                  phone: team.createdBy?.phone,
                  eventName: "General Registration", // Placeholder
                  bullName:
                    team.bullPairs?.map((b) => b.bullA?.name).join(", ") ||
                    "N/A",
                  registrationDate: team.createdAt,
                  status: team.status,
                }}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
