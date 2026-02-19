import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Gift,
  Shield,
  Sparkles,
  Star,
  Check,
  X,
  ChevronRight,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ============================================================
// BLOG DATA - 5 บทความหลัก
// ============================================================
const blogArticles = [
  {
    id: 1,
    number: "01",
    slug: "pre-planning",
    category: "วางแผนล่วงหน้า",
    categoryEn: "PRE-PLANNING",
    title: 'อย่าให้ "บทสุดท้าย" กลายเป็นภาระ',
    subtitle: "วางแผนวันนี้... เพื่อให้ลูกหลานจดจำคุณด้วยรอยยิ้ม",
    excerpt: "คุณเขียนบทชีวิตมาดีทั้งเรื่อง... อย่าปล่อยให้ตอนจบวุ่นวาย Sasan ช่วยคุณออกแบบให้สมบูรณ์แบบ เพื่อให้ลูกหลานจดจำความสง่างามของคุณ ไม่ใช่ความยุ่งยาก",
    content: `การวางแผนล่วงหน้า ไม่ใช่การแช่งตัวเอง แต่คือการบอกคนที่คุณรักว่า "ไม่ต้องห่วงนะ ฉันเตรียมทุกอย่างไว้ให้แล้ว"

ลองนึกภาพดู... ในวันที่คุณจากไป ครอบครัวไม่ต้องทะเลาะกันเรื่องจัดงาน ไม่ต้องวุ่นวายติดต่อวัด หาโลงศพ หาของชำร่วย ทุกอย่างถูกจัดเตรียมไว้เรียบร้อย พวกเขามีเวลาทำใจ และจดจำช่วงเวลาดีๆ ที่มีร่วมกับคุณ

นี่คือของขวัญชิ้นสุดท้าย... ที่คุณมอบให้คนที่รักได้`,
    image: "/Blog pic/Article1.1.jpg",
    readTime: "5 นาที",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    number: "02",
    slug: "custom-design",
    category: "ออกแบบเฉพาะตัว",
    categoryEn: "CUSTOM DESIGN",
    title: 'งานศพที่ "ไม่ใช่คุณ" คือความน่าเสียดาย',
    subtitle: "ชอบทะเล? หรือชอบความหรูหรา? ออกแบบได้ทุกสไตล์",
    excerpt: "ชอบทะเล? หรือชอบความหรูหรา? เปลี่ยนศาลาวัด ให้เป็น \"แกลเลอรีชีวิต\" ที่ตะโกนความเป็นตัวคุณออกมา 100% เพราะคุณมีเพียงคนเดียวในโลก",
    content: `ทำไมงานศพต้องเป็นรูปแบบเดิมๆ? 

ถ้าคุณชอบทะเล... เราจัดธีมทะเลให้
ถ้าคุณชอบดอกไม้ป่า... เราเนรมิตสวนดอกไม้ในศาลา
ถ้าคุณเป็นคนรักความเรียบง่าย... เราออกแบบสไตล์มินิมอลให้

Sasan เปลี่ยนศาลาวัด ให้เป็น "แกลเลอรีชีวิต" ที่บอกเล่าตัวตนของคุณ 100%`,
    image: "/Blog pic/Article2.1.jpg",
    readTime: "4 นาที",
    icon: Sparkles,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 3,
    number: "03",
    slug: "luxury-service",
    category: "บริการระดับ VIP",
    categoryEn: "LUXURY CHOICE",
    title: 'เลือกสิ่งที่ดีที่สุด ในวันที่ยัง "เลือกเอง" ได้',
    subtitle: "ความตายไม่มีแจ้งเตือน... อย่ารอให้คนอื่นมาเลือกให้",
    excerpt: "ความตายไม่มีแจ้งเตือน... อย่ารอให้คนอื่นมาเลือกให้ ยกระดับวาระสุดท้ายด้วยบริการ Luxury Service ใส่ใจทุกดีเทลราวกับคุณเป็นแขก VIP",
    content: `บริการระดับ VVIP ใส่ใจทุกดีเทล

ดอกไม้สดจากต่างประเทศ กลิ่นหอมอโรม่าเฉพาะ ผ้าไหมเนื้อดี โลงศพไม้สักแกะสลัก... ทุกอย่างถูกคัดสรรมาอย่างพิถีพิถัน

เพราะคุณสมควรได้รับสิ่งที่ดีที่สุด... จนวินาทีสุดท้าย`,
    image: "/Blog pic/Article3.1.jpg",
    readTime: "3 นาที",
    icon: Star,
    color: "from-amber-500 to-amber-600",
  },
  {
    id: 5,
    number: "05",
    slug: "family-support",
    category: "ดูแลครอบครัว",
    categoryEn: "SUPPORT",
    title: 'ในวันที่ครอบครัวอ่อนแอ ให้เราเป็น "เกราะป้องกัน"',
    subtitle: "วินาทีแห่งการสูญเสีย คือช่วงที่คนข้างหลังเปราะบางที่สุด",
    excerpt: "วินาทีแห่งการสูญเสีย... คือช่วงที่คนข้างหลังเปราะบางที่สุด อย่าให้เขาต้องแบกรับความวุ่นวาย ให้ Sasan รับจบทุกขั้นตอนแทนครอบครัวคุณ",
    content: `ในวันที่เปราะบางที่สุด... ให้มืออาชีพดูแลทุกขั้นตอนแทน

ครอบครัวไม่ต้องติดต่อวัด ไม่ต้องหาของชำร่วย ไม่ต้องจัดการเอกสาร ไม่ต้องทำอะไรเลย

พวกเขามีหน้าที่เดียว... คือทำใจ และจดจำช่วงเวลาดีๆ ที่มีร่วมกับคุณ

Sasan รับจบทุกอย่าง ให้ครอบครัวคุณมีเวลาดูแลจิตใจของพวกเขาเอง`,
    image: "/Blog pic/Article5.1.jpg",
    readTime: "5 นาที",
    icon: Shield,
    color: "from-green-500 to-green-600",
  },
];

