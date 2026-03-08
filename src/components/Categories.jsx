import { useState } from "react";

const cats = [
  {
    label: "Duplex & Triplex",
    img: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80",
  },
  {
    label: "Appartements",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
  },
  {
    label: "Immeubles",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  },
  {
    label: "Architecture Moderne",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
];

export default function Categories() {
  const [active, setActive] = useState(0);

  return (
    <div className="categories">
      {cats.map((cat, i) => (
        <div
          key={i}
          className={`cat-item ${active === i ? "active" : ""}`}
          onClick={() => setActive(i)}
        >
          <img className="cat-img" src={cat.img} alt={cat.label} />
          <div className="cat-label">{cat.label}</div>
        </div>
      ))}
    </div>
  );
}