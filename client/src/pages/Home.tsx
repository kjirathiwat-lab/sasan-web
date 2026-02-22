import { Navigation } from "@/components/Navigation";
import { useLanguage } from "@/components/LanguageContext";
import { SectionHeading } from "@/components/SectionHeading";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { insertInquirySchema } from "@shared/schema";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Feather,
  Heart,
  FileText,
  Share2,
  ArrowDown,
  BookOpen,
  BookText,
  Crown,
  Gem,
  Check,
  ChevronDown,
  ChevronUp,
  Wand2,
  Phone,
  MessageCircle,
  Clock,
  Image,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRef, useState, useEffect } from "react";
import ServiceSelector from "@/components/ServiceSelector";

// Icons map for the dimensions section
const icons = {
  matter: Feather,
  clear: Heart,
  message: FileText,
  weave: Share2,
};

const servicePackages = [
  {
    id: 1,
    name: "The Memoir",
    nameTh: "เดอะ เมมัวร์",
    tagline: "Intimate & Personal",
    taglineTh: "ความทรงจำอันอบอุ่น",
    icon: BookOpen,
    gradient: "from-slate-900 to-slate-800",
    accent: "text-blue-300",
    border: "border-blue-500/30",
    duration: "งาน 3 วัน",
    venue: "วัดขนาดเล็ก",
    guests: "30-80 คน/วัน",
    subPackages: [
      { name: "BASIC", price: "45,000" },
      { name: "STANDARD", price: "55,000" },
    ],
    features: [
      "ค่าเช่าศาลา 3 คืน",
      "ค่าเมรุและฌาปนกิจ",
      "ดอกไม้ตกแต่งหน้างาน",
      "ธูปเทียน 3 คืน",
      "น้ำดื่ม-ขนม-กาแฟ 3 คืน",
      "โลงศพไม้ธรรมดา",
      "รถรับศพ",
      "ของชำร่วย 100 ชุด",
      "ดอกไม้จันทน์ 100 ดอก",
      "ทีมงานดูแล 8-10 คน",
    ],
    gallery: [
      "/package-gallery/TheL01.png",
      "/package-gallery/TheL02.png",
      "/package-gallery/TheL03.png",
    ],
  },
  {
    id: 2,
    name: "The Narrative",
    nameTh: "เดอะ แนร์ราทีฟ",
    tagline: "Story & Journey",
    taglineTh: "บอกเล่าเรื่องราว",
    icon: BookText,
    gradient: "from-amber-900/50 to-yellow-900/50",
    accent: "text-amber-300",
    border: "border-amber-500/40",
    duration: "งาน 5 วัน",
    venue: "วัดขนาดกลาง",
    guests: "80-150 คน/วัน",
    subPackages: [
      { name: "SILVER", price: "120,000" },
      { name: "GOLD", price: "150,000" },
    ],
    features: [
      "ค่าเช่าศาลา 5 คืน",
      "ค่าเมรุและฌาปนกิจ",
      "ดอกไม้ตกแต่งระดับกลาง",
      "พวงหรีดตัวอย่าง 3 พวง",
      "ธูปเทียน 5 คืน",
      "น้ำดื่ม-ขนม-กาแฟ 5 คืน",
      "Snack Box 100 กล่อง",
      "โลงศพไม้สัก/โลหะ",
      "รถรับศพ VIP",
      "พนักงานยกโลง 6 คน",
      "ของชำร่วย 200-300 ชุด",
      "ดอกไม้จันทน์ 150-200 ดอก",
      "ช่างภาพ-วีดีโอ",
      "ทีมงานดูแล 12-15 คน",
    ],
    gallery: [
      "/package-gallery/TheN01.png",
      "/package-gallery/TheN02.png",
      "/package-gallery/TheN03.png",
    ],
  },
  {
    id: 3,
    name: "The Legacy",
    nameTh: "เดอะ เลกาซี่",
    tagline: "Honor & Heritage",
    taglineTh: "เกียรติยศสืบสาน",
    icon: Crown,
    gradient: "from-purple-900/50 to-pink-900/50",
    accent: "text-purple-300",
    border: "border-purple-500/40",
    recommended: true,
    duration: "งาน 7 วัน",
    venue: "วัดขนาดใหญ่",
    guests: "150-300 คน/วัน",
    subPackages: [
      { name: "PLATINUM", price: "350,000" },
      { name: "DIAMOND", price: "450,000" },
    ],
    features: [
      "ค่าเช่าศาลาแอร์ VIP 7 คืน",
      "ค่าเมรุและฌาปนกิจพิเศษ",
      "ดอกไม้ตกแต่ง Premium Design",
      "พวงหรีดตัวอย่าง 4 พวง",
      "ดอกไม้ตกแต่งโต๊ะ VIP",
      "ธูปเทียนพิเศษ 7 คืน",
      "น้ำดื่ม-เครื่องดื่มครบ 7 คืน",
      "ขนม Premium 7 คืน",
      "Snack Box พิเศษ 200 กล่อง",
      "Catering บุฟเฟต์วันเผา",
      "โต๊ะจีนแขก VIP 1-2 โต๊ะ",
      "โลงศพไม้สักทอง/สแตนเลส",
      "รถรับศพ VIP",
      "พนักงานยกโลง 8 คน",
      "ของชำร่วย Premium 400-500 ชุด",
      "ดอกไม้จันทน์ 300 ดอก",
      "ช่างภาพ-วีดีโอ Pro (Full HD+Drone)",
      "พิธีเก็บอัฐิและลอยอังคาร",
      "MC/พิธีกรมืออาชีพ",
      "ทีมงานดูแล 15-20 คน",
    ],
    gallery: [
      "/package-gallery/TheL01.png",
      "/package-gallery/TheL02.png",
      "/package-gallery/TheL03.png",
    ],
  },
  {
    id: 4,
    name: "The Masterpiece",
    nameTh: "เดอะ มาสเตอร์พีซ",
    tagline: "Art & Perfection",
    taglineTh: "ผลงานชิ้นเอก",
    icon: Gem,
    gradient: "from-yellow-900/60 to-amber-900/60",
    accent: "text-yellow-200",
    border: "border-yellow-500/50",
    duration: "งาน 7 วัน",
    venue: "วัดดังระดับประเทศ",
    guests: "300-500+ คน/วัน",
    subPackages: [
      { name: "ROYAL", price: "800,000" },
      { name: "EXCLUSIVE", price: "1,000,000" },
    ],
    features: [
      "ค่าเช่าศาลาแอร์ Super VIP 7 คืน (วัดดัง)",
      "ค่าพิธีและฌาปนกิจแบบ Royal",
      "ดอกไม้ตกแต่ง Luxury Design โดยดีไซเนอร์",
      "พวงหรีดตัวอย่างพิเศษ 5 พวง",
      "ดอกไม้ตกแต่งทุกโต๊ะ VIP",
      "ธูปเทียนชั้นดี 7 คืน",
      "ระบบแสงเสียงพิเศษ",
      "เครื่องดื่มครบทุกประเภท 7 คืน",
      "ขนม Luxury 7 คืน",
      "Snack Box Deluxe 300 กล่อง",
      "Catering บุฟเฟต์หรูวันเผา",
      "โต๊ะจีนแขก VIP 2-3 โต๊ะ",
      "บริการน้ำชา-กาแฟบาริสต้า",
      "โลงศพไม้สักทองเต็มตัว/คริสตัล",
      "รถรับศพ Super VIP",
      "พนักงานยกโลง 10-12 คน",
      "ของชำร่วย Luxury 500-700 ชุด",
      "ดอกไม้จันทน์พิเศษ 500+ ดอก",
      "ช่างภาพ-วีดีโอ 4K+Drone ทีมมืออาชีพ",
      "พิธีเก็บอัฐิและลอยอังคาร VIP",
      "Personal Funeral Director เฉพาะงาน",
      "MC/พิธีกรระดับ Pro",
      "ระบบ Live Streaming คุณภาพสูง",
      "ป้าย LED Digital Display",
      "ทีมงานดูแลเต็มระบบ 20-25 คน",
    ],
    gallery: [
      "/package-gallery/TheMP01.png",
      "/package-gallery/TheMP02.png",
      "/package-gallery/TheMP03.png",
    ],
  },
];

