import Anthropic from "@anthropic-ai/sdk";

const PROPRIETES = [
  { nom: "Résidence Skyline",    addr: "Cotonou, Cadjehoun", prix: 145000000, ch: 4, sdb: 4, m2: 220 },
  { nom: "Villa Cèdre",          addr: "Cotonou, Fidjrossè",  prix: 125000000, ch: 4, sdb: 4, m2: 220 },
  { nom: "Appartement Lacustre", addr: "Cotonou, Akpakpa",    prix: 145000000, ch: 3, sdb: 2, m2: 185 },
  { nom: "Penthouse Prestige",   addr: "Cotonou, Haie Vive",  prix: 200000000, ch: 5, sdb: 3, m2: 310 },
];

const SYSTEM_PROMPT = `Tu es l'assistant virtuel d'ImmoPremium, agence immobilière à Cotonou. Tu réponds toujours en français, de façon naturelle et chaleureuse, comme dans une vraie conversation.

RÈGLES STRICTES :
- Pas de formatage markdown (pas de **, *, #, listes)
- Texte simple uniquement
- Une seule question à la fois
- Guider naturellement la conversation

Propriétés disponibles :
${PROPRIETES.map(p =>
  `- ${p.nom}, ${p.addr.replace("Cotonou, ", "")}, ${p.prix.toLocaleString()} FCFA, ${p.ch} chambres, ${p.m2}m²`
).join("\n")}

Pour une prise de rendez-vous, collecte dans l'ordre :
nom complet, numéro de téléphone, date souhaitée, propriété choisie.
Confirme ensuite avec un résumé simple en une phrase.

Pour les questions sur les propriétés, réponds naturellement sans tout lister d'un coup. Pose des questions pour comprendre le besoin du client avant de proposer.`;

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages must be a non-empty array" });
  }

  try {
    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
    });

    const reply = response.content.find((b) => b.type === "text")?.text
      || "Désolé, je n'ai pas pu répondre. Veuillez réessayer.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Erreur Claude API:", err);
    return res.status(err.status || 500).json({
      error: "Une erreur est survenue lors de la communication avec l'assistant.",
    });
  }
}
