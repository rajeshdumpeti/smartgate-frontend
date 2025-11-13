// src/api/agents.ts
// Agents API using the shared Axios client

import { api } from "./client";

export type AgentRunSummary = {
  run_id: string; // e.g., "2025-11-07T23:15:42"
  day: string; // "YYYY-MM-DD"
  time: string; // "HHMMSS"
  project?: string | null;
  counts: { stories: number; test_cases: number };
  path?: string; // server path (debug only)
};

export type Manifest = {
  project: string;
  run_id: string;
  paths: {
    clarifications: string;
    rules: string;
    stories: string;
    test_plan: string;
    summary: string;
  };
  counts?: { stories?: number; test_cases?: number };
  sections?: string[];
  notes?: string;
};

// ---- helpers ---------------------------------------------------------------

function unwrap<T>(p: Promise<{ data: T }>) {
  return p.then((res) => res.data);
}

// ---- public API ------------------------------------------------------------

/** List all agent runs (most recent first). */
export function getAgentRuns() {
  return unwrap<AgentRunSummary[]>(api.get("/agents/runs"));
}

/** Load a specific run's manifest by ISO run_id (e.g., "2025-11-07T23:15:42"). */
export function getAgentManifest(runId: string) {
  const id = encodeURIComponent(runId);
  return unwrap<Manifest>(api.get(`/agents/runs/${id}`));
}

/** Fetch a JSON artifact from a run (stories/test_plan/etc). */
export function getAgentJson<T = unknown>(
  runId: string,
  filename:
    | "manifest.json"
    | "clarifications.json"
    | "rules.json"
    | "stories.json"
    | "test_plan.json"
) {
  const id = encodeURIComponent(runId);
  const name = encodeURIComponent(filename);
  return unwrap<T>(
    api.get(`/agents/runs/${id}/${name}`, {
      headers: { Accept: "application/json" },
      responseType: "json",
    })
  );
}

/** Fetch the human summary (Markdown text). */
export async function getAgentSummaryMd(runId: string): Promise<string> {
  const id = encodeURIComponent(runId);
  const res = await api.get(`/agents/runs/${id}/summary.md`, {
    headers: { Accept: "text/markdown, text/plain" },
    responseType: "text", // axios returns string when responseType 'text'
    transformResponse: [(data) => data], // prevent JSON parsing
  });
  // Some axios versions still put content in res.data as string:
  return typeof res.data === "string" ? res.data : String(res.data ?? "");
}
