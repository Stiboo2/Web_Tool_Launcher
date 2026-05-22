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
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "400px",
        }}
      >
        <h2>{tool.name}</h2>
        <p>{tool.description}</p>
        <p>
          <b>Department:</b> {tool.department}
        </p>
        <p>
          <b>URL:</b> {tool.url}
        </p>

        <div style={{ marginTop: "15px" }}>
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
