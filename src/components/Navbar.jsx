import { useState, useEffect } from "react";
import { Phone, Menu, X, Home, Info, Settings, Building2, Mail } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const liens = [
    { id: "accueil",    label: "Accueil",     icon: <Home size={16} />     },
    { id: "apropos",    label: "À propos",    icon: <Info size={16} />     },
    { id: "services",   label: "Services",    icon: <Settings size={16} /> },
    { id: "proprietes", label: "Propriétés",  icon: <Building2 size={16} />},
    { id: "contact",    label: "Contact",     icon: <Mail size={16} />     },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>

        {/* Liens desktop */}
        <ul className="nav-links">
          {liens.map((l) => (
            <li key={l.id}>
              <a onClick={() => scrollTo(l.id)} href={`#${l.id}`}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Logo */}
        <div className="logo-wrap">
<img src={`${import.meta.env.BASE_URL}logo.svg`} alt="ImmoPremium" style={{ height: "44px" }} />
     </div>
        {/* Téléphone desktop */}
        <div className="nav-phone nav-phone-desktop">
          <Phone size={15} strokeWidth={2.5} />
          +229 00 00 00 00
        </div>

        {/* Hamburger mobile */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen
            ? <X size={24} color="var(--text)" />
            : <Menu size={24} color="var(--text)" />
          }
        </button>

      </nav>

      {/* Menu déroulant mobile */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          {liens.map((l) => (
            <li key={l.id}>
              <a onClick={() => scrollTo(l.id)} href={`#${l.id}`}>
                <span className="mobile-menu-icon">{l.icon}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="tel:+22997000000" className="mobile-phone-btn">
          <Phone size={16} strokeWidth={2.5} />
          +229 00 00 00 00
        </a>
      </div>
    </>
  );
}