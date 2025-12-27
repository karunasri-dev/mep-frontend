import { createContext, useContext, useState } from "react";
import { getActiveTeamsAPI } from "../services/teams/index";

const TeamContext = createContext(null);

export function TeamProvider({ children }) {
  const [teams, setTeams] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchTeamsOnce = async () => {
    if (loaded) return; // 🔑 cache guard

    setLoading(true);
    const data = await getActiveTeamsAPI();
    setTeams(data);
    setLoaded(true);
    setLoading(false);
  };

  const refreshTeams = async () => {
    setLoading(true);
    const data = await getActiveTeamsAPI();
    setTeams(data);
    setLoaded(true);
    setLoading(false);
  };

  return (
    <TeamContext.Provider
      value={{
        teams,
        loading,
        fetchTeamsOnce,
        refreshTeams,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}

export const useTeams = () => useContext(TeamContext);
