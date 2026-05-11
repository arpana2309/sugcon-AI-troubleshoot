"use client";

import { useState } from "react";
import DebugForm from "./components/DebugForm";
import ResultPanel from "./components/ResultPanel";
import SignalPanel from "./components/SignalPanel";

export default function DebugPage() {
  const [result, setResult] = useState<any>(null);

  return (
    <div style={{ padding: 20 }}>
      <h1>🧠 XM Cloud AI Debugger</h1>

      <DebugForm onResult={setResult} />

      {result && (
        <>
          <ResultPanel result={result} />
          <SignalPanel result={result} />
        </>
      )}
    </div>
  );
}