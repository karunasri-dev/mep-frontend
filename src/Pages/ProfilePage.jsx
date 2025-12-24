import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserTeamsApi, updateTeamApi } from "../api/team.api";
import { forgotPasswordAPI } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await getUserTeamsApi();
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

  const handleSave = async () => {
    if (!team) return;
    setSaving(true);
    try {
      await updateTeamApi(team._id, team);
      setMessage("Team updated successfully");
    } catch (err) {
      console.error("Failed to update team", err);
      setMessage("Failed to update team");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleForgotPassword = async () => {
    if (!user?.email) return;
    try {
      await forgotPasswordAPI(user.email);
      setMessage("Password reset email sent");
    } catch (err) {
      console.error("Failed to send reset email", err);
      setMessage("Failed to send reset email");
    }
  };

  const updateBull = (field, value) => {
    setTeam((prev) => ({
      ...prev,
      bulls: prev.bulls.map((bull, idx) =>
        idx === 0 ? { ...bull, [field]: value } : bull
      ),
    }));
  };

  const updateMember = (idx, field, value) => {
    setTeam((prev) => ({
      ...prev,
      members: prev.members.map((member, i) =>
        i === idx ? { ...member, [field]: value } : member
      ),
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (!team) return <div>No team found</div>;

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="bull-section">
        <h2>Bull Details</h2>
        <input
          type="text"
          value={team.bulls[0]?.name || ""}
          onChange={(e) => updateBull("name", e.target.value)}
          placeholder="Bull Name"
        />
        {/* Add category if needed */}
      </div>
      <div className="members-section">
        <h2>Team Members</h2>
        {team.members.map((member, idx) => (
          <div key={idx} className="member">
            <input
              type="text"
              value={member.name}
              onChange={(e) => updateMember(idx, "name", e.target.value)}
              placeholder="Name"
            />
            <select
              value={member.role}
              onChange={(e) => updateMember(idx, "role", e.target.value)}
            >
              <option value="OWNER">Owner</option>
              <option value="CAPTAIN">Captain</option>
              <option value="DRIVER">Driver</option>
              <option value="TRAINER">Trainer</option>
              <option value="HELPER">Helper</option>
            </select>
            <input
              type="text"
              value={member.info || ""}
              onChange={(e) => updateMember(idx, "info", e.target.value)}
              placeholder="Info"
            />
            <input
              type="text"
              value={member.phone || ""}
              onChange={(e) => updateMember(idx, "phone", e.target.value)}
              placeholder="Phone"
            />
          </div>
        ))}
      </div>
      <button onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save Changes"}
      </button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleForgotPassword}>Forgot Password</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProfilePage;
