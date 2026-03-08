import { KeyRound, Award, Zap, ShieldCheck } from "lucide-react";

const services = [
  {
    icon:     <KeyRound size={24} strokeWidth={1.8} />,
    titre:    "Taxes Immobilières Abordables",
    featured: true,
  },
  {
    icon:     <Award size={24} strokeWidth={1.8} />,
    titre:    "Maisons de Qualité Garantie",
    featured: false,
  },
  {
    icon:     <Zap size={24} strokeWidth={1.8} />,
    titre:    "Processus Rapide et Simple",
    featured: false,
  },
  {
    icon:     <ShieldCheck size={24} strokeWidth={1.8} />,
    titre:    "Assurance Immobilière",
    featured: false,
  },
];

export default function Services() {
  const scrollTo = () => {
    document.getElementById("proprietes")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="services-section" id="services">
      <div className="services-header animate">
        <div className="section-tag">● Ce Que Nous Offrons</div>
        <h2 className="section-title">Nos Services</h2>
        <p className="section-sub">
          Optimisez vos annonces immobilières grâce à nos services précis et engageants.
        </p>
      </div>

      <div className="services-grid animate">
        {services.map((s, i) => (
          <div key={i} className={`svc-card ${s.featured ? "featured" : ""}`}>
            <div className="svc-icon">{s.icon}</div>
            <div>
              <h4>{s.titre}</h4>
              <p>
                Nous vous aidons à trouver un logement en proposant une
                expérience immobilière intelligente.
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="explore-wrap">
        <button className="explore-btn" onClick={scrollTo}>
          Explorer →
        </button>
      </div>
    </section>
  );
}