import { useState, useMemo } from "react";
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
  Calculator,
  X,
  Wand2,
  Building2,
  Calendar,
  Flame,
  Plus,
  ArrowRight,
  Leaf
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    priceRange: "45,000 - 55,000",
    subPackages: [
      { name: "BASIC", price: 45000 },
      { name: "STANDARD", price: 55000 }
    ],
    features: [
      "ค่าเช่าศาลา 3 คืน",
      "ค่าเมรุและฌาปนกิจ",
      "ดอกไม้ตกแต่งหน้างาน",
      "โลงศพไม้ธรรมดา",
      "รถรับศพ",
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
    priceRange: "120,000 - 150,000",
    subPackages: [
      { name: "SILVER", price: 120000 },
      { name: "GOLD", price: 150000 }
    ],
    features: [
      "ค่าเช่าศาลา 5 คืน",
      "ค่าเมรุและฌาปนกิจ",
      "ดอกไม้ตกแต่งระดับกลาง",
      "โลงศพไม้สัก/โลหะ",
      "รถรับศพ VIP",
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
    priceRange: "350,000 - 450,000",
    subPackages: [
      { name: "PLATINUM", price: 350000 },
      { name: "DIAMOND", price: 450000 }
    ],
    features: [
      "ค่าเช่าศาลาแอร์ VIP 7 คืน",
      "ดอกไม้ตกแต่ง Premium Design",
      "โลงศพไม้สักทอง/สแตนเลส",
      "Catering บุฟเฟต์วันเผา",
      "ช่างภาพ-วีดีโอ Pro",
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
    duration: "งาน 7+ วัน",
    venue: "วัดดังระดับประเทศ",
    guests: "300-500+ คน/วัน",
    color: "from-yellow-600 to-amber-800",
    accent: "text-yellow-200",
    borderColor: "border-yellow-500/50",
    priceRange: "800,000 - 1,000,000",
    subPackages: [
      { name: "ROYAL", price: 800000 },
      { name: "EXCLUSIVE", price: 1000000 }
    ],
    features: [
      "ศาลา Super VIP 7 คืน",
      "ดอกไม้ Luxury Design",
      "โลงศพไม้สักทองเต็มตัว/คริสตัล",
      "Catering หรูเต็มรูปแบบ",
      "Live Streaming 4K",
      "ทีมงานดูแล 20-25 คน"
    ]
  }
];

const temples = [
  { id: "that-thong", name: "วัดธาตุทอง", price: 15000 },
  { id: "makut", name: "วัดมกุฏกษัตริยาราม", price: 18000 },
  { id: "thep-sirin", name: "วัดเทพศิรินทราวาส", price: 25000 },
  { id: "others", name: "วัดอื่นๆ (ระบุในหมายเหตุ)", price: 10000 }
];

const casketOptions = [
  { id: "standard", name: "โลงมาตรฐาน", price: 15000, eco: false },
  { id: "teak", name: "โลงไม้สัก", price: 45000, eco: false },
  { id: "eco-bamboo", name: "โลงไม้ไผ่สาน", price: 25000, eco: true },
  { id: "eco-hyacinth", name: "โลงผักตบชวา", price: 28000, eco: true }
];

const cremationLevels = [
  { id: "basic", name: "เมรุธรรมดา", price: 5000 },
  { id: "standard", name: "เมรุมาตรฐาน", price: 12000 },
  { id: "royal", name: "เมรุ Royal", price: 35000 }
];

const floralColors = [
  { id: "white", name: "ขาวบริสุทธิ์ (Pure White)", price: 0 },
  { id: "gold", name: "เหลืองทอง (Royal Gold)", price: 5000 },
  { id: "custom", name: "สีพิเศษ (Custom Color)", price: 10000 }
];

const extraServices = [
  { id: "photo-video", name: "ช่างภาพ + วีดีโอ", price: 15000 },
  { id: "live-stream", name: "Live Streaming", price: 12000 },
  { id: "memorial-video", name: "วิดีโอรำลึก", price: 8000 },
  { id: "mc", name: "พิธีกรมืออาชีพ", price: 5000 }
];

// ==================== COMPONENT ====================

export default function ServiceSelector({ onClose }: { onClose?: () => void }) {
  const [mode, setMode] = useState<"selection" | "package" | "custom">("selection");
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  
  // Custom mode state
  const [customData, setCustomData] = useState({
    temple: "",
    days: 3,
    casket: "",
    cremation: "",
    floral: "",
    extras: [] as string[]
  });

  const calculateTotal = useMemo(() => {
    let total = 0;
    const temple = temples.find(t => t.id === customData.temple);
    if (temple) total += temple.price;
    
    total += (customData.days * 2000); // Daily management fee placeholder
    
    const casket = casketOptions.find(c => c.id === customData.casket);
    if (casket) total += casket.price;
    
    const cremation = cremationLevels.find(c => c.id === customData.cremation);
    if (cremation) total += cremation.price;
    
    const floral = floralColors.find(f => f.id === customData.floral);
    if (floral) total += floral.price;
    
    customData.extras.forEach(id => {
      const extra = extraServices.find(e => e.id === id);
      if (extra) total += extra.price;
    });
    
    return total;
  }, [customData]);

  const renderSelection = () => (
    <div className="flex flex-col gap-6 py-8">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-serif font-bold text-gold mb-2">One Stop Service</h2>
        <p className="text-white/60">เลือกรูปแบบบริการที่ต้องการ</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button 
          onClick={() => setMode("package")}
          className="group relative overflow-hidden p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-gold/50 transition-all text-left flex flex-col items-start gap-4"
        >
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
            <BookOpen className="w-8 h-8 text-gold" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Package Mode</h3>
            <p className="text-white/60 text-sm">เลือกแพ็คเกจสำเร็จรูป ครบจบในที่เดียว ง่ายและรวดเร็ว</p>
          </div>
          <ArrowRight className="absolute bottom-8 right-8 text-gold/40 group-hover:text-gold transition-colors" />
        </button>

        <button 
          onClick={() => setMode("custom")}
          className="group relative overflow-hidden p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-gold/50 transition-all text-left flex flex-col items-start gap-4"
        >
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <Wand2 className="w-8 h-8 text-white/80" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Custom Mode</h3>
            <p className="text-white/60 text-sm">ออกแบบงานตามความต้องการ ปรับแต่งได้ทุกรายละเอียด</p>
          </div>
          <ArrowRight className="absolute bottom-8 right-8 text-white/20 group-hover:text-gold transition-colors" />
        </button>
      </div>
    </div>
  );

  const renderPackageMode = () => (
    <div className="py-6">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={() => setMode("selection")} className="text-white/60">
          <ChevronLeft className="w-4 h-4 mr-2" /> กลับไปเลือกโหมด
        </Button>
        <h2 className="text-2xl font-serif font-bold text-gold">Package Selection</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((pkg) => (
          <div 
            key={pkg.id}
            className={`relative p-6 rounded-2xl border ${pkg.borderColor} bg-gradient-to-b ${pkg.color} flex flex-col h-full group hover:border-gold/60 transition-all`}
          >
            {pkg.recommended && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-black font-bold">
                ⭐ แนะนำ
              </Badge>
            )}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-black/30 flex items-center justify-center mb-3">
                <pkg.icon className={`w-6 h-6 ${pkg.accent}`} />
              </div>
              <h4 className="text-xl font-bold text-white mb-1">{pkg.name}</h4>
              <p className="text-sm text-white/60 italic mb-2">{pkg.tagline}</p>
              <div className="text-xs text-white/40 space-y-1">
                <p>{pkg.duration} • {pkg.venue}</p>
                <p>{pkg.guests} guests</p>
              </div>
            </div>
            
            <div className="mt-auto pt-6 border-t border-white/10 text-center">
              <p className={`text-xl font-bold ${pkg.accent} mb-4`}>{pkg.priceRange} บาท</p>
              <Button 
                onClick={() => {
                  setSelectedPackage(pkg.id);
                  // Trigger contact step or modal close
                }}
                className="w-full bg-white/10 hover:bg-gold hover:text-black border-white/10"
              >
                Contact Us
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCustomMode = () => {
    const totalSteps = 6;
    
    return (
      <div className="py-6">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => setMode("selection")} className="text-white/60">
            <ChevronLeft className="w-4 h-4 mr-2" /> ยกเลิก
          </Button>
          <div className="text-center">
            <h2 className="text-2xl font-serif font-bold text-gold">Custom Design</h2>
            <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Step {currentStep} of {totalSteps}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/40 mb-1">Total Estimated</p>
            <p className="text-xl font-bold text-gold">{calculateTotal.toLocaleString()} ฿</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/5 rounded-full mb-12 overflow-hidden">
          <motion.div 
            className="h-full bg-gold"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        <div className="min-h-[400px]">
          {/* Step 1: Temple */}
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="text-center mb-8">
                <Building2 className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white">Select Temple</h3>
                <p className="text-white/60">เลือกสถานที่จัดงาน</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {temples.map((temple) => (
                  <button
                    key={temple.id}
                    onClick={() => setCustomData({ ...customData, temple: temple.id })}
                    className={`p-6 rounded-xl border text-left transition-all ${
                      customData.temple === temple.id 
                      ? 'border-gold bg-gold/10 text-gold' 
                      : 'border-white/10 bg-white/5 text-white/60 hover:border-white/30'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{temple.name}</span>
                      <span className="text-sm">{temple.price.toLocaleString()} ฿</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Days */}
          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="text-center mb-8">
                <Calendar className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white">Number of Days</h3>
                <p className="text-white/60">จำนวนวันในการทำพิธี</p>
              </div>
              <div className="flex justify-center gap-4">
                {[3, 5, 7, 9].map((day) => (
                  <button
                    key={day}
                    onClick={() => setCustomData({ ...customData, days: day })}
                    className={`w-20 h-20 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                      customData.days === day 
                      ? 'border-gold bg-gold text-black font-bold' 
                      : 'border-white/10 bg-white/5 text-white/60 hover:border-white/30'
                    }`}
                  >
                    <span className="text-2xl">{day}</span>
                    <span className="text-xs">Days</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Casket */}
          {currentStep === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="text-center mb-8">
                <Flame className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white">Select Casket</h3>
                <p className="text-white/60">เลือกรูปแบบโลงศพ</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {casketOptions.map((casket) => (
                  <button
                    key={casket.id}
                    onClick={() => setCustomData({ ...customData, casket: casket.id })}
                    className={`p-6 rounded-xl border text-left transition-all relative ${
                      customData.casket === casket.id 
                      ? 'border-gold bg-gold/10 text-gold' 
                      : 'border-white/10 bg-white/5 text-white/60 hover:border-white/30'
                    }`}
                  >
                    {casket.eco && (
                      <Badge className="absolute -top-2 right-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                        <Leaf className="w-3 h-3 mr-1" /> 🌿 เป็นมิตรกับสิ่งแวดล้อม
                      </Badge>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{casket.name}</span>
                      <span className="text-sm">{casket.price.toLocaleString()} ฿</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4-6 placeholder concepts... */}
          {currentStep >= 4 && (
             <div className="flex flex-col items-center justify-center h-full text-center">
                <Calculator className="w-16 h-16 text-gold/20 mb-4" />
                <h3 className="text-white/80">Coming Soon</h3>
                <p className="text-white/40 text-sm">Full customizer for steps 4-6 is being finalized.</p>
             </div>
          )}
        </div>

        <div className="flex justify-between mt-12 pt-6 border-t border-white/10">
          <Button 
            variant="ghost" 
            onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : setMode("selection")}
            className="text-white/60"
          >
            Back
          </Button>
          <Button 
            onClick={() => currentStep < totalSteps ? setCurrentStep(currentStep + 1) : onClose?.()}
            className="bg-gold text-black hover:bg-white transition-colors px-12 font-bold"
            disabled={currentStep === 1 && !customData.temple}
          >
            {currentStep === totalSteps ? "Finish Summary" : "Next Step"}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl overflow-y-auto px-6">
      <div className="max-w-[1400px] mx-auto min-h-screen flex flex-col">
        <header className="py-6 flex justify-between items-center border-b border-white/10">
          <img src="/logo-sasan.png" alt="SASAN" className="h-12 w-auto" />
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </header>

        <main className="flex-1">
          <AnimatePresence mode="wait">
            {mode === "selection" && (
              <motion.div key="selection" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                {renderSelection()}
              </motion.div>
            )}
            {mode === "package" && (
              <motion.div key="package" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                {renderPackageMode()}
              </motion.div>
            )}
            {mode === "custom" && (
              <motion.div key="custom" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                {renderCustomMode()}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
