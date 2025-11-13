import React, { useEffect, useMemo, useState } from "react";
import {
  getAgentRuns,
  getAgentManifest,
  getAgentJson,
  getAgentSummaryMd,
  type AgentRunSummary,
  type Manifest,
} from "../../api/agents";

type Story = {
  story_id: string;
  as_a: string;
  i_want: string;
  so_that: string;
  rules?: string[];
};

type TestPlan = {
  summary?: string;
  test_cases?: Array<{
    id: string;
    title: string;
    story_id?: string;
    rules?: string[];
  }>;
};

export default function AgentRunsPanel() {
  const [runs, setRuns] = useState<AgentRunSummary[]>([]);
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);

  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [testPlan, setTestPlan] = useState<TestPlan | null>(null);
  const [summaryMd, setSummaryMd] = useState<string>("");

  const [loadingList, setLoadingList] = useState(false);
  const [loadingRun, setLoadingRun] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load run list
  useEffect(() => {
    let mounted = true;
    setLoadingList(true);
    setError(null);
    getAgentRuns()
      .then((data) => {
        if (!mounted) return;
        setRuns(data);
        if (data.length && !selectedRunId) {
          setSelectedRunId(data[0].run_id);
        }
      })
      .catch((e) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoadingList(false));
    return () => {
      mounted = false;
    };
  }, []); // load once

  // Load selected run artifacts
  useEffect(() => {
    if (!selectedRunId) return;
    let mounted = true;
    setLoadingRun(true);
    setError(null);

    (async () => {
      try {
        const m = await getAgentManifest(selectedRunId);
        if (!mounted) return;
        setManifest(m);

        // Parallel fetch JSON artifacts (stories/test_plan)
        const [storiesJson, testPlanJson, md] = await Promise.all([
          getAgentJson<Story[]>(selectedRunId, "stories.json"),
          getAgentJson<TestPlan>(selectedRunId, "test_plan.json"),
          getAgentSummaryMd(selectedRunId),
        ]);
        if (!mounted) return;
        setStories(storiesJson ?? []);
        setTestPlan(testPlanJson ?? null);
        setSummaryMd(md ?? "");
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message ?? String(e));
      } finally {
        if (!mounted) return;
        setLoadingRun(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [selectedRunId]);

  const testCount = testPlan?.test_cases?.length ?? 0;
  const storyCount = stories.length;

  const sectionCount = useMemo(
    () => manifest?.sections?.length ?? 0,
    [manifest]
  );

  return (
    <div className="flex w-full h-full gap-4">
      {/* Left rail: Runs */}
      <aside className="w-72 shrink-0 border rounded-lg p-3 bg-white">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold">Agent Runs</h2>
          {loadingList && (
            <span className="text-xs text-gray-500">loading…</span>
          )}
        </div>
        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
        <ul className="space-y-2 max-h-[70vh] overflow-auto">
          {runs.map((r) => {
            const active = r.run_id === selectedRunId;
            return (
              <li key={r.run_id}>
                <button
                  onClick={() => setSelectedRunId(r.run_id)}
                  className={`w-full text-left px-3 py-2 rounded-md border ${
                    active
                      ? "bg-indigo-50 border-indigo-300"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="text-sm font-medium">
                    {r.day} • {r.time.slice(0, 2)}:{r.time.slice(2, 4)}:
                    {r.time.slice(4, 6)}
                  </div>
                  <div className="text-xs text-gray-600">
                    {r.project ?? "—"} · {r.counts.stories} stories ·{" "}
                    {r.counts.test_cases} tests
                  </div>
                </button>
              </li>
            );
          })}
          {!runs.length && !loadingList && (
            <li className="text-sm text-gray-500">No runs yet.</li>
          )}
        </ul>
      </aside>

      {/* Main panel */}
      <main className="flex-1 border rounded-lg bg-white p-4">
        <header className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-semibold">
              {manifest?.project ?? "SmartGate"} Agents
            </h1>
            <p className="text-sm text-gray-600">
              Run: <code>{selectedRunId ?? "—"}</code>
            </p>
          </div>
          {loadingRun && (
            <span className="text-sm text-gray-500">loading run…</span>
          )}
        </header>

        {/* Status cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="border rounded-md p-3">
            <div className="text-sm text-gray-500">PO Agent</div>
            <div className="text-xl font-semibold">
              {manifest ? "Clarifications" : "—"}
            </div>
            <div className="text-sm text-gray-600">
              {manifest ? "See summary below" : ""}
            </div>
          </div>
          <div className="border rounded-md p-3">
            <div className="text-sm text-gray-500">BSA Agent</div>
            <div className="text-xl font-semibold">{sectionCount}</div>
            <div className="text-sm text-gray-600">sections</div>
          </div>
          <div className="border rounded-md p-3">
            <div className="text-sm text-gray-500">QA Agent</div>
            <div className="text-xl font-semibold">{testCount}</div>
            <div className="text-sm text-gray-600">test cases</div>
          </div>
        </section>

        {/* Stories table */}
        <section className="mb-6">
          <h3 className="font-semibold mb-2">Stories</h3>
          <div className="text-sm text-gray-600 mb-2">{storyCount} total</div>
          <div className="overflow-auto border rounded-md">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-2 border-b">ID</th>
                  <th className="text-left p-2 border-b">Role</th>
                  <th className="text-left p-2 border-b">Goal</th>
                </tr>
              </thead>
              <tbody>
                {stories.map((s) => (
                  <tr key={s.story_id} className="odd:bg-white even:bg-gray-50">
                    <td className="p-2 border-b font-mono">{s.story_id}</td>
                    <td className="p-2 border-b">{s.as_a}</td>
                    <td className="p-2 border-b">{s.i_want}</td>
                  </tr>
                ))}
                {!stories.length && (
                  <tr>
                    <td className="p-2 text-gray-500" colSpan={3}>
                      No stories.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Summary preview */}
        <section>
          <h3 className="font-semibold mb-2">Run Summary</h3>
          <div className="border rounded-md p-3 bg-gray-50 overflow-auto max-h-[40vh] whitespace-pre-wrap">
            {summaryMd ? (
              summaryMd
            ) : (
              <span className="text-gray-500 text-sm">No summary.</span>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
