export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <input
      type="text"
      placeholder="Search tools..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{
        padding: "10px",
        width: "100%",
        maxWidth: "500px",
        marginBottom: "20px",
        borderRadius: "6px",
        border: "1px solid #ccc",
      }}
    />
  );
}
