import { departmentColors } from "../utils/departmentColors";

export default function ToolCard({
  tool,
  isFavorite,
  onToggleFavorite,
  onOpen,
}) {
  const color = departmentColors[tool.department] || departmentColors.Default;

  return (
    <div
      className="card"
      style={{
        position: "relative",
        padding: "15px",
        borderRadius: "8px",
        background: "white",
        boxShadow: `0 2px 8px ${color}33`,
        borderTop: `4px solid ${color}`,
      }}
    >
      <h3 style={{ margin: 0 }}>{tool.name}</h3>

      <p style={{ margin: "5px 0", color: "#555" }}>{tool.description}</p>

      <small style={{ color }}>{tool.department}</small>

      {/* ACTION BAR */}
      <div className="actions">
        <button onClick={() => window.open(tool.url, "_blank")}>Open</button>

        <button onClick={() => onOpen(tool)}>Details</button>

        <button onClick={() => navigator.clipboard.writeText(tool.url)}>
          Copy
        </button>

        <button onClick={() => onToggleFavorite(tool.name)}>
          {isFavorite ? "★ Favorite" : "☆ Favorite"}
        </button>
      </div>

      <style>
        {`
          .actions {
            margin-top: 10px;
            display: flex;
            gap: 6px;
            opacity: 0;
            transform: translateY(5px);
            transition: all 0.2s ease;
            pointer-events: none;
          }

          .card:hover .actions {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
          }

          .actions button {
            font-size: 12px;
            padding: 5px 8px;
            border: none;
            border-radius: 4px;
            background: #f3f4f6;
            cursor: pointer;
          }

          .actions button:hover {
            background: #e5e7eb;
          }
        `}
      </style>
    </div>
  );
}
