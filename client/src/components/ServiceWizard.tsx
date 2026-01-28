import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  BookOpen,
  BookText,
  Crown, 
  Gem,
  Flower2,
  UtensilsCrossed,
  Monitor,
  Calculator,
  X
} from "lucide-react";

// ==================== DATA ====================

const packages = [
  {
    id: "memoir",
    name: "The Memoir",
    nameTh: "เดอะ เมมัวร์",
    tagline: "Intimate & Personal",
    taglineTh: "ความทรงจำอันอบอุ่น",
    icon: BookOpen,
    duration: "งาน 3 วัน",
    venue: "วัดขนาดเล็ก",
    guests: "30-80 คน/วัน",
    color: "from-slate-600 to-slate-800",
    accent: "text-blue-300",
    borderColor: "border-blue-500/30",
    subPackages: [
      { name: "BASIC", price: 45000 },
      { name: "STANDARD", price: 55000 }
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
      "ทีมงานดูแล 8-10 คน"
    ]
  },
  {
    id: "narrative",
    name: "The Narrative",
    nameTh: "เดอะ แนร์ราทีฟ",
    tagline: "Story & Journey",
    taglineTh: "บอกเล่าเรื่องราว",
    icon: BookText,
    duration: "งาน 5 วัน",
    venue: "วัดขนาดกลาง",
    guests: "80-150 คน/วัน",
    color: "from-amber-700 to-amber-900",
    accent: "text-amber-300",
    borderColor: "border-amber-500/40",
    subPackages: [
      { name: "SILVER", price: 120000 },
      { name: "GOLD", price: 150000 }
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
      "ทีมงานดูแล 12-15 คน"
    ]
  },
  {
    id: "legacy",
    name: "The Legacy",
    nameTh: "เดอะ เลกาซี่",
    tagline: "Honor & Heritage",
    taglineTh: "เกียรติยศสืบสาน",
    icon: Crown,
    duration: "งาน 7 วัน",
    venue: "วัดขนาดใหญ่",
    guests: "150-300 คน/วัน",
    color: "from-purple-700 to-purple-900",
    accent: "text-purple-300",
    borderColor: "border-purple-500/40",
    recommended: true,
    subPackages: [
      { name: "PLATINUM", price: 350000 },
      { name: "DIAMOND", price: 450000 }
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
      "ทีมงานดูแล 15-20 คน"
    ]
  },
  {
    id: "masterpiece",
    name: "The Masterpiece",
    nameTh: "เดอะ มาสเตอร์พีซ",
    tagline: "Art & Perfection",
    taglineTh: "ผลงานชิ้นเอก",
    icon: Gem,
    duration: "งาน 7 วัน",
    venue: "วัดดังระดับประเทศ",
    guests: "300-500+ คน/วัน",
    color: "from-yellow-600 to-amber-800",
    accent: "text-yellow-200",
    borderColor: "border-yellow-500/50",
    subPackages: [
      { name: "ROYAL", price: 800000 },
      { name: "EXCLUSIVE", price: 1000000 }
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
      "ทีมงานดูแลเต็มระบบ 20-25 คน"
    ]
  }
];

const floralOptions = [
  {
    id: "white-elegant",
    name: "White Elegant",
    nameTh: "ขาวสง่างาม",
    description: "ดอกไม้สีขาวล้วน สื่อถึงความบริสุทธิ์และสงบ",
    price: 0,
    image: "/floral-white.jpg"
  },
  {
    id: "natural-serenity",
    name: "Natural Serenity",
    nameTh: "ธรรมชาติสงบ",
    description: "โทนสีเขียวอ่อนผสมขาว ให้ความรู้สึกสงบร่มเย็น",
    price: 5000,
    image: "/floral-natural.jpg"
  },
  {
    id: "royal-gold",
    name: "Royal Gold",
    nameTh: "ทองหรูหรา",
    description: "ดอกไม้สีทองและครีม สื่อถึงเกียรติยศและศักดิ์ศรี",
    price: 8000,
    image: "/floral-gold.jpg"
  },
  {
    id: "custom-design",
    name: "Custom Design",
    nameTh: "ออกแบบพิเศษ",
    description: "ออกแบบตามความต้องการ โดยทีมดีไซเนอร์",
    price: 15000,
    image: "/floral-custom.jpg"
  }
];

