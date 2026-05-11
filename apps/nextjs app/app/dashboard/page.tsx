"use client";

import { ChangeEvent, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const dummyChartData = [
  { time: "10:00", errors: 2 },
  { time: "10:05", errors: 5 },
  { time: "10:10", errors: 3 }
];

type LogEntry = {
  [key: string]: unknown;
};

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [schema, setSchema] = useState<any>(null);
  const [aiResult, setAiResult] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [allLogs, setAllLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadSchema() {
    const res = await fetch("/api/schema");

    if (!res.ok) {
      throw new Error("Failed to fetch GraphQL schema");
    }

    const data = await res.json();
    setSchema(data.schema);
  }

  async function handlePromptChange(
    e: ChangeEvent<HTMLTextAreaElement>
  ) {
    const nextPrompt = e.target.value;
    setPrompt(nextPrompt);

    if (!schema) {
      await loadSchema();
    }
  }

  async function runDiagnose() {
    try {
      setLoading(true);

      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();

      setAiResult(
        data.result?.summary ||
          JSON.stringify(data.result, null, 2)
      );

      const incomingLogs = data.result?.logs || [];

      setLogs(incomingLogs);
      setAllLogs(incomingLogs);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        fontFamily: "Arial, sans-serif"
      }}
    >
      {/* HEADER */}
      <div
        style={{
          height: 90,
          background:
            "linear-gradient(90deg, #0f172a 0%, #1e3a8a 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 30px",
          color: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img
            src="https://www.sitecore.com/favicon.ico"
            alt="Sitecore"
            style={{
              width: 50,
              height: 50,
              background: "white",
              borderRadius: 12,
              padding: 8
            }}
          />

          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 28,
                fontWeight: 700
              }}
            >
              Sitecore AI Troubleshoot
            </h1>

            <p
              style={{
                margin: 0,
                opacity: 0.8,
                fontSize: 14
              }}
            >
              XM Cloud Diagnostics & AI Insights
            </p>
          </div>
        </div>

        <div
          style={{
            fontSize: 14,
            opacity: 0.9
          }}
        >
          AI Powered Dashboard
        </div>
      </div>

      {/* BODY */}
      <Tabs.Root
        defaultValue="overview"
        orientation="vertical"
        style={{
          display: "flex",
          minHeight: "calc(100vh - 90px)"
        }}
      >
        {/* SIDEBAR */}
        <Tabs.List
          style={{
            width: 240,
            background: "#111827",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            boxShadow: "4px 0 12px rgba(0,0,0,0.08)"
          }}
        >
          {[
            { label: "Overview", value: "overview" },
            { label: "Logs", value: "logs" },
            { label: "AI Diagnose", value: "ai" },
            { label: "GraphQL", value: "graphql" }
          ].map((tab) => (
            <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              style={{
                border: "none",
                background: "#1f2937",
                color: "white",
                padding: "14px 18px",
                borderRadius: 12,
                textAlign: "left",
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 600,
                transition: "0.2s"
              }}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {/* CONTENT */}
        <div
          style={{
            flex: 1,
            padding: 30
          }}
        >
          {/* OVERVIEW */}
          <Tabs.Content value="overview">
            <div
              style={{
                background: "white",
                borderRadius: 20,
                padding: 24,
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
              }}
            >
              <h2
                style={{
                  marginBottom: 20,
                  color: "#111827"
                }}
              >
                Error Trend Analytics
              </h2>

              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={dummyChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="errors"
                    stroke="#2563eb"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Tabs.Content>

          {/* LOGS */}
          <Tabs.Content value="logs">
            <div
              style={{
                background: "white",
                borderRadius: 20,
                padding: 24,
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
              }}
            >
              <h2>Application Logs</h2>

              <input
                placeholder="Filter logs..."
                style={{
                  width: "100%",
                  padding: 12,
                  marginBottom: 20,
                  borderRadius: 10,
                  border: "1px solid #d1d5db"
                }}
                onChange={(e) => {
                  const value = e.target.value.toLowerCase();

                  setLogs(
                    allLogs.filter((l) =>
                      JSON.stringify(l)
                        .toLowerCase()
                        .includes(value)
                    )
                  );
                }}
              />

              <pre
                style={{
                  background: "#0f172a",
                  color: "#22c55e",
                  padding: 20,
                  borderRadius: 12,
                  maxHeight: 450,
                  overflow: "auto"
                }}
              >
                {JSON.stringify(logs, null, 2)}
              </pre>
            </div>
          </Tabs.Content>

          {/* AI */}
          <Tabs.Content value="ai">
            <div
              style={{
                background: "white",
                borderRadius: 20,
                padding: 24,
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
              }}
            >
              <h2>AI Diagnose Engine</h2>

              <textarea
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Describe your Sitecore issue..."
                rows={6}
                style={{
                  width: "100%",
                  padding: 16,
                  borderRadius: 12,
                  border: "1px solid #d1d5db",
                  marginBottom: 20,
                  resize: "vertical"
                }}
              />

              <button
                onClick={runDiagnose}
                disabled={loading}
                style={{
                  background:
                    "linear-gradient(90deg,#2563eb,#7c3aed)",
                  color: "white",
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 15
                }}
              >
                {loading ? "Running..." : "Run AI Diagnose"}
              </button>

              <pre
                style={{
                  marginTop: 24,
                  background: "#111827",
                  color: "#f9fafb",
                  padding: 20,
                  borderRadius: 12,
                  overflow: "auto"
                }}
              >
                {aiResult}
              </pre>
            </div>
          </Tabs.Content>

          {/* GRAPHQL */}
          <Tabs.Content value="graphql">
            <div
              style={{
                background: "white",
                borderRadius: 20,
                padding: 24,
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
              }}
            >
              <h2>GraphQL Schema Explorer</h2>

              <button
                onClick={loadSchema}
                style={{
                  background: "#0f172a",
                  color: "white",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: 10,
                  cursor: "pointer",
                  marginBottom: 20
                }}
              >
                Load Schema
              </button>

              <pre
                style={{
                  background: "#f9fafb",
                  padding: 20,
                  borderRadius: 12,
                  maxHeight: 500,
                  overflow: "auto",
                  border: "1px solid #e5e7eb"
                }}
              >
                {schema
                  ? JSON.stringify(schema, null, 2)
                  : "Schema not loaded yet"}
              </pre>
            </div>
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
}