import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, Sparkles, ChevronRight, ChevronLeft, ChevronDown, ChevronUp,
  Users, Check, X, Crown, BookOpen, BookText, Gem,
  Phone, MessageCircle, Calendar, Send, User, Heart, Clock,
  Leaf, Palette, Sun, Star, Home, Award
} from 'lucide-react';

// ==================== TYPES ====================
interface ServiceSelectorProps {
  onClose?: () => void;
}

type BriefAnswer = {
  who: string;
  style: string;
  mood: string;
};

// ==================== PACKAGE DATA ====================
const packages = [
  {
    id: 'memoir',
    name: 'The Memoir',
    nameTh: 'เดอะ เมมัวร์',
    tagline: 'ความทรงจำอันอบอุ่น',
    description: 'เหมาะสำหรับงานขนาดเล็ก ครอบครัวและเพื่อนสนิท',
    icon: BookOpen,
    gradient: 'from-slate-800/80 to-slate-900/80',
    accent: '#93c5fd',
    days: 3,
    maxGuests: 80,
    price: { min: 45000, max: 55000 },
    keywords: ['minimalist', 'warm', 'peaceful', 'self'],
    includes: [
      'ศาลาวัดขนาดเล็ก 3 คืน',
      'เมรุและฌาปนกิจ',
      'ดอกไม้ตกแต่ง',
      'น้ำดื่ม-ขนม-กาแฟ',
      'โลงศพ',
      'รถรับศพ',
      'ของชำร่วย',
      'ดอกไม้จันทน์',
      'ทีมงาน 8-10 คน',
    ],
  },
  {
    id: 'narrative',
    name: 'The Narrative',
    nameTh: 'เดอะ แนร์ราทีฟ',
    tagline: 'บอกเล่าเรื่องราว',
    description: 'งานขนาดกลาง สำหรับครอบครัวและญาติมิตร',
    icon: BookText,
    gradient: 'from-amber-900/80 to-amber-950/80',
    accent: '#fcd34d',
    days: 5,
    maxGuests: 150,
    price: { min: 120000, max: 150000 },
    keywords: ['botanical', 'warm', 'celebration', 'family', 'personalized'],
    includes: [
      'ศาลาวัดขนาดกลาง 5 คืน',
      'เมรุและฌาปนกิจ',
      'ดอกไม้ตกแต่งระดับกลาง',
      'พวงหรีด 3 พวง',
      'น้ำดื่ม-ขนม-กาแฟ + Snack Box',
      'โลงไม้สัก',
      'รถรับศพ VIP',
      'ของชำร่วย',
      'ดอกไม้จันทน์',
      'ช่างภาพ-วีดีโอ',
      'ทีมงาน 12-15 คน',
    ],
  },
  {
    id: 'legacy',
    name: 'The Legacy',
    nameTh: 'เดอะ เลกาซี่',
    tagline: 'เกียรติยศสืบสาน',
    description: 'งานใหญ่ สมเกียรติ สำหรับครอบครัวที่ต้องการความสมบูรณ์แบบ',
    icon: Crown,
    gradient: 'from-purple-900/80 to-purple-950/80',
    accent: '#c4b5fd',
    days: 7,
    maxGuests: 300,
    price: { min: 350000, max: 450000 },
    recommended: true,
    keywords: ['elegant', 'grand', 'passed', 'family'],
    includes: [
      'ศาลาแอร์ VIP 7 คืน',
      'เมรุ VIP พิเศษ',
      'ดอกไม้ Premium Design',
      'พวงหรีด 4 พวง',
      'เครื่องดื่ม + ขนม Premium + บุฟเฟต์',
      'โลงไม้สักทอง',
      'รถรับศพ VIP',
      'ของชำร่วย Premium',
      'ดอกไม้จันทน์',
      'ช่างภาพ-วีดีโอ Full Day',
      'โต๊ะจีน VIP',
      'ทีมงาน 15-20 คน',
    ],
  },
  {
    id: 'masterpiece',
    name: 'The Masterpiece',
    nameTh: 'เดอะ มาสเตอร์พีซ',
    tagline: 'ผลงานชิ้นเอก',
    description: 'งานระดับ Royal สำหรับผู้ที่ต้องการความเป็นเลิศในทุกรายละเอียด',
    icon: Gem,
    gradient: 'from-yellow-700/80 to-yellow-900/80',
    accent: '#fde047',
    days: 7,
    maxGuests: 500,
    price: { min: 800000, max: 1000000 },
    allInclusive: true,
    keywords: ['elegant', 'grand', 'personalized', 'celebration'],
    includes: [
      'ศาลาแอร์ Royal Suite 7+ คืน',
      'เมรุ Royal Design',
      'ดอกไม้ Signature Design',
      'พวงหรีด 5 พวง',
      'Premium Bar + Fine Dining + บุฟเฟต์',
      'โลง Custom Design',
      'รถรับศพ Luxury',
      'ของชำร่วย Luxury',
      'ดอกไม้จันทน์ Signature',
      'ช่างภาพ-วีดีโอ + Memorial Video',
      'Live Streaming',
      'หน้าอนุสรณ์ออนไลน์',
      'ทีมงาน 20-25 คน',
    ],
  },
];

