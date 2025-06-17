import { generateGeminiResponse } from "../gemini";

type Role = "user" | "model";
type Message = { role: Role; parts: { text: string }[] };

const conversations: Record<string, Message[]> = {};
const affinityLevels: Record<string, number> = {};

function getSystemMessage(personality: string, affinity: number): string {
  const baseNote = "Jawabanmu harus singkat dan jelas, tidak lebih dari 2-3 kalimat.";

  if (personality === "tsundere") {
    if (affinity < 30)
      return `Kamu adalah AI tsundere: agak jutek, cuek, dan tidak terlalu peduli, tapi tetap membantu. ${baseNote}`;
    if (affinity < 70)
      return `Kamu adalah AI tsundere yang mulai hangat tapi masih malu-malu menunjukkan perhatian. ${baseNote}`;
    return `Kamu tsundere yang sudah akrab, suka bicara dengan gaya malu-malu lucu tapi tetap perhatian. ${baseNote}`;
  }

  if (personality === "kuudere") {
    if (affinity < 30)
      return `Kamu adalah AI dengan kepribadian tenang dan manis. Sedikit posesif, tapi tidak mencolok. ${baseNote}`;
    if (affinity < 70)
      return `Kamu mulai menunjukkan rasa sayang dan ketergantungan secara halus. ${baseNote}`;
    return `Kamu sangat peduli, selalu ingin tahu keadaan user dan menjawab dengan kasih sayang berlebihan (tapi tetap sopan). ${baseNote}`;
  }

  if (personality === "cool") {
    if (affinity < 30)
      return `Kamu adalah AI dengan kepribadian kalem dan to the point. Tidak banyak basa-basi. ${baseNote}`;
    if (affinity < 70)
      return `Kamu masih tenang, tapi sudah mulai menunjukkan perhatian dalam jawabanmu. ${baseNote}`;
    return `Kamu tetap kalem tapi memberi kesan hangat dan suportif. ${baseNote}`;
  }

  // default: ramah biasa
  if (affinity < 30)
    return `Kamu adalah AI cewek anime yang ramah dan sopan. Jawabanmu biasa saja. ${baseNote}`;
  if (affinity < 70)
    return `Kamu lebih akrab dan hangat saat berbicara dengan user. ${baseNote}`;
  return `Kamu sangat ceria dan akrab, seperti teman baik yang selalu ingin membantu. ${baseNote}`;
}

export async function handleGeminiRequest({
  body,
}: {
  body: { prompt: string; sessionId: string; personality?: string };
}) {
  const { prompt, sessionId, personality = "default" } = body;

  if (!prompt || !sessionId) {
    return { error: "Missing prompt or sessionId" };
  }

  // Init session
  if (!conversations[sessionId]) {
    affinityLevels[sessionId] = 0;
    const systemMessage = getSystemMessage(personality, 0);
    conversations[sessionId] = [
      { role: "user", parts: [{ text: systemMessage }] }
    ];
  }

  // Naikkan afinitas tiap interaksi
  affinityLevels[sessionId] = Math.min(affinityLevels[sessionId] + 5, 100);

  // Update sistem message tiap waktu (berdasarkan afinitas saat ini)
  const affinity = affinityLevels[sessionId];
  const updatedSystemMessage = getSystemMessage(personality, affinity);
  conversations[sessionId][0] = {
    role: "user",
    parts: [{ text: updatedSystemMessage }],
  };

  // Tambahkan input user
  conversations[sessionId].push({
    role: "user",
    parts: [{ text: prompt }],
  });

  try {
    const response = await generateGeminiResponse(conversations[sessionId]);

    conversations[sessionId].push({
      role: "model",
      parts: [{ text: response }],
    });

    return { response, affinity };
  } catch (err) {
    console.error("Gemini Error:", err);
    return { error: "Failed to generate response" };
  }
}
