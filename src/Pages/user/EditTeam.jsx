import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTeamById, updateTeamRoster } from "@/services/team.service";
import toast from "react-hot-toast";

export default function EditTeam() {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const data = await getTeamById(teamId);
        if (!data.teamLocation) {
          data.teamLocation = { city: "", state: "", country: "" };
        }
        setTeam(data);
      } catch {
        toast.error("Failed to load team");
      }
    };
    loadTeam();
  }, [teamId]);

  if (!team) return <div>Loading…</div>;

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateTeamRoster(teamId, {
        bullPairs: team.bullPairs,
        teamMembers: team.teamMembers,
        teamLocation: team.teamLocation,
      });
      toast.success("Team updated successfully");
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-xl font-semibold">Edit Team: {team.teamName}</h1>

      <LocationSection team={team} setTeam={setTeam} />
      <BullPairsSection team={team} setTeam={setTeam} />
      <TeamMembersSection team={team} setTeam={setTeam} />

      <button
        onClick={handleSave}
        disabled={saving}
        className="px-4 py-2 bg-amber-600 text-white rounded"
      >
        {saving ? "Saving…" : "Save Changes"}
      </button>
    </div>
  );
}

function BullPairsSection({ team, setTeam }) {
  const updatePairName = (i, key, value) => {
    const updated = [...team.bullPairs];
    updated[i][key].name = value;
    setTeam({ ...team, bullPairs: updated });
  };

  const addPair = () => {
    setTeam({
      ...team,
      bullPairs: [
        ...team.bullPairs,
        {
          bullA: { name: "" },
          bullB: { name: "" },
          category: { type: "DENTITION", value: "MILK" },
        },
      ],
    });
  };

  return (
    <section className="space-y-4">
      <h2 className="font-medium">Bull Pairs</h2>

      {team.bullPairs.map((pair, i) => {
        const isNew = i >= team._originalBullPairCount;

        return (
          <div key={i} className="border p-3 rounded space-y-2">
            <input
              value={pair.bullA.name}
              onChange={(e) => updatePairName(i, "bullA", e.target.value)}
              placeholder="Bull A Name"
              className="input"
            />
            <input
              value={pair.bullB.name}
              onChange={(e) => updatePairName(i, "bullB", e.target.value)}
              placeholder="Bull B Name"
              className="input"
            />

            {isNew ? (
              <>
                <select
                  value={pair.category.type}
                  onChange={(e) => {
                    const updated = [...team.bullPairs];
                    updated[i].category.type = e.target.value;
                    setTeam({ ...team, bullPairs: updated });
                  }}
                >
                  <option value="DENTITION">Dentition</option>
                  <option value="AGE_GROUP">Age Group</option>
                  <option value="CLASS">Class</option>
                </select>

                <input
                  value={pair.category.value}
                  onChange={(e) => {
                    const updated = [...team.bullPairs];
                    updated[i].category.value = e.target.value;
                    setTeam({ ...team, bullPairs: updated });
                  }}
                  placeholder="Category Value"
                />
              </>
            ) : (
              <p className="text-sm text-gray-500">
                Category locked after approval
              </p>
            )}
          </div>
        );
      })}

      <button onClick={addPair} className="text-sm text-amber-600">
        + Add Bull Pair
      </button>
    </section>
  );
}

function LocationSection({ team, setTeam }) {
  const updateLocation = (field, value) => {
    // Title Case formatting
    const formatted = value
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
    setTeam({
      ...team,
      teamLocation: { ...team.teamLocation, [field]: formatted },
    });
  };

  return (
    <section className="space-y-4">
      <h2 className="font-medium">Team Location</h2>
      <div className="grid grid-cols-3 gap-4">
        <input
          value={team.teamLocation?.city || ""}
          onChange={(e) => updateLocation("city", e.target.value)}
          placeholder="City"
          className="border p-2 rounded w-full"
        />
        <input
          value={team.teamLocation?.state || ""}
          onChange={(e) => updateLocation("state", e.target.value)}
          placeholder="State"
          className="border p-2 rounded w-full"
        />
        <input
          value={team.teamLocation?.country || ""}
          onChange={(e) => updateLocation("country", e.target.value)}
          placeholder="Country"
          className="border p-2 rounded w-full"
        />
      </div>
    </section>
  );
}

function TeamMembersSection({ team, setTeam }) {
  const updateMember = (i, field, value) => {
    const updated = [...team.teamMembers];
    updated[i][field] = value;
    setTeam({ ...team, teamMembers: updated });
  };

  const addMember = () => {
    setTeam({
      ...team,
      teamMembers: [
        ...team.teamMembers,
        { name: "", role: "HELPER", phone: "" },
      ],
    });
  };

  return (
    <section className="space-y-4">
      <h2 className="font-medium">Team Members</h2>

      {team.teamMembers.map((m, i) => (
        <div key={i} className="grid grid-cols-3 gap-2">
          <input
            value={m.name}
            disabled={m.role === "OWNER"}
            onChange={(e) => updateMember(i, "name", e.target.value)}
            placeholder="Name"
          />

          <select
            value={m.role}
            disabled={m.role === "OWNER"}
            onChange={(e) => updateMember(i, "role", e.target.value)}
          >
            <option value="CAPTAIN">Captain</option>
            <option value="DRIVER">Driver</option>
            <option value="TRAINER">Trainer</option>
            <option value="HELPER">Helper</option>
          </select>

          {m.role === "OWNER" && (
            <span className="text-xs text-gray-500">
              Contact admin to change owner
            </span>
          )}
        </div>
      ))}

      <button onClick={addMember} className="text-sm text-amber-600">
        + Add Member
      </button>
    </section>
  );
}