// ==================== BRIEF QUESTIONS DATA ====================
const briefQuestions = [
  {
    id: 'who',
    question: 'คุณกำลังมองหาการออกแบบวาระสุดท้ายสำหรับใคร?',
    options: [
      {
        id: 'self',
        label: 'วางแผนล่วงหน้าสำหรับ "ตัวฉันเอง"',
        sublabel: 'Design My Own Legacy',
        description: 'สำหรับผู้ที่ต้องการทำ Pre-planning',
        icon: User,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&q=80',
      },
      {
        id: 'family',
        label: 'เตรียมการไว้สำหรับ "บุคคลสำคัญ"',
        sublabel: 'ที่ยังอยู่',
        description: 'สำหรับลูกหลานที่ต้องการเตรียมความพร้อม',
        icon: Heart,
        image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop&q=80',
      },
      {
        id: 'passed',
        label: 'จัดงานแด่ "ผู้ที่เพิ่งจากไป"',
        sublabel: 'ต้องการความช่วยเหลือทันที',
        description: 'ทีมงานพร้อมดูแลคุณอย่างเร่งด่วน',
        icon: Clock,
        image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop&q=80',
        urgent: true,
      },
    ],
  },
  {
    id: 'style',
    question: 'คุณอยากให้บรรยากาศงานออกมาในรูปแบบใด?',
    options: [
      {
        id: 'minimalist',
        label: 'Minimalist & Serene',
        sublabel: 'เรียบง่าย สงบ นิรันดร์',
        description: 'โทนสีขาว/ครีม/ไม้ ความรู้สึกเบาสบาย',
        icon: Home,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&q=80',
      },
      {
        id: 'elegant',
        label: 'Elegant & Timeless',
        sublabel: 'หรูหรา สง่างาม สมเกียรติ',
        description: 'โทนสีดำ/ทอง ทรงพลังและน่าเคารพ',
        icon: Crown,
        image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop&q=80',
      },
      {
        id: 'botanical',
        label: 'Botanical & Natural',
        sublabel: 'ธรรมชาติ สวนดอกไม้',
        description: 'ดอกไม้สด ใบไม้เขียว คืนสู่ธรรมชาติ',
        icon: Leaf,
        image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=300&fit=crop&q=80',
      },
      {
        id: 'personalized',
        label: 'Personalized Story',
        sublabel: 'เรื่องราวชีวิตและตัวตน',
        description: 'นำของรัก งานอดิเรก มาเป็นธีม',
        icon: Palette,
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&h=300&fit=crop&q=80',
      },
    ],
  },
  {
    id: 'mood',
    question: 'คุณอยากให้แขกรู้สึกอย่างไรเมื่อมาร่วมงาน?',
    options: [
      {
        id: 'warm',
        label: '"อบอุ่น"',
        sublabel: 'Warm & Intimate',
        description: 'รวมญาติ พูดคุยรำลึกความหลัง',
        icon: Heart,
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop&q=80',
      },
      {
        id: 'peaceful',
        label: '"สงบสว่าง"',
        sublabel: 'Peaceful & Zen',
        description: 'เงียบสงบ ใคร่ครวญไว้อาลัย',
        icon: Sun,
        image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400&h=300&fit=crop&q=80',
      },
      {
        id: 'grand',
        label: '"สมเกียรติยศ"',
        sublabel: 'Grand & Formal',
        description: 'พิธีการเป๊ะ สง่างาม เชิดชูเกียรติ',
        icon: Award,
        image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop&q=80',
      },
      {
        id: 'celebration',
        label: '"รำลึกถึงที่งดงาม"',
        sublabel: 'Celebration of Life',
        description: 'ขอบคุณช่วงเวลาดีๆ รอยยิ้มแห่งความทรงจำ',
        icon: Star,
        image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop&q=80',
      },
    ],
  },
];

