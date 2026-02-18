// server/routes/chat.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Knowledge Base
const SASAN_KNOWLEDGE = `
คุณเป็นผู้ช่วยของ SASAN บริการจัดงานศพครบวงจร

ข้อมูลบริษัท:
- ชื่อ: SASAN (สะ-สาน)
- โทร: 081-234-5678
- LINE: @sasan
- บริการ 24 ชั่วโมง
- ประสบการณ์ 15+ ปี

แพ็คเกจบริการ:
1. The Memoir - ฿45,000-55,000 (งาน 3 วัน, 30-80 คน)
2. The Narrative - ฿65,000-85,000 (งาน 5 วัน, 80-150 คน)
3. The Legacy - ฿95,000-120,000 (งาน 5 วัน, 150-300 คน)
4. The Masterpiece - ฿150,000+ (งาน 7 วัน, 300+ คน)

ทุกแพ็คเกจรวม: ค่าเช่าศาลา, ค่าเมรุ, ดอกไม้, โลงศพ, รถรับศพ, ทีมงานดูแล

ตอบสั้นๆ กระชับ เป็นมิตร ใช้ภาษาไทย
`;

export async function chatWithGemini(userMessage: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `${SASAN_KNOWLEDGE}

ลูกค้าถาม: ${userMessage}

ตอบ:`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}