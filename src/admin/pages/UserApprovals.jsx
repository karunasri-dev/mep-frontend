import { useState } from "react";
import SearchFilterBar from "../components/UsersApproval/SearchFilterBar";
import UserCard from "../components/UsersApproval/UserCard";

export default function UserApprovals() {
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Rajesh Kumar",
      email: "rajesh.k@email.com",
      phone: "+91 98765 43210",
      eventName: "Summer Bull Race 2025",
      bullName: "Thunder",
      registrationDate: "2025-12-01",
      status: "pending",
    },
    {
      id: "2",
      name: "Suresh Patil",
      email: "suresh.p@email.com",
      phone: "+91 98765 43211",
      eventName: "Summer Bull Race 2025",
      bullName: "Lightning",
      registrationDate: "2025-12-02",
      status: "pending",
    },
    {
      id: "3",
      name: "Mahesh Naik",
      email: "mahesh.n@email.com",
      phone: "+91 98765 43212",
      eventName: "Winter Championship 2025",
      bullName: "Storm",
      registrationDate: "2025-12-03",
      status: "approved",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleApprove = (id) => {
    setUsers(
      users.map((u) => (u.id === id ? { ...u, status: "approved" } : u))
    );
  };

  const handleReject = (id) => {
    setUsers(
      users.map((u) => (u.id === id ? { ...u, status: "rejected" } : u))
    );
  };

  const filteredUsers = users.filter((user) => {
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      user.name.toLowerCase().includes(s) ||
      user.email.toLowerCase().includes(s) ||
      user.bullName.toLowerCase().includes(s);

    const matchesFilter =
      filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const pendingCount = users.filter((u) => u.status === "pending").length;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-gray-900 mb-2">User Registrations</h2>
        <p className="text-gray-600">
          Review and approve registrations.
          {pendingCount > 0 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 ml-2">
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
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No users found matching your criteria
          </div>
        ) : (
          filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))
        )}
      </div>
    </div>
  );
}
