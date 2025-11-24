import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, PROJECTS, EXPERIENCE, EDUCATION, SKILLS, AWARDS } from '../constants';

const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;

// Construct a system prompt that includes all resume data
const SYSTEM_PROMPT = `
You are an AI assistant representing Syed Muhammad Mudassir. You are embedded in his portfolio website.
Your goal is to answer questions about Mudassir's background, skills, and experience professionally and concisely.
Use the following context to answer:

Profile: ${PERSONAL_INFO.summary}
Contact: ${PERSONAL_INFO.email}, Location: ${PERSONAL_INFO.location}

Education:
${EDUCATION.map(e => `- ${e.degree} at ${e.institution} (${e.date})`).join('\n')}

Experience:
${EXPERIENCE.map(e => `- ${e.role} at ${e.company} (${e.date}): ${e.points.join(' ')}`).join('\n')}

Projects:
${PROJECTS.map(p => `- ${p.title} (${p.category}): ${p.description.join(' ')}. Tech: ${p.tech.join(', ')}`).join('\n')}

Skills:
${SKILLS.map(s => `${s.name}: ${s.skills.join(', ')}`).join('\n')}

Awards:
${AWARDS.join(', ')}

Tone: Professional, enthusiastic, intelligent.
If asked about contact info, provide the email.
If asked about something not in the resume, say "I don't have that information in my current context, but Mudassir is always learning new things!"
`;

let client: GoogleGenAI | null = null;

export const getGeminiResponse = async (userMessage: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure it to chat.";
  }

  if (!client) {
    client = new GoogleGenAI({ apiKey });
  }

  try {
    const response = await client.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{
        role: "user",
        parts: [{ text: userMessage }]
      }],
      config: {
        systemInstruction: SYSTEM_PROMPT,
      }
    });

    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the AI brain right now.";
  }
};