// Form schema with validation messages
const formSchema = insertInquirySchema;

export default function Home() {
  const { t, language } = useLanguage();
  const createInquiry = useCreateInquiry();
  const contactRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Parallax effect for hero
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      message: "",
    },
  });

  const [expandedPackage, setExpandedPackage] = useState<number | null>(null);

  // State สำหรับ Service Wizard
  const [showWizard, setShowWizard] = useState(false);

  // ตรวจสอบ URL parameter เพื่อเปิด ServiceSelector อัตโนมัติ
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('openWizard') === 'true') {
      setShowWizard(true);
      // ลบ parameter ออกจาก URL หลังเปิด wizard
      window.history.replaceState({}, '', '/');
    }
  }, []);

  // State สำหรับ Gallery Modal
  const [galleryModal, setGalleryModal] = useState<{
    isOpen: boolean;
    packageName: string;
    images: string[];
    currentIndex: number;
  }>({
    isOpen: false,
    packageName: "",
    images: [],
    currentIndex: 0,
  });

  // State สำหรับ Floating Buttons (expand/collapse)
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);

  // State สำหรับ About Section Slider
  const [aboutSlideIndex, setAboutSlideIndex] = useState(0);

  // รูปภาพสำหรับ About Section Slider
  const aboutImages = [
    { src: "/About_Sasan_1.png", label: "ทีมงานมืออาชีพ" },
    { src: "/About_Sasan_2.png", label: "ออกแบบงานอย่างพิถีพิถัน" },
    { src: "/About_Sasan_3.png", label: "สำนักงานใหญ่ SASAN" },
    { src: "/About_Sasan_4.png", label: "อาคารสำนักงาน" },
  ];

  // Auto-slide effect สำหรับ About Section
  useEffect(() => {
    const interval = setInterval(() => {
      setAboutSlideIndex((prev) => (prev + 1) % aboutImages.length);
    }, 5000); // เปลี่ยนรูปทุก 5 วินาที
    return () => clearInterval(interval);
  }, []);

  // ============================================================
  // Hero Video Slideshow
  // ============================================================
  const [currentSlide, setCurrentSlide] = useState(0);

  // ============================================================
  // Package View Toggle (Cards / Table)
  // ============================================================
  const [packageView, setPackageView] = useState<"cards" | "table">("cards");

  // ============================================================
  // Testimonials Slider
  // ============================================================
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // ============================================================
  // Team Section - The Chapter
  // ============================================================
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  
  const testimonials = [
    {
      quote: "ทีมงาน SASAN ดูแลทุกอย่างอย่างดีมาก ในช่วงเวลาที่ยากลำบากที่สุด พวกเขาทำให้ทุกอย่างผ่านไปอย่างราบรื่นและสมเกียรติ",
      name: "คุณสมชาย ว.",
      role: "ครอบครัวผู้ใช้บริการ",
      package: "The Legacy",
      rating: 5,
    },
    {
      quote: "ประทับใจมากค่ะ ตั้งแต่การให้คำปรึกษาจนถึงวันสุดท้าย ทีมงานใส่ใจทุกรายละเอียด งานออกมาสวยงามเกินคาด",
      name: "คุณวิภา ส.",
      role: "ครอบครัวผู้ใช้บริการ",
      package: "The Narrative",
      rating: 5,
    },
    {
      quote: "บริการระดับพรีเมียมจริงๆ ครับ ราคาสมเหตุสมผล ไม่มีค่าใช้จ่ายแอบแฝง แนะนำเลยครับ",
      name: "คุณธนา พ.",
      role: "ครอบครัวผู้ใช้บริการ",
      package: "The Masterpiece",
      rating: 5,
    },
    {
      quote: "ขอบคุณทีมงาน SASAN ที่ช่วยจัดงานให้คุณพ่อได้อย่างสมเกียรติ ทุกอย่างเป็นไปตามที่ตกลงกันไว้ ไม่มีค่าใช้จ่ายเพิ่มเติม",
      name: "คุณนภา ก.",
      role: "ครอบครัวผู้ใช้บริการ",
      package: "The Memoir",
      rating: 5,
    },
    {
      quote: "ทีมงานมืออาชีพมาก ดูแลทุกขั้นตอนอย่างใส่ใจ งานออกมาสวยงาม ญาติๆ ทุกคนประทับใจ",
      name: "คุณประยุทธ์ จ.",
      role: "ครอบครัวผู้ใช้บริการ",
      package: "The Narrative",
      rating: 5,
    },
  ];

  // ============================================================
  // Team Members Data - The Chapter
  // ============================================================
  const teamMembers = [
    {
      id: 1,
      number: "01",
      name: "เบญจมาศ บัวการ ",
      nameEn: "Benjamas",
      role: "Project Group Leader",
      roleSecondary: "6808800016",
      quote: "นำทีมด้วยวิสัยทัศน์ สร้างสรรค์ผลงานด้วยใจ",
      color: "from-purple-500/20 to-pink-500/20",
      accent: "text-purple-400",
    },
    {
      id: 2,
      number: "02",
      name: "ชยากร สุริยะวิชญ์",
      nameEn: "Chayakorn",
      role: "Content Creator",
      roleSecondary: "6808800001",
      quote: "เล่าเรื่องราวที่จับใจ",
      color: "from-amber-500/20 to-orange-500/20",
      accent: "text-amber-400",
    },
    {
      id: 3,
      number: "03",
      name: "วรรณสิทธิ์ วรรณสุริยะ",
      nameEn: "Wannasit",
      role: "Content Creator",
      roleSecondary: "6808800013",
      quote: "สร้างสรรค์เนื้อหาที่โดดเด่น",
      color: "from-green-500/20 to-emerald-500/20",
      accent: "text-green-400",
    },
    {
      id: 4,
      number: "04",
      name: "อนวรรตน์ อัครกุลธนาวัฒน์",
      nameEn: "Anawat",
      role: "Project Group Secretary",
      roleSecondary: "6808800006",
      quote: "พร้อมดูแลทุกขั้นตอน",
      color: "from-blue-500/20 to-cyan-500/20",
      accent: "text-blue-400",
    },
    {
      id: 5,
      number: "05",
      name: "จิราธิวัฒน์ เกียรติงามดี",
      nameEn: "Jirathiwat",
      role: "Web Programmer",
      roleSecondary: "6808800011",
      quote: "เปลี่ยนไอเดียให้เป็นจริง",
      color: "from-gold/20 to-yellow-500/20",
      accent: "text-gold",
    },
  ];

  // Auto-slide สำหรับ Testimonials
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(testimonialInterval);
  }, []);

  const heroSlides = [
    {
      video: "/01.mp4",
    },
    {
      video: "/02.mp4",
    },
    {
      video: "/03.mp4",
    },
  ];

  useEffect(() => {
    const heroInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000); // เปลี่ยนทุก 8 วินาที (วิดีโอใช้เวลานานกว่ารูป)
    return () => clearInterval(heroInterval);
  }, []);

  // ============================================================
  // Process Steps Data
  // ============================================================
  const processSteps = [
    {
      icon: Phone,
      title: t.process.steps[0].title,
      description: t.process.steps[0].description,
      time: t.process.steps[0].time,
      timeBg: "bg-green-500/20 text-green-400",
    },
    {
      icon: FileText,
      title: t.process.steps[1].title,
      description: t.process.steps[1].description,
      time: t.process.steps[1].time,
      timeBg: "bg-blue-500/20 text-blue-400",
    },
    {
      icon: Feather,
      title: t.process.steps[2].title,
      description: t.process.steps[2].description,
      time: t.process.steps[2].time,
      timeBg: "bg-purple-500/20 text-purple-400",
    },
    {
      icon: Heart,
      title: t.process.steps[3].title,
      description: t.process.steps[3].description,
      time: t.process.steps[3].time,
      timeBg: "bg-amber-500/20 text-amber-400",
    },
    {
      icon: Check,
      title: t.process.steps[4].title,
      description: t.process.steps[4].description,
      time: t.process.steps[4].time,
      timeBg: "bg-pink-500/20 text-pink-400",
    },
  ];

  // Mock contact info - เปลี่ยนเป็นของจริงได้
  const contactInfo = {
    phone: "081-234-5678",
    line: "@sasan",
    lineQrUrl: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://line.me/ti/p/@sasan",
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    createInquiry.mutate(values, {
      onSuccess: () => form.reset(),
    });
  }

  const dimensions = [
    {
      key: "matter",
      icon: Feather,
      color: "text-gold",
      bgImage: "สะสาร.png",
    },
    { key: "clear", icon: Heart, color: "text-gold", bgImage: "สะสาง.png" },
    {
      key: "message",
      icon: FileText,
      color: "text-gold",
      bgImage: "สาง.png",
    },
    {
      key: "weave",
      icon: Share2,
      color: "text-gold",
      bgImage: "สาน.png",
    },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white overflow-hidden selection:bg-gold selection:text-black">
      <Navigation />

      {/* Hero Section with Video Slideshow */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1500 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <video
                src={slide.video}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
          {/* Dark Overlay - เข้มขึ้นเพื่อให้เห็น Content ชัด */}
          <div className="absolute inset-0 bg-black/60 z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-[2]" />
        </div>

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gold/30 rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <motion.div
          style={{ y: y1, opacity }}
          className="relative z-20 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <img
              src="/logo-sasan.png"
              alt="SASAN"
              className="h-32 md:h-40 lg:h-48 w-auto mx-auto mb-6 drop-shadow-2xl"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-3xl font-serif italic text-white/90 mb-4 drop-shadow-lg"
          >
            "{t.hero.tagline}"
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className={`text-lg md:text-xl text-gold/90 tracking-widest uppercase mb-8 ${language === "th" ? "font-thai" : "font-sans"}`}
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Clear value prop for first-time visitors */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="max-w-2xl mx-auto text-sm md:text-base text-white/80 mb-8 leading-relaxed"
          >
            {t.hero.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              onClick={() => setShowWizard(true)}
              className="bg-gold text-black hover:bg-yellow-400 px-8 py-6 rounded-full text-lg font-bold tracking-wide transition-all duration-300 shadow-lg shadow-gold/30 hover:shadow-xl hover:shadow-gold/40 hover:scale-105"
            >
              <Wand2 className="w-5 h-5 mr-2" />
              {t.hero.cta}
            </Button>
            <a
              href={`tel:${contactInfo.phone.replace(/-/g, "")}`}
              className="flex items-center gap-2 px-6 py-3 border border-white/30 rounded-full text-white/80 hover:text-white hover:border-white/50 transition-all backdrop-blur-sm"
            >
              <Phone className="w-4 h-4" />
              <span>{t.hero.callFree}</span>
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="mt-8 flex items-center justify-center gap-6 text-white/50 text-sm"
          >
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>{t.hero.service24h}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>{language === "th" ? "ประสบการณ์ 15+ ปี" : "15+ Years Experience"}</span>
            </div>
            <div className="flex items-center gap-2 hidden sm:flex">
              <Check className="w-4 h-4 text-green-400" />
              <span>{language === "th" ? "ดูแลแล้ว 1,000+ งาน" : "1,000+ Families Served"}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Slide Indicators */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? "w-8 bg-gold" 
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/30 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={32} />
        </motion.div>
      </section>

      {/* Process Steps Section */}
      <section className="py-20 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.process.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4" />
            <p className="text-white/50 text-lg">
              {t.process.subtitle}
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gold text-black text-sm font-bold flex items-center justify-center z-10 shadow-lg shadow-gold/30">
                    {index + 1}
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 pt-8 text-center hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 group">
                    <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                      <step.icon className="w-7 h-7 text-gold" />
                    </div>

                    <h3 className="font-bold text-white mb-2 text-sm">
                      {step.title}
                    </h3>

                    <p className="text-white/40 text-xs leading-relaxed mb-3">
                      {step.description}
                    </p>

                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${step.timeBg}`}>
                      <Clock className="w-3 h-3" />
                      {step.time}
                    </span>
                  </div>

                  {index < processSteps.length - 1 && (
                    <div className="flex justify-center my-2 md:hidden">
                      <ArrowDown className="w-5 h-5 text-gold/30" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-white/40 text-sm mb-4">{t.process.ready}</p>
            <Button
              onClick={() => setShowWizard(true)}
              variant="outline"
              className="border-gold/50 text-gold hover:bg-gold hover:text-black transition-all"
            >
              <Phone className="w-4 h-4 mr-2" />
              {t.process.contactFree}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Social Proof / Stats Section */}
      <section className="py-16 bg-gradient-to-b from-black to-zinc-950 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {[
              { number: "15+", label: "ปีประสบการณ์", icon: "🏆" },
              { number: "1,000+", label: "งานที่ดูแล", icon: "✨" },
              { number: "50+", label: "วัดพันธมิตร", icon: "🏛️" },
              { number: "98%", label: "ความพึงพอใจ", icon: "💯" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-gold mb-1">{stat.number}</div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonials */}
          {/* Testimonials Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className={`text-center text-xl text-white/80 mb-8 ${language === "th" ? "font-thai" : "font-serif"}`}>
              {t.testimonials.title}{t.testimonials.subtitle}
            </h3>
            
            {/* Slider Container */}
            <div className="relative max-w-4xl mx-auto">
              {/* Navigation Arrows */}
              <button
                onClick={() => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-10 h-10 bg-white/10 hover:bg-gold/20 border border-white/20 rounded-full flex items-center justify-center transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => setTestimonialIndex((prev) => (prev + 1) % testimonials.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-10 h-10 bg-white/10 hover:bg-gold/20 border border-white/20 rounded-full flex items-center justify-center transition-all"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>

              {/* Testimonial Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12"
                >
                  {/* Quote Icon */}
                  <div className="text-6xl text-gold/20 font-serif leading-none mb-4">"</div>
                  
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                      <span key={i} className="text-gold text-xl">★</span>
                    ))}
                  </div>
                  
                  {/* Quote Text */}
                  <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">
                    {testimonials[testimonialIndex].quote}
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/30 to-amber-500/30 flex items-center justify-center">
                        <span className="text-gold font-bold text-lg">
                          {testimonials[testimonialIndex].name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{testimonials[testimonialIndex].name}</p>
                        <p className="text-white/40 text-sm">{testimonials[testimonialIndex].role}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gold/80 bg-gold/10 px-4 py-2 rounded-full border border-gold/20">
                      {testimonials[testimonialIndex].package}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setTestimonialIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      testimonialIndex === index 
                        ? "w-8 bg-gold" 
                        : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Partner Logos */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-white/40 text-xs uppercase tracking-widest mb-6">{t.stats.partners}</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
              {["วัดเทพศิรินทร์", "วัดธาตุทอง", "วัดมกุฏกษัตริยาราม", "วัดบวรนิเวศ", "วัดพระศรีมหาธาตุ"].map((partner, index) => (
                <div key={index} className="text-white/60 text-sm font-thai">
                  🏛️ {partner}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Quote */}
      <section className="py-24 md:py-32 relative bg-zinc-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <span className="font-script text-6xl md:text-8xl text-gold/20 absolute -top-12 left-0 md:left-20">
              "
            </span>
            <div className="overflow-hidden py-4">
              <p
                className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl font-serif leading-relaxed text-white/90 whitespace-normal md:whitespace-nowrap ${language === "th" ? "font-thai" : ""}`}
              >
                {t.philosophy.quote}
              </p>
            </div>
            <span className="font-script text-6xl md:text-8xl text-gold/20 absolute -bottom-20 right-0 md:right-20">
              "
            </span>
          </motion.div>
        </div>
      </section>

      {/* 4 Dimensions Section (About) */}
      <section id="about" className="py-24 bg-[#26211C] relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title={language === "th" ? "อัตลักษณ์องค์กร" : "Corporate Identity"} align="center" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dimensions.map((dim, index) => {
              const contentKey = dim.key as keyof typeof t.dimensions;

              return (
                <motion.div
                  key={dim.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="group relative border border-white/10 hover:border-gold/50 transition-all duration-500 rounded-sm overflow-hidden min-h-[300px] flex flex-col justify-center p-8"
                >
                  <div
                    className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${(dim as any).bgImage || "/sasan-bg.png"})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="absolute inset-0 z-0 bg-black/60 transition-colors duration-500 group-hover:bg-black/80" />
                  <div className="relative z-10 flex flex-col items-center text-center h-full justify-center">
                    <div className="mb-4 p-3 rounded-full bg-white/5 backdrop-blur-sm group-hover:bg-gold/20 transition-colors duration-500">
                      <dim.icon
                        className={`w-8 h-8 ${dim.color} group-hover:text-gold transition-colors duration-500`}
                      />
                    </div>
                    <h3
                      className={`text-xl font-bold mb-3 text-white group-hover:text-gold transition-colors duration-300 ${language === "th" ? "font-thai" : "font-serif"}`}
                    >
                      {t.dimensions[contentKey].title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed text-white/60 group-hover:text-white/90 transition-colors duration-300 ${language === "th" ? "font-thai" : "font-sans"}`}
                    >
                      {t.dimensions[contentKey].description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-24 bg-black relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,230,151,0.03),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className={`text-4xl md:text-5xl font-bold text-white mb-2 ${language === "th" ? "font-thai" : "font-serif"}`}
            >
              {t.services.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
            <p className="text-white/60 text-lg tracking-widest uppercase mb-8">
              {t.services.subtitle}
            </p>

            {/* View Toggle */}
            <div className="flex items-center justify-center gap-2 bg-white/5 rounded-full p-1 w-fit mx-auto">
              <button
                onClick={() => setPackageView("cards")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  packageView === "cards"
                    ? "bg-gold text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {t.services.viewCards}
              </button>
              <button
                onClick={() => setPackageView("table")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  packageView === "table"
                    ? "bg-gold text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {t.services.viewTable}
              </button>
            </div>
          </motion.div>

          {/* Comparison Table View */}
          {packageView === "table" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-x-auto mb-8"
            >
              <table className="w-full min-w-[800px] border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-white/50 font-normal">{language === "th" ? "รายการ" : "Item"}</th>
                    {servicePackages.map((pkg) => (
                      <th key={pkg.id} className="p-4 text-center">
                        <div className={`font-bold text-lg ${pkg.accent}`}>{pkg.name}</div>
                        <div className="text-white/50 text-sm">{pkg.nameTh}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* ราคา */}
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <td className="p-4 text-white/70">{t.services.startingPrice}</td>
                    {servicePackages.map((pkg) => (
                      <td key={pkg.id} className="p-4 text-center">
                        <span className={`font-bold text-xl ${pkg.accent}`}>
                          ฿{pkg.subPackages[0].price}
                        </span>
                      </td>
                    ))}
                  </tr>
                  {/* ระยะเวลา */}
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-white/70">{t.services.duration}</td>
                    {servicePackages.map((pkg) => (
                      <td key={pkg.id} className="p-4 text-center text-white/80">
                        {pkg.duration}
                      </td>
                    ))}
                  </tr>
                  {/* สถานที่ */}
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <td className="p-4 text-white/70">{t.services.venue}</td>
                    {servicePackages.map((pkg) => (
                      <td key={pkg.id} className="p-4 text-center text-white/80">
                        {pkg.venue}
                      </td>
                    ))}
                  </tr>
                  {/* จำนวนแขก */}
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-white/70">{t.services.guests}</td>
                    {servicePackages.map((pkg) => (
                      <td key={pkg.id} className="p-4 text-center text-white/80">
                        {pkg.guests}
                      </td>
                    ))}
                  </tr>
                  {/* Features */}
                  {[
                    "ค่าเช่าศาลา",
                    "ค่าเมรุและฌาปนกิจ",
                    "ดอกไม้ตกแต่งหน้างาน",
                    "ธูปเทียน",
                    "น้ำดื่ม-ขนม-กาแฟ",
                    "โลงศพ",
                    "รถรับศพ",
                    "ของชำร่วย",
                    "ดอกไม้จันทน์",
                    "ทีมงานดูแล",
                  ].map((feature, idx) => (
                    <tr key={feature} className={`border-b border-white/5 ${idx % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                      <td className="p-4 text-white/70">{feature}</td>
                      {servicePackages.map((pkg) => {
                        const hasFeature = pkg.features.some(f => 
                          f.toLowerCase().includes(feature.toLowerCase().split(' ')[0])
                        );
                        return (
                          <td key={pkg.id} className="p-4 text-center">
                            {hasFeature ? (
                              <Check className={`w-5 h-5 mx-auto ${pkg.accent}`} />
                            ) : (
                              <span className="text-white/20">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {/* Cards View */}
          {packageView === "cards" && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {servicePackages.map((pkg, index) => {
              const Icon = pkg.icon;
              const isExpanded = expandedPackage === pkg.id;
              
              // Badge configuration for each package
              const badges: Record<number, { text: string; color: string } | null> = {
                1: null, // The Memoir - no badge
                2: { text: "POPULAR", color: "bg-blue-500" },
                3: { text: "BEST VALUE", color: "bg-gradient-to-r from-gold to-amber-500" },
                4: { text: "PREMIUM", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
              };
              const badge = badges[pkg.id];

              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`group relative overflow-hidden rounded-2xl border ${pkg.border} bg-gradient-to-b ${pkg.gradient} flex flex-col transition-all duration-500 hover:border-gold/60 ${pkg.recommended ? 'ring-2 ring-gold/30 scale-[1.02]' : ''}`}
                >
                  {/* Badge */}
                  {badge && (
                    <div className={`absolute -top-0 -right-8 z-20 ${badge.color} text-white px-10 py-1 text-[10px] font-bold tracking-wider rotate-45 translate-y-4`}>
                      {badge.text}
                    </div>
                  )}
                  
                  {pkg.recommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20 bg-gradient-to-r from-gold to-amber-500 text-black px-4 py-1 rounded-full text-xs font-bold tracking-wider">
                      แนะนำ
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="p-8 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className={`w-16 h-16 rounded-full bg-black/30 backdrop-blur flex items-center justify-center mb-4 transition-all duration-500 group-hover:bg-black/50 group-hover:scale-110 ${pkg.id === 4 ? 'w-20 h-20' : pkg.id === 3 ? 'w-18 h-18' : ''}`}>
                        <Icon className={`${pkg.id === 4 ? 'w-10 h-10' : pkg.id === 3 ? 'w-9 h-9' : 'w-8 h-8'} ${pkg.accent}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1 font-serif">
                        {pkg.name}
                      </h3>
                      <p
                        className={`text-base text-white/80 mb-2 ${language === "th" ? "font-thai" : ""}`}
                      >
                        {pkg.nameTh}
                      </p>
                      <p className={`text-xs italic ${pkg.accent}`}>
                        {language === "th" ? pkg.taglineTh : pkg.tagline}
                      </p>
                    </div>

                    {/* Quick Info */}
                    <div className="space-y-2 mb-8 text-center">
                      <p className="text-sm text-white/80 flex items-center justify-center gap-2">
                        <span className={`text-[10px] ${pkg.accent}`}>●</span>{" "}
                        {pkg.duration}
                      </p>
                      <p className="text-sm text-white/80 flex items-center justify-center gap-2">
                        <span className={`text-[10px] ${pkg.accent}`}>●</span>{" "}
                        {pkg.venue}
                      </p>
                      <p className="text-sm text-white/80 flex items-center justify-center gap-2">
                        <span className={`text-[10px] ${pkg.accent}`}>●</span>{" "}
                        {pkg.guests}
                      </p>
                    </div>

                    {/* Price Box */}
                    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 mb-6">
                      <p className="text-[10px] uppercase tracking-widest text-white/40 mb-3 text-center">
                        แพ็คเกจแนะนำ
                      </p>
                      <div className="space-y-3">
                        {pkg.subPackages.map((sub, i) => (
                          <div key={sub.name}>
                            {i > 0 && (
                              <div className="border-t border-white/10 my-2" />
                            )}
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-medium text-white/70">
                                {sub.name}
                              </span>
                              <span
                                className={`text-lg font-bold ${pkg.accent}`}
                              >
                                {sub.price} บาท
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Toggle Button */}
                    <button
                      onClick={() =>
                        setExpandedPackage(isExpanded ? null : pkg.id)
                      }
                      className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm text-white/80 mb-2"
                    >
                      <span>รายละเอียด</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    {/* ปุ่มดูตัวอย่างงาน */}
                    <button
                      onClick={() =>
                        setGalleryModal({
                          isOpen: true,
                          packageName: pkg.name,
                          images: pkg.gallery,
                          currentIndex: 0,
                        })
                      }
                      className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-colors text-sm mb-4 border ${pkg.border} hover:bg-white/10 text-white/70 hover:text-white`}
                    >
                      <Image className="w-4 h-4" />
                      <span>ดูตัวอย่างงาน</span>
                    </button>

                    {/* Expandable Features */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="max-h-64 overflow-y-auto custom-scrollbar pr-2 space-y-3">
                            {pkg.features.map((feature, i) => (
                              <div key={i} className="flex gap-3 items-start">
                                <Check
                                  className={`w-4 h-4 mt-0.5 shrink-0 ${pkg.accent}`}
                                />
                                <span className="text-sm text-white/70 leading-tight">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
          )}

          {/* Promotions Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-16 p-8 bg-gradient-to-r from-yellow-900/20 via-amber-900/20 to-yellow-900/20 border border-gold/30 rounded-2xl"
          >
            <div className="flex flex-col items-center text-center mb-8">
              <h3
                className={`text-2xl font-bold text-yellow-200 flex items-center gap-2 ${language === "th" ? "font-thai" : "font-serif"}`}
              >
                Signature Care
              </h3>
              <p className="text-white/60 text-sm">
                สิทธิพิเศษเพื่อช่วยแบ่งเบาภาระของครอบครัวในวันที่เปราะบาง
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-gold/20">
                <h4 className="font-bold text-yellow-300 text-lg mb-4">
                  การวางแผนล่วงหน้า (Pre-planning)
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-white/80">
                      วางแผนล่วงหน้าก่อนความจำเป็นมาถึง&nbsp;ช่วยให้ครอบครัวมีเวลาเตรียมใจ
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-white/80">
                      จองล่วงหน้า 30 วัน:{" "}
                      <span className="text-yellow-300 font-semibold text-base">
                        รับเงื่อนไขพิเศษเพื่อช่วยจัดการงบประมาณ
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-white/80">
                      จองล่วงหน้า 60 วัน:{" "}
                      <span className="text-yellow-300 font-semibold text-base">
                        ได้รับการออกแบบแพ็กเกจอย่างละเอียดตามความต้องการของครอบครัว
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-gold/20">
                <h4 className="font-bold text-yellow-300 text-lg mb-4">
                  โปรแกรมดูแลครอบครัวที่แนะนำกันต่อ
                </h4>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-white/80">
                    เมื่อครอบครัวที่เคยใช้บริการแนะนำคนใกล้ชิดให้เราได้ดูแล&nbsp;
                    <span className="text-yellow-300 font-semibold text-base">
                      เรามีสิทธิพิเศษตอบแทนทั้งสองครอบครัว
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery / Portfolio Section */}
      <section id="portfolio" className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold text-white mb-2 ${language === "th" ? "font-thai" : "font-serif"}`}>
              {t.portfolio.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
            <p className="text-white/60 text-lg">{t.portfolio.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "/OurWork6.png", label: t.portfolio.items[0].label },
              { src: "/OurWork2.png", label: t.portfolio.items[1].label },
              { src: "/OurWork3.jpg", label: t.portfolio.items[2].label },
              { src: "/OurWork4.png", label: t.portfolio.items[3].label },
              { src: "/OurWork5.png", label: t.portfolio.items[4].label },
              { src: "/OurWork1.jpg", label: t.portfolio.items[5].label },
              { src: "/OurWork7.png", label: t.portfolio.items[6].label },
              { src: "/Flower R.png", label: t.portfolio.items[7].label },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative group aspect-square overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setGalleryModal({
                  isOpen: true,
                  packageName: t.portfolio.title,
                  images: [item.src],
                  currentIndex: 0,
                })}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium">{item.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-white/40 text-sm">{t.portfolio.note}</p>
          </motion.div>
        </div>
      </section>

      {/* About Us Section - with Image Slider */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-4xl md:text-5xl font-bold text-white mb-6 ${language === "th" ? "font-thai" : "font-serif"}`}>
                {t.about.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-gold to-transparent mb-8" />
              
              <div className="space-y-6 text-white/70 leading-relaxed">
                <p>
                  <span className="text-gold font-semibold">SASAN</span> {t.about.description1}
                </p>
                <p>
                  {t.about.description2}
                </p>
                <p>
                  {language === "th" ? "ปรัชญาของเรา:" : "Our philosophy:"} <span className="text-gold italic">"{t.about.philosophy}"</span>
                </p>
              </div>

              {/* Credentials */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: "🏆", text: t.about.credentials[0].text },
                  { icon: "✅", text: t.about.credentials[1].text },
                  { icon: "🤝", text: t.about.credentials[2].text },
                  { icon: "💼", text: t.about.credentials[3].text },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-white/60 text-sm">
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Image Slider */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden relative group">
                {/* Main Image with Animation */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={aboutSlideIndex}
                    src={aboutImages[aboutSlideIndex].src}
                    alt={aboutImages[aboutSlideIndex].label}
                    className="w-full h-full object-cover absolute inset-0"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />
                </AnimatePresence>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Navigation Arrows */}
                <button
                  onClick={() => setAboutSlideIndex((prev) => (prev - 1 + aboutImages.length) % aboutImages.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={() => setAboutSlideIndex((prev) => (prev + 1) % aboutImages.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
                
                {/* Slide Indicators (Dots) */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {aboutImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setAboutSlideIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === aboutSlideIndex 
                          ? "bg-gold w-6" 
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
                
                {/* Image Label */}
                <motion.div 
                  key={`label-${aboutSlideIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-24 left-6 text-white text-sm font-medium z-10"
                >
                  {aboutImages[aboutSlideIndex].label}
                </motion.div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gold/10 rounded-2xl -z-10" />
              
              {/* Stats overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-sm rounded-xl p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gold">15+</p>
                    <p className="text-xs text-white/50">ปี</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gold">1000+</p>
                    <p className="text-xs text-white/50">งาน</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gold">50+</p>
                    <p className="text-xs text-white/50">ทีมงาน</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-zinc-950 relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold text-white mb-2 ${language === "th" ? "font-thai" : "font-serif"}`}>
              {t.faq.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
            <p className="text-white/60 text-lg">{t.faq.subtitle}</p>
          </motion.div>

          <div className="space-y-4">
            {t.faq.items.map((faq: {q: string, a: string}, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="text-white font-medium pr-4">{faq.q}</span>
                    <ChevronDown className="w-5 h-5 text-gold transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-white/50 text-sm mb-4">{t.faq.moreQuestions}</p>
            <a
              href={`tel:${contactInfo.phone.replace(/-/g, "")}`}
              className="inline-flex items-center gap-2 text-gold hover:text-yellow-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{t.faq.callFree} {contactInfo.phone}</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className="py-24 bg-black relative"
      >
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading title={t.contact.title} align="center" />

          {/* ปุ่มเปิด Service Wizard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-gold/20 via-amber-900/20 to-gold/20 border border-gold/30 rounded-2xl p-6 text-center relative overflow-hidden">
              {/* Badge บริการ 24 ชม. */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-green-500/20 border border-green-500/30 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                <Clock className="w-3 h-3" />
                <span>บริการ 24 ชม.</span>
              </div>
              
              <h3
                className={`text-xl font-bold text-gold mb-2 ${language === "th" ? "font-thai" : "font-serif"}`}
              >
                ✨ {t.contact.oneStopService}
              </h3>
              <p className="text-white/60 text-sm mb-4">
                {t.contact.oneStopDesc}
              </p>
              <Button
                onClick={() => setShowWizard(true)}
                className="bg-gold text-black hover:bg-yellow-400 px-8 py-6 rounded-full text-lg font-bold tracking-wide transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30"
              >
                <Wand2 className="w-5 h-5 mr-2" />
                {t.contact.startNow}
              </Button>
            </div>
          </motion.div>

          {/* Quick Contact Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
          >
            {/* Phone Card */}
            <a
              href={`tel:${contactInfo.phone.replace(/-/g, "")}`}
              className="group p-6 bg-amber-900/20 border border-amber-500/30 rounded-2xl hover:bg-amber-900/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-white/60 text-xs mb-1">{t.contact.callUs}</p>
                  <p className="text-xl font-bold text-amber-400">{contactInfo.phone}</p>
                  <p className="text-white/40 text-xs mt-1">{t.contact.available24h}</p>
                </div>
              </div>
            </a>

            {/* LINE Card with QR */}
            <a
              href={`https://line.me/ti/p/${contactInfo.line}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-green-900/20 border border-green-500/30 rounded-2xl hover:bg-green-900/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-white p-1 group-hover:scale-110 transition-transform">
                  <img
                    src={contactInfo.lineQrUrl}
                    alt="LINE QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="text-white/60 text-xs mb-1">{t.contact.lineOfficial}</p>
                  <p className="text-xl font-bold text-green-400">{contactInfo.line}</p>
                  <p className="text-white/40 text-xs mt-1">{t.contact.scanOrClick}</p>
                </div>
              </div>
            </a>
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/40 text-sm">{t.contact.or}</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl shadow-gold/5"
          >
            <h3
              className={`text-lg font-bold text-white/80 mb-6 text-center ${language === "th" ? "font-thai" : "font-serif"}`}
            >
              💬 {t.contact.directContact}
            </h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">
                          {t.contact.name}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder=""
                            {...field}
                            className="bg-black/50 border-white/10 focus:border-gold h-12 rounded-lg transition-colors"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">
                          {t.contact.email}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder=""
                            {...field}
                            className="bg-black/50 border-white/10 focus:border-gold h-12 rounded-lg transition-colors"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">
                          {t.contact.phone}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder=""
                            {...field}
                            value={field.value || ""}
                            className="bg-black/50 border-white/10 focus:border-gold h-12 rounded-lg transition-colors"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">
                          {t.contact.serviceType}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder=""
                            {...field}
                            value={field.value || ""}
                            className="bg-black/50 border-white/10 focus:border-gold h-12 rounded-lg transition-colors"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">
                        {t.contact.message}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder=""
                          {...field}
                          className="bg-black/50 border-white/10 focus:border-gold min-h-[150px] rounded-lg transition-colors resize-none"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center pt-4">
                  <Button
                    type="submit"
                    disabled={createInquiry.isPending}
                    className="bg-gold text-black hover:bg-white hover:text-black px-12 py-6 rounded-full text-lg font-bold tracking-widest uppercase transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-white/10"
                  >
                    {createInquiry.isPending ? "Sending..." : t.contact.submit}
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Team Section - "THE CHAPTER" */}
      {/* ============================================================ */}
      <section className="py-24 bg-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 100px,
              rgba(212, 175, 55, 0.1) 100px,
              rgba(212, 175, 55, 0.1) 101px
            )`
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-gold/60 text-sm tracking-[4px] uppercase mb-4">
              Behind The Scenes
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Our <span className="text-gold italic">Chapter</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              ทีมงานผู้อยู่เบื้องหลังทุกความสำเร็จ พร้อมดูแลคุณด้วยใจ
            </p>
          </motion.div>

          {/* Team Accordion */}
          <div className="flex flex-col md:flex-row h-auto md:h-[500px] gap-2 md:gap-0">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className={`relative cursor-pointer overflow-hidden rounded-xl md:rounded-none md:first:rounded-l-2xl md:last:rounded-r-2xl border border-white/10 ${
                  hoveredMember === index ? "md:border-gold/50" : ""
                }`}
                initial={{ flex: 1 }}
                animate={{
                  flex: hoveredMember === index ? 4 : 1,
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.4, 0.45, 1] }}
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${member.color} transition-opacity duration-500 ${
                  hoveredMember === index ? "opacity-100" : "opacity-30"
                }`} />
                
                {/* Dark Overlay */}
                <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${
                  hoveredMember === index ? "opacity-40" : "opacity-70"
                }`} />

                {/* Content Container */}
                <div className="relative h-full p-6 md:p-8 flex flex-col justify-between min-h-[200px] md:min-h-0">
                  
                  {/* Number Badge */}
                  <div className="flex items-start justify-between">
                    <span className={`font-serif text-4xl md:text-5xl transition-all duration-500 ${
                      hoveredMember === index ? "text-gold" : "text-white/20"
                    }`}>
                      {member.number}
                    </span>
                    
                    {/* Role Icon */}
                    <motion.div
                      animate={{
                        scale: hoveredMember === index ? 1 : 0.8,
                        opacity: hoveredMember === index ? 1 : 0.5,
                      }}
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center border border-white/20`}
                    >
                      <span className="text-white text-lg">
                        {member.name.charAt(0)}
                      </span>
                    </motion.div>
                  </div>

                  {/* Vertical Role Text (shown when collapsed) */}
                  <motion.div
                    className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    animate={{
                      opacity: hoveredMember === index ? 0 : 1,
                      rotate: -90,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="whitespace-nowrap text-white/40 text-sm tracking-[3px] uppercase font-medium">
                      {member.role}
                    </span>
                  </motion.div>

                  {/* Expanded Content (shown on hover) */}
                  <motion.div
                    className="md:absolute md:bottom-8 md:left-8 md:right-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredMember === index ? 1 : 0,
                      y: hoveredMember === index ? 0 : 20,
                    }}
                    transition={{ delay: hoveredMember === index ? 0.1 : 0, duration: 0.3 }}
                  >
                    {/* Name */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    
                    {/* Role */}
                    <p className={`${member.accent} font-medium mb-1`}>
                      {member.role}
                    </p>
                    <p className="text-white/50 text-sm mb-4">
                      {member.roleSecondary}
                    </p>

                    {/* Quote */}
                    <div className="flex items-start gap-2">
                      <span className="text-gold/50 text-2xl font-serif">"</span>
                      <p className="text-white/70 italic text-sm leading-relaxed">
                        {member.quote}
                      </p>
                    </div>
                  </motion.div>

                  {/* Mobile: Always show content */}
                  <div className="md:hidden mt-auto">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className={`${member.accent} font-medium text-sm`}>
                      {member.role}
                    </p>
                    <p className="text-white/50 text-xs">
                      {member.roleSecondary}
                    </p>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-amber-400 to-gold"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredMember === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Bottom Text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white/30 text-sm mt-12"
          >
            เราพร้อมดูแลทุกรายละเอียด เพื่อให้ "บทสุดท้าย" ของคุณสมบูรณ์แบบ
          </motion.p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/10 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <span className="text-2xl font-serif font-bold text-white/90">
            SASAN
          </span>
          <p className="text-white/40 text-sm tracking-widest uppercase">
            © {new Date().getFullYear()} Sasan. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Service Wizard Modal */}
      <AnimatePresence>
        {showWizard && <ServiceSelector onClose={() => setShowWizard(false)} />}
      </AnimatePresence>

      {/* Gallery Modal */}
      <AnimatePresence>
        {galleryModal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setGalleryModal({ ...galleryModal, isOpen: false })}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setGalleryModal({ ...galleryModal, isOpen: false })}
                className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Title */}
              <h3 className="text-center text-white/80 mb-4 text-lg">
                ตัวอย่างงาน {galleryModal.packageName}
              </h3>

              {/* Main Image */}
              <div className="relative aspect-video bg-black/50 rounded-xl overflow-hidden mb-4">
                <img
                  src={galleryModal.images[galleryModal.currentIndex]}
                  alt={`${galleryModal.packageName} - ${galleryModal.currentIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                {galleryModal.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setGalleryModal({
                          ...galleryModal,
                          currentIndex:
                            galleryModal.currentIndex === 0
                              ? galleryModal.images.length - 1
                              : galleryModal.currentIndex - 1,
                        })
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronDown className="w-6 h-6 text-white rotate-90" />
                    </button>
                    <button
                      onClick={() =>
                        setGalleryModal({
                          ...galleryModal,
                          currentIndex:
                            galleryModal.currentIndex === galleryModal.images.length - 1
                              ? 0
                              : galleryModal.currentIndex + 1,
                        })
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronDown className="w-6 h-6 text-white -rotate-90" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex justify-center gap-2">
                {galleryModal.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setGalleryModal({ ...galleryModal, currentIndex: idx })}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === galleryModal.currentIndex
                        ? "border-gold"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Note */}
              <p className="text-center text-white/40 text-xs mt-4">
                * รูปตัวอย่างเพื่อประกอบการตัดสินใจ ผลงานจริงอาจแตกต่างตามความต้องการ
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Chat Widget */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <AnimatePresence>
          {/* Contact Options */}
          {showFloatingMenu && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden w-72 mb-2"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-gold to-amber-500 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-black font-bold">SASAN Support</h4>
                    <p className="text-black/70 text-xs flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      ออนไลน์ พร้อมให้บริการ 24 ชม.
                    </p>
                  </div>
                </div>
              </div>

              {/* Welcome Message */}
              <div className="p-4">
                <div className="flex gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-gold text-xs font-bold">S</span>
                  </div>
                  <div className="bg-white/5 rounded-2xl rounded-tl-none p-3">
                    <p className="text-white/80 text-sm">
                      สวัสดีค่ะ 🙏 ยินดีต้อนรับสู่ SASAN
                    </p>
                    <p className="text-white/60 text-sm mt-1">
                      ทีมงานพร้อมให้คำปรึกษาค่ะ เลือกช่องทางติดต่อได้เลย
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="p-4 pt-0 space-y-2">
                {/* LINE */}
                <a
                  href={`https://line.me/ti/p/${contactInfo.line}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full bg-green-600 hover:bg-green-500 text-white p-3 rounded-xl transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                  </svg>
                  <div className="flex-1">
                    <span className="font-medium">แชทผ่าน LINE</span>
                    <span className="text-white/70 text-xs block">{contactInfo.line}</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </a>

                {/* Phone */}
                <a
                  href={`tel:${contactInfo.phone.replace(/-/g, "")}`}
                  className="flex items-center gap-3 w-full bg-amber-600 hover:bg-amber-500 text-white p-3 rounded-xl transition-all"
                >
                  <Phone className="w-5 h-5" />
                  <div className="flex-1">
                    <span className="font-medium">โทรหาเรา</span>
                    <span className="text-white/70 text-xs block">{contactInfo.phone}</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          onClick={() => setShowFloatingMenu(!showFloatingMenu)}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all ${
            showFloatingMenu
              ? "bg-white/10 text-white rotate-45"
              : "bg-gold text-black hover:bg-yellow-400"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showFloatingMenu ? (
            <X className="w-6 h-6" />
          ) : (
            <Phone className="w-6 h-6" />
          )}
        </motion.button>
        
        {/* Pulse effect when closed */}
        {!showFloatingMenu && (
          <div className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-gold/30 animate-ping pointer-events-none" />
        )}
      </div>
    </div>
  );
}
