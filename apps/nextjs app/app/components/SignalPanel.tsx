export default function SignalPanel({ result }: any) {
  const ctx = result.context || {};

  return (
    <div style={{ marginTop: 20 }}>
      <h2>📡 System Signals</h2>

      <div>
        <strong>GraphQL:</strong>{" "}
        {ctx.validationResults?.graphql?.valid ? "✅ Valid" : "❌ Invalid"}
      </div>

      <div>
        <strong>Publishing:</strong>{" "}
        {ctx.validationResults?.publishing
          ? "❌ Not Published"
          : "✅ OK"}
      </div>

      <div>
        <strong>Layout:</strong>{" "}
        {ctx.validationResults?.layout
          ? "⚠️ Issue"
          : "✅ OK"}
      </div>
    </div>
  );
}