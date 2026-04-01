"use client";
import { useState, useEffect, useCallback } from "react";

export function useApi<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!url) { setLoading(false); return; }
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Fetch failed");
    }
    setLoading(false);
  }, [url]);

  useEffect(() => { refetch(); }, [refetch]);

  return { data, loading, error, refetch, setData };
}

export async function apiPost<T>(url: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function apiPut<T>(url: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(url, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function apiDelete(url: string): Promise<void> {
  const res = await fetch(url, { method: "DELETE" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

// Active project context
const PROJECT_KEY = "revara_active_project";

export function useActiveProject() {
  const [projectId, setProjectId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(PROJECT_KEY);
    if (stored) setProjectId(stored);
  }, []);

  const setActive = (id: string) => {
    localStorage.setItem(PROJECT_KEY, id);
    setProjectId(id);
  };

  return { projectId, setActive };
}
