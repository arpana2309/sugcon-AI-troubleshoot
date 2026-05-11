import ConfidenceBar from "./ConfidenceBar";

export default function ResultPanel({ result }: any) {
  const data = result.result;

  return (
    <div style={{ border: "1px solid #ccc", padding: 20 }}>
      <h2>🧾 Summary</h2>
      <p>{data.summary || data.cause}</p>

      <h3>🔍 Root Causes</h3>
      {data.rootCauses?.map((c: any, i: number) => (
        <div key={i}>
          <p><strong>{c.cause}</strong></p>
          <ConfidenceBar value={c.confidence} />
        </div>
      ))}

      <h3>🛠 Fix Steps</h3>
      <ul>
        {(data.fixSteps || [data.fix]).map((f: string, i: number) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      <h3>✅ Validation</h3>
      <ul>
        {data.validationSteps?.map((v: string, i: number) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
    </div>
  );
}