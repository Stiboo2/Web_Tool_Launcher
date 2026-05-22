import { useState, useMemo, useEffect } from "react";
import tools from "./data/tools.json";
import ToolCard from "./components/ToolCard";
import SearchBar from "./components/SearchBar";
import ToolModal from "./components/ToolModal";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (toolName) => {
    setFavorites((prev) =>
      prev.includes(toolName)
        ? prev.filter((t) => t !== toolName)
        : [...prev, toolName],
    );
  };

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

  const favoriteTools = useMemo(
    () => filteredTools.filter((t) => favorites.includes(t.name)),
    [filteredTools, favorites],
  );

  const nonFavoriteTools = useMemo(
    () => filteredTools.filter((t) => !favorites.includes(t.name)),
    [filteredTools, favorites],
  );

  const groupedTools = useMemo(() => {
    return nonFavoriteTools.reduce((acc, tool) => {
      if (!acc[tool.department]) acc[tool.department] = [];
      acc[tool.department].push(tool);
      return acc;
    }, {});
  }, [nonFavoriteTools]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Team Tools Portal</h1>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {favoriteTools.length > 0 && (
        <div style={{ marginBottom: "30px" }}>
          <h2>⭐ Favorites</h2>
          <div className="grid">
            {favoriteTools.map((tool) => (
              <ToolCard
                key={tool.name}
                tool={tool}
                isFavorite={true}
                onToggleFavorite={toggleFavorite}
                onOpen={() => setSelectedTool(tool)}
              />
            ))}
          </div>
        </div>
      )}

      {Object.entries(groupedTools).map(([department, tools]) => (
        <div key={department} style={{ marginBottom: "30px" }}>
          <h2>{department}</h2>
          <div className="grid">
            {tools.map((tool) => (
              <ToolCard
                key={tool.name}
                tool={tool}
                isFavorite={favorites.includes(tool.name)}
                onToggleFavorite={toggleFavorite}
                onOpen={() => setSelectedTool(tool)}
              />
            ))}
          </div>
        </div>
      ))}

      {selectedTool && (
        <ToolModal
          tool={selectedTool}
          onClose={() => setSelectedTool(null)}
          onToggleFavorite={toggleFavorite}
          isFavorite={favorites.includes(selectedTool.name)}
        />
      )}
    </div>
  );
}
