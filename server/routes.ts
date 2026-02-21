import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { chatWithGemini } from "./chat";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Existing inquiries route
  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // ============================================================
  // Chat API Route - Gemini AI
  // ============================================================
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, customerName } = req.body;
      
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "กรุณาส่งข้อความ" });
      }

      const reply = await chatWithGemini({
        message,
        customerName: typeof customerName === "string" ? customerName : undefined,
      });
      res.json({ reply });
      
    } catch (error) {
      console.error("Chat API Error:", error);
      res.status(500).json({ 
        error: "เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่โดยตรง",
        fallback: {
          phone: "081-234-5678",
          line: "@sasan"
        }
      });
    }
  });

  return httpServer;
}
