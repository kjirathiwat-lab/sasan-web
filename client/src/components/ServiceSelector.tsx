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
    refImage: '/package-gallery/TheM01.png',
    gallery: [
      '/package-gallery/TheM01.png',
      '/package-gallery/TheM02.png',
      '/package-gallery/TheM03.png',
    ],
    defaultCoffin: 'standard',
    defaultFlower: 'minimal',
    includes: [
      'ศาลาวัดขนาดเล็ก 3 คืน',
      'เมรุและฌาปนกิจ',
      'ดอกไม้ตกแต่งพื้นฐาน',
      'น้ำดื่ม-ขนม-กาแฟ',
      'โลงศพไม้ธรรมดา',
      'รถรับศพ',
      'ของชำร่วย 100 ชุด',
      'ดอกไม้จันทน์ 100 ดอก',
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
    refImage: '/package-gallery/TheN01.png',
    gallery: [
      '/package-gallery/TheN01.png',
      '/package-gallery/TheN02.png',
      '/package-gallery/TheN03.png',
    ],
    defaultCoffin: 'teak',
    defaultFlower: 'classic',
    includes: [
      'ศาลาวัดขนาดกลาง 5 คืน',
      'เมรุและฌาปนกิจ',
      'ดอกไม้ตกแต่งระดับกลาง',
      'พวงหรีด 3 พวง',
      'น้ำดื่ม-ขนม-กาแฟ + Snack Box 100 กล่อง',
      'โลงไม้สัก',
      'รถรับศพ VIP',
      'ของชำร่วย 200 ชุด',
      'ดอกไม้จันทน์ 150 ดอก',
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
    refImage: '/package-gallery/TheL01.png',
    gallery: [
      '/package-gallery/TheL01.png',
      '/package-gallery/TheL02.png',
      '/package-gallery/TheL03.png',
    ],
    defaultCoffin: 'teakGold',
    defaultFlower: 'premium',
    includes: [
      'ศาลาแอร์ VIP 7 คืน',
      'เมรุ VIP พิเศษ',
      'ดอกไม้ Premium Design',
      'พวงหรีด 4 พวง',
      'เครื่องดื่ม + ขนม Premium + บุฟเฟต์',
      'โลงไม้สักทอง',
      'รถรับศพ VIP',
      'ของชำร่วย Premium 400 ชุด',
      'ดอกไม้จันทน์ 300 ดอก',
      'ช่างภาพ-วีดีโอ Full HD + Drone',
      'โต๊ะจีน VIP 2 โต๊ะ',
      'MC พิธีกร',
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
    refImage: 'package-gallery/TheMP01.png',
    gallery: [
      '/package-gallery/TheMP01.png',
      '/package-gallery/TheMP02.png',
      '/package-gallery/TheMP03.png',
    ],
    defaultCoffin: 'crystal',
    defaultFlower: 'luxury',
    includes: [
      'ศาลาแอร์ Royal Suite 7+ คืน (วัดดัง)',
      'เมรุ Royal Design',
      'ดอกไม้ Luxury Signature Design',
      'พวงหรีด 5+ พวง',
      'Premium Bar + Fine Dining + บุฟเฟต์หรู',
      'โลง Crystal / Custom Design',
      'รถรับศพ Luxury',
      'ของชำร่วย Luxury 500+ ชุด',
      'ดอกไม้จันทน์ Signature 500+ ดอก',
      'ช่างภาพ-วีดีโอ 4K + Drone + Memorial Video',
      'โต๊ะจีน VIP 3 โต๊ะ',
      'Live Streaming',
      'หน้าอนุสรณ์ออนไลน์',
      'Personal Funeral Director',
      'ทีมงาน 20-25 คน',
      '** รวมทุก Add-ons แล้ว **',
    ],
  },
];

// ==================== ADD-ONS DATA ====================
const coffinOptions = [
  {
    id: 'standard',
    name: 'โลงไม้ธรรมดา',
    description: 'โลงไม้มาตรฐาน เรียบง่าย สวยงาม',
    price: 0, // รวมในแพ็คเกจ
    image: '/Coffin/1.png',
    includedIn: ['memoir'],
  },
  {
    id: 'teak',
    name: 'โลงไม้สัก',
    description: 'โลงไม้สักแท้ คุณภาพดี ทนทาน',
    price: 15000,
    image: '/Coffin/2.png',
    includedIn: ['narrative'],
  },
  {
    id: 'teakGold',
    name: 'โลงไม้สักทอง',
    description: 'โลงไม้สักทองแท้ ลวดลายสวยงาม หรูหรา',
    price: 35000,
    image: '/Coffin/3.jpg',
    includedIn: ['legacy'],
  },
  {
    id: 'stainless',
    name: 'โลงสแตนเลส',
    description: 'โลงสแตนเลสพรีเมียม ทันสมัย',
    price: 45000,
    image: '/Coffin/4.jpg',
    includedIn: [],
  },
  {
    id: 'crystal',
    name: 'โลง Crystal / Custom',
    description: 'โลงคริสตัลหรือออกแบบพิเศษตามต้องการ',
    price: 80000,
    image: '/Coffin/5.jpg',
    includedIn: ['masterpiece'],
  },
];

const flowerThemes = [
  {
    id: 'minimal',
    name: 'Minimal White',
    description: 'โทนขาว เรียบง่าย สงบ',
    price: 0,
    image: '/Flower C.png',
    includedIn: ['memoir'],
  },
  {
    id: 'classic',
    name: 'Classic Elegance',
    description: 'โทนขาว-เหลือง คลาสสิก',
    price: 8000,
    image: '/Flower F.png',
    includedIn: ['narrative'],
  },
  {
    id: 'premium',
    name: 'Premium Gold',
    description: 'โทนทอง-ขาว หรูหรา สง่างาม',
    price: 20000,
    image: '/Flower G.png',
    includedIn: ['legacy'],
  },
  {
    id: 'botanical',
    name: 'Botanical Garden',
    description: 'สวนดอกไม้ ธรรมชาติ สดใส',
    price: 25000,
    image: '/Flower D.png',
    includedIn: [],
  },
  {
    id: 'luxury',
    name: 'Luxury Signature',
    description: 'ออกแบบพิเศษโดยดีไซเนอร์',
    price: 50000,
    image: '/Flower R.png',
    includedIn: ['masterpiece'],
  },
];

const extraServices = [
  {
    id: 'mc',
    name: 'MC / พิธีกร',
    description: 'พิธีกรมืออาชีพดำเนินพิธี',
    price: 15000,
    includedIn: ['legacy', 'masterpiece'],
  },
  {
    id: 'liveStream',
    name: 'Live Streaming',
    description: 'ถ่ายทอดสดพิธีผ่าน Facebook/YouTube',
    price: 12000,
    includedIn: ['masterpiece'],
  },
  {
    id: 'memorial',
    name: 'Memorial Video',
    description: 'วิดีโอรวมภาพความทรงจำ 3-5 นาที',
    price: 8000,
    includedIn: ['masterpiece'],
  },
  {
    id: 'drone',
    name: 'ถ่ายภาพ Drone',
    description: 'ถ่ายภาพมุมสูงด้วย Drone',
    price: 5000,
    includedIn: ['legacy', 'masterpiece'],
  },
  {
    id: 'catering',
    name: 'Catering บุฟเฟต์',
    description: 'บุฟเฟต์อาหารวันเผา 50 ท่าน',
    price: 25000,
    includedIn: ['legacy', 'masterpiece'],
  },
  {
    id: 'chineseTable',
    name: 'โต๊ะจีน VIP',
    description: 'โต๊ะจีน 10 ท่าน/โต๊ะ',
    price: 8000,
    includedIn: [],
  },
  {
    id: 'onlineMemorial',
    name: 'หน้าอนุสรณ์ออนไลน์',
    description: 'เว็บไซต์อนุสรณ์ถาวร พร้อม QR Code',
    price: 5000,
    includedIn: ['masterpiece'],
  },
  {
    id: 'extraFlower',
    name: 'ดอกไม้จันทน์เพิ่ม 100 ดอก',
    description: 'ดอกไม้จันทน์เพิ่มเติม',
    price: 3000,
    includedIn: [],
  },
  {
    id: 'extraSouvenir',
    name: 'ของชำร่วยเพิ่ม 100 ชุด',
    description: 'ของชำร่วยพรีเมียมเพิ่มเติม',
    price: 5000,
    includedIn: [],
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
        image: '/quiz-images/Q1A.png',
      },
      {
        id: 'family',
        label: 'เตรียมการไว้สำหรับ "บุคคลสำคัญ"',
        sublabel: 'ที่ยังอยู่',
        description: 'สำหรับลูกหลานที่ต้องการเตรียมความพร้อม',
        icon: Heart,
        image: '/quiz-images/Q1B.png',
      },
      {
        id: 'passed',
        label: 'จัดงานแด่ "ผู้ที่เพิ่งจากไป"',
        sublabel: 'ต้องการความช่วยเหลือทันที',
        description: 'ทีมงานพร้อมดูแลคุณอย่างเร่งด่วน',
        icon: Clock,
        image: '/quiz-images/Q1C.png',
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
        image: '/quiz-images/Q2A.png',
      },
      {
        id: 'elegant',
        label: 'Elegant & Timeless',
        sublabel: 'หรูหรา สง่างาม สมเกียรติ',
        description: 'โทนสีดำ/ทอง ทรงพลังและน่าเคารพ',
        icon: Crown,
        image: '/quiz-images/Q2B.png',
      },
      {
        id: 'botanical',
        label: 'Botanical & Natural',
        sublabel: 'ธรรมชาติ สวนดอกไม้',
        description: 'ดอกไม้สด ใบไม้เขียว คืนสู่ธรรมชาติ',
        icon: Leaf,
        image: '/quiz-images/Q2C.png',
      },
      {
        id: 'personalized',
        label: 'Personalized Story',
        sublabel: 'เรื่องราวชีวิตและตัวตน',
        description: 'นำของรัก งานอดิเรก มาเป็นธีม',
        icon: Palette,
        image: '/quiz-images/Q2D.png',
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
        image: '/quiz-images/Q3A.png',
      },
      {
        id: 'peaceful',
        label: '"สงบสว่าง"',
        sublabel: 'Peaceful & Zen',
        description: 'เงียบสงบ ใคร่ครวญไว้อาลัย',
        icon: Sun,
        image: '/quiz-images/Q3B.png',
      },
      {
        id: 'grand',
        label: '"สมเกียรติยศ"',
        sublabel: 'Grand & Formal',
        description: 'พิธีการเป๊ะ สง่างาม เชิดชูเกียรติ',
        icon: Award,
        image: '/quiz-images/Q3C.png',
      },
      {
        id: 'celebration',
        label: '"รำลึกถึงที่งดงาม"',
        sublabel: 'Celebration of Life',
        description: 'ขอบคุณช่วงเวลาดีๆ รอยยิ้มแห่งความทรงจำ',
        icon: Star,
        image: '/quiz-images/Q3D.png',
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
  const [packageStep, setPackageStep] = useState<'list' | 'detail' | 'customize'>('list');
  const [quizStep, setQuizStep] = useState(0);
  const [showIncludes, setShowIncludes] = useState(false);
  const [recommendedPkg, setRecommendedPkg] = useState<typeof packages[0] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Gallery state for recommendation
  const [recGalleryIndex, setRecGalleryIndex] = useState(0);

  // Add-ons state
  const [selectedCoffin, setSelectedCoffin] = useState<string>('');
  const [selectedFlower, setSelectedFlower] = useState<string>('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

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

  // Calculate add-on prices
  const calculateAddOnPrice = () => {
    if (!selectedPkg || selectedPkg.allInclusive) return 0;
    
    let addOnTotal = 0;
    
    // Coffin upgrade
    const coffin = coffinOptions.find(c => c.id === selectedCoffin);
    if (coffin && !coffin.includedIn.includes(selectedPkg.id)) {
      addOnTotal += coffin.price;
    }
    
    // Flower upgrade
    const flower = flowerThemes.find(f => f.id === selectedFlower);
    if (flower && !flower.includedIn.includes(selectedPkg.id)) {
      addOnTotal += flower.price;
    }
    
    // Extra services
    selectedExtras.forEach(extraId => {
      const extra = extraServices.find(e => e.id === extraId);
      if (extra && !extra.includedIn.includes(selectedPkg.id)) {
        addOnTotal += extra.price;
      }
    });
    
    return addOnTotal;
  };

  const totalPrice = selectedPkg ? selectedPkg.price.min + calculateAddOnPrice() : 0;

  // Loading effect when modal opens
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Set default add-ons when package is selected
  useEffect(() => {
    if (selectedPkg) {
      setSelectedCoffin(selectedPkg.defaultCoffin);
      setSelectedFlower(selectedPkg.defaultFlower);
      // Pre-select included extras
      const includedExtras = extraServices
        .filter(e => e.includedIn.includes(selectedPkg.id))
        .map(e => e.id);
      setSelectedExtras(includedExtras);
    }
  }, [selectedPkg]);

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
    setSelectedCoffin('');
    setSelectedFlower('');
    setSelectedExtras([]);
  };

  const toggleExtra = (extraId: string) => {
    if (selectedExtras.includes(extraId)) {
      setSelectedExtras(selectedExtras.filter(e => e !== extraId));
    } else {
      setSelectedExtras([...selectedExtras, extraId]);
    }
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

      {/* Loading State */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-full border-2 border-amber-500/20 border-t-amber-500 mx-auto mb-4"
            />
            <p className="text-white/40 text-sm">กำลังโหลด...</p>
          </motion.div>
        </div>
      )}

      {/* Content */}
      <div className={`relative min-h-screen text-white transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
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
                      <div className="flex gap-2 mt-3">
                        <span className="text-[10px] bg-white/10 text-white/50 px-2 py-1 rounded">4 แพ็คเกจ</span>
                        <span className="text-[10px] bg-white/10 text-white/50 px-2 py-1 rounded">฿45K - ฿1M</span>
                      </div>
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
                  className="w-full group p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-purple-800/30 transition-all text-left relative overflow-hidden"
                >
                  {/* Teaser badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-[10px]">
                    <Clock className="w-3 h-3" />
                    <span>30 วินาที</span>
                  </div>
                  
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
                      {/* Teaser preview */}
                      <div className="mt-3 p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                        <p className="text-purple-300/80 text-xs">✨ ค้นพบแพ็คเกจที่ใช่ในเวลาไม่ถึงนาที</p>
                        <div className="flex gap-1 mt-2">
                          {['🎯 ตรงใจ', '💰 ตรงงบ', '🎨 ตรงสไตล์'].map((item, i) => (
                            <span key={i} className="text-[10px] text-white/40">{item}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-purple-400 group-hover:translate-x-1 transition-all mt-4" />
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

              {/* Reference Image */}
              <div className="relative rounded-xl overflow-hidden aspect-video">
                <img 
                  src={selectedPkg.refImage} 
                  alt={selectedPkg.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm" style={{ color: selectedPkg.accent }}>{selectedPkg.tagline}</p>
                  <p className="text-white/60 text-xs mt-1">{selectedPkg.description}</p>
                </div>
                {selectedPkg.allInclusive && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                    All Inclusive
                  </div>
                )}
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
                    <p className="text-lg font-light" style={{ color: selectedPkg.accent }}>฿{formatPrice(totalPrice)}</p>
                    <p className="text-xs text-white/50">
                      {calculateAddOnPrice() > 0 ? 'รวม Add-ons' : 'เริ่มต้น'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Includes */}
              <div className="rounded-xl border border-white/10 overflow-hidden">
                <button onClick={() => setShowIncludes(!showIncludes)} className="w-full p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                  <span className="text-sm flex items-center gap-2 text-white/70">
                    <Check className="w-4 h-4 text-green-500/70" />รายการที่รวมในแพ็คเกจ ({selectedPkg.includes.length} รายการ)
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

              {/* Customize Add-ons Button */}
              {!selectedPkg.allInclusive && (
                <button
                  onClick={() => setPackageStep('customize')}
                  className="w-full p-4 rounded-xl border border-dashed border-purple-500/30 bg-purple-900/10 hover:bg-purple-900/20 transition-colors text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-purple-300 font-medium">ปรับแต่ง Add-ons</p>
                        <p className="text-white/40 text-xs">เลือกโลงศพ, ธีมดอกไม้, บริการเสริม</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-purple-400/50" />
                  </div>
                  {calculateAddOnPrice() > 0 && (
                    <div className="mt-3 pt-3 border-t border-purple-500/20 flex items-center justify-between text-sm">
                      <span className="text-white/50">Add-ons ที่เลือก</span>
                      <span className="text-purple-300">+฿{formatPrice(calculateAddOnPrice())}</span>
                    </div>
                  )}
                </button>
              )}

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
                <textarea
                  value={contactForm.note}
                  onChange={(e) => setContactForm({ ...contactForm, note: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-amber-700/50 focus:outline-none text-white placeholder-white/25 resize-none transition-colors"
                  rows={2}
                  placeholder="หมายเหตุเพิ่มเติม"
                />
              </div>

              {/* Summary & Submit */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/60">แพ็คเกจ {selectedPkg.name}</span>
                  <span className="text-white">฿{formatPrice(selectedPkg.price.min)}</span>
                </div>
                {calculateAddOnPrice() > 0 && (
                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span className="text-white/60">Add-ons</span>
                    <span className="text-purple-300">+฿{formatPrice(calculateAddOnPrice())}</span>
                  </div>
                )}
                <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                  <span className="text-white font-medium">รวมประมาณ</span>
                  <span className="text-xl font-bold" style={{ color: selectedPkg.accent }}>฿{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!contactForm.name || !contactForm.phone}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 text-white font-medium hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ส่งข้อมูล • ฿{formatPrice(totalPrice)}
              </button>
            </motion.div>
          )}

          {/* ==================== CUSTOMIZE ADD-ONS ==================== */}
          {mode === 'package' && packageStep === 'customize' && selectedPkg && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="flex items-center gap-4">
                <button onClick={() => setPackageStep('detail')} className="p-2 -ml-2 rounded-lg hover:bg-white/5">
                  <ChevronLeft className="w-5 h-5 text-white/40" />
                </button>
                <div>
                  <h2 className="text-xl font-medium">ปรับแต่ง Add-ons</h2>
                  <p className="text-white/40 text-sm">{selectedPkg.name}</p>
                </div>
              </div>

              {/* Coffin Selection */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-white/80 flex items-center gap-2">
                  <span>🪦</span> เลือกโลงศพ
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {coffinOptions.map(coffin => {
                    const isIncluded = coffin.includedIn.includes(selectedPkg.id);
                    const isSelected = selectedCoffin === coffin.id;
                    const priceDisplay = isIncluded ? 'รวมในแพ็คเกจ' : coffin.price === 0 ? 'ฟรี' : `+฿${formatPrice(coffin.price)}`;
                    
                    return (
                      <button
                        key={coffin.id}
                        onClick={() => setSelectedCoffin(coffin.id)}
                        className={`p-3 rounded-xl text-left transition-all border ${
                          isSelected 
                            ? 'border-amber-500/50 bg-amber-900/20' 
                            : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={coffin.image} alt={coffin.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium text-sm ${isSelected ? 'text-amber-300' : 'text-white'}`}>{coffin.name}</p>
                            <p className="text-white/40 text-xs">{coffin.description}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className={`text-sm ${isIncluded ? 'text-green-400' : isSelected ? 'text-amber-300' : 'text-white/60'}`}>
                              {priceDisplay}
                            </p>
                          </div>
                          {isSelected && (
                            <Check className="w-5 h-5 text-amber-400 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Flower Theme Selection */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-white/80 flex items-center gap-2">
                  <span>💐</span> ธีมดอกไม้
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {flowerThemes.map(flower => {
                    const isIncluded = flower.includedIn.includes(selectedPkg.id);
                    const isSelected = selectedFlower === flower.id;
                    const priceDisplay = isIncluded ? 'รวมในแพ็คเกจ' : flower.price === 0 ? 'ฟรี' : `+฿${formatPrice(flower.price)}`;
                    
                    return (
                      <button
                        key={flower.id}
                        onClick={() => setSelectedFlower(flower.id)}
                        className={`p-3 rounded-xl text-left transition-all border ${
                          isSelected 
                            ? 'border-pink-500/50 bg-pink-900/20' 
                            : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={flower.image} alt={flower.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium text-sm ${isSelected ? 'text-pink-300' : 'text-white'}`}>{flower.name}</p>
                            <p className="text-white/40 text-xs">{flower.description}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className={`text-sm ${isIncluded ? 'text-green-400' : isSelected ? 'text-pink-300' : 'text-white/60'}`}>
                              {priceDisplay}
                            </p>
                          </div>
                          {isSelected && (
                            <Check className="w-5 h-5 text-pink-400 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Extra Services */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-white/80 flex items-center gap-2">
                  <span>✨</span> บริการเสริม
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {extraServices.map(service => {
                    const isIncluded = service.includedIn.includes(selectedPkg.id);
                    const isSelected = selectedExtras.includes(service.id);
                    const priceDisplay = isIncluded ? 'รวมในแพ็คเกจ' : `+฿${formatPrice(service.price)}`;
                    
                    return (
                      <button
                        key={service.id}
                        onClick={() => !isIncluded && toggleExtra(service.id)}
                        disabled={isIncluded}
                        className={`p-3 rounded-xl text-left transition-all border ${
                          isIncluded
                            ? 'border-green-500/30 bg-green-900/10 cursor-default'
                            : isSelected 
                              ? 'border-purple-500/50 bg-purple-900/20' 
                              : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isIncluded ? 'bg-green-500/20' : isSelected ? 'bg-purple-500/20' : 'bg-white/5'
                          }`}>
                            {isIncluded ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : isSelected ? (
                              <Check className="w-4 h-4 text-purple-400" />
                            ) : (
                              <span className="w-4 h-4 rounded border border-white/20" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium text-sm ${isIncluded ? 'text-green-300' : isSelected ? 'text-purple-300' : 'text-white'}`}>
                              {service.name}
                            </p>
                            <p className="text-white/40 text-xs">{service.description}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className={`text-sm ${isIncluded ? 'text-green-400' : isSelected ? 'text-purple-300' : 'text-white/60'}`}>
                              {priceDisplay}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 sticky bottom-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60 text-sm">Add-ons เพิ่มเติม</span>
                  <span className="text-purple-300">+฿{formatPrice(calculateAddOnPrice())}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">รวมทั้งหมด</span>
                  <span className="text-xl font-bold" style={{ color: selectedPkg.accent }}>฿{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button
                onClick={() => setPackageStep('detail')}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium hover:from-purple-500 hover:to-purple-600 transition-all"
              >
                บันทึกและกลับ
              </button>
            </motion.div>
          )}

          {/* ==================== QUIZ MODE ==================== */}
          {mode === 'quiz' && quizStep < 3 && currentQuestion && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
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
                  <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= quizStep ? 'bg-purple-500' : 'bg-white/10'}`} />
                ))}
              </div>

              {/* Question */}
              <div className="text-center py-1">
                <h2 className="text-lg md:text-xl font-medium leading-relaxed">{currentQuestion.question}</h2>
              </div>

              {/* Options - Much Larger Cards */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = briefAnswers[currentQuestion.id as keyof BriefAnswer] === option.id;
                  const Icon = option.icon;
                  return (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleQuizAnswer(currentQuestion.id, option.id)}
                      className={`w-full relative overflow-hidden rounded-2xl text-left transition-all border-2 ${
                        isSelected 
                          ? 'border-purple-500 ring-2 ring-purple-500/30 shadow-lg shadow-purple-500/20' 
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      {/* Two-Column Layout: Image Left, Content Right */}
                      <div className="flex">
                        {/* Image Section - Fixed Width */}
                        <div className="relative w-32 md:w-40 flex-shrink-0 overflow-hidden">
                          <img 
                            src={option.image} 
                            alt="" 
                            className={`w-full h-full object-cover transition-transform duration-500 ${isSelected ? 'scale-110' : ''}`}
                            style={{ minHeight: '120px' }}
                          />
                          {/* Gradient Overlay */}
                          <div className={`absolute inset-0 transition-all ${
                            isSelected 
                              ? 'bg-gradient-to-r from-transparent via-purple-900/30 to-purple-900/80' 
                              : 'bg-gradient-to-r from-transparent via-black/20 to-black/70'
                          }`} />
                        </div>
                        
                        {/* Content Section */}
                        <div className={`flex-1 p-4 flex flex-col justify-center transition-colors ${isSelected ? 'bg-purple-900/20' : 'bg-black/30'}`}>
                          <div className="flex items-start gap-3">
                            {/* Icon */}
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                              isSelected ? 'bg-purple-500/30' : 'bg-white/10'
                            }`}>
                              <Icon className={`w-4 h-4 ${isSelected ? 'text-purple-300' : 'text-white/70'}`} />
                            </div>
                            
                            {/* Text */}
                            <div className="flex-1 min-w-0">
                              <p className={`font-semibold text-sm leading-tight ${isSelected ? 'text-white' : 'text-white/90'}`}>
                                {option.label}
                              </p>
                              <p className={`text-xs mt-0.5 ${isSelected ? 'text-purple-300' : 'text-purple-400/70'}`}>
                                {option.sublabel}
                              </p>
                              <p className="text-[11px] text-white/40 mt-1.5 leading-relaxed line-clamp-2">
                                {option.description}
                              </p>
                              {option.urgent && (
                                <p className="text-[11px] text-amber-400 mt-1.5 flex items-center gap-1 font-medium">
                                  <Clock className="w-3 h-3" /> ติดต่อกลับภายใน 1 ชม.
                                </p>
                              )}
                            </div>

                            {/* Check mark */}
                            {isSelected && (
                              <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0"
                              >
                                <Check className="w-3.5 h-3.5 text-white" />
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Urgent Badge - Floating */}
                      {option.urgent && !isSelected && (
                        <div className="absolute top-2 left-2 flex items-center gap-1 bg-amber-500 text-black px-2 py-0.5 rounded-full text-[10px] font-bold">
                          <Clock className="w-2.5 h-2.5" />
                          <span>เร่งด่วน</span>
                        </div>
                      )}
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
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
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

              {/* Gallery Slider */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="space-y-3"
              >
                {/* Main Image with Navigation */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-black/50">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={recGalleryIndex}
                      src={recommendedPkg.gallery[recGalleryIndex]} 
                      alt={`${recommendedPkg.name} - ${recGalleryIndex + 1}`}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  
                  {/* Navigation Arrows */}
                  <button 
                    onClick={() => setRecGalleryIndex(prev => prev === 0 ? recommendedPkg.gallery.length - 1 : prev - 1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setRecGalleryIndex(prev => prev === recommendedPkg.gallery.length - 1 ? 0 : prev + 1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Package Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                        <recommendedPkg.icon className="w-6 h-6" style={{ color: recommendedPkg.accent }} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{recommendedPkg.name}</h3>
                        <p className="text-white/60 text-sm">{recommendedPkg.nameTh}</p>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Badge */}
                  {recommendedPkg.recommended && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                      <Sparkles className="w-3.5 h-3.5" /> แนะนำ
                    </div>
                  )}

                  {/* Image Counter */}
                  <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white/80 text-xs px-3 py-1.5 rounded-full">
                    {recGalleryIndex + 1} / {recommendedPkg.gallery.length}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 justify-center">
                  {recommendedPkg.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setRecGalleryIndex(idx)}
                      className={`relative w-16 h-12 rounded-lg overflow-hidden transition-all ${
                        idx === recGalleryIndex 
                          ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-black scale-105' 
                          : 'opacity-50 hover:opacity-80'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Caption */}
                <p className="text-center text-white/40 text-xs">
                  * รูปตัวอย่างเพื่อประกอบการตัดสินใจ ผลงานจริงอาจแตกต่างตามความต้องการ
                </p>
              </motion.div>

              {/* Package Stats */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`p-5 rounded-xl bg-gradient-to-br ${recommendedPkg.gradient} border border-white/10`}
              >
                <p className="text-sm mb-4" style={{ color: recommendedPkg.accent }}>{recommendedPkg.tagline}</p>
                <p className="text-white/60 text-sm mb-4">{recommendedPkg.description}</p>
                
                <div className="grid grid-cols-3 gap-4 text-center py-4 border-y border-white/10">
                  <div>
                    <p className="text-2xl font-light" style={{ color: recommendedPkg.accent }}>{recommendedPkg.days}</p>
                    <p className="text-xs text-white/50">วัน</p>
                  </div>
                  <div>
                    <p className="text-2xl font-light" style={{ color: recommendedPkg.accent }}>{recommendedPkg.maxGuests}</p>
                    <p className="text-xs text-white/50">คน</p>
                  </div>
                  <div>
                    <p className="text-xl font-medium" style={{ color: recommendedPkg.accent }}>฿{formatPrice(recommendedPkg.price.min)}</p>
                    <p className="text-xs text-white/50">เริ่มต้น</p>
                  </div>
                </div>

                {/* Price Range Note */}
                <div className="mt-4 p-3 rounded-lg bg-black/20 text-center">
                  <p className="text-white/50 text-xs">ราคาประมาณการ</p>
                  <p className="text-lg font-medium mt-1" style={{ color: recommendedPkg.accent }}>
                    ฿{formatPrice(recommendedPkg.price.min)} - ฿{formatPrice(recommendedPkg.price.max)}
                  </p>
                  <p className="text-white/40 text-xs mt-1">ขึ้นอยู่กับ Add-ons ที่เลือก</p>
                </div>
              </motion.div>

              {/* What's Included */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="rounded-xl border border-white/10 overflow-hidden"
              >
                <div className="p-4 bg-white/[0.02] border-b border-white/10">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    บริการที่รวมในแพ็คเกจ ({recommendedPkg.includes.length} รายการ)
                  </p>
                </div>
                <div className="p-4 grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                  {recommendedPkg.includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500/70 mt-0.5">✓</span>
                      <span className="text-white/60">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Upgrade Options Preview */}
              {!recommendedPkg.allInclusive && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="p-4 rounded-xl border border-dashed border-purple-500/30 bg-purple-900/10"
                >
                  <p className="text-sm text-purple-300 font-medium mb-3">💡 สามารถอัพเกรดเพิ่มเติมได้</p>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-lg bg-black/20">
                      <span className="text-lg">🪦</span>
                      <p className="text-white/50 mt-1">โลงศพ</p>
                    </div>
                    <div className="p-2 rounded-lg bg-black/20">
                      <span className="text-lg">💐</span>
                      <p className="text-white/50 mt-1">ธีมดอกไม้</p>
                    </div>
                    <div className="p-2 rounded-lg bg-black/20">
                      <span className="text-lg">✨</span>
                      <p className="text-white/50 mt-1">บริการเสริม</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-xs text-center mt-3">ปรับแต่งได้หลังจากติดต่อทีมงาน</p>
                </motion.div>
              )}

              {/* Why This Package */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/10"
              >
                <p className="text-sm text-white/50 mb-3">ทำไมเราแนะนำแพ็คเกจนี้?</p>
                <div className="space-y-2 text-sm">
                  {briefAnswers.who && (
                    <div className="flex items-start gap-2">
                      <span className="text-purple-400">•</span>
                      <span className="text-white/70">
                        {briefAnswers.who === 'self' && 'เหมาะสำหรับการวางแผนล่วงหน้าด้วยตัวเอง'}
                        {briefAnswers.who === 'family' && 'ออกแบบมาสำหรับครอบครัวที่ต้องการความใส่ใจ'}
                        {briefAnswers.who === 'passed' && 'พร้อมให้บริการอย่างเร่งด่วนและครบวงจร'}
                      </span>
                    </div>
                  )}
                  {briefAnswers.style && (
                    <div className="flex items-start gap-2">
                      <span className="text-purple-400">•</span>
                      <span className="text-white/70">
                        {briefAnswers.style === 'minimalist' && 'สไตล์เรียบง่าย สงบ ไม่หรูหราเกินไป'}
                        {briefAnswers.style === 'elegant' && 'ความหรูหราสง่างาม สมเกียรติ'}
                        {briefAnswers.style === 'botanical' && 'ธรรมชาติ ดอกไม้ สดใส'}
                        {briefAnswers.style === 'personalized' && 'ปรับแต่งได้ตามความต้องการเฉพาะ'}
                      </span>
                    </div>
                  )}
                  {briefAnswers.mood && (
                    <div className="flex items-start gap-2">
                      <span className="text-purple-400">•</span>
                      <span className="text-white/70">
                        {briefAnswers.mood === 'warm' && 'บรรยากาศอบอุ่น ใกล้ชิด ครอบครัว'}
                        {briefAnswers.mood === 'peaceful' && 'สงบ สันติ เรียบง่าย'}
                        {briefAnswers.mood === 'grand' && 'สมเกียรติ ยิ่งใหญ่ เป็นทางการ'}
                        {briefAnswers.mood === 'celebration' && 'รำลึกถึงความทรงจำที่ดี เฉลิมฉลองชีวิต'}
                      </span>
                    </div>
                  )}
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
                  rows={2}
                  placeholder="งบประมาณ, จำนวนแขก, หมายเหตุ"
                />
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleSubmit}
                  disabled={!contactForm.name || !contactForm.phone}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium hover:from-purple-500 hover:to-purple-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  รับข้อเสนอพิเศษ • {recommendedPkg.name}
                </button>
                <button
                  onClick={() => {
                    setSelectedPackageId(recommendedPkg.id);
                    setMode('package');
                    setPackageStep('detail');
                  }}
                  className="w-full py-3 border border-white/10 rounded-xl text-white/60 hover:text-white hover:border-white/30 text-sm transition-all"
                >
                  ดูรายละเอียดเพิ่มเติม / ปรับแต่ง Add-ons
                </button>
                <button
                  onClick={handleReset}
                  className="w-full py-3 text-white/30 hover:text-white/50 text-sm transition-colors"
                >
                  เริ่มใหม่
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
