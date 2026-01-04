import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyTeam } from "../services/teams";
import { changePasswordAPI } from "../services/auth/index";
import { logoutAPI } from "../services/auth/index";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [changePasswordData, setChangePasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [changingPassword, setChangingPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await getMyTeam();
        if (res.data.length > 0) {
          setTeam(res.data[0]); // Assume first team
        }
      } catch (err) {
        console.error("Failed to fetch team", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (changePasswordData.newPassword !== changePasswordData.confirmPassword) {
      setMessage("New passwords don't match");
      return;
    }

    if (changePasswordData.newPassword.length < 8) {
      setMessage("New password must be at least 8 characters long");
      return;
    }

    setChangingPassword(true);
    setMessage("");

    try {
      await changePasswordAPI({
        currentPassword: changePasswordData.currentPassword,
        newPassword: changePasswordData.newPassword,
      });
      setMessage("Password changed successfully!");
      setChangePasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowChangePassword(false);
    } catch (err) {
      console.error("Failed to change password", err);
      setMessage(err.response?.data?.message || "Failed to change password");
    } finally {
      setChangingPassword(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAPI();

      window.dispatchEvent(new CustomEvent("auth-logout"));
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);

      window.dispatchEvent(new CustomEvent("auth-logout"));
      navigate("/login");
    } finally {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbf6ee] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full mx-auto"></div>
          <p className="mt-4 text-stone-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf6ee] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-200 bg-stone-50">
            <h1 className="text-2xl font-serif font-medium text-stone-800">My Profile</h1>
          </div>

          <div className="p-6 space-y-8">
            {/* User Details Section */}
            <div className="border-b border-stone-200 pb-6">
              <h2 className="text-xl font-serif font-medium text-stone-800 mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700">
                    Username
                  </label>
                  <p className="mt-1 text-sm text-stone-800 bg-stone-50 px-3 py-2 rounded-md border border-stone-200">
                    {user?.username}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700">
                    Mobile Number
                  </label>
                  <p className="mt-1 text-sm text-stone-800 bg-stone-50 px-3 py-2 rounded-md border border-stone-200">
                    {user?.mobileNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Change Password Section */}
            <div className="border-b border-stone-200 pb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-serif font-medium text-stone-800">
                  Security
                </h2>
                <button
                  onClick={() => setShowChangePassword(!showChangePassword)}
                  className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors"
                >
                  {showChangePassword ? "Cancel" : "Change Password"}
                </button>
              </div>

              {showChangePassword && (
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      required
                      value={changePasswordData.currentPassword}
                      onChange={(e) =>
                        setChangePasswordData((prev) => ({
                          ...prev,
                          currentPassword: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full px-3 py-2 border border-stone-200 rounded-md shadow-sm focus:outline-none focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      minLength="8"
                      value={changePasswordData.newPassword}
                      onChange={(e) =>
                        setChangePasswordData((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full px-3 py-2 border border-stone-200 rounded-md shadow-sm focus:outline-none focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={changePasswordData.confirmPassword}
                      onChange={(e) =>
                        setChangePasswordData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full px-3 py-2 border border-stone-200 rounded-md shadow-sm focus:outline-none focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={changingPassword}
                    className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {changingPassword
                      ? "Changing Password..."
                      : "Change Password"}
                  </button>
                </form>
              )}
            </div>

            {/* Team Information Section */}
            {team && (
              <div className="border-b border-stone-200 pb-6">
                <h2 className="text-xl font-serif font-medium text-stone-800 mb-4">
                  My Team
                </h2>
                <div className="bg-stone-50 rounded-lg p-4 space-y-4 border border-stone-200">
                  <div>
                    <label className="block text-sm font-medium text-stone-700">
                      Team Name
                    </label>
                    <p className="mt-1 text-sm text-stone-800">
                      {team.teamName}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Bulls
                    </label>
                    <div className="space-y-2">
                      {team.bulls.map((bull, index) => (
                        <div
                          key={index}
                          className="bg-white p-3 rounded border border-stone-200"
                        >
                          <p className="font-medium">{bull.name}</p>
                          <p className="text-sm text-stone-600">
                            Category: {bull.category?.type} -{" "}
                            {bull.category?.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Team Members
                    </label>
                    <div className="space-y-2">
                      {team.teamMembers.map((member, index) => (
                        <div
                          key={index}
                          className="bg-white p-3 rounded border border-stone-200"
                        >
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-stone-600">
                            Role: {member.role}
                          </p>
                          {member.info && (
                            <p className="text-sm text-stone-600">
                              Info: {member.info}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700">
                      Status
                    </label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${
                        team.status === "APPROVED"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : team.status === "PENDING"
                          ? "bg-amber-50 text-amber-700 border-amber-100"
                          : "bg-red-50 text-red-700 border-red-100"
                      }`}
                    >
                      {team.status}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {!team && (
              <div className="border-b border-stone-200 pb-6">
                <h2 className="text-xl font-serif font-medium text-stone-800 mb-4">
                  My Team
                </h2>
                <div className="bg-stone-50 rounded-lg p-6 text-center border border-stone-200">
                  <p className="text-stone-600">
                    You haven't created a team yet.
                  </p>
                  <button
                    onClick={() => navigate("/bulls")}
                    className="mt-4 bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors"
                  >
                    Create Team
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>

            {/* Messages */}
            {message && (
              <div
                className={`p-4 rounded-md ${
                  message.includes("success")
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-100"
                    : "bg-red-50 text-red-800 border border-red-100"
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
