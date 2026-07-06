import Anthropic from "@anthropic-ai/sdk";

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
