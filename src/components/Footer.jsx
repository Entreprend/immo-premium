import { Twitter, Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-grid">

        <div className="footer-logo-wrap">
          <div className="logo-wrap">
<img src={`${import.meta.env.BASE_URL}logo-footer.svg`} alt="ImmoPremium" style={{ height: "44px" }} />
        </div>
          <p>
            Votre partenaire de confiance pour trouver la propriété parfaite.
            Nous offrons des solutions intelligentes pour une expérience
            immobilière fluide.
          </p>
        </div>

        <div className="footer-col">
          <h5>Entreprise</h5>
          <ul>
            <li><a href="#">Accueil</a></li>
            <li><a href="#">À propos</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Propriétés</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Services</h5>
          <ul>
            <li><a href="#">Taxes immo.</a></li>
            <li><a href="#">Qualité garantie</a></li>
            <li><a href="#">Processus rapide</a></li>
            <li><a href="#">Assurance</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Contact</h5>
          <ul>
            <li>
              <a href="tel:+22997000000">
                <Phone size={13} style={{ marginRight: 6 }} />
                +229 00 00 00 00
              </a>
            </li>
            <li>
              <a href="mailto:contact@immopremium.bj">
                <Mail size={13} style={{ marginRight: 6 }} />
                contact@immopremium.bj
              </a>
            </li>
            <li>
              <a href="#">
                <MapPin size={13} style={{ marginRight: 6 }} />
                Cotonou, Bénin
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <span>©2025 ImmoPremium. Tous droits réservés</span>
        <div className="footer-socials">
          <a href="#" className="fsoc" aria-label="Twitter">
            <Twitter size={16} strokeWidth={1.8} />
          </a>
          <a href="#" className="fsoc" aria-label="Facebook">
            <Facebook size={16} strokeWidth={1.8} />
          </a>
          <a href="#" className="fsoc" aria-label="Instagram">
            <Instagram size={16} strokeWidth={1.8} />
          </a>
          <a href="#" className="fsoc" aria-label="LinkedIn">
            <Linkedin size={16} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </footer>
  );
}