"use client";

import { useState } from "react";

export default function DebugForm({ onResult }: any) {
  const [prompt, setPrompt] = useState("");
  const [query, setQuery] = useState("");
  const [logs, setLogs] = useState("");

  async function handleSubmit() {
    const res = await fetch("http://localhost:4000/api/diagnose", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt,
        query,
        logs: logs.split("\n")
      })
    });

    const data = await res.json();
    onResult(data);
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <textarea
        placeholder="Describe issue..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <textarea
        placeholder="GraphQL Query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <textarea
        placeholder="Logs (one per line)"
        value={logs}
        onChange={(e) => setLogs(e.target.value)}
      />

      <button onClick={handleSubmit}>Diagnose</button>
    </div>
  );
}