import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "th" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: any; // The content object for the current language
}

export const content = {
  th: {
    nav: { home: "หน้าหลัก", about: "เกี่ยวกับเรา", services: "บริการ", contact: "ติดต่อ" },
    hero: {
      tagline: "Designing Your Beautiful Last Chapter",
      subtitle: "ออกแบบบทสุดท้ายที่งดงามของคุณ"
    },
    dimensions: {
      matter: { title: "สสาร (MATTER)", description: "ความจริงของธรรมชาติ - ร่างกายมนุษย์คือสสาร น้ำตาก็คือสสารที่มีน้ำหนักเช่นกัน" },
      clear: { title: "สะสาง (CLEAR/RESOLVE)", description: "การปลดเปลื้องทางใจ - แก้ปัญหาที่ญาติไม่มีเวลา ให้ได้กล่าวลาอย่างหมดจด" },
      message: { title: "สาร (MESSAGE)", description: "จดหมายฉบับสุดท้าย - ส่งสารสุดท้ายของผู้ที่จากไป บทอวสานที่งดงาม" },
      weave: { title: "สาน (WEAVE)", description: "การถักทอความสัมพันธ์ - สานต่อเจตนารมณ์ ประสานทุกอย่างให้สมบูรณ์" }
    },
    services: {
      title: "บริการของเรา",
      items: [
        { title: "Digital Legacy", description: "ส่งต่อความทรงจำและสินทรัพย์ดิจิทัล" },
        { title: "งานธีมพิเศษ", description: "ออกแบบงานตามอัตลักษณ์ผู้จากไป" },
        { title: "วัสดุธรรมชาติ", description: "เป็นมิตรต่อสิ่งแวดล้อมและยั่งยืน" }
      ]
    },
    philosophy: {
      quote: "ชีวิตคือการประกอบกันของ 'สสาร'... ร่างกาย ความรัก และน้ำตา"
    },
    contact: {
      title: "ติดต่อเรา",
      name: "ชื่อ",
      email: "อีเมล",
      phone: "เบอร์โทรศัพท์ (ไม่บังคับ)",
      serviceType: "ประเภทบริการที่สนใจ",
      message: "ข้อความ",
      submit: "ส่งข้อความ"
    }
  },
  en: {
    nav: { home: "Home", about: "About", services: "Services", contact: "Contact" },
    hero: {
      tagline: "Designing Your Beautiful Last Chapter",
      subtitle: "Creating meaningful farewells with dignity and grace"
    },
    dimensions: {
      matter: { title: "MATTER", description: "Understanding nature's truth - the human body returns to earth." },
      clear: { title: "CLEAR/RESOLVE", description: "Emotional release - we handle the details so you can say goodbye." },
      message: { title: "MESSAGE", description: "The final letter - conveying the deceased's last wishes." },
      weave: { title: "WEAVE", description: "Connecting relationships - continuing their legacy." }
    },
    services: {
      title: "Our Services",
      items: [
        { title: "Digital Legacy", description: "Passing on memories and digital assets" },
        { title: "Themed Memorials", description: "Custom designed ceremonies honoring identity" },
        { title: "Sustainable Materials", description: "Eco-friendly and returning to nature" }
      ]
    },
    philosophy: {
      quote: "Life is the assembly of 'matter'... body, love, and tears."
    },
    contact: {
      title: "Contact Us",
      name: "Name",
      email: "Email",
      phone: "Phone (Optional)",
      serviceType: "Service Type",
      message: "Message",
      submit: "Send Message"
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("th");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "th" ? "en" : "th"));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t: content[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
