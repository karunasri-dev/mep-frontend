import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyTeam, updateTeamRoster } from "../services/teams";
import { changePasswordAPI } from "../services/auth/index";
import { logoutAPI } from "../services/auth/index";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const bullBRefs = useRef([]);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingTeam, setEditingTeam] = useState(false);
  const [teamData, setTeamData] = useState({
    teamName: "",
    bullPairs: [],
    teamMembers: [],
    teamLocation: { city: "", state: "", country: "" },
  });
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
        console.log("getmy team called:", res.data);
        if (res?.data) {
          const t = res.data;
          setTeam(t);
          setTeamData({
            teamName: t.teamName || "",
            bullPairs: Array.isArray(t.bullPairs)
              ? t.bullPairs.map((bp) => ({
                  _id: bp._id,
                  bullA: { name: bp.bullA?.name || "" },
                  bullB: { name: bp.bullB?.name || "" },
                  category: bp.category || { type: "", value: "" },
                }))
              : [],
            teamMembers: Array.isArray(t.teamMembers)
              ? t.teamMembers.map((m) => ({
                  _id: m._id,
                  name: m.name || "",
                  role: m.role || "",
                  info: m.info || "",
                  phone: m.phone || "",
                }))
              : [],
            teamLocation: {
              city: t?.teamLocation?.city || "",
              state: t?.teamLocation?.state || "",
              country: t?.teamLocation?.country || "",
            },
          });
        } else {
          setTeam(null);
        }
      } catch (err) {
        console.error("Failed to fetch team", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  // CreateTeam parity: single category select using key → type/value mapping
  const CATEGORY_MAP = {
    milk_teeth: { type: "DENTITION", value: "MILK" },
    two_teeth: { type: "DENTITION", value: "TWO" },
    four_teeth: { type: "DENTITION", value: "FOUR" },
    six_teeth: { type: "DENTITION", value: "SIX" },
    sub_junior: { type: "AGE_GROUP", value: "SUB_JUNIOR" },
    junior: { type: "AGE_GROUP", value: "JUNIOR" },
    senior: { type: "AGE_GROUP", value: "SENIOR" },
    general: { type: "CLASS", value: "GENERAL" },
    new: { type: "CLASS", value: "NEW" },
    old: { type: "CLASS", value: "OLD" },
  };
  const getCategoryKey = (bp) => {
    const t = bp?.category?.type;
    const v = bp?.category?.value;
    if (!t || !v) return "senior";
    const map = {
      "DENTITION:MILK": "milk_teeth",
      "DENTITION:TWO": "two_teeth",
      "DENTITION:FOUR": "four_teeth",
      "DENTITION:SIX": "six_teeth",
      "AGE_GROUP:SUB_JUNIOR": "sub_junior",
      "AGE_GROUP:JUNIOR": "junior",
      "AGE_GROUP:SENIOR": "senior",
      "CLASS:GENERAL": "general",
      "CLASS:NEW": "new",
      "CLASS:OLD": "old",
    };
    return map[`${t}:${v}`] || "senior";
  };

  const handleUpdateTeam = async (e) => {
    e.preventDefault();
    if (!team?._id) return;
    setMessage("");
    try {
      const payload = {
        bullPairs: (teamData.bullPairs || []).map((bp) => ({
          _id: bp._id,
          bullA: { name: bp.bullA?.name || "" },
          bullB: { name: bp.bullB?.name || "" },
          category: bp.category || undefined,
        })),
        teamMembers: (teamData.teamMembers || []).map((m) => ({
          _id: m._id,
          name: m.name || "",
          role: m.role || "",
          info: m.info || "",
          phone: m.phone || "",
        })),
        teamLocation: {
          city: teamData?.teamLocation?.city || "",
          state: teamData?.teamLocation?.state || "",
          country: teamData?.teamLocation?.country || "",
        },
      };
      const res = await updateTeamRoster(team._id, payload);
      const updated = res.data.data || res.data;
      setTeam(updated);
      setEditingTeam(false);
      setMessage("Team updated successfully");
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Failed to update team";
      setMessage(msg);
    }
  };

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

  const addBullPair = () => {
    setTeamData((prev) => ({
      ...prev,
      bullPairs: [
        ...prev.bullPairs,
        {
          bullA: { name: "" },
          bullB: { name: "" },
          category: CATEGORY_MAP.senior,
        },
      ],
    }));
  };

  const removeBullPair = (i) => {
    setTeamData((prev) => ({
      ...prev,
      bullPairs: prev.bullPairs.filter((_, idx) => idx !== i),
    }));
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
            <h1 className="text-2xl font-serif font-medium text-stone-800">
              My Profile
            </h1>
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
                  {!editingTeam ? (
                    <>
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="block text-sm font-medium text-stone-700">
                            Team Name
                          </label>
                          <p className="mt-1 text-sm text-stone-800">
                            {team.teamName}
                          </p>
                        </div>
                        <button
                          onClick={() => setEditingTeam(true)}
                          className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors"
                        >
                          Edit Team
                        </button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-700">
                          Location
                        </label>
                        <p className="mt-1 text-sm text-stone-800">
                          {[
                            team.teamLocation?.city,
                            team.teamLocation?.state,
                            team.teamLocation?.country,
                          ]
                            .filter(Boolean)
                            .join(", ") || "Not specified"}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          Bull Pairs
                        </label>
                        <div className="space-y-2">
                          {(team.bullPairs || []).map((bp) => (
                            <div
                              key={bp._id}
                              className="bg-white p-3 rounded border border-stone-200"
                            >
                              <p className="font-medium">
                                {bp.bullA?.name} & {bp.bullB?.name}
                              </p>
                              <p className="text-sm text-stone-600">
                                Category:{" "}
                                {(bp.category?.value || "").replace(/_/g, " ")}
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
                          {(team.teamMembers || []).map((member) => (
                            <div
                              key={member._id}
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
                    </>
                  ) : (
                    <form onSubmit={handleUpdateTeam} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-stone-700">
                          Team Name
                        </label>
                        <input
                          type="text"
                          value={teamData.teamName}
                          disabled
                          className="mt-1 block w-full px-3 py-2 border border-stone-200 rounded-md shadow-sm bg-stone-50 text-stone-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-stone-500 mt-1">
                          Team name cannot be changed
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          Team Location
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <input
                            placeholder="City"
                            value={teamData?.teamLocation?.city || ""}
                            onChange={(e) =>
                              setTeamData((prev) => ({
                                ...prev,
                                teamLocation: {
                                  ...prev.teamLocation,
                                  city: e.target.value
                                    .toLowerCase()
                                    .replace(/\b\w/g, (l) => l.toUpperCase()),
                                },
                              }))
                            }
                            className="border rounded-md px-3 py-2 text-sm"
                          />
                          <input
                            placeholder="State"
                            value={teamData?.teamLocation?.state || ""}
                            onChange={(e) =>
                              setTeamData((prev) => ({
                                ...prev,
                                teamLocation: {
                                  ...prev.teamLocation,
                                  state: e.target.value
                                    .toLowerCase()
                                    .replace(/\b\w/g, (l) => l.toUpperCase()),
                                },
                              }))
                            }
                            className="border rounded-md px-3 py-2 text-sm"
                          />
                          <input
                            placeholder="Country"
                            value={teamData?.teamLocation?.country || ""}
                            onChange={(e) =>
                              setTeamData((prev) => ({
                                ...prev,
                                teamLocation: {
                                  ...prev.teamLocation,
                                  country: e.target.value
                                    .toLowerCase()
                                    .replace(/\b\w/g, (l) => l.toUpperCase()),
                                },
                              }))
                            }
                            className="border rounded-md px-3 py-2 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          Bull Pairs
                        </label>
                        <div className="space-y-3">
                          {(teamData.bullPairs || []).map((bp, idx) => (
                            <div
                              key={bp._id || idx}
                              className="bg-white p-3 rounded border border-stone-200"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                  <label className="text-xs text-stone-600">
                                    Bull A Name
                                  </label>
                                  <input
                                    type="text"
                                    value={bp.bullA?.name || ""}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setTeamData((prev) => {
                                        const next = { ...prev };
                                        next.bullPairs = [...prev.bullPairs];
                                        next.bullPairs[idx] = {
                                          ...prev.bullPairs[idx],
                                          bullA: { name: val },
                                        };
                                        return next;
                                      });
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault();
                                        bullBRefs.current[idx]?.focus();
                                      }
                                    }}
                                    className="mt-1 block w-full px-3 py-2 border border-stone-200 rounded-md"
                                  />
                                </div>
                                <div>
                                  <label className="text-xs text-stone-600">
                                    Bull B Name
                                  </label>
                                  <input
                                    ref={(el) => (bullBRefs.current[idx] = el)}
                                    type="text"
                                    value={bp.bullB?.name || ""}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setTeamData((prev) => {
                                        const next = { ...prev };
                                        next.bullPairs = [...prev.bullPairs];
                                        next.bullPairs[idx] = {
                                          ...prev.bullPairs[idx],
                                          bullB: { name: val },
                                        };
                                        return next;
                                      });
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault();
                                        addBullPair();
                                      }
                                    }}
                                    className="mt-1 block w-full px-3 py-2 border border-stone-200 rounded-md"
                                  />
                                </div>
                              </div>
                              {bp._id ? (
                                <p className="text-xs text-stone-500 mt-2">
                                  Category:{" "}
                                  {(bp.category?.value || "").replace(
                                    /_/g,
                                    " "
                                  )}
                                </p>
                              ) : (
                                <div className="flex gap-2 mt-2">
                                  <select
                                    value={getCategoryKey(bp)}
                                    onChange={(e) => {
                                      const key = e.target.value;
                                      setTeamData((prev) => {
                                        const next = { ...prev };
                                        next.bullPairs = [...prev.bullPairs];
                                        next.bullPairs[idx] = {
                                          ...prev.bullPairs[idx],
                                          category: CATEGORY_MAP[key],
                                        };
                                        return next;
                                      });
                                    }}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                  >
                                    <option value="milk_teeth">
                                      Milk Teeth
                                    </option>
                                    <option value="two_teeth">Two Teeth</option>
                                    <option value="four_teeth">
                                      Four Teeth
                                    </option>
                                    <option value="six_teeth">Six Teeth</option>
                                    <option value="sub_junior">
                                      Sub Junior
                                    </option>
                                    <option value="junior">Junior</option>
                                    <option value="senior">Senior</option>
                                    <option value="general">General</option>
                                    <option value="new">New</option>
                                    <option value="old">Old</option>
                                  </select>
                                  {!bp._id && (
                                    <div className="mt-2 flex justify-end">
                                      <button
                                        type="button"
                                        onClick={() => removeBullPair(idx)}
                                        className="text-red-500 text-sm"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={addBullPair}
                            className="mt-2 bg-stone-200 text-stone-800 px-3 py-2 rounded-md hover:bg-stone-300 transition-colors"
                          >
                            Add Bull Pair
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          Team Members
                        </label>
                        <div className="space-y-3">
                          {(teamData.teamMembers || []).map((m, idx) => (
                            <div
                              key={m._id || idx}
                              className="flex flex-wrap gap-2"
                            >
                              <input
                                placeholder="Member Name"
                                value={m.name}
                                onChange={(e) => {
                                  let val = e.target.value;
                                  val = val
                                    .toLowerCase()
                                    .replace(/\b\w/g, (l) => l.toUpperCase());

                                  setTeamData((prev) => {
                                    const next = { ...prev };
                                    next.teamMembers = [...prev.teamMembers];
                                    next.teamMembers[idx] = {
                                      ...prev.teamMembers[idx],
                                      name: val,
                                    };
                                    return next;
                                  });
                                }}
                                className="flex-1 border rounded-lg px-3 py-2 text-sm"
                                disabled={m.role === "OWNER"}
                              />
                              <select
                                value={m.role}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setTeamData((prev) => {
                                    const next = { ...prev };
                                    next.teamMembers = [...prev.teamMembers];
                                    next.teamMembers[idx] = {
                                      ...prev.teamMembers[idx],
                                      role: val,
                                    };
                                    return next;
                                  });
                                }}
                                className="border rounded-lg px-3 py-2 text-sm"
                                disabled={m.role === "OWNER"}
                              >
                                <option value="DRIVER">Driver</option>
                                <option value="TRAINER">Trainer</option>
                                <option value="CAPTAIN">Captain</option>
                                <option value="HELPER">Helper</option>
                              </select>
                              <input
                                placeholder="Info (optional)"
                                value={m.info || ""}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setTeamData((prev) => {
                                    const next = { ...prev };
                                    next.teamMembers = [...prev.teamMembers];
                                    next.teamMembers[idx] = {
                                      ...prev.teamMembers[idx],
                                      info: val,
                                    };
                                    return next;
                                  });
                                }}
                                className="border rounded-lg px-3 py-2 text-sm"
                                disabled={m.role === "OWNER"}
                              />
                              {!m._id && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setTeamData((prev) => ({
                                      ...prev,
                                      teamMembers: prev.teamMembers.filter(
                                        (_, i) => i !== idx
                                      ),
                                    }))
                                  }
                                  className="text-red-500 text-sm"
                                >
                                  ✕
                                </button>
                              )}
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() =>
                              setTeamData((prev) => ({
                                ...prev,
                                teamMembers: [
                                  ...prev.teamMembers,
                                  {
                                    name: "",
                                    role: "HELPER",
                                    info: "",
                                    phone: "",
                                  },
                                ],
                              }))
                            }
                            className="mt-2 bg-stone-200 text-stone-800 px-3 py-2 rounded-md hover:bg-stone-300 transition-colors"
                          >
                            Add Team Member
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="submit"
                          className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingTeam(false);
                            if (team) {
                              setTeamData({
                                teamName: team.teamName || "",
                                bullPairs: Array.isArray(team.bullPairs)
                                  ? team.bullPairs.map((bp) => ({
                                      _id: bp._id,
                                      bullA: { name: bp.bullA?.name || "" },
                                      bullB: { name: bp.bullB?.name || "" },
                                      category: bp.category || {
                                        type: "",
                                        value: "",
                                      },
                                    }))
                                  : [],
                                teamMembers: Array.isArray(team.teamMembers)
                                  ? team.teamMembers.map((m) => ({
                                      _id: m._id,
                                      name: m.name || "",
                                      role: m.role || "",
                                      info: m.info || "",
                                      phone: m.phone || "",
                                    }))
                                  : [],
                                teamLocation: {
                                  city: team?.teamLocation?.city || "",
                                  state: team?.teamLocation?.state || "",
                                  country: team?.teamLocation?.country || "",
                                },
                              });
                            }
                          }}
                          className="bg-stone-200 text-stone-800 px-4 py-2 rounded-md hover:bg-stone-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
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
