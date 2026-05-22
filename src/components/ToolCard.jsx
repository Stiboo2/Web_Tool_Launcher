import { departmentColors } from "../utils/departmentColors";

export default function ToolCard({
  tool,
  isFavorite,
  onToggleFavorite,
  onOpen,
  showToast,
  darkMode,
}) {
  const color = departmentColors[tool.department] || departmentColors.Default;

  return (
    <div
      className="card"
      style={{
        position: "relative",
        padding: "15px",
        borderRadius: "10px",
        cursor: "pointer",
        background: darkMode ? "#1f2937" : "white",
        color: darkMode ? "white" : "#111827",
        boxShadow: darkMode
          ? "0 2px 10px rgba(0,0,0,0.6)"
          : `0 2px 8px ${color}33`,
        borderTop: `4px solid ${color}`,
        transition: "all 0.2s ease",
      }}
    >
      <h3 style={{ margin: 0 }}>{tool.name}</h3>

      <p
        style={{
          margin: "5px 0",
          color: darkMode ? "#d1d5db" : "#555",
        }}
      >
        {tool.description}
      </p>

      <small style={{ color }}>{tool.department}</small>

      {/* ACTIONS */}
      <div className="actions">
        <button onClick={() => window.open(tool.url, "_blank")}>Open</button>

        <button onClick={() => onOpen(tool)}>Details</button>

        <button
          onClick={async () => {
            await navigator.clipboard.writeText(tool.url);
            showToast?.("Copied to clipboard");
          }}
        >
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
            border-radius: 6px;
            cursor: pointer;
            background: ${darkMode ? "#374151" : "#f3f4f6"};
            color: ${darkMode ? "white" : "#111827"};
          }

          .actions button:hover {
            background: ${darkMode ? "#4b5563" : "#e5e7eb"};
          }
        `}
      </style>
    </div>
  );
}