const formatPrice = (price: number) => new Intl.NumberFormat('th-TH').format(price);

// ==================== RECOMMENDATION LOGIC ====================
const getRecommendedPackage = (answers: BriefAnswer) => {
  let scores: Record<string, number> = {
    memoir: 0,
    narrative: 0,
    legacy: 0,
    masterpiece: 0,
  };

  packages.forEach(pkg => {
    if (pkg.keywords.includes(answers.who)) scores[pkg.id] += 3;
    if (pkg.keywords.includes(answers.style)) scores[pkg.id] += 2;
    if (pkg.keywords.includes(answers.mood)) scores[pkg.id] += 2;
  });

  if (answers.who === 'passed') {
    scores.legacy += 2;
    scores.masterpiece += 1;
  }
  if (answers.style === 'elegant' && answers.mood === 'grand') {
    scores.masterpiece += 3;
    scores.legacy += 2;
  }
  if (answers.style === 'minimalist' && answers.mood === 'peaceful') {
    scores.memoir += 3;
  }
  if (answers.style === 'personalized' || answers.mood === 'celebration') {
    scores.narrative += 2;
    scores.masterpiece += 1;
  }

  const maxScore = Math.max(...Object.values(scores));
  const recommended = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] || 'legacy';
  
  return packages.find(p => p.id === recommended) || packages[2];
};

// ==================== CLEAN LUXURY BACKGROUND ====================
const LuxuryBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    {/* Solid dark base */}
    <div className="absolute inset-0 bg-[#0a0a0a]" />
    
    {/* Subtle gradient overlay - very soft */}
    <div className="absolute inset-0 bg-gradient-to-b from-amber-950/20 via-transparent to-transparent" />
    
    {/* Soft radial glow in center-top */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(180,140,80,0.08)_0%,_transparent_70%)]" />
    
    {/* Very subtle vignette */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(0,0,0,0.5)_100%)]" />
    
    {/* Single elegant line at top */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-amber-700/40 to-transparent" />
  </div>
);

