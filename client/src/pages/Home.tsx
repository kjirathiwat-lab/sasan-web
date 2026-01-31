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
import { useRef, useState } from "react";
import ServiceWizard from "@/components/ServiceWizard";

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
        {/* Background - Dark texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black opacity-80 z-0" />

        {/* Abstract shapes/glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />

        <motion.div
          style={{ y: y1, opacity }}
          className="relative z-10 text-center px-4 w-full mx-auto"
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
            className={`text-lg md:text-xl text-gold/80 tracking-widest uppercase ${language === "th" ? "font-thai" : "font-sans"}`}
          >
            {t.hero.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/30 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={32} />
        </motion.div>
      </section>

      {/* Philosophy Quote */}
      <section className="py-24 md:py-32 relative bg-zinc-950 overflow-hidden">
        <div className="w-full mx-auto px-6 text-center relative">
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
        <div className="w-full mx-auto px-6">
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

        <div className="w-full mx-auto px-6 relative z-10">
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

              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`group relative overflow-hidden rounded-2xl border ${pkg.border} bg-gradient-to-b ${pkg.gradient} flex flex-col transition-all duration-500 hover:border-gold/60`}
                >
                  {pkg.recommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20 bg-gradient-to-r from-gold to-amber-500 text-black px-4 py-1 rounded-full text-xs font-bold tracking-wider">
                      แนะนำ
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="p-8 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-black/30 backdrop-blur flex items-center justify-center mb-4 transition-colors duration-500 group-hover:bg-black/50">
                        <Icon className={`w-8 h-8 ${pkg.accent}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1 font-serif">
                        {pkg.name}
                      </h3>
                      <p className={`text-base text-white/80 mb-2 ${language === "th" ? "font-thai" : ""}`}>
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
                      className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm text-white/80 mb-4"
                    >
                      <span>รายละเอียด</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
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

          {/* Promotion Banner inside Services */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-16 p-8 bg-gradient-to-r from-yellow-900/20 via-amber-900/20 to-yellow-900/20 border border-gold/30 rounded-2xl w-full"
          >
            <div className="flex flex-col items-center text-center mb-8">
              <h3
                className={`text-2xl font-bold text-yellow-200 flex items-center gap-2 ${language === "th" ? "font-thai" : "font-serif"}`}
              >
                🎁 โปรโมชั่นพิเศษ
              </h3>
              <p className="text-white/60 text-sm">Special Promotions</p>
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

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className="py-24 bg-black relative"
      >
        <div className="w-full mx-auto px-6">
          <SectionHeading title={t.contact.title} align="center" />

          {/* ปุ่มเปิด Service Wizard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-gold/20 via-amber-900/20 to-gold/20 border border-gold/30 rounded-2xl p-6 text-center">
              <h3 className={`text-xl font-bold text-gold mb-2 ${language === "th" ? "font-thai" : "font-serif"}`}>
                ✨ ออกแบบแพ็คเกจด้วยตัวเอง
              </h3>
              <p className="text-white/60 text-sm mb-4">
                เลือกบริการตามความต้องการ พร้อมคำนวณราคาอัตโนมัติ
              </p>
              <Button
                onClick={() => setShowWizard(true)}
                className="bg-gold text-black hover:bg-yellow-400 px-8 py-6 rounded-full text-lg font-bold tracking-wide transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30"
              >
                <Wand2 className="w-5 h-5 mr-2" />
                เริ่มออกแบบแพ็คเกจ
              </Button>
            </div>
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
            className="bg-zinc-900/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl shadow-gold/5 w-full"
          >
            <h3 className={`text-lg font-bold text-white/80 mb-6 text-center ${language === "th" ? "font-thai" : "font-serif"}`}>
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
        {showWizard && <ServiceWizard onClose={() => setShowWizard(false)} />}
      </AnimatePresence>
    </div>
  );
}
