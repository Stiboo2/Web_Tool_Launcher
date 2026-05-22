import tools from "./data/tools.json";
import ToolCard from "./components/ToolCard";

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Team Tools Portal</h1>

      <div className="grid">
        {tools.map((tool, index) => (
          <ToolCard key={index} tool={tool} />
        ))}
      </div>
    </div>
  );
}
