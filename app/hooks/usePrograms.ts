"use client";

import { useCallback, useEffect, useState } from "react";
import { type Program, programSlug, programLabel } from "../lib/programUtils";

export type { Program };
export { programSlug, programLabel };

export type ProgramGroup = {
  label: string;
  category: "Online" | "Offline";
  programs: Program[];
};

const PROGRAMS_LOADED_EVENT = "psc:programs-loaded";

/**
 * Fetches the programs created in /admin -> Programs and exposes them
 * grouped by category. Shared by the Navbar dropdown and the enquiry forms.
 */
export function usePrograms(
  initialPrograms?: Program[],
  fetchOnMount = true,
  summary = false
) {
  const hasInitialPrograms = Array.isArray(initialPrograms);
  const [programs, setPrograms] = useState<Program[]>(initialPrograms || []);
  const [loading, setLoading] = useState(!hasInitialPrograms && fetchOnMount);

  const reload = useCallback(() => {
    setLoading(true);
    return fetch(`/api/programs${summary ? "?summary=true" : ""}`)
      .then((res) => (res.ok ? res.json() : { programs: [] }))
      .then((data) => {
        const loadedPrograms = Array.isArray(data.programs) ? data.programs : [];
        setPrograms(loadedPrograms);
        window.dispatchEvent(
          new CustomEvent(PROGRAMS_LOADED_EVENT, { detail: loadedPrograms })
        );
        setLoading(false);
        return loadedPrograms;
      })
      .catch(() => {
        setLoading(false);
        return [] as Program[];
      });
  }, [summary]);

  useEffect(() => {
    const handleProgramsLoaded = (event: Event) => {
      const loadedPrograms = (event as CustomEvent<Program[]>).detail;
      if (Array.isArray(loadedPrograms)) {
        setPrograms(loadedPrograms);
        setLoading(false);
      }
    };

    window.addEventListener(PROGRAMS_LOADED_EVENT, handleProgramsLoaded);

    if (!fetchOnMount) {
      return () => window.removeEventListener(PROGRAMS_LOADED_EVENT, handleProgramsLoaded);
    }

    let active = true;
    fetch(`/api/programs${summary ? "?summary=true" : ""}`)
      .then((res) => (res.ok ? res.json() : { programs: [] }))
      .then((data) => {
        if (!active) return;
        if (Array.isArray(data.programs)) setPrograms(data.programs);
        setLoading(false);
      })
      .catch(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
      window.removeEventListener(PROGRAMS_LOADED_EVENT, handleProgramsLoaded);
    };
  }, [fetchOnMount, hasInitialPrograms, summary]);

  const groups: ProgramGroup[] = [
    {
      label: "Online Programs",
      category: "Online",
      programs: programs.filter((p) => p.category === "Online"),
    },
    {
      label: "Offline Programs",
      category: "Offline",
      programs: programs.filter((p) => p.category === "Offline"),
    },
  ];

  return { programs, groups, loading, reload };
}
