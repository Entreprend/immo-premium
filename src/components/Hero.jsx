import { useState } from "react";

export default function Hero() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      alert(`🔍 Recherche : "${query}"`);
    } else {
      alert("Veuillez entrer une adresse ou un type de bien.");
    }
  };

  return (
    <section className="hero" id="accueil">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1>Trouvez Votre Propriété Idéale</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍  Rechercher une propriété..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className="search-btn" onClick={handleSearch}>→</button>
        </div>
      </div>
    </section>
  );
}