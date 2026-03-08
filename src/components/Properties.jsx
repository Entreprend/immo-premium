import { BedDouble, Bath, Maximize2, MapPin } from "lucide-react";

const biens = [
  {
    img:  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    nom:  "Résidence Skyline",
    addr: "Cotonou, Cadjehoun",
    prix: "145 000 000 FCFA",
    ch: 4, sdb: 4, m2: 220,
  },
  {
    img:  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    nom:  "Villa Cèdre",
    addr: "Cotonou, Fidjrossè",
    prix: "125 000 000 FCFA",
    ch: 4, sdb: 4, m2: 220,
  },
  {
    img:  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    nom:  "Appartement Lacustre",
    addr: "Cotonou, Akpakpa",
    prix: "145 000 000 FCFA",
    ch: 3, sdb: 2, m2: 185,
  },
  {
    img:  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    nom:  "Penthouse Prestige",
    addr: "Cotonou, Haie Vive",
    prix: "200 000 000 FCFA",
    ch: 5, sdb: 3, m2: 310,
  },
];

export default function Properties() {
  return (
    <section className="properties-section" id="proprietes">
      <div className="properties-header animate">
        <div>
          <div className="section-tag">● Annonces Vedettes</div>
          <h2 className="section-title">
            Découvrez Votre Bien<br />Immobilier Idéal
          </h2>
        </div>
        <p className="section-sub">
          ImmoPremium a rassemblé plus de 50 offres de biens immobiliers
          adaptées à tous les budgets.
        </p>
      </div>

      <div className="properties-grid">
        {biens.map((b, i) => (
          <div
            key={i}
            className="prop-card animate"
            onClick={() => alert(`${b.nom}\n📍 ${b.addr}\n💰 ${b.prix}`)}
          >
            <div className="prop-card-img">
              <img src={b.img} alt={b.nom} />
              <span className="prop-price">{b.prix}</span>
              <div className="prop-overlay">
                <div className="prop-name">{b.nom}</div>
                <div className="prop-addr">
                  <MapPin size={12} />
                  {b.addr}
                </div>
              </div>
            </div>
            <div className="prop-card-body">
              <div className="prop-meta">
                <div className="prop-meta-item">
                  <BedDouble size={15} strokeWidth={1.8} />
                  {b.ch} Ch.
                </div>
                <div className="prop-meta-item">
                  <Bath size={15} strokeWidth={1.8} />
                  {b.sdb} SDB
                </div>
                <div className="prop-meta-item">
                  <Maximize2 size={15} strokeWidth={1.8} />
                  {b.m2} m²
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}