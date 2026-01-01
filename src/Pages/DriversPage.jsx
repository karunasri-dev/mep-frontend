import React, { useState, useMemo, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useTeams } from "../context/TeamContext";

const DriversPage = ({ loading }) => {
  const { teams, loading: contextLoading, fetchTeamsOnce } = useTeams();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    fetchTeamsOnce();
  }, []);

  const isLoading = loading || contextLoading;

  // ✅ Derive drivers from teams
  const allDrivers = useMemo(() => {
    if (!teams) return [];
    return teams.flatMap((team) =>
      (team.teamMembers || [])
        .filter((m) => m.role === "DRIVER")
        .map((driver, index) => ({
          id: `${team._id}-${index}`,
          name: driver.name,
          team: team.teamName,
          bulls: (team.bullPairs || [])
            .flatMap((bp) => [bp.bullA.name, bp.bullB.name])
            .join(", "),
          info: driver.info || "No details available",
          status: team.isActive ? "Active" : "Inactive",
        }))
    );
  }, [teams]);

  // 🔍 Search
  const filteredDrivers = useMemo(() => {
    return allDrivers.filter(
      (d) =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.bulls.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allDrivers]);

  // 📄 Pagination
  const totalPages = Math.ceil(filteredDrivers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentDrivers = filteredDrivers.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
        <p className="text-gray-500">Loading drivers...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Drivers</h1>

        {/* Search */}
        <div className="relative mb-4">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search drivers, teams, or bulls..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Team</th>
                  <th className="p-3 border-b">Bulls</th>
                  <th className="p-3 border-b">Info</th>
                  <th className="p-3 border-b">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {currentDrivers.length > 0 ? (
                  currentDrivers.map((driver) => (
                    <tr
                      key={driver.id}
                      className="hover:bg-gray-50 border-b last:border-none transition"
                    >
                      <td className="p-3 font-medium text-gray-900">
                        {driver.name}
                      </td>
                      <td className="p-3">{driver.team}</td>
                      <td className="p-3">{driver.bulls}</td>
                      <td className="p-3 text-gray-500 truncate max-w-xs">
                        {driver.info}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            driver.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {driver.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-gray-500">
                      No drivers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center p-3 border-t bg-gray-50">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 border rounded hover:bg-gray-200 disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 border rounded hover:bg-gray-200 disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriversPage;
