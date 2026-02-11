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
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&h=400&fit=crop",
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
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop",
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
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&h=400&fit=crop",
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
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&h=400&fit=crop",
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

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background - Dark texture with subtle pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black opacity-80 z-0" />
        
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gold/20 rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Abstract shapes/glows - enhanced */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />

        <motion.div
          style={{ y: y1, opacity }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <img
              src="/logo-sasan.png"
              alt="SASAN"
              className="h-32 md:h-40 lg:h-48 w-auto mx-auto mb-6"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-3xl font-serif italic text-white/90 mb-4"
          >
            "{t.hero.tagline}"
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className={`text-lg md:text-xl text-gold/80 tracking-widest uppercase mb-8 ${language === "th" ? "font-thai" : "font-sans"}`}
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Hero CTA Buttons */}
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
              เริ่มออกแบบงาน
            </Button>
            <a
              href={`tel:${contactInfo.phone.replace(/-/g, "")}`}
              className="flex items-center gap-2 px-6 py-3 border border-white/30 rounded-full text-white/80 hover:text-white hover:border-white/50 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>โทรปรึกษาฟรี</span>
            </a>
          </motion.div>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="mt-8 flex items-center justify-center gap-6 text-white/40 text-sm"
          >
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>บริการ 24 ชม.</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>ประสบการณ์ 15+ ปี</span>
            </div>
            <div className="flex items-center gap-2 hidden sm:flex">
              <Check className="w-4 h-4 text-green-500" />
              <span>ดูแลแล้ว 1,000+ งาน</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/30 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={32} />
        </motion.div>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className={`text-center text-xl text-white/80 mb-8 ${language === "th" ? "font-thai" : "font-serif"}`}>
              เสียงจากครอบครัวที่ไว้วางใจ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "ทีมงาน SASAN ดูแลทุกอย่างอย่างดีมาก ในช่วงเวลาที่ยากลำบากที่สุด พวกเขาทำให้ทุกอย่างผ่านไปอย่างราบรื่นและสมเกียรติ",
                  name: "คุณสมชาย ว.",
                  role: "ครอบครัวผู้ใช้บริการ",
                  package: "The Legacy",
                },
                {
                  quote: "ประทับใจมากค่ะ ตั้งแต่การให้คำปรึกษาจนถึงวันสุดท้าย ทีมงานใส่ใจทุกรายละเอียด งานออกมาสวยงามเกินคาด",
                  name: "คุณวิภา ส.",
                  role: "ครอบครัวผู้ใช้บริการ",
                  package: "The Narrative",
                },
                {
                  quote: "บริการระดับพรีเมียมจริงๆ ครับ ราคาสมเหตุสมผล ไม่มีค่าใช้จ่ายแอบแฝง แนะนำเลยครับ",
                  name: "คุณธนา พ.",
                  role: "ครอบครัวผู้ใช้บริการ",
                  package: "The Masterpiece",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-gold/30 transition-colors"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-gold">★</span>
                    ))}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium text-sm">{testimonial.name}</p>
                      <p className="text-white/40 text-xs">{testimonial.role}</p>
                    </div>
                    <span className="text-xs text-gold/60 bg-gold/10 px-2 py-1 rounded">{testimonial.package}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Partner Logos */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-white/40 text-xs uppercase tracking-widest mb-6">พันธมิตรที่ไว้วางใจ</p>
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
          <SectionHeading title={t.nav.about} align="center" />

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
            className="text-center mb-16"
          >
            <h2
              className={`text-4xl md:text-5xl font-bold text-white mb-2 ${language === "th" ? "font-thai" : "font-serif"}`}
            >
              บริการของเรา
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
            <p className="text-white/60 text-lg tracking-widest uppercase">
              The Storytelling Collection
            </p>
          </motion.div>

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
                Signature Services
              </h3>
              <p className="text-white/60 text-sm">Special Services</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-gold/20">
                <h4 className="font-bold text-yellow-300 text-lg mb-4">
                  ส่วนลด Early Bird
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-white/80">
                      จองล่วงหน้า 30 วัน:{" "}
                      <span className="text-yellow-300 font-semibold text-base">
                        ลด 5%
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-white/80">
                      จองล่วงหน้า 60 วัน:{" "}
                      <span className="text-yellow-300 font-semibold text-base">
                        ลด 10%
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-gold/20">
                <h4 className="font-bold text-yellow-300 text-lg mb-4">
                  ส่วนลดแนะนำเพื่อน
                </h4>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-white/80">
                    แนะนำเพื่อนใช้บริการ:{" "}
                    <span className="text-yellow-300 font-semibold text-base">
                      ลด 3% ทั้ง 2 ฝ่าย
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery / Portfolio Section */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold text-white mb-2 ${language === "th" ? "font-thai" : "font-serif"}`}>
              ผลงานที่ผ่านมา
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
            <p className="text-white/60 text-lg">ตัวอย่างงานที่เราภูมิใจนำเสนอ</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "/OurWork1.jpg", label: "ทีมวางแผนงาน" },
              { src: "/OurWork2.png", label: "พิธีไว้อาลัย" },
              { src: "/OurWork3.jpg", label: "บริการครบวงจร" },
              { src: "/OurWork4.png", label: "ดูแลด้วยใจ" },
              { src: "/OurWork5.png", label: "วางแผนพิธี" },
              { src: "/OurWork6.png", label: "ขบวนพิธี" },
              { src: "/OurWork7.png", label: "พิธีกรรมไทย" },
              { src: "/OurWork8.png", label: "จัดดอกไม้" },
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
                  packageName: "ผลงาน",
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
            <p className="text-white/40 text-sm">* รูปตัวอย่างเพื่อประกอบการพิจารณา</p>
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
                เกี่ยวกับ SASAN
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-gold to-transparent mb-8" />
              
              <div className="space-y-6 text-white/70 leading-relaxed">
                <p>
                  <span className="text-gold font-semibold">SASAN</span> ก่อตั้งขึ้นด้วยความตั้งใจที่จะสร้างมาตรฐานใหม่ 
                  ในการจัดงานศพ ด้วยประสบการณ์กว่า 15 ปี เราเข้าใจว่าการจากลาบุคคลอันเป็นที่รัก 
                  เป็นช่วงเวลาที่ต้องการความใส่ใจเป็นพิเศษ
                </p>
                <p>
                  ทีมงานมืออาชีพของเราพร้อมดูแลทุกขั้นตอน ตั้งแต่การวางแผน การจัดเตรียมสถานที่ 
                  ไปจนถึงพิธีสุดท้าย เพื่อให้ครอบครัวได้มีเวลาไว้อาลัยอย่างสงบ
                </p>
                <p>
                  ปรัชญาของเรา: <span className="text-gold italic">"ทุกชีวิตมีเรื่องราว และเรื่องราวทุกเรื่องสมควรได้รับการบอกเล่าอย่างงดงาม"</span>
                </p>
              </div>

              {/* Credentials */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: "🏆", text: "ใบอนุญาตประกอบกิจการ" },
                  { icon: "✅", text: "มาตรฐาน ISO 9001" },
                  { icon: "🤝", text: "สมาชิกสมาคมฯ" },
                  { icon: "💼", text: "ประกันความรับผิดชอบ" },
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
      <section className="py-24 bg-zinc-950 relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold text-white mb-2 ${language === "th" ? "font-thai" : "font-serif"}`}>
              คำถามที่พบบ่อย
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
            <p className="text-white/60 text-lg">FAQ</p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "ขั้นตอนการจองบริการเป็นอย่างไร?",
                a: "เพียงติดต่อเราผ่านโทรศัพท์ LINE หรือกรอกแบบฟอร์มบนเว็บไซต์ ทีมงานจะติดต่อกลับภายใน 1 ชั่วโมง เพื่อรับฟังความต้องการและแนะนำแพ็คเกจที่เหมาะสม จากนั้นนัดหมายพบปะเพื่อวางแผนรายละเอียด",
              },
              {
                q: "ชำระเงินอย่างไร? ต้องจ่ายล่วงหน้าเท่าไหร่?",
                a: "รับชำระเงินสด โอนเงิน และบัตรเครดิต สำหรับการวางแผนล่วงหน้า (Pre-planning) มัดจำ 30% ส่วนกรณีเร่งด่วนชำระ 50% ก่อนเริ่มงาน และส่วนที่เหลือหลังเสร็จสิ้นพิธี",
              },
              {
                q: "สามารถยกเลิกหรือเลื่อนได้ไหม?",
                a: "สำหรับ Pre-planning สามารถเลื่อนได้โดยไม่มีค่าใช้จ่ายเพิ่ม และยกเลิกได้โดยหักค่าดำเนินการ 10% กรณีจองแล้วต้องการเปลี่ยนแปลง กรุณาแจ้งล่วงหน้าอย่างน้อย 7 วัน",
              },
              {
                q: "ราคาที่แจ้งรวมอะไรบ้าง? มีค่าใช้จ่ายแอบแฝงไหม?",
                a: "ราคาที่แจ้งเป็นราคาเหมาจ่ายตามรายการในแพ็คเกจ ไม่มีค่าใช้จ่ายแอบแฝง หากต้องการบริการเพิ่มเติมนอกเหนือแพ็คเกจ ทีมงานจะแจ้งราคาล่วงหน้าทุกครั้ง",
              },
              {
                q: "SASAN ให้บริการในพื้นที่ใดบ้าง?",
                a: "เราให้บริการทั่วกรุงเทพฯ และปริมณฑล รวมถึงต่างจังหวัดทั่วประเทศ (อาจมีค่าเดินทางเพิ่มเติมสำหรับพื้นที่ห่างไกล)",
              },
              {
                q: "กรณีเร่งด่วน สามารถจัดงานได้เร็วสุดกี่วัน?",
                a: "ทีมงานพร้อมให้บริการ 24 ชั่วโมง กรณีเร่งด่วนสามารถเริ่มดำเนินการได้ทันที และจัดงานได้ภายใน 24-48 ชั่วโมง",
              },
            ].map((faq, index) => (
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
            <p className="text-white/50 text-sm mb-4">ยังมีคำถามเพิ่มเติม?</p>
            <a
              href={`tel:${contactInfo.phone.replace(/-/g, "")}`}
              className="inline-flex items-center gap-2 text-gold hover:text-yellow-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>โทรปรึกษาฟรี {contactInfo.phone}</span>
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
                ✨ One Stop Service
              </h3>
              <p className="text-white/60 text-sm mb-4">
                เลือกแพ็คเกจหรือออกแบบงานด้วยตัวเอง พร้อมคำนวณราคาอัตโนมัติ
              </p>
              <Button
                onClick={() => setShowWizard(true)}
                className="bg-gold text-black hover:bg-yellow-400 px-8 py-6 rounded-full text-lg font-bold tracking-wide transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30"
              >
                <Wand2 className="w-5 h-5 mr-2" />
                เริ่มต้นใช้งาน
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
                  <p className="text-white/60 text-xs mb-1">โทรหาเราเลย</p>
                  <p className="text-xl font-bold text-amber-400">{contactInfo.phone}</p>
                  <p className="text-white/40 text-xs mt-1">พร้อมให้บริการ 24 ชั่วโมง</p>
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
                  <p className="text-white/60 text-xs mb-1">LINE Official</p>
                  <p className="text-xl font-bold text-green-400">{contactInfo.line}</p>
                  <p className="text-white/40 text-xs mt-1">แสกน QR หรือคลิกเพื่อแชท</p>
                </div>
              </div>
            </a>
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/40 text-sm">หรือ</span>
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
              💬 ติดต่อทีมงานโดยตรง
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

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <AnimatePresence>
          {showFloatingMenu && (
            <>
              {/* LINE Button */}
              <motion.a
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ delay: 0.1 }}
                href={`https://line.me/ti/p/${contactInfo.line}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white pl-4 pr-5 py-3 rounded-full shadow-lg shadow-green-600/30 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">LINE {contactInfo.line}</span>
              </motion.a>

              {/* Phone Button */}
              <motion.a
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                href={`tel:${contactInfo.phone.replace(/-/g, "")}`}
                className="flex items-center gap-3 bg-amber-600 hover:bg-amber-500 text-white pl-4 pr-5 py-3 rounded-full shadow-lg shadow-amber-600/30 transition-all"
              >
                <Phone className="w-5 h-5" />
                <span className="text-sm font-medium">{contactInfo.phone}</span>
              </motion.a>
            </>
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
