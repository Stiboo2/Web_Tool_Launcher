import { useState, useMemo, useEffect } from "react";
import tools from "./data/tools.json";
import ToolCard from "./components/ToolCard";
import SearchBar from "./components/SearchBar";
import ToolModal from "./components/ToolModal";
import { departmentColors } from "./utils/departmentColors";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [toast, setToast] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 5000);
  };

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
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        background: darkMode ? "#111827" : "#f3f4f6",
        color: darkMode ? "white" : "#111827",
        transition: "all 0.3s ease",
      }}
    >
      {/* TOAST */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: "#2563eb",
            color: "white",
            padding: "14px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            zIndex: 9999,
            animation: "fadeInOut 5s ease forwards",
          }}
        >
          {toast}
        </div>
      )}

      <style>
        {`
          @keyframes fadeInOut {
            0% {
              opacity: 0;
              transform: translateY(-10px);
            }

            10% {
              opacity: 1;
              transform: translateY(0);
            }

            90% {
              opacity: 1;
            }

            100% {
              opacity: 0;
              transform: translateY(-10px);
            }
          }
        `}
      </style>

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Team Tools Portal</h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: darkMode ? "#374151" : "white",
            color: darkMode ? "white" : "#111827",
          }}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        darkMode={darkMode}
      />

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
                showToast={showToast}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      )}

      {Object.entries(groupedTools).map(([department, tools]) => {
        const color = departmentColors[department] || departmentColors.Default;

        return (
          <div key={department} style={{ marginBottom: "30px" }}>
            <h2
              style={{
                borderLeft: `4px solid ${color}`,
                paddingLeft: "10px",
              }}
            >
              {department}
            </h2>

            <div className="grid">
              {tools.map((tool) => (
                <ToolCard
                  key={tool.name}
                  tool={tool}
                  isFavorite={favorites.includes(tool.name)}
                  onToggleFavorite={toggleFavorite}
                  onOpen={() => setSelectedTool(tool)}
                  showToast={showToast}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </div>
        );
      })}

      {selectedTool && (
        <ToolModal
          tool={selectedTool}
          onClose={() => setSelectedTool(null)}
          onToggleFavorite={toggleFavorite}
          isFavorite={favorites.includes(selectedTool.name)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}
