export default function ToolCard({
  tool,
  isFavorite,
  onToggleFavorite,
  onOpen,
}) {
  return (
    <div
      className="card"
      style={{
        position: "relative",
        padding: "15px",
        borderRadius: "8px",
        background: "white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ margin: 0 }}>{tool.name}</h3>
      <p style={{ margin: "5px 0", color: "#555" }}>{tool.description}</p>
      <small>{tool.department}</small>

      {/* ALWAYS VISIBLE PRIMARY ACTION */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => window.open(tool.url, "_blank")}>Open</button>
      </div>

      {/* HOVER ACTIONS */}
      <div className="hover-actions">
        <button onClick={() => onOpen(tool)}>Details</button>

        <button onClick={() => navigator.clipboard.writeText(tool.url)}>
          Copy
        </button>

        <button onClick={() => onToggleFavorite(tool.name)}>
          {isFavorite ? "★ Favorite" : "☆ Favorite"}
        </button>
      </div>

      {/* CSS */}
      <style>
        {`
          .hover-actions {
            position: absolute;
            bottom: 10px;
            right: 10px;
            display: none;
            gap: 6px;
          }

          .card:hover .hover-actions {
            display: flex;
          }

          .hover-actions button {
            font-size: 12px;
            padding: 5px 8px;
            border: none;
            border-radius: 4px;
            background: #f0f0f0;
            cursor: pointer;
          }

          .hover-actions button:hover {
            background: #ddd;
          }
        `}
      </style>
    </div>
  );
}
