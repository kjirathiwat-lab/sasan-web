import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { useLanguage } from "@/components/LanguageContext";
import {
  Heart,
  BookOpen,
  Scale,
  Shield,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Image,
  Check,
  Star,
  Users,
  Package,
  Flower2,
  MapPin,
  Clock,
  Award,
  ArrowRight,
  Leaf,
  Handshake,
  GraduationCap,
  FileText,
  Landmark,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ============================================================
// DATA
// ============================================================

const foundationItems = [
  {
    id: 1,
    icon: "🧥",
    title: "ผ้าห่อศพ",
    titleEn: "Burial Cloth",
    desc: "ผ้าห่อศพคุณภาพดี สะอาด ผ่านการดูแลอย่างถูกต้องตามหลักสุขอนามัย สำหรับครอบครัวที่ต้องการรับบริจาค",
    count: "1,200+",
    unit: "ชุดที่แจกจ่ายแล้ว",
    color: "border-blue-500/30",
    accent: "text-blue-300",
    bg: "bg-blue-500/5",
  },
  {
    id: 2,
    icon: "🍱",
    title: "อาหารและเครื่องดื่ม",
    titleEn: "Food & Beverages",
    desc: "บริจาคอาหารพร้อมรับประทานและเครื่องดื่ม สำหรับครอบครัวที่ไม่พร้อมในช่วงจัดงาน เราประสานงานให้โดยไม่มีค่าใช้จ่าย",
    count: "800+",
    unit: "ครอบครัวที่ได้รับความช่วยเหลือ",
    color: "border-amber-500/30",
    accent: "text-amber-300",
    bg: "bg-amber-500/5",
  },
  {
    id: 3,
    icon: "📦",
    title: "ของใช้จำเป็น",
    titleEn: "Essential Supplies",
    desc: "สิ่งของที่จำเป็นในการจัดงาน เช่น ธูปเทียน ดอกไม้ชั่วคราว และอุปกรณ์เบื้องต้น สำหรับครอบครัวที่ขาดแคลน",
    count: "500+",
    unit: "ชุดที่ส่งมอบแล้ว",
    color: "border-green-500/30",
    accent: "text-green-300",
    bg: "bg-green-500/5",
  },
];

// รูปผลงานมูลนิธิ — เปลี่ยนเป็น path รูปจริงของคุณได้เลย
const foundationGallery = [
  {
    src: "/founda Pic/GiveM.jpg",
    caption: "ส่งมอบให้วัดเพื่อสนับสนุนงานศพผู้ยากไร้",
    tag: "วัด",
    tagColor: "bg-blue-500/80",
    date: "ม.ค. 2567",
    position: "object-center",
    objectPosition: "center center",
  },
  {
    src: "/founda Pic/GiveCharity.png",
    caption: "บริจาคอาหารและน้ำดื่มมูลนิธิในพื้นที่",
    tag: "อาหาร",
    tagColor: "bg-amber-500/80",
    date: "ก.พ. 2567",
    position: "object-center",
    objectPosition: "center center",
  },
  {
    src: "/founda Pic/GiveHos.png",
    caption: "มอบของใช้จำเป็นให้โรงพยาบาลในพื้นที่",
    tag: "ของใช้จำเป็น",
    tagColor: "bg-green-500/80",
    date: "มี.ค. 2567",
    position: "object-center",
    objectPosition: "center 15%",
  },
  {
    src: "/founda Pic/GiveSchool.png",
    caption: "ทีมงานมูลนิธิลงพื้นที่ช่วยเหลือนักเรียนยากไร้",
    tag: "ทีมงาน",
    tagColor: "bg-rose-500/80",
    date: "พ.ค. 2567",
    position: "object-center",
    objectPosition: "center 15%",
  },
];

const flowerCourses = [
  {
    id: 1,
    title: "ดอกไม้จันทน์เบื้องต้น",
    titleEn: "Basic Sandalwood Flower",
    duration: "2 วัน",
    price: "ฟรี",
    level: "เริ่มต้น",
    students: "240+",
    image: "/OurWork6.png",
    topics: ["ประวัติและความหมาย", "วัสดุและอุปกรณ์", "เทคนิคพื้นฐาน", "ฝึกทำดอกแรก"],
    badge: "แนะนำ",
    badgeColor: "bg-green-500",
  },
  {
    id: 2,
    title: "ดอกไม้จัดพวงหรีด",
    titleEn: "Wreath Arrangement",
    duration: "3 วัน",
    price: "1,500 บาท",
    level: "กลาง",
    students: "180+",
    image: "/OurWork2.png",
    topics: ["การเลือกดอกไม้", "การจัดองค์ประกอบ", "การผูกริบบิ้น", "งานจริงในสนาม"],
    badge: "ยอดนิยม",
    badgeColor: "bg-amber-500",
  },
  {
    id: 3,
    title: "ดอกไม้ระดับ Professional",
    titleEn: "Professional Floral Design",
    duration: "5 วัน",
    price: "3,500 บาท",
    level: "สูง",
    students: "90+",
    image: "/OurWork3.jpg",
    topics: ["ดีไซน์ระดับ Premium", "งาน VIP และ Custom", "การบริหารต้นทุน", "เปิดกิจการ"],
    badge: "Professional",
    badgeColor: "bg-purple-500",
  },
];

const lawyers = [
  {
    id: 1,
    name: "ทนายสมศักดิ์ วิชาญกุล",
    nameEn: "Somsak Wichankul",
    title: "ที่ปรึกษากฎหมายมรดก",
    titleEn: "Estate Law Consultant",
    experience: "18 ปี",
    firm: "สำนักงานกฎหมาย วิชาญ & หุ้นส่วน",
    specialties: ["พินัยกรรม", "การแบ่งมรดก", "คดีมรดกพิพาท", "ทรัพย์สินดิจิทัล"],
    phone: "081-XXX-XXXX",
    line: "@wichan_law",
    rating: 4.9,
    reviews: 124,
    avatar: "ส",
    avatarColor: "from-blue-500 to-blue-700",
    tag: "แนะนำโดย SASAN",
    available: "จันทร์-ศุกร์ 9:00-18:00",
  },
  {
    id: 2,
    name: "ทนายณัฐพร สุขสวัสดิ์",
    nameEn: "Nattaporn Suksawat",
    title: "ผู้เชี่ยวชาญกฎหมายครอบครัว",
    titleEn: "Family Law Specialist",
    experience: "12 ปี",
    firm: "บริษัท สุขสวัสดิ์ ลอว์ จำกัด",
    specialties: ["การโอนกรรมสิทธิ์", "ภาษีมรดก", "ที่ดินและอสังหาฯ", "หนี้สิน"],
    phone: "082-XXX-XXXX",
    line: "@ns_law",
    rating: 4.8,
    reviews: 98,
    avatar: "ณ",
    avatarColor: "from-purple-500 to-purple-700",
    tag: "เชี่ยวชาญที่ดิน",
    available: "ทุกวัน 8:00-20:00",
  },
  {
    id: 3,
    name: "ทนายประภาพร จันทร์ทอง",
    nameEn: "Prapaporn Janthong",
    title: "ที่ปรึกษาด้านธุรกิจและมรดก",
    titleEn: "Business & Estate Advisor",
    experience: "15 ปี",
    firm: "จันทร์ทอง ลีเกิล กรุ๊ป",
    specialties: ["มรดกธุรกิจ", "หุ้นและหลักทรัพย์", "กองทุน", "ทรัสต์ครอบครัว"],
    phone: "083-XXX-XXXX",
    line: "@janthong_legal",
    rating: 5.0,
    reviews: 76,
    avatar: "ป",
    avatarColor: "from-gold/80 to-amber-600",
    tag: "มรดกธุรกิจ",
    available: "จันทร์-เสาร์ 10:00-19:00",
  },
];

const insuranceAgents = [
  {
    id: 1,
    name: "คุณมาลี รักษ์ดี",
    nameEn: "Mali Rakdee",
    company: "เมืองไทยประกันชีวิต",
    companyEn: "Muang Thai Life",
    logo: "🏢",
    title: "ตัวแทนประกันชีวิต ระดับ MDRT",
    badge: "MDRT",
    badgeColor: "bg-gold text-black",
    experience: "14 ปี",
    specialties: ["ประกันชีวิต", "วางแผนเกษียณ", "ประกันสุขภาพ", "ฌาปนกิจสงเคราะห์"],
    phone: "084-XXX-XXXX",
    line: "@mali_mtl",
    rating: 4.9,
    reviews: 203,
    avatar: "ม",
    avatarColor: "from-rose-500 to-pink-600",
    highlight: "เชี่ยวชาญแผนดูแลค่าใช้จ่ายงานศพ",
  },
  {
    id: 2,
    name: "คุณธนวัฒน์ พิทักษ์กุล",
    nameEn: "Thanawat Phithakkon",
    company: "AIA ประเทศไทย",
    companyEn: "AIA Thailand",
    logo: "🏛️",
    title: "Financial Planner & Agent",
    badge: "TOP AGENT",
    badgeColor: "bg-red-500 text-white",
    experience: "10 ปี",
    specialties: ["Unit Linked", "ประกันสุขภาพ CI", "วางแผนมรดก", "กองทุน"],
    phone: "085-XXX-XXXX",
    line: "@thanawat_aia",
    rating: 4.8,
    reviews: 156,
    avatar: "ธ",
    avatarColor: "from-red-500 to-red-700",
    highlight: "ผู้เชี่ยวชาญวางแผนการเงินครอบครัว",
  },
  {
    id: 3,
    name: "คุณวิชัย ศรีสุข",
    nameEn: "Wichai Srisuk",
    company: "FWD ประกันชีวิต",
    companyEn: "FWD Life Insurance",
    logo: "💎",
    title: "Senior Financial Advisor",
    badge: "PREMIUM",
    badgeColor: "bg-purple-500 text-white",
    experience: "8 ปี",
    specialties: ["ประกันออมทรัพย์", "ประกันอุบัติเหตุ", "ประกันโรคร้ายแรง", "ฌาปนกิจ"],
    phone: "086-XXX-XXXX",
    line: "@wichai_fwd",
    rating: 4.7,
    reviews: 89,
    avatar: "ว",
    avatarColor: "from-purple-500 to-violet-700",
    highlight: "แผนประกันที่ตอบโจทย์ทุกช่วงชีวิต",
  },
  {
    id: 4,
    name: "คุณสุนีย์ ชาญเชี่ยว",
    nameEn: "Sunee Chanchiao",
    company: "กรุงเทพประกันชีวิต",
    companyEn: "Bangkok Life Assurance",
    logo: "🌟",
    title: "Wealth Planner ระดับ COT",
    badge: "COT",
    badgeColor: "bg-amber-500 text-black",
    experience: "20 ปี",
    specialties: ["ประกันชีวิตระยะยาว", "Trust", "มรดกทางการเงิน", "ภาษีมรดก"],
    phone: "087-XXX-XXXX",
    line: "@sunee_bla",
    rating: 5.0,
    reviews: 318,
    avatar: "ส",
    avatarColor: "from-amber-500 to-yellow-600",
    highlight: "ประสบการณ์ 20 ปี วางแผนมรดกทางการเงิน",
  },
];

// ============================================================
// SECTION COMPONENTS
// ============================================================

function SectionTag({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-4 py-1.5 rounded-full mb-6">
      <Icon className="w-4 h-4 text-gold" />
      <span className="text-gold text-sm tracking-widest uppercase">{label}</span>
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================

export default function SAN() {
  const { language } = useLanguage();
  const [expandedLawyer, setExpandedLawyer] = useState<number | null>(null);
  const [expandedInsurance, setExpandedInsurance] = useState<number | null>(null);
  const [activeFoundation, setActiveFoundation] = useState<number | null>(null);
  const [activeCourse, setActiveCourse] = useState<number | null>(null);
  const [foundationSlide, setFoundationSlide] = useState(0);
  const [galleryPaused, setGalleryPaused] = useState(false);

  // Auto-slide for foundation gallery
  useEffect(() => {
    if (galleryPaused) return;
    const interval = setInterval(() => {
      setFoundationSlide((prev) => (prev + 1) % foundationGallery.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [galleryPaused]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />

      {/* ============================================================ */}
      {/* HERO */}
      {/* ============================================================ */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-black" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        </div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-white/40 text-sm mb-8"
          >
            <span>SASAN</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gold">SAN</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-9xl font-serif font-bold text-gold mb-4 tracking-tight">
              SAN
            </h1>
            <p className="text-2xl md:text-3xl text-white/80 font-thai font-light mb-3">
              ส า น
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto mb-6"
          >
            สานต่อความห่วงใย • สานสัมพันธ์ชุมชน • สานอนาคตของครอบครัว
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/40 text-sm italic"
          >
            "บทสุดท้ายของชีวิต ไม่ได้สิ้นสุดที่วันนั้น... แต่ดำเนินต่อในทุกสิ่งที่คุณส่งมอบไว้"
          </motion.p>

          {/* 4 section pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-10"
          >
            {[
              { icon: Heart, label: "มูลนิธิ", color: "text-blue-300 border-blue-500/30" },
              { icon: Flower2, label: "ศูนย์ฝึกอาชีพ", color: "text-green-300 border-green-500/30" },
              { icon: Scale, label: "ทนายความ", color: "text-purple-300 border-purple-500/30" },
              { icon: Shield, label: "ประกัน", color: "text-amber-300 border-amber-500/30" },
            ].map((item, i) => (
              <a
                key={i}
                href={`#section-${i}`}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border bg-white/5 hover:bg-white/10 transition-all text-sm ${item.color}`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 1: มูลนิธิ */}
      {/* ============================================================ */}
      <section id="section-0" className="py-24 bg-gradient-to-b from-black to-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <SectionTag icon={Heart} label="มูลนิธิ" />
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                  มูลนิธิ <span className="text-blue-300 italic">ส่งต่อ</span>
                </h2>
                <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
                  เราเชื่อว่าทุกครอบครัวควรได้รับการดูแลอย่างสมเกียรติ โดยไม่คำนึงถึงฐานะ
                  มูลนิธิของเราส่งต่อสิ่งจำเป็นให้กับครอบครัวที่ขาดแคลน
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl px-8 py-5 text-center">
                  <p className="text-4xl font-bold text-blue-300">2,500+</p>
                  <p className="text-white/50 text-sm mt-1">ครอบครัวที่ได้รับความช่วยเหลือ</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {foundationItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveFoundation(activeFoundation === item.id ? null : item.id)}
                className={`group cursor-pointer rounded-2xl border ${item.color} ${item.bg} p-6 transition-all duration-300 hover:border-opacity-60 hover:-translate-y-1`}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className={`text-xl font-bold mb-2 ${item.accent}`}>{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">{item.desc}</p>

                <div className="flex items-end justify-between">
                  <div>
                    <p className={`text-2xl font-bold ${item.accent}`}>{item.count}</p>
                    <p className="text-white/40 text-xs">{item.unit}</p>
                  </div>
                  <Check className={`w-5 h-5 ${item.accent} opacity-60`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* How to donate */}
          {/* ── Foundation Gallery Slideshow ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Image className="w-5 h-5 text-blue-300" />
                <h3 className="text-xl font-bold text-white">
                  ผลงาน<span className="text-blue-300 italic">มูลนิธิ</span>
                </h3>
              </div>
              {/* Dot indicators */}
              <div className="flex gap-1.5">
                {foundationGallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setFoundationSlide(i); setGalleryPaused(true); }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      foundationSlide === i ? "w-6 bg-blue-400" : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Slideshow area */}
            <div
              className="relative rounded-2xl overflow-hidden select-none"
              onMouseEnter={() => setGalleryPaused(true)}
              onMouseLeave={() => setGalleryPaused(false)}
            >
              {/* Main slide */}
              <div className="relative aspect-[16/7] bg-zinc-900">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={foundationSlide}
                    src={foundationGallery[foundationSlide].src}
                    alt={foundationGallery[foundationSlide].caption}
                    className={`absolute inset-0 w-full h-full object-cover ${foundationGallery[foundationSlide].position ?? "object-center"}`}
                    style={{ objectPosition: foundationGallery[foundationSlide].objectPosition ?? "center center" }}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.55, ease: "easeInOut" }}
                  />
                </AnimatePresence>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

                {/* Caption */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`caption-${foundationSlide}`}
                    className="absolute bottom-0 left-0 right-0 p-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <span className={`inline-block text-xs font-bold text-white px-3 py-1 rounded-full mb-2 backdrop-blur-sm ${foundationGallery[foundationSlide].tagColor}`}>
                          {foundationGallery[foundationSlide].tag}
                        </span>
                        <p className="text-white font-medium text-base leading-snug max-w-lg">
                          {foundationGallery[foundationSlide].caption}
                        </p>
                      </div>
                      <span className="text-white/40 text-sm flex-shrink-0 hidden sm:block">
                        {foundationGallery[foundationSlide].date}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Prev / Next arrows */}
                <button
                  onClick={() => { setFoundationSlide((prev) => (prev - 1 + foundationGallery.length) % foundationGallery.length); setGalleryPaused(true); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 border border-white/10 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-sm hover:scale-105"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => { setFoundationSlide((prev) => (prev + 1) % foundationGallery.length); setGalleryPaused(true); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 border border-white/10 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-sm hover:scale-105"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Slide counter */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white/70 text-xs px-3 py-1.5 rounded-full border border-white/10">
                  {foundationSlide + 1} / {foundationGallery.length}
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
                {foundationGallery.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => { setFoundationSlide(i); setGalleryPaused(true); }}
                    className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      i === foundationSlide
                        ? "border-blue-400 opacity-100 scale-105"
                        : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img
                      src={item.src}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* How to donate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-900/20 via-blue-900/10 to-transparent border border-blue-500/20 rounded-2xl p-8"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Handshake className="w-5 h-5 text-blue-300" />
                  ร่วมบริจาคหรือขอรับความช่วยเหลือ
                </h3>
                <p className="text-white/60 text-sm">
                  ติดต่อทีมงาน SASAN เพื่อส่งมอบหรือรับของบริจาค เราดำเนินการโดยไม่มีค่าใช้จ่าย
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <a
                  href="tel:0812345678"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-500/20 border border-blue-500/40 text-blue-300 rounded-full hover:bg-blue-500/30 transition-all text-sm font-medium"
                >
                  <Phone className="w-4 h-4" />
                  โทรติดต่อ
                </a>
                <a
                  href="https://line.me/ti/p/@sasan"
                  className="flex items-center gap-2 px-6 py-3 bg-green-500/20 border border-green-500/40 text-green-300 rounded-full hover:bg-green-500/30 transition-all text-sm font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  LINE: @sasan
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: ศูนย์ฝึกอาชีพดอกไม้ */}
      {/* ============================================================ */}
      <section id="section-1" className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <SectionTag icon={GraduationCap} label="ศูนย์ฝึกอาชีพ" />
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                  ศูนย์ฝึกอาชีพ <span className="text-green-300 italic">ดอกไม้</span>
                </h2>
                <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
                  เปลี่ยนความรู้เป็นอาชีพ เรียนรู้ศิลปะดอกไม้จากผู้เชี่ยวชาญโดยตรง
                  สร้างรายได้เสริมหรือเปิดกิจการของตัวเอง
                </p>
              </div>
              <div className="flex gap-4 flex-shrink-0">
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-6 py-4 text-center">
                  <p className="text-2xl font-bold text-green-300">500+</p>
                  <p className="text-white/40 text-xs mt-1">ผู้สำเร็จการศึกษา</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-6 py-4 text-center">
                  <p className="text-2xl font-bold text-green-300">3</p>
                  <p className="text-white/40 text-xs mt-1">หลักสูตร</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {flowerCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-green-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${course.badgeColor} text-white`}>
                    {course.badge}
                  </span>
                  <span className="absolute top-3 right-3 bg-black/60 text-white/80 px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                    {course.level}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-white text-lg mb-1">{course.title}</h3>
                  <p className="text-white/50 text-xs mb-4">{course.titleEn}</p>

                  {/* Topics */}
                  <div className="space-y-1.5 mb-5">
                    {course.topics.map((topic, i) => (
                      <div key={i} className="flex items-center gap-2 text-white/60 text-xs">
                        <div className="w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        {topic}
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3 text-xs text-white/50">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />{course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />{course.students}
                      </span>
                    </div>
                    <span className={`font-bold text-base ${course.price === "ฟรี" ? "text-green-400" : "text-gold"}`}>
                      {course.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Register CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-900/20 via-green-900/10 to-transparent border border-green-500/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-300" />
                สมัครเรียนวันนี้
              </h3>
              <p className="text-white/60 text-sm">
                รับสมัครรุ่นใหม่ทุกเดือน · รับจำกัดรุ่นละ 15 คน · มีใบประกาศนียบัตร
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="tel:0812345678"
                className="flex items-center gap-2 px-6 py-3 bg-green-500/20 border border-green-500/40 text-green-300 rounded-full hover:bg-green-500/30 transition-all text-sm font-medium"
              >
                <Phone className="w-4 h-4" />
                สอบถามหลักสูตร
              </a>
              <button className="flex items-center gap-2 px-6 py-3 bg-gold text-black rounded-full hover:bg-yellow-400 transition-all text-sm font-bold">
                <GraduationCap className="w-4 h-4" />
                สมัครเรียน
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3: ทนายความ */}
      {/* ============================================================ */}
      <section id="section-2" className="py-24 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <SectionTag icon={Scale} label="ทนายความ" />
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
              ที่ปรึกษา <span className="text-purple-300 italic">กฎหมายมรดก</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
              ทนายความที่ SASAN คัดสรรมาเป็นพิเศษ เชี่ยวชาญด้านกฎหมายมรดกและการจัดการทรัพย์สิน
              ให้คำปรึกษาเบื้องต้นฟรี
            </p>
            <div className="inline-flex items-center gap-2 mt-4 text-sm text-white/40 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <BadgeCheck className="w-4 h-4 text-purple-300" />
              คัดสรรโดย SASAN · ผ่านการตรวจสอบประวัติ · เชื่อถือได้
            </div>
          </motion.div>

          {/* Lawyer Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lawyers.map((lawyer, index) => (
              <motion.div
                key={lawyer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-300"
              >
                {/* Header */}
                <div className="p-6 pb-0">
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${lawyer.avatarColor} flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}>
                      {lawyer.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-white text-sm leading-tight">{lawyer.name}</h3>
                          <p className="text-purple-300 text-xs mt-0.5">{lawyer.title}</p>
                        </div>
                        <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                          {lawyer.tag}
                        </span>
                      </div>
                      {/* Rating */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(lawyer.rating) ? "text-gold fill-gold" : "text-white/20"}`} />
                          ))}
                        </div>
                        <span className="text-white/60 text-xs">{lawyer.rating} ({lawyer.reviews})</span>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-2 mb-5">
                    <p className="text-white/40 text-xs flex items-center gap-2">
                      <Landmark className="w-3 h-3 text-purple-300/60" />
                      {lawyer.firm}
                    </p>
                    <p className="text-white/40 text-xs flex items-center gap-2">
                      <Clock className="w-3 h-3 text-purple-300/60" />
                      {lawyer.available} · ประสบการณ์ {lawyer.experience}
                    </p>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {lawyer.specialties.map((s, i) => (
                      <span key={i} className="text-xs bg-white/5 border border-white/10 text-white/60 px-2.5 py-1 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 pt-0 grid grid-cols-2 gap-2 border-t border-white/5 mt-2">
                  <a
                    href={`tel:${lawyer.phone.replace(/-/g, "")}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 bg-purple-500/15 border border-purple-500/30 text-purple-300 rounded-xl hover:bg-purple-500/25 transition-all text-xs font-medium"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    โทร
                  </a>
                  <a
                    href={`https://line.me/ti/p/${lawyer.line}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 bg-green-500/15 border border-green-500/30 text-green-300 rounded-xl hover:bg-green-500/25 transition-all text-xs font-medium"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    LINE
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white/30 text-xs mt-8"
          >
            * SASAN ทำหน้าที่แนะนำทนายความที่น่าเชื่อถือเท่านั้น · ค่าบริการเป็นไปตามข้อตกลงระหว่างลูกค้าและทนายความโดยตรง
          </motion.p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4: ประกัน */}
      {/* ============================================================ */}
      <section id="section-3" className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <SectionTag icon={Shield} label="ประกันชีวิต" />
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
              ตัวแทนประกัน <span className="text-gold italic">ที่น่าเชื่อถือ</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
              ตัวแทนประกันระดับ Top ที่ SASAN รู้จักและไว้วางใจ ช่วยวางแผนการเงินและประกันชีวิต
              เพื่อดูแลครอบครัวของคุณในระยะยาว
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              {["MDRT", "COT", "TOP AGENT", "PREMIUM"].map((badge) => (
                <span key={badge} className="text-xs bg-gold/10 border border-gold/30 text-gold px-3 py-1 rounded-full">
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Insurance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insuranceAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-gold/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-4 mb-5">
                  {/* Avatar */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agent.avatarColor} flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 shadow-lg`}>
                    {agent.avatar}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-white">{agent.name}</h3>
                        <p className="text-gold/70 text-xs mt-0.5">{agent.title}</p>
                      </div>
                      <span className={`text-[10px] ${agent.badgeColor} px-3 py-1 rounded-full font-bold flex-shrink-0`}>
                        {agent.badge}
                      </span>
                    </div>

                    {/* Company & Rating */}
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-white/50 text-xs">{agent.logo} {agent.company}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < Math.floor(agent.rating) ? "text-gold fill-gold" : "text-white/20"}`} />
                        ))}
                      </div>
                      <span className="text-white/50 text-xs">{agent.rating} ({agent.reviews} รีวิว)</span>
                    </div>
                  </div>
                </div>

                {/* Highlight */}
                <div className="bg-gold/5 border border-gold/15 rounded-xl px-4 py-3 mb-5">
                  <p className="text-gold/80 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 flex-shrink-0" />
                    {agent.highlight}
                  </p>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {agent.specialties.map((s, i) => (
                    <span key={i} className="text-xs bg-white/5 border border-white/10 text-white/60 px-2.5 py-1 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>

                {/* Info row */}
                <div className="flex items-center gap-4 text-white/40 text-xs mb-5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    ประสบการณ์ {agent.experience}
                  </span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${agent.phone.replace(/-/g, "")}`}
                    className="flex items-center justify-center gap-2 py-3 bg-amber-500/15 border border-amber-500/30 text-amber-300 rounded-xl hover:bg-amber-500/25 transition-all text-sm font-medium"
                  >
                    <Phone className="w-4 h-4" />
                    โทรปรึกษา
                  </a>
                  <a
                    href={`https://line.me/ti/p/${agent.line}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 bg-green-500/15 border border-green-500/30 text-green-300 rounded-xl hover:bg-green-500/25 transition-all text-sm font-medium"
                  >
                    <MessageCircle className="w-4 h-4" />
                    LINE
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white/30 text-xs mt-8"
          >
            * SASAN แนะนำตัวแทนที่รู้จักและไว้วางใจเท่านั้น · การตัดสินใจซื้อประกันขึ้นอยู่กับดุลยพินิจของลูกค้า
          </motion.p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER CTA */}
      {/* ============================================================ */}
      <section className="py-20 bg-black border-t border-gold/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(212,175,55,0.05),transparent_60%)]" />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-gold mb-4">
              สานต่อ ส่งต่อ ดูแลต่อ
            </h2>
            <p className="text-white/60 text-lg mb-10 leading-relaxed">
              SAN คือส่วนต่อขยายของ SASAN ที่เชื่อว่าการดูแลที่แท้จริง
              ไม่ได้สิ้นสุดที่วันสุดท้ายของงาน
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/"
                className="flex items-center gap-2 px-8 py-4 bg-gold text-black rounded-full font-bold hover:bg-yellow-400 transition-all shadow-lg shadow-gold/20"
              >
                กลับสู่ SASAN
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:0812345678"
                className="flex items-center gap-2 px-8 py-4 border border-white/20 text-white/80 rounded-full hover:border-gold/50 hover:text-gold transition-all"
              >
                <Phone className="w-4 h-4" />
                โทรปรึกษา 24 ชม.
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-black border-t border-white/10 text-center">
        <div className="flex flex-col items-center justify-center space-y-2">
          <span className="text-xl font-serif font-bold text-white/80">
            SASAN <span className="text-gold">·</span> SAN
          </span>
          <p className="text-white/30 text-xs tracking-widest uppercase">
            © {new Date().getFullYear()} Sasan. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
