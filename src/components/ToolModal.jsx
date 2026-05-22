export default function ToolModal({
  tool,
  onClose,
  onToggleFavorite,
  isFavorite,
}) {
  if (!tool) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "12px",
          width: "420px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>{tool.name}</h2>

        <p>{tool.description}</p>

        <p>
          <strong>Department:</strong> {tool.department}
        </p>

        <p
          style={{
            wordBreak: "break-all",
            color: "#2563eb",
          }}
        >
          {tool.url}
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          <button onClick={() => window.open(tool.url, "_blank")}>Open</button>

          <button onClick={() => navigator.clipboard.writeText(tool.url)}>
            Copy
          </button>

          <button onClick={() => onToggleFavorite(tool.name)}>
            {isFavorite ? "★ Remove" : "☆ Favorite"}
          </button>

          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
