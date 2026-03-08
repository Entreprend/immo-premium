export default function About() {
  return (
    <section className="about-section" id="apropos">

      <div className="about-left animate">
        <div className="section-tag">● Qui Sommes-Nous</div>
        <h2 className="section-title">
          Vos Conseillers<br />Immobiliers de Confiance
        </h2>
        <p className="section-sub">
          ImmoPremium vous accompagne dans la recherche de votre bien idéal.
          Nous avons rassemblé plus de 50 offres immobilières adaptées à chaque
          budget et à chaque style de vie.
        </p>
        <div className="stats-grid">
          {[
            { num: "30+", label: "Clients Satisfaits", hl: false },
            { num: "5k+", label: "Prix Gagnés",        hl: true  },
            { num: "07+", label: "Ans d'Expérience",   hl: false },
            { num: "33+", label: "Projets Livrés",     hl: false },
          ].map((s, i) => (
            <div key={i} className={`stat-box ${s.hl ? "highlight" : ""}`}>
              <div className="num">{s.num}</div>
              <div className="label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="about-right animate">
        <div className="about-img-grid">
          <div className="about-img-main">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
              alt="Immeuble résidentiel"
            />
            <div className="verified-badge">✓</div>
          </div>
          <div className="about-img-sm">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80"
              alt="Famille heureuse"
            />
          </div>
          <div className="about-img-sm">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80"
              alt="Agents immobiliers"
            />
          </div>
        </div>
      </div>

    </section>
  );
}