export default function ConfidenceBar({ value }: { value: number }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{
          height: 10,
          width: `${value}%`,
          background: value > 80 ? "green" : "orange"
        }}
      />
      <small>{value}% confidence</small>
    </div>
  );
}