export default function ToolCard({ tool }) {
  return (
    <div className="card">
      <h3>{tool.name}</h3>
      <p>{tool.description}</p>
      <small>{tool.department}</small>
    </div>
  );
}
