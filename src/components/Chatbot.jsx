import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader } from "lucide-react";

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
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.filter((m, i) => !(m.role === "assistant" && i === 0)),
        }),
      });

      const data = await response.json();
      const reply = data.reply
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