const cateringOptions = [
  {
    id: "basic",
    name: "Basic Set",
    nameTh: "ชุดพื้นฐาน",
    description: "น้ำดื่ม ขนม กาแฟ",
    pricePerPerson: 0,
    included: true
  },
  {
    id: "snackbox",
    name: "Snack Box",
    nameTh: "ชุดว่างกล่อง",
    description: "ขนมกล่องพรีเมียม พร้อมเครื่องดื่ม",
    pricePerPerson: 80,
    included: false
  },
  {
    id: "buffet",
    name: "Buffet Set",
    nameTh: "บุฟเฟต์",
    description: "อาหารบุฟเฟต์สำหรับวันสุดท้าย",
    pricePerPerson: 350,
    included: false
  },
  {
    id: "premium-buffet",
    name: "Premium Buffet",
    nameTh: "บุฟเฟต์พรีเมียม",
    description: "บุฟเฟต์หรู พร้อมโต๊ะจีน",
    pricePerPerson: 550,
    included: false
  }
];

const digitalServices = [
  {
    id: "memorial-page",
    name: "Online Memorial Page",
    nameTh: "หน้าอนุสรณ์ออนไลน์",
    description: "เว็บไซต์ส่วนตัวสำหรับรำลึกถึงผู้วายชนม์",
    price: 5000,
    icon: Monitor
  },
  {
    id: "live-stream",
    name: "Live Streaming",
    nameTh: "ถ่ายทอดสด",
    description: "ถ่ายทอดสดพิธีสำหรับญาติที่อยู่ต่างประเทศ",
    price: 15000,
    icon: Monitor
  },
  {
    id: "video-memoir",
    name: "Video Memoir",
    nameTh: "วิดีโอรำลึก",
    description: "วิดีโอสรุปประวัติและภาพความทรงจำ",
    price: 12000,
    icon: Monitor
  },
  {
    id: "digital-guestbook",
    name: "Digital Guestbook",
    nameTh: "สมุดลงนามออนไลน์",
    description: "ระบบลงนามไว้อาลัยออนไลน์",
    price: 3000,
    icon: Monitor
  }
];

// ==================== TYPES ====================

interface WizardState {
  selectedPackage: string | null;
  selectedSubPackage: string | null;
  selectedFloral: string | null;
  selectedCatering: string | null;
  guestCount: number;
  selectedDigitalServices: string[];
  contactInfo: {
    name: string;
    phone: string;
    email: string;
    note: string;
  };
}

// ==================== COMPONENT ====================

