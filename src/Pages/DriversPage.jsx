import React, { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, Edit, Star } from "lucide-react";

const DriversPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  // Sample driver data
  const allDrivers = [
    {
      id: 1,
      name: "Lewis Hamilton",
      age: 38,
      experience: 17,
      team: "RK Bulls",
      bull: "Simba",
      totalWins: 103,
      rating: 5,
      status: "Active",
    },
    {
      id: 2,
      name: "Max Verstappen",
      age: 26,
      experience: 9,
      team: "RK Bulls",
      bull: "Naranjita",
      totalWins: 54,
      rating: 5,
      status: "Active",
    },
    {
      id: 3,
      name: "Fernando Alonso",
      age: 42,
      experience: 22,
      team: "RK Bulls",
      bull: "Lion",
      totalWins: 32,
      rating: 5,
      status: "Active",
    },
    {
      id: 4,
      name: "Charles Leclerc",
      age: 26,
      experience: 6,
      team: "RK Bulls",
      bull: "Rosso",
      totalWins: 5,
      rating: 4,
      status: "Active",
    },
    {
      id: 5,
      name: "Lando Norris",
      age: 24,
      experience: 5,
      team: "RK Bulls",
      bull: "Thunder",
      totalWins: 0,
      rating: 4,
      status: "Active",
    },
    {
      id: 6,
      name: "George Russell",
      age: 25,
      experience: 5,
      team: "RK Bulls",
      bull: "Silver",
      totalWins: 1,
      rating: 4,
      status: "Active",
    },
    {
      id: 7,
      name: "Carlos Sainz",
      age: 29,
      experience: 9,
      team: "RK Bulls",
      bull: "Matador",
      totalWins: 3,
      rating: 4,
      status: "Active",
    },
    {
      id: 8,
      name: "Sergio Perez",
      age: 33,
      experience: 13,
      team: "RK Bulls",
      bull: "Azteca",
      totalWins: 6,
      rating: 4,
      status: "Active",
    },
    {
      id: 9,
      name: "Oscar Piastri",
      age: 22,
      experience: 1,
      team: "RK Bulls",
      bull: "Koala",
      totalWins: 0,
      rating: 3,
      status: "Active",
    },
    {
      id: 10,
      name: "Pierre Gasly",
      age: 27,
      experience: 6,
      team: "RK Bulls",
      bull: "Bleu",
      totalWins: 1,
      rating: 3,
      status: "Active",
    },
    {
      id: 11,
      name: "Esteban Ocon",
      age: 27,
      experience: 7,
      team: "RK Bulls",
      bull: "Phoenix",
      totalWins: 1,
      rating: 3,
      status: "Active",
    },
    {
      id: 12,
      name: "Lance Stroll",
      age: 25,
      experience: 7,
      team: "RK Bulls",
      bull: "Maple",
      totalWins: 0,
      rating: 3,
      status: "Active",
    },
    {
      id: 13,
      name: "Yuki Tsunoda",
      age: 23,
      experience: 3,
      team: "RK Bulls",
      bull: "Samurai",
      totalWins: 0,
      rating: 3,
      status: "Active",
    },
    {
      id: 14,
      name: "Valtteri Bottas",
      age: 34,
      experience: 11,
      team: "RK Bulls",
      bull: "Viking",
      totalWins: 10,
      rating: 4,
      status: "Active",
    },
    {
      id: 15,
      name: "Zhou Guanyu",
      age: 24,
      experience: 2,
      team: "RK Bulls",
      bull: "Dragon",
      totalWins: 0,
      rating: 3,
      status: "Active",
    },
    {
      id: 16,
      name: "Kevin Magnussen",
      age: 31,
      experience: 8,
      team: "RK Bulls",
      bull: "Warrior",
      totalWins: 0,
      rating: 3,
      status: "Active",
    },
    {
      id: 17,
      name: "Nico Hulkenberg",
      age: 36,
      experience: 11,
      team: "RK Bulls",
      bull: "Panzer",
      totalWins: 0,
      rating: 3,
      status: "Active",
    },
    {
      id: 18,
      name: "Daniel Ricciardo",
      age: 34,
      experience: 13,
      team: "RK Bulls",
      bull: "Honey",
      totalWins: 8,
      rating: 4,
      status: "Inactive",
    },
    {
      id: 19,
      name: "Alexander Albon",
      age: 27,
      experience: 5,
      team: "RK Bulls",
      bull: "Tiger",
      totalWins: 0,
      rating: 3,
      status: "Active",
    },
    {
      id: 20,
      name: "Logan Sargeant",
      age: 22,
      experience: 1,
      team: "RK Bulls",
      bull: "Eagle",
      totalWins: 0,
      rating: 2,
      status: "Active",
    },
  ];

  // Filter drivers based on search term
  const filteredDrivers = useMemo(() => {
    return allDrivers.filter(
      (driver) =>
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.bull.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredDrivers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentDrivers = filteredDrivers.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Drivers
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and view all driver information
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search drivers, teams, or bulls..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Driver Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Age
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Experience
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Team
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Bull
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Total Wins
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Rating
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentDrivers.length > 0 ? (
                  currentDrivers.map((driver, index) => (
                    <tr
                      key={driver.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {driver.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {driver.age}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {driver.experience}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {driver.team}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {driver.bull}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {driver.totalWins}
                      </td>
                      <td className="px-4 py-3">
                        {renderStars(driver.rating)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            driver.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {driver.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No drivers found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredDrivers.length > 0 && (
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(endIndex, filteredDrivers.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredDrivers.length}</span>{" "}
                  results
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriversPage;