// ==================== MAIN COMPONENT ====================
export default function ServiceSelector({ onClose }: ServiceSelectorProps) {
  const [mode, setMode] = useState<'select' | 'package' | 'quiz' | 'recommendation' | 'contact'>('select');
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [packageStep, setPackageStep] = useState<'list' | 'detail'>('list');
  const [quizStep, setQuizStep] = useState(0);
  const [showIncludes, setShowIncludes] = useState(false);
  const [recommendedPkg, setRecommendedPkg] = useState<typeof packages[0] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [briefAnswers, setBriefAnswers] = useState<BriefAnswer>({
    who: '',
    style: '',
    mood: '',
  });

  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    line: '',
    note: '',
  });

  const selectedPkg = packages.find(p => p.id === selectedPackageId);
  const currentQuestion = briefQuestions[quizStep];

  useEffect(() => {
    if (briefAnswers.who && briefAnswers.style && briefAnswers.mood && mode === 'quiz' && quizStep === 3) {
      setIsProcessing(true);
      setTimeout(() => {
        const recommended = getRecommendedPackage(briefAnswers);
        setRecommendedPkg(recommended);
        setIsProcessing(false);
        setMode('recommendation');
      }, 1500);
    }
  }, [briefAnswers, mode, quizStep]);

  const handleReset = () => {
    setMode('select');
    setSelectedPackageId(null);
    setPackageStep('list');
    setQuizStep(0);
    setBriefAnswers({ who: '', style: '', mood: '' });
    setRecommendedPkg(null);
  };

  const handleQuizAnswer = (questionId: string, answerId: string) => {
    setBriefAnswers({ ...briefAnswers, [questionId]: answerId });
    setTimeout(() => {
      if (quizStep < 2) {
        setQuizStep(quizStep + 1);
      } else {
        setQuizStep(3);
      }
    }, 200);
  };

  const handleSelectPackage = (pkgId: string) => {
    setSelectedPackageId(pkgId);
    setPackageStep('detail');
  };

  const handleSubmit = () => {
    console.log('Submitted:', {
      mode,
      package: selectedPackageId || recommendedPkg?.id,
      answers: briefAnswers,
      contact: contactForm,
    });
    setShowSuccess(true);
  };

  const handleSkipToContact = () => {
    setMode('contact');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 overflow-auto">
      <LuxuryBackground />
      
      {/* Close Button */}
      {onClose && (
        <button onClick={onClose} className="fixed top-6 right-6 z-50 p-2 rounded-full hover:bg-white/5 transition-colors">
          <X className="w-5 h-5 text-white/50 hover:text-white/80" />
        </button>
      )}

      {/* Content */}
      <div className="relative min-h-screen text-white">
        <div className="max-w-xl mx-auto px-6 py-16">
          
          {/* ==================== MODE SELECTION ==================== */}
          {mode === 'select' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
              {/* Header */}
              <div className="text-center">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-amber-600/80 text-xs tracking-[0.4em] uppercase mb-4"
                >
                  Sasan
                </motion.p>
                <h1 className="text-3xl md:text-4xl font-serif font-light text-white mb-4">
                  The Last Chapter
                </h1>
                <p className="text-white/40 text-sm font-light">ออกแบบบทสุดท้ายที่งดงาม</p>
              </div>

              {/* Options */}
              <div className="space-y-4">
                {/* Signature Collection */}
                <motion.button 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.01 }} 
                  onClick={() => setMode('package')} 
                  className="w-full group p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-amber-800/30 transition-all text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-800/30 to-amber-900/30 flex items-center justify-center">
                      <Package className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white mb-1">Signature Collection</h3>
                      <p className="text-amber-600/70 text-sm mb-2">แพ็คเกจที่คัดสรรแล้ว</p>
                      <p className="text-white/40 text-sm font-light">
                        เลือกจากคอลเลคชันที่ออกแบบไว้ ครบจบในที่เดียว
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.button>

                {/* Personalized Quiz */}
                <motion.button 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.01 }} 
                  onClick={() => setMode('quiz')} 
                  className="w-full group p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-purple-800/30 transition-all text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-800/30 to-purple-900/30 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white mb-1">Personalized Design</h3>
                      <p className="text-purple-400/70 text-sm mb-2">ค้นหาแพ็คเกจที่ใช่สำหรับคุณ</p>
                      <p className="text-white/40 text-sm font-light">
                        ตอบ 3 คำถาม ระบบจะแนะนำแพ็คเกจที่เหมาะกับคุณ
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ==================== PACKAGE LIST ==================== */}
          {mode === 'package' && packageStep === 'list' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="flex items-center gap-4">
                <button onClick={handleReset} className="p-2 -ml-2 rounded-lg hover:bg-white/5 transition-colors">
                  <ChevronLeft className="w-5 h-5 text-white/40" />
                </button>
                <div>
                  <h2 className="text-xl font-medium">Signature Collection</h2>
                  <p className="text-white/40 text-sm font-light">เลือกคอลเลคชันที่เหมาะกับคุณ</p>
                </div>
              </div>

              <div className="space-y-3">
                {packages.map((pkg, index) => {
                  const Icon = pkg.icon;
                  return (
                    <motion.button 
                      key={pkg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01 }} 
                      onClick={() => handleSelectPackage(pkg.id)} 
                      className={`w-full relative p-5 rounded-xl text-left transition-all border ${
                        pkg.recommended 
                          ? 'border-amber-500/30 bg-amber-900/10 hover:bg-amber-900/20' 
                          : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${pkg.gradient} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5" style={{ color: pkg.accent }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-medium">{pkg.name}</h3>
                            <span className="text-white/30 text-sm">{pkg.nameTh}</span>
                            {pkg.recommended && (
                              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5" />
                                แนะนำ
                              </span>
                            )}
                          </div>
                          <p className="text-sm mb-2" style={{ color: pkg.accent }}>{pkg.tagline}</p>
                          <div className="flex items-center gap-3 text-xs text-white/40">
                            <span>{pkg.days} วัน</span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span>รองรับ {pkg.maxGuests} คน</span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="font-medium" style={{ color: pkg.accent }}>
                            ฿{formatPrice(pkg.price.min)}
                          </div>
                          <div className="text-xs text-white/30">เริ่มต้น</div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ==================== PACKAGE DETAIL ==================== */}
          {mode === 'package' && packageStep === 'detail' && selectedPkg && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="flex items-center gap-4">
                <button onClick={() => setPackageStep('list')} className="p-2 -ml-2 rounded-lg hover:bg-white/5">
                  <ChevronLeft className="w-5 h-5 text-white/40" />
                </button>
                <div>
                  <h2 className="text-xl font-medium">{selectedPkg.name}</h2>
                  <p className="text-white/40 text-sm">{selectedPkg.nameTh}</p>
                </div>
              </div>

              {/* Package Stats */}
              <div className={`p-5 rounded-xl bg-gradient-to-br ${selectedPkg.gradient} border border-white/10`}>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-light" style={{ color: selectedPkg.accent }}>{selectedPkg.days}</p>
                    <p className="text-xs text-white/50">วัน</p>
                  </div>
                  <div>
                    <p className="text-2xl font-light" style={{ color: selectedPkg.accent }}>{selectedPkg.maxGuests}</p>
                    <p className="text-xs text-white/50">คน</p>
                  </div>
                  <div>
                    <p className="text-lg font-light" style={{ color: selectedPkg.accent }}>฿{formatPrice(selectedPkg.price.min)}</p>
                    <p className="text-xs text-white/50">เริ่มต้น</p>
                  </div>
                </div>
              </div>

              {/* Includes */}
              <div className="rounded-xl border border-white/10 overflow-hidden">
                <button onClick={() => setShowIncludes(!showIncludes)} className="w-full p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                  <span className="text-sm flex items-center gap-2 text-white/70">
                    <Check className="w-4 h-4 text-green-500/70" />รายการที่รวมในแพ็คเกจ
                  </span>
                  {showIncludes ? <ChevronUp className="w-4 h-4 text-white/30" /> : <ChevronDown className="w-4 h-4 text-white/30" />}
                </button>
                <AnimatePresence>
                  {showIncludes && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="px-4 pb-4 grid grid-cols-1 gap-2 text-sm text-white/50">
                        {selectedPkg.includes.map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-green-600/60">✓</span>{item}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Contact Form */}
              <div className="space-y-4 pt-2">
                <p className="text-sm text-white/40">ข้อมูลติดต่อกลับ</p>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-amber-700/50 focus:outline-none text-white placeholder-white/25 transition-colors"
                  placeholder="ชื่อ *"
                />
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-amber-700/50 focus:outline-none text-white placeholder-white/25 transition-colors"
                  placeholder="เบอร์โทรศัพท์ *"
                />
                <input
                  type="text"
                  value={contactForm.line}
                  onChange={(e) => setContactForm({ ...contactForm, line: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-amber-700/50 focus:outline-none text-white placeholder-white/25 transition-colors"
                  placeholder="LINE ID (ถ้ามี)"
                />
                <textarea
                  value={contactForm.note}
                  onChange={(e) => setContactForm({ ...contactForm, note: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-amber-700/50 focus:outline-none text-white placeholder-white/25 resize-none transition-colors"
                  rows={3}
                  placeholder="หมายเหตุเพิ่มเติม"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!contactForm.name || !contactForm.phone}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 text-white font-medium hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ส่งข้อมูล
              </button>
            </motion.div>
          )}

          {/* ==================== QUIZ MODE ==================== */}
          {mode === 'quiz' && quizStep < 3 && currentQuestion && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="flex items-center justify-between">
                <button onClick={() => { if (quizStep > 0) setQuizStep(quizStep - 1); else handleReset(); }} className="p-2 -ml-2 rounded-lg hover:bg-white/5">
                  <ChevronLeft className="w-5 h-5 text-white/40" />
                </button>
                <p className="text-white/30 text-sm">คำถามที่ {quizStep + 1} จาก 3</p>
                <button onClick={handleSkipToContact} className="text-sm text-white/30 hover:text-white/50 transition-colors px-2 py-1">
                  ข้าม
                </button>
              </div>

              {/* Progress */}
              <div className="flex gap-2">
                {[0, 1, 2].map(i => (
                  <div key={i} className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${i <= quizStep ? 'bg-purple-500' : 'bg-white/10'}`} />
                ))}
              </div>

              {/* Question */}
              <div>
                <h2 className="text-xl font-medium leading-relaxed">{currentQuestion.question}</h2>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = briefAnswers[currentQuestion.id as keyof BriefAnswer] === option.id;
                  const Icon = option.icon;
                  return (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => handleQuizAnswer(currentQuestion.id, option.id)}
                      className={`w-full relative overflow-hidden rounded-xl text-left transition-all border ${
                        isSelected 
                          ? 'border-purple-500/50 ring-1 ring-purple-500/30' 
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        <img 
                          src={option.image} 
                          alt="" 
                          className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 transition-all ${
                          isSelected 
                            ? 'bg-gradient-to-r from-purple-900/90 via-purple-900/80 to-purple-900/60' 
                            : 'bg-gradient-to-r from-black/90 via-black/80 to-black/60'
                        }`} />
                      </div>
                      
                      {/* Content */}
                      <div className="relative p-4">
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors backdrop-blur-sm ${
                            isSelected ? 'bg-purple-500/30' : 'bg-white/10'
                          }`}>
                            <Icon className={`w-5 h-5 transition-colors ${isSelected ? 'text-purple-300' : 'text-white/70'}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium text-sm ${isSelected ? 'text-white' : 'text-white/90'}`}>{option.label}</p>
                            <p className={`text-xs mt-0.5 ${isSelected ? 'text-purple-300' : 'text-purple-400/80'}`}>{option.sublabel}</p>
                            <p className="text-xs text-white/50 mt-1">{option.description}</p>
                            {option.urgent && (
                              <p className="text-xs text-amber-400 mt-2 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> ติดต่อกลับภายใน 1 ชั่วโมง
                              </p>
                            )}
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ==================== PROCESSING ==================== */}
          {mode === 'quiz' && quizStep === 3 && isProcessing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 rounded-full border-2 border-purple-500/20 border-t-purple-500 mb-6"
              />
              <p className="text-white/40 text-sm">กำลังวิเคราะห์...</p>
            </motion.div>
          )}

          {/* ==================== RECOMMENDATION ==================== */}
          {mode === 'recommendation' && recommendedPkg && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4"
                >
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </motion.div>
                <h2 className="text-xl font-medium mb-2">แพ็คเกจที่เหมาะกับคุณ</h2>
                <p className="text-white/40 text-sm">จากคำตอบของคุณ เราแนะนำ</p>
              </div>

              {/* Recommended Package Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`p-6 rounded-xl bg-gradient-to-br ${recommendedPkg.gradient} border border-white/10`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                    <recommendedPkg.icon className="w-6 h-6" style={{ color: recommendedPkg.accent }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{recommendedPkg.name}</h3>
                    <p className="text-white/50 text-sm">{recommendedPkg.nameTh}</p>
                    <p className="text-sm mt-1" style={{ color: recommendedPkg.accent }}>{recommendedPkg.tagline}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-white/50">
                    <span>{recommendedPkg.days} วัน</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span>รองรับ {recommendedPkg.maxGuests} คน</span>
                  </div>
                  <div className="text-lg font-medium" style={{ color: recommendedPkg.accent }}>
                    ฿{formatPrice(recommendedPkg.price.min)}+
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <div className="space-y-4">
                <p className="text-sm text-white/40">กรอกข้อมูลเพื่อรับข้อเสนอพิเศษ</p>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-purple-500/50 focus:outline-none text-white placeholder-white/25"
                  placeholder="ชื่อ *"
                />
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-purple-500/50 focus:outline-none text-white placeholder-white/25"
                  placeholder="เบอร์โทรศัพท์ *"
                />
                <textarea
                  value={contactForm.note}
                  onChange={(e) => setContactForm({ ...contactForm, note: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-purple-500/50 focus:outline-none text-white placeholder-white/25 resize-none"
                  rows={3}
                  placeholder="งบประมาณ, จำนวนแขก, หมายเหตุ"
                />
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleSubmit}
                  disabled={!contactForm.name || !contactForm.phone}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium hover:from-purple-500 hover:to-purple-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  รับข้อเสนอพิเศษ
                </button>
                <button
                  onClick={handleSkipToContact}
                  className="w-full py-3 text-white/30 hover:text-white/50 text-sm transition-colors"
                >
                  ต้องการให้พนักงานติดต่อกลับแทน
                </button>
              </div>
            </motion.div>
          )}

          {/* ==================== CONTACT ONLY (Skip) ==================== */}
          {mode === 'contact' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="flex items-center gap-4">
                <button onClick={handleReset} className="p-2 -ml-2 rounded-lg hover:bg-white/5">
                  <ChevronLeft className="w-5 h-5 text-white/40" />
                </button>
                <div>
                  <h2 className="text-xl font-medium">ติดต่อเรา</h2>
                  <p className="text-white/40 text-sm">ทีมงานจะติดต่อกลับเพื่อออกแบบงานตามความต้องการ</p>
                </div>
              </div>

              {/* Summary if has answers */}
              {briefAnswers.who && (
                <div className="p-4 rounded-xl bg-purple-900/10 border border-purple-500/20">
                  <p className="text-sm text-purple-400/80 mb-3">ความต้องการของคุณ</p>
                  <div className="space-y-1 text-sm text-white/50">
                    {briefAnswers.who && <p>• {briefQuestions[0].options.find(o => o.id === briefAnswers.who)?.label}</p>}
                    {briefAnswers.style && <p>• {briefQuestions[1].options.find(o => o.id === briefAnswers.style)?.label}</p>}
                    {briefAnswers.mood && <p>• {briefQuestions[2].options.find(o => o.id === briefAnswers.mood)?.label}</p>}
                  </div>
                </div>
              )}

              {/* Urgent Notice */}
              {briefAnswers.who === 'passed' && (
                <div className="p-4 rounded-xl bg-amber-900/10 border border-amber-500/20">
                  <p className="text-sm text-amber-400/80 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    ทีมงานจะติดต่อกลับภายใน 1 ชั่วโมง
                  </p>
                </div>
              )}

              {/* Contact Form */}
              <div className="space-y-4">
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-purple-500/50 focus:outline-none text-white placeholder-white/25"
                  placeholder="ชื่อ *"
                />
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-purple-500/50 focus:outline-none text-white placeholder-white/25"
                  placeholder="เบอร์โทรศัพท์ *"
                />
                <input
                  type="text"
                  value={contactForm.line}
                  onChange={(e) => setContactForm({ ...contactForm, line: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-purple-500/50 focus:outline-none text-white placeholder-white/25"
                  placeholder="LINE ID"
                />
                <textarea
                  value={contactForm.note}
                  onChange={(e) => setContactForm({ ...contactForm, note: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-purple-500/50 focus:outline-none text-white placeholder-white/25 resize-none"
                  rows={4}
                  placeholder="รายละเอียดที่ต้องการ เช่น งบประมาณ จำนวนแขก สถานที่ ฯลฯ"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!contactForm.name || !contactForm.phone}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium hover:from-purple-500 hover:to-purple-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ส่งข้อมูล
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* ==================== SUCCESS MODAL ==================== */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/95 flex items-center justify-center p-6 z-50">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-[#111] rounded-2xl p-8 max-w-sm w-full border border-white/10 text-center">
              <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                <Check className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">ขอบคุณค่ะ</h3>
              <p className="text-white/50 text-sm mb-8">
                {briefAnswers.who === 'passed'
                  ? 'ทีมงานจะติดต่อกลับภายใน 1 ชั่วโมง'
                  : 'ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง'}
              </p>
              <div className="space-y-3">
                <a href="tel:0812345678" className="w-full py-3 rounded-xl bg-amber-700 text-white font-medium flex items-center justify-center gap-2 hover:bg-amber-600 transition-colors">
                  <Phone className="w-4 h-4" />โทรหาเราเลย
                </a>
                <a href="https://line.me/ti/p/@sasan" target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-xl bg-green-600 text-white font-medium flex items-center justify-center gap-2 hover:bg-green-500 transition-colors">
                  <MessageCircle className="w-4 h-4" />LINE: @sasan
                </a>
              </div>
              <button onClick={() => { setShowSuccess(false); handleReset(); }} className="w-full mt-6 py-2 text-white/30 hover:text-white/50 text-sm">
                ปิด
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
