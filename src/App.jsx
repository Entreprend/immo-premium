import { useEffect } from "react";
import { Phone } from "lucide-react";
import "./App.css";
import Navbar     from "./components/Navbar";
import Hero       from "./components/Hero";
import Categories from "./components/Categories";
import About      from "./components/About";
import Services   from "./components/Services";
import Properties from "./components/Properties";
import Footer     from "./components/Footer";
import Chatbot    from "./components/Chatbot";

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".animate").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <button
        className="floating-call"
        onClick={() => window.location.href = "tel:+22997000000"}
        aria-label="Appeler"
      >
        <Phone size={20} strokeWidth={2} color="white" />
      </button>

      <Chatbot />
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