// ============================================================
// COMPARISON DATA
// ============================================================
const comparisonData = {
  sasan: [
    { icon: Check, title: "ครอบครัวอุ่นใจ", desc: "สงบ มีเวลาทำใจ ไม่ต้องทะเลาะกันเรื่องจัดงาน" },
    { icon: Check, title: "งานหรูหรา & Custom", desc: "สะท้อนตัวตน 100% ออกแบบได้ทุกจุด" },
    { icon: Check, title: "ราคาโปร่งใส", desc: "รู้ค่าใช้จ่ายล่วงหน้า ไม่มีค่าใช้จ่ายแอบแฝง" },
    { icon: Check, title: "ทีมงานมืออาชีพ", desc: "ดูแลตลอด 24 ชม. ไม่ทิ้งให้รับมือคนเดียว" },
  ],
  general: [
    { icon: X, title: "ครอบครัวสับสน", desc: "กดดัน วุ่นวาย ทำอะไรไม่ถูกในเวลาเศร้า" },
    { icon: X, title: "งานรูปแบบเดิมๆ", desc: "วัดจัดให้ บรรยากาศหดหู่ ไม่เป็นตัวเอง" },
    { icon: X, title: "ค่าใช้จ่ายไม่แน่นอน", desc: "มีค่าใช้จ่ายเพิ่มเติมตลอด เกินงบที่ตั้งไว้" },
    { icon: X, title: "ต้องรับมือเอง", desc: "ครอบครัวต้องจัดการทุกอย่างในวันที่เศร้าที่สุด" },
  ],
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function Blog() {
  const [, setLocation] = useLocation();
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const [comparisonView, setComparisonView] = useState<"sasan" | "general">("sasan");
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* ============================================================ */}
      {/* HERO SECTION - Interactive Accordion */}
      {/* ============================================================ */}
      <section className="relative pt-24 pb-8">
        <div className="text-center mb-8">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-sm tracking-[3px] uppercase mb-2"
          >
            Sasan Insights
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gold font-serif"
          >
            The Last Chapter
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 mt-2"
          >
            เพราะบทสุดท้าย... สำคัญเสมอ
          </motion.p>
        </div>

        {/* Interactive Panels */}
        <div className="flex h-[60vh] md:h-[70vh] w-full overflow-hidden">
          {blogArticles.map((article, index) => (
            <motion.div
              key={article.id}
              className="relative cursor-pointer border-r border-white/10 overflow-hidden"
              initial={{ flex: 1 }}
              animate={{
                flex: hoveredPanel === index ? 5 : 1,
                filter: hoveredPanel === index ? "grayscale(0%)" : "grayscale(100%)",
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.4, 0.45, 1.4] }}
              onMouseEnter={() => setHoveredPanel(index)}
              onMouseLeave={() => setHoveredPanel(null)}
              style={{
                backgroundImage: `url('${article.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}
              <div
                className={`absolute inset-0 transition-all duration-500 ${
                  hoveredPanel === index
                    ? "bg-gradient-to-t from-black/90 via-black/30 to-transparent"
                    : "bg-black/50"
                }`}
              />

              {/* Vertical Label (shown when not hovered) */}
              <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-lg text-white/60 tracking-[3px]"
                animate={{
                  opacity: hoveredPanel === index ? 0 : 1,
                  rotate: -90,
                }}
                style={{ transformOrigin: "center" }}
              >
                {article.categoryEn}
              </motion.div>

              {/* Content (shown on hover) */}
              <motion.div
                className="absolute bottom-10 left-8 right-8 z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: hoveredPanel === index ? 1 : 0,
                  y: hoveredPanel === index ? 0 : 20,
                }}
                transition={{ delay: hoveredPanel === index ? 0.2 : 0 }}
              >
                <span className="text-gold/50 font-serif text-4xl mb-2 block">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-3 leading-tight">
                  {article.title.split(" ").slice(0, 3).join(" ")}
                  <br />
                  <span className="text-gold italic">
                    {article.title.split(" ").slice(3).join(" ")}
                  </span>
                </h3>
                <p className="text-white/70 text-sm mb-4 max-w-md hidden md:block">
                  {article.excerpt}
                </p>
                <button 
                  onClick={() => setLocation(`/blog/${article.slug}`)}
                  className="px-6 py-3 border border-gold text-gold text-sm uppercase tracking-wider hover:bg-gold hover:text-black transition-all backdrop-blur-sm bg-black/30"
                >
                  อ่านเพิ่มเติม
                </button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* COMPARISON SECTION */}
      {/* ============================================================ */}
      <section className="py-20 bg-zinc-950 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-serif text-gold mb-4">
              ความแตกต่างที่คุณเลือกได้
            </h2>
            <p className="text-white/60">
              เปรียบเทียบการวางแผนล่วงหน้า vs การไม่มีแผน
            </p>
          </motion.div>

          {/* Toggle Buttons */}
          <div className="flex justify-center gap-4 mb-10">
            <button
              onClick={() => setComparisonView("sasan")}
              className={`px-8 py-3 rounded-full border transition-all ${
                comparisonView === "sasan"
                  ? "bg-gold text-black border-gold font-bold"
                  : "border-gold/50 text-gold/70 hover:border-gold"
              }`}
            >
              ✨ Sasan (วางแผน)
            </button>
            <button
              onClick={() => setComparisonView("general")}
              className={`px-8 py-3 rounded-full border transition-all ${
                comparisonView === "general"
                  ? "bg-red-500 text-white border-red-500 font-bold"
                  : "border-white/30 text-white/50 hover:border-white/50"
              }`}
            >
              ❌ ทั่วไป (ไม่มีแผน)
            </button>
          </div>

          {/* Comparison Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={comparisonView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {comparisonData[comparisonView].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-5 rounded-xl ${
                    comparisonView === "sasan"
                      ? "bg-gold/10 border border-gold/30"
                      : "bg-red-500/10 border border-red-500/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        comparisonView === "sasan" ? "bg-gold/20" : "bg-red-500/20"
                      }`}
                    >
                      <item.icon
                        className={`w-4 h-4 ${
                          comparisonView === "sasan" ? "text-gold" : "text-red-400"
                        }`}
                      />
                    </div>
                    <div>
                      <h4
                        className={`font-bold ${
                          comparisonView === "sasan" ? "text-gold" : "text-red-400"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p className="text-white/60 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BLOG GRID SECTION */}
      {/* ============================================================ */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif text-gold mb-4">
              บทความทั้งหมด
            </h2>
            <p className="text-white/60">
              เรื่องราว แนวคิด และคำแนะนำจาก Sasan
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 hover:border-gold/50 transition-all duration-300 shadow-lg hover:shadow-gold/10"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  
                  {/* Number Badge */}
                  <span className="absolute top-4 right-4 bg-black/70 text-gold px-3 py-1 rounded text-sm font-serif backdrop-blur-sm">
                    {article.number}
                  </span>

                  {/* Category */}
                  <span className="absolute bottom-4 left-4 bg-gold/20 text-gold text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                    {article.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-gold transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/40 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                    <button 
                      onClick={() => setLocation(`/blog/${article.slug}`)}
                      className="text-gold text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all"
                    >
                      อ่านเพิ่มเติม
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CTA SECTION - The Last Gift */}
      {/* ============================================================ */}
      <section className="py-24 bg-zinc-950 border-t border-gold/30">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gold/10 flex items-center justify-center">
              <Gift className="w-10 h-10 text-gold" />
            </div>

            <h2 className="text-3xl md:text-4xl font-serif text-gold mb-6">
              ของขวัญชิ้นสุดท้าย...<br />แด่คนที่คุณรัก
            </h2>

            <div className="text-white/70 text-lg leading-relaxed mb-8">
              <p className="mb-4">
                การวางแผนล่วงหน้า ไม่ใช่การแช่งตัวเอง
              </p>
              <p className="mb-4">
                แต่คือการบอกคนที่คุณรักว่า...
              </p>
              <p className="text-gold text-xl italic font-serif">
                "ไม่ต้องห่วงนะ ฉันเตรียมทุกอย่างไว้ให้แล้ว<br />
                ดูแลตัวเองให้ดีก็พอ"
              </p>
            </div>

            <Button className="bg-gold text-black hover:bg-yellow-400 px-10 py-6 rounded-full text-lg font-bold uppercase tracking-wider shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all">
              เริ่มวางแผน "บทสุดท้าย" วันนี้
            </Button>

            <p className="text-white/40 text-sm mt-6">
              ปรึกษาฟรี ไม่มีค่าใช้จ่าย
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER QUOTE */}
      {/* ============================================================ */}
      <section className="py-16 bg-black border-t border-white/10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Quote className="w-12 h-12 text-gold/30 mx-auto mb-6" />
          <p className="text-white/60 text-lg italic font-serif leading-relaxed">
            "คุณเขียนบทชีวิตมาดีทั้งเรื่อง... 
            <br />
            อย่าปล่อยให้ตอนจบวุ่นวาย"
          </p>
          <p className="text-gold mt-4 text-sm tracking-wider">— SASAN —</p>
        </div>
      </section>
    </div>
  );
}
