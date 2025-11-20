// context/ShelterProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/sheltersSupabase";

const ShelterContext = createContext(null);

async function fetchSheltersFromSupabase(setShelters, setLoading, setError) {
  setLoading(true);
  setError(null);
  const { data, error } = await supabase
    .from("shelters")
    .select("*")
    .eq("state", "LA"); // all Louisiana shelters

  if (error) {
    console.error("Supabase error:", error);
    setError("Failed to load shelters. Please try again later.");
    setShelters([]);
  } else {
    setShelters(data || []);
  }
  setLoading(false);
}

export function ShelterProvider({ children }) {
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    fetchSheltersFromSupabase(setShelters, setLoading, setLoadError);
  }, []);

  const value = {
    shelters,
    loading,
    loadError,
    refreshShelters: () =>
      fetchSheltersFromSupabase(setShelters, setLoading, setLoadError),
  };

  return (
    <ShelterContext.Provider value={value}>{children}</ShelterContext.Provider>
  );
}

export function useShelters() {
  const ctx = useContext(ShelterContext);
  if (!ctx) {
    throw new Error("useShelters must be used within a ShelterProvider");
  }
  return ctx;
}