export default function ServiceWizard({ onClose }: { onClose?: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [state, setState] = useState<WizardState>({
    selectedPackage: null,
    selectedSubPackage: null,
    selectedFloral: null,
    selectedCatering: "basic",
    guestCount: 50,
    selectedDigitalServices: [],
    contactInfo: {
      name: "",
      phone: "",
      email: "",
      note: ""
    }
  });

  const steps = [
    { id: "package", title: "เลือกแพ็คเกจ", icon: Crown },
    { id: "floral", title: "สไตล์ดอกไม้", icon: Flower2 },
    { id: "catering", title: "อาหารและเครื่องดื่ม", icon: UtensilsCrossed },
    { id: "digital", title: "บริการดิจิทัล", icon: Monitor },
    { id: "summary", title: "สรุปราคา", icon: Calculator }
  ];

  // Calculate total price
  const calculateTotal = () => {
    let total = 0;

    // Package price
    const pkg = packages.find(p => p.id === state.selectedPackage);
    if (pkg && state.selectedSubPackage) {
      const subPkg = pkg.subPackages.find(s => s.name === state.selectedSubPackage);
      if (subPkg) total += subPkg.price;
    }

    // Floral price
    const floral = floralOptions.find(f => f.id === state.selectedFloral);
    if (floral) total += floral.price;

    // Catering price
    const catering = cateringOptions.find(c => c.id === state.selectedCatering);
    if (catering && !catering.included) {
      total += catering.pricePerPerson * state.guestCount;
    }

    // Digital services
    state.selectedDigitalServices.forEach(serviceId => {
      const service = digitalServices.find(s => s.id === serviceId);
      if (service) total += service.price;
    });

    return total;
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('th-TH');
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return state.selectedPackage && state.selectedSubPackage;
      case 1:
        return state.selectedFloral;
      case 2:
        return state.selectedCatering;
      case 3:
        return true;
      case 4:
        return state.contactInfo.name && state.contactInfo.phone;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1 && canProceed()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Here you would send the data to your backend
    console.log("Submitting:", state);
    alert("ส่งข้อมูลเรียบร้อยแล้ว! ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง");
    if (onClose) onClose();
  };

  // ==================== RENDER STEPS ====================

  const renderPackageStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gold mb-2">เลือกแพ็คเกจของคุณ</h2>
        <p className="text-white/60">The Storytelling Collection</p>
      </div>

      <div className="space-y-4">
        {packages.map((pkg) => {
          const Icon = pkg.icon;
          const isSelected = state.selectedPackage === pkg.id;

          return (
            <motion.div
              key={pkg.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setState(prev => ({ 
                ...prev, 
                selectedPackage: pkg.id,
                selectedSubPackage: null 
              }))}
              className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected 
                  ? 'border-gold bg-gold/10' 
                  : 'border-white/10 bg-white/5 hover:border-white/30'
              }`}
            >
              {pkg.recommended && (
                <div className="absolute -top-2 right-4 bg-gold text-black text-xs px-2 py-0.5 rounded-full font-bold">
                  แนะนำ
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${pkg.color} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${pkg.accent}`} />
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-white font-serif">{pkg.name}</h3>
                  <p className="text-sm text-white/80">{pkg.nameTh}</p>
                  <p className={`text-xs italic ${pkg.accent}`}>{pkg.taglineTh}</p>
                </div>

                <div className="text-right">
                  <p className={`font-bold ${pkg.accent}`}>
                    {formatPrice(pkg.subPackages[0].price)} - {formatPrice(pkg.subPackages[1].price)}
                  </p>
                  <p className="text-xs text-white/40">บาท</p>
                </div>
              </div>

              {/* Sub-packages */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-xs text-white/40 mb-3">
                        {pkg.duration} • {pkg.venue} • {pkg.guests}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {pkg.subPackages.map((sub) => (
                          <button
                            key={sub.name}
                            onClick={(e) => {
                              e.stopPropagation();
                              setState(prev => ({ ...prev, selectedSubPackage: sub.name }));
                            }}
                            className={`p-3 rounded-lg border text-center transition-all ${
                              state.selectedSubPackage === sub.name
                                ? 'border-gold bg-gold/20'
                                : 'border-white/10 hover:border-white/30'
                            }`}
                          >
                            <p className="font-bold text-white">{sub.name}</p>
                            <p className={`text-lg font-bold ${pkg.accent}`}>
                              {formatPrice(sub.price)}
                            </p>
                            <p className="text-xs text-white/40">บาท</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderFloralStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gold mb-2">เลือกสไตล์ดอกไม้</h2>
        <p className="text-white/60">Select Your Tribute Tone</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {floralOptions.map((option) => {
          const isSelected = state.selectedFloral === option.id;

          return (
            <motion.div
              key={option.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setState(prev => ({ ...prev, selectedFloral: option.id }))}
              className={`relative rounded-xl border overflow-hidden cursor-pointer transition-all ${
                isSelected 
                  ? 'border-gold ring-2 ring-gold/50' 
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              {/* Placeholder image area */}
              <div className="h-32 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                <Flower2 className="w-12 h-12 text-white/20" />
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-white text-sm">{option.nameTh}</h3>
                    <p className="text-xs text-white/60">{option.name}</p>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                      <Check className="w-3 h-3 text-black" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-white/40 mb-2">{option.description}</p>
                <p className="text-amber-300 font-bold">
                  {option.price === 0 ? 'รวมในแพ็คเกจ' : `+${formatPrice(option.price)} บาท`}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderCateringStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gold mb-2">อาหารและเครื่องดื่ม</h2>
        <p className="text-white/60">Select Your Culinary Experience</p>
      </div>

      {/* Guest count */}
      <div className="bg-white/5 rounded-xl p-4 mb-6">
        <label className="block text-white/60 text-sm mb-2">จำนวนแขกโดยประมาณ (ต่อวัน)</label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="30"
            max="500"
            step="10"
            value={state.guestCount}
            onChange={(e) => setState(prev => ({ ...prev, guestCount: parseInt(e.target.value) }))}
            className="flex-1 accent-gold"
          />
          <span className="text-gold font-bold text-xl w-20 text-right">
            {state.guestCount} คน
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {cateringOptions.map((option) => {
          const isSelected = state.selectedCatering === option.id;
          const totalPrice = option.included ? 0 : option.pricePerPerson * state.guestCount;

          return (
            <motion.div
              key={option.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setState(prev => ({ ...prev, selectedCatering: option.id }))}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected 
                  ? 'border-gold bg-gold/10' 
                  : 'border-white/10 bg-white/5 hover:border-white/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'border-gold bg-gold' : 'border-white/30'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 text-black" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{option.nameTh}</h3>
                    <p className="text-sm text-white/60">{option.name}</p>
                    <p className="text-xs text-white/40 mt-1">{option.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  {option.included ? (
                    <p className="text-green-400 font-bold">รวมในแพ็คเกจ</p>
                  ) : (
                    <>
                      <p className="text-amber-300 font-bold">+{formatPrice(totalPrice)}</p>
                      <p className="text-xs text-white/40">({option.pricePerPerson} บาท/คน)</p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderDigitalStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gold mb-2">บริการดิจิทัล</h2>
        <p className="text-white/60">Digital Services (Optional)</p>
      </div>

      <div className="space-y-3">
        {digitalServices.map((service) => {
          const isSelected = state.selectedDigitalServices.includes(service.id);

          return (
            <motion.div
              key={service.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setState(prev => ({
                  ...prev,
                  selectedDigitalServices: isSelected
                    ? prev.selectedDigitalServices.filter(id => id !== service.id)
                    : [...prev.selectedDigitalServices, service.id]
                }));
              }}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected 
                  ? 'border-gold bg-gold/10' 
                  : 'border-white/10 bg-white/5 hover:border-white/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-gold/20' : 'bg-white/5'
                  }`}>
                    <Monitor className={`w-5 h-5 ${isSelected ? 'text-gold' : 'text-white/40'}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{service.nameTh}</h3>
                    <p className="text-sm text-white/60">{service.name}</p>
                    <p className="text-xs text-white/40 mt-1">{service.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-amber-300 font-bold">+{formatPrice(service.price)}</p>
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                    isSelected ? 'border-gold bg-gold' : 'border-white/30'
                  }`}>
                    {isSelected && <Check className="w-4 h-4 text-black" />}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderSummaryStep = () => {
    const pkg = packages.find(p => p.id === state.selectedPackage);
    const subPkg = pkg?.subPackages.find(s => s.name === state.selectedSubPackage);
    const floral = floralOptions.find(f => f.id === state.selectedFloral);
    const catering = cateringOptions.find(c => c.id === state.selectedCatering);
    const total = calculateTotal();

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gold mb-2">สรุปรายการ</h2>
          <p className="text-white/60">Order Summary</p>
        </div>

        {/* Summary card */}
        <div className="bg-white/5 rounded-xl p-6 space-y-4">
          {/* Package */}
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <div>
              <p className="text-white/60 text-sm">แพ็คเกจ</p>
              <p className="font-bold text-white">{pkg?.name} ({pkg?.nameTh})</p>
              <p className="text-xs text-white/60">{state.selectedSubPackage}</p>
            </div>
            <p className="text-gold font-bold">{formatPrice(subPkg?.price || 0)}</p>
          </div>

          {/* Floral */}
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <div>
              <p className="text-white/60 text-sm">สไตล์ดอกไม้</p>
              <p className="font-bold text-white">{floral?.nameTh}</p>
            </div>
            <p className="text-gold font-bold">
              {floral?.price === 0 ? 'รวม' : `+${formatPrice(floral?.price || 0)}`}
            </p>
          </div>

          {/* Catering */}
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <div>
              <p className="text-white/60 text-sm">อาหารและเครื่องดื่ม ({state.guestCount} คน)</p>
              <p className="font-bold text-white">{catering?.nameTh}</p>
            </div>
            <p className="text-gold font-bold">
              {catering?.included ? 'รวม' : `+${formatPrice((catering?.pricePerPerson || 0) * state.guestCount)}`}
            </p>
          </div>

          {/* Digital Services */}
          {state.selectedDigitalServices.length > 0 && (
            <div className="pb-4 border-b border-white/10">
              <p className="text-white/60 text-sm mb-2">บริการดิจิทัล</p>
              {state.selectedDigitalServices.map(serviceId => {
                const service = digitalServices.find(s => s.id === serviceId);
                return (
                  <div key={serviceId} className="flex justify-between items-center">
                    <p className="text-white">{service?.nameTh}</p>
                    <p className="text-gold">+{formatPrice(service?.price || 0)}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Total */}
          <div className="flex justify-between items-center pt-2">
            <p className="text-xl font-bold text-white">รวมทั้งหมด</p>
            <p className="text-2xl font-bold text-gold">{formatPrice(total)} บาท</p>
          </div>
        </div>

        {/* Contact form */}
        <div className="bg-white/5 rounded-xl p-6 space-y-4">
          <h3 className="font-bold text-white mb-4">ข้อมูลติดต่อ</h3>
          
          <div>
            <label className="block text-white/60 text-sm mb-1">ชื่อ-นามสกุล *</label>
            <input
              type="text"
              value={state.contactInfo.name}
              onChange={(e) => setState(prev => ({
                ...prev,
                contactInfo: { ...prev.contactInfo, name: e.target.value }
              }))}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
              placeholder="กรุณากรอกชื่อ"
            />
          </div>

          <div>
            <label className="block text-white/60 text-sm mb-1">เบอร์โทรศัพท์ *</label>
            <input
              type="tel"
              value={state.contactInfo.phone}
              onChange={(e) => setState(prev => ({
                ...prev,
                contactInfo: { ...prev.contactInfo, phone: e.target.value }
              }))}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
              placeholder="0xx-xxx-xxxx"
            />
          </div>

          <div>
            <label className="block text-white/60 text-sm mb-1">อีเมล</label>
            <input
              type="email"
              value={state.contactInfo.email}
              onChange={(e) => setState(prev => ({
                ...prev,
                contactInfo: { ...prev.contactInfo, email: e.target.value }
              }))}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-white/60 text-sm mb-1">หมายเหตุเพิ่มเติม</label>
            <textarea
              value={state.contactInfo.note}
              onChange={(e) => setState(prev => ({
                ...prev,
                contactInfo: { ...prev.contactInfo, note: e.target.value }
              }))}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none resize-none"
              rows={3}
              placeholder="รายละเอียดเพิ่มเติม..."
            />
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderPackageStep();
      case 1:
        return renderFloralStep();
      case 2:
        return renderCateringStep();
      case 3:
        return renderDigitalStep();
      case 4:
        return renderSummaryStep();
      default:
        return null;
    }
  };

  // ==================== MAIN RENDER ====================

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gradient-to-b from-zinc-900 to-black w-full max-w-lg max-h-[90vh] rounded-2xl border border-white/10 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-gold font-bold font-serif">SASAN</h1>
            <p className="text-xs text-white/40">The Storytelling Collection</p>
          </div>
          
          {/* Progress */}
          <div className="flex items-center gap-1">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep 
                    ? 'bg-gold w-6' 
                    : index < currentStep 
                      ? 'bg-gold/60' 
                      : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>
          )}
        </div>

        {/* Step indicator */}
        <div className="px-4 py-3 bg-white/5 flex items-center gap-2">
          {(() => {
            const StepIcon = steps[currentStep].icon;
            return <StepIcon className="w-4 h-4 text-gold" />;
          })()}
          <span className="text-sm text-white/60">
            ขั้นตอนที่ {currentStep + 1} / {steps.length}
          </span>
          <span className="text-sm text-white font-medium">
            {steps[currentStep].title}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderCurrentStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/50">
          {/* Price preview */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-white/60">ราคาประมาณการ</span>
            <span className="text-xl font-bold text-gold">{formatPrice(calculateTotal())} บาท</span>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="flex-1 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                ย้อนกลับ
              </button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  canProceed()
                    ? 'bg-gold text-black hover:bg-yellow-400'
                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                }`}
              >
                ถัดไป
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  canProceed()
                    ? 'bg-gold text-black hover:bg-yellow-400'
                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                }`}
              >
                <Check className="w-4 h-4" />
                ยืนยันการจอง
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
