import { useEffect } from "react";
import './App.css'
import Navbar     from "./components/Navbar";
import Hero       from "./components/Hero";
import Categories from "./components/Categories";
import About      from "./components/About";
import Services   from "./components/Services";
import Properties from "./components/Properties";
import Footer     from "./components/Footer";
import { Phone } from "lucide-react";

export default function App() {

  // Animations au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".animate").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Bouton flottant */}
      <button
  className="floating-call"
  onClick={() => window.location.href = "tel:+22997000000"}
  aria-label="Appeler"
>
  <Phone size={20} strokeWidth={2} color="white" />
</button>

      <Navbar />
      <Hero />
      <Categories />
      <About />
      <Services />
      <Properties />
      <Footer />
    </>
  );
}