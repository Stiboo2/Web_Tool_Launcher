import { useState, useMemo } from "react";
import tools from "./data/tools.json";
import ToolCard from "./components/ToolCard";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return tools.filter((tool) => {
      return (
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.department.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const groupedTools = useMemo(() => {
    return filteredTools.reduce((groups, tool) => {
      const dept = tool.department;

      if (!groups[dept]) {
        groups[dept] = [];
      }

      groups[dept].push(tool);

      return groups;
    }, {});
  }, [filteredTools]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Team Tools Portal</h1>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {Object.entries(groupedTools).map(([department, tools]) => (
        <div key={department} style={{ marginBottom: "30px" }}>
          <h2>{department}</h2>

          <div className="grid">
            {tools.map((tool, index) => (
              <ToolCard key={index} tool={tool} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
