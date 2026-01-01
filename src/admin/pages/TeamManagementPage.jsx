import { useEffect, useState } from "react";
import SearchFilterBar from "../components/TeamApproval/SearchFilterBar";
import UserCard from "../components/TeamApproval/TeamCard";
import { fetchAllTeams } from "../../services/team.service";
import toast from "react-hot-toast";

export default function TeamManagementPage() {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchAllTeams();
        setTeams(data);
      } catch {
        toast.error("Failed to load teams");
      } finally {
        setLoading(false);
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
    <div className="min-h-screen bg-[#fbf6ee] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-serif text-stone-800 font-medium mb-2">
            Team Management
          </h1>
          <p className="text-stone-600">
            View and manage all registered teams
          </p>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          showStatusFilter
        />

        {loading ? (
          <div className="bg-white rounded-xl p-12 text-center border border-stone-200 shadow-sm">
            <div className="inline-block animate-spin w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full mb-4"></div>
            <p className="text-stone-500 font-medium">Loading teams...</p>
          </div>
        ) : filteredTeams.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-stone-200 shadow-sm">
            <p className="text-stone-500 font-medium">
              No teams found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map((team) => (
              <UserCard
                key={team._id}
                user={{
                  id: team._id,
                  name: team.createdBy?.name || "Unknown Owner",
                  email: team.createdBy?.email,
                  phone: team.createdBy?.mobileNumber,
                  eventName: team.teamName, // Using teamName as eventName based on previous code mapping, adjust if needed
                  bullName: team.bullName || "N/A", // Added bullName if available in team object, otherwise default
                  registrationDate: team.createdAt,
                  status: team.status.toLowerCase(),
                }}
                // Pass dummy handlers if UserCard requires them to avoid errors, 
                // or ensure UserCard handles missing onApprove/onReject gracefully.
                // Based on UserCard code: it checks status === "pending" to show buttons.
                // If status is not pending, it shows status badge.
                // Since this is general management, maybe we don't need approve/reject buttons here?
                // Or maybe we do? The original code didn't pass them.
                onApprove={() => {}} 
                onReject={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
