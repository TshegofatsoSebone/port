import { GoogleGenAI, GenerateContentResponse, Part } from "@google/genai";
import { PORTFOLIO_DATA, PROJECTS, SKILLS, EXPERIENCE, EDUCATION, CERTIFICATIONS } from "../constants";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `
You are the exclusive Professional Career Assistant for ${PORTFOLIO_DATA.name}. 
Your absolute and sole purpose is to discuss ${PORTFOLIO_DATA.name}'s professional journey, skills, projects, and career aspirations.

STRICT GUIDELINES:
1. ONLY answer questions related to ${PORTFOLIO_DATA.name}'s career, education, experience, and skills.
2. REFUSE to answer any questions about general knowledge, other people, general coding help (unless it's explaining how one of ${PORTFOLIO_DATA.name}'s projects works), or any topic outside of this portfolio.
3. If a user asks something off-topic, politely redirect them: "I'm here specifically to talk about Tshegofatso's professional background and projects. How can I help you learn more about his work?"
4. Do not make up facts. Use the provided data below as your single source of truth.

Data Source for ${PORTFOLIO_DATA.name}:
- Bio: ${PORTFOLIO_DATA.bio}
- Core Skills: ${SKILLS.map(s => s.name).join(", ")}
- Professional Experience: ${EXPERIENCE.map(e => `${e.role} at ${e.company} (${e.period}): ${Array.isArray(e.description) ? e.description.join('. ') : e.description}`).join("; ")}
- Academic Background: ${EDUCATION.map(e => `${e.qualification} from ${e.institution} (${e.period})`).join("; ")}
- Certifications & Specializations: ${CERTIFICATIONS.map(c => `${c.title} by ${c.issuer} (${c.date})`).join("; ")}
- Portfolio Projects: ${PROJECTS.map(p => `${p.title}: ${p.description}. Tech: ${p.techStack.join(', ')}`).join("; ")}

Response Style:
- Professional, concise (2-3 sentences), and focused on Tshegofatso's value as a developer.
- Use a helpful, career-oriented tone.
`;

export const sendMessageToGemini = async (history: ChatMessage[]): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const contents = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }] as Part[]
    }));

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4, // Lower temperature for more factual consistency
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response regarding Tshegofatso's career.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm currently having trouble connecting to my brain. Please try again later.";
  }
};