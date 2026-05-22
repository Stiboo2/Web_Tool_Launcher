import { useState } from "react";
import tools from "./data/tools.json";
import ToolCard from "./components/ToolCard";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter((tool) => {
    const query = searchQuery.toLowerCase().trim();

    return (
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.department.toLowerCase().includes(query)
    );
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Team Tools Portal</h1>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="grid">
        {filteredTools.map((tool, index) => (
          <ToolCard key={index} tool={tool} />
        ))}
      </div>
    </div>
  );
}
