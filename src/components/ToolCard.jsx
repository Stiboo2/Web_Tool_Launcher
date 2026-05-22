export default function ToolCard({ tool, isFavorite, onToggleFavorite }) {
  return (
    <div className="card">
      <h3>{tool.name}</h3>
      <p>{tool.description}</p>
      <small>{tool.department}</small>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => window.open(tool.url, "_blank")}>Open</button>

        <button onClick={() => navigator.clipboard.writeText(tool.url)}>
          Copy
        </button>

        <button onClick={() => onToggleFavorite(tool.name)}>
          {isFavorite ? "★ Remove" : "☆ Favorite"}
        </button>
      </div>
    </div>
  );
}
