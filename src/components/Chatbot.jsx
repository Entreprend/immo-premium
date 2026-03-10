import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader } from "lucide-react";

const PROPRIETES = [
  { nom: "Résidence Skyline",    addr: "Cotonou, Cadjehoun", prix: 145000000, ch: 4, sdb: 4, m2: 220 },
  { nom: "Villa Cèdre",          addr: "Cotonou, Fidjrossè",  prix: 125000000, ch: 4, sdb: 4, m2: 220 },
  { nom: "Appartement Lacustre", addr: "Cotonou, Akpakpa",    prix: 145000000, ch: 3, sdb: 2, m2: 185 },
  { nom: "Penthouse Prestige",   addr: "Cotonou, Haie Vive",  prix: 200000000, ch: 5, sdb: 3, m2: 310 },
];

const SYSTEM_PROMPT = `Tu es l'assistant virtuel d'ImmoPremium, une agence immobilière basée à Cotonou, Bénin.
Tu réponds toujours en français, de façon professionnelle, chaleureuse et concise.

Voici les propriétés disponibles :
${PROPRIETES.map(p =>
  `- ${p.nom} (${p.addr}) : ${p.prix.toLocaleString()} FCFA | ${p.ch} chambres | ${p.sdb} SDB | ${p.m2} m²`
).join("\n")}

Tu peux :
1. Répondre aux questions sur ces propriétés
2. Aider à trouver un bien selon le budget et les besoins du client
3. Prendre les informations pour un rendez-vous (nom, téléphone, date souhaitée)
4. Répondre aux questions générales sur l'immobilier

Si quelqu'un veut prendre rendez-vous, collecte : son nom, son numéro de téléphone, et sa disponibilité.
Reste toujours positif et encourage le client à visiter nos propriétés.
Ne réponds qu'aux sujets liés à l'immobilier et à ImmoPremium.`;

export default function Chatbot() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Bonjour 👋 Je suis l'assistant ImmoPremium ! Comment puis-je vous aider aujourd'hui ? Je peux vous présenter nos propriétés, vous aider à trouver le bien idéal selon votre budget, ou organiser une visite.",
    },
  ]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef             = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...newMessages
                .filter((m, i) => !(m.role === "assistant" && i === 0))
                .map(m => ({
                  role: m.role === "assistant" ? "assistant" : "user",
                  content: m.content,
                })),
            ],
            max_tokens: 1024,
            temperature: 0.7,
          }),
        }
      );

      const data = await response.json();
      console.log("Réponse Groq:", JSON.stringify(data, null, 2));
      const reply = data.choices?.[0]?.message?.content
        || "Désolé, je n'ai pas pu répondre. Veuillez réessayer.";

      setMessages([...newMessages, { role: "assistant", content: reply }]);

    } catch (err) {
      console.error("Erreur:", err);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Une erreur est survenue. Veuillez réessayer ou nous contacter au +229 97 00 00 00.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="chat-bubble"
        onClick={() => setOpen(!open)}
        aria-label="Ouvrir le chat"
      >
        {open ? <X size={24} color="white" /> : <MessageCircle size={24} color="white" />}
        {!open && <span className="chat-notif">1</span>}
      </button>

      <div className={`chat-window ${open ? "open" : ""}`}>
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar">
              <Bot size={20} color="white" />
            </div>
            <div>
              <div className="chat-name">Assistant ImmoPremium</div>
              <div className="chat-status">
                <span className="chat-dot" />
                En ligne
              </div>
            </div>
          </div>
          <button className="chat-close" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.role === "user" ? "user" : "bot"}`}>
              {msg.role === "assistant" && (
                <div className="msg-avatar"><Bot size={14} color="white" /></div>
              )}
              <div className="msg-bubble">{msg.content}</div>
              {msg.role === "user" && (
                <div className="msg-avatar user-av"><User size={14} color="white" /></div>
              )}
            </div>
          ))}

          {loading && (
            <div className="chat-msg bot">
              <div className="msg-avatar"><Bot size={14} color="white" /></div>
              <div className="msg-bubble typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {messages.length === 1 && (
          <div className="chat-suggestions">
            {["Voir les propriétés disponibles", "Budget 150 000 000 FCFA", "Prendre un rendez-vous"].map((s, i) => (
              <button key={i} className="suggestion-btn" onClick={() => setInput(s)}>{s}</button>
            ))}
          </div>
        )}

        <div className="chat-input-wrap">
          <input
            type="text"
            className="chat-input"
            placeholder="Écrivez votre message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading}
          />
          <button className="chat-send" onClick={sendMessage} disabled={loading || !input.trim()}>
            {loading ? <Loader size={18} className="spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </>
  );
}