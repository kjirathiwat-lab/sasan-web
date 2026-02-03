import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, Wand2, ChevronRight, ChevronLeft, ChevronDown, ChevronUp,
  Users, Flower2, Camera, Video, Music, Gift, Car, UserCheck,
  Check, X, Sparkles, Crown, BookOpen, BookText, Gem,
  Phone, MessageCircle, MapPin, Calendar, Coffee, UtensilsCrossed
} from 'lucide-react';

// ==================== TYPES ====================
interface ServiceSelectorProps {
  onClose?: () => void;
}

// ==================== DATA ====================
const packages = [
  {
    id: 'memoir',
    name: 'The Memoir',
    nameTh: 'เดอะ เมมัวร์',
    tagline: 'ความทรงจำอันอบอุ่น',
    icon: BookOpen,
    gradient: 'from-slate-700 to-slate-900',
    accent: '#93c5fd',
    days: 3,
    guestMin: 30,
    guestMax: 80,
    basePrice: 45000,
    includes: [
      'ค่าเช่าศาลา 3 คืน', 'ค่าเมรุและฌาปนกิจ', 'ดอกไม้ตกแต่ง Basic',
      'น้ำดื่ม-ขนม-กาแฟ 3 วัน', 'โลงไม้ธรรมดา', 'รถรับศพ',
      'ของชำร่วย 100 ชุด', 'ดอกไม้จันทน์ 100 ดอก', 'ทีมงานดูแล 8-10 คน',
    ],
    caskets: [
      { name: 'โลงไม้ธรรมดา', price: 0 },
      { name: 'โลงไม้สัก', price: 5000 },
      { name: '🌿 โลงไม้ไผ่สาน (Eco)', price: 3000, eco: true },
    ],
  },
  {
    id: 'narrative',
    name: 'The Narrative',
    nameTh: 'เดอะ แนร์ราทีฟ',
    tagline: 'บอกเล่าเรื่องราว',
    icon: BookText,
    gradient: 'from-amber-800 to-amber-950',
    accent: '#fcd34d',
    days: 5,
    guestMin: 80,
    guestMax: 150,
    basePrice: 120000,
    includes: [
      'ค่าเช่าศาลา 5 คืน', 'ค่าเมรุและฌาปนกิจ', 'ดอกไม้ตกแต่งระดับกลาง + พวงหรีด 3 พวง',
      'น้ำดื่ม-ขนม-กาแฟ + Snack Box 100', 'โลงไม้สัก', 'รถรับศพ VIP',
      'ของชำร่วย 250 ชุด', 'ดอกไม้จันทน์ 175 ดอก', 'ช่างภาพ-วีดีโอ',
      'พนักงานยกโลง 6 คน', 'ทีมงานดูแล 12-15 คน',
    ],
    caskets: [
      { name: 'โลงไม้สัก', price: 0 },
      { name: 'โลงโลหะ', price: 8000 },
      { name: '🌿 โลงไม้ไผ่สาน (Eco)', price: 3000, eco: true },
    ],
  },
  {
    id: 'legacy',
    name: 'The Legacy',
    nameTh: 'เดอะ เลกาซี่',
    tagline: 'เกียรติยศสืบสาน',
    icon: Crown,
    gradient: 'from-purple-800 to-purple-950',
    accent: '#c4b5fd',
    days: 7,
    guestMin: 150,
    guestMax: 300,
    basePrice: 350000,
    recommended: true,
    includes: [
      'ค่าเช่าศาลาแอร์ VIP 7 คืน', 'ค่าเมรุ VIP พิเศษ', 'ดอกไม้ Premium Design + พวงหรีด 4 พวง',
      'เครื่องดื่มครบ + ขนม Premium + บุฟเฟต์วันเผา', 'โลงไม้สักทอง', 'รถรับศพ VIP',
      'ของชำร่วย 450 ชุด', 'ดอกไม้จันทน์ 350 ดอก', 'ช่างภาพ-วีดีโอ Full Day',
      'พนักงานยกโลง 8 คน', 'โต๊ะจีน VIP 2 โต๊ะ', 'ทีมงานดูแล 15-20 คน',
    ],
    caskets: [
      { name: 'โลงไม้สักทอง', price: 0 },
      { name: 'โลงสแตนเลส', price: 15000 },
      { name: '🌿 โลงไม้ไผ่สาน Premium (Eco)', price: 10000, eco: true },
    ],
  },
  {
    id: 'masterpiece',
    name: 'The Masterpiece',
    nameTh: 'เดอะ มาสเตอร์พีซ',
    tagline: 'ผลงานชิ้นเอก',
    icon: Gem,
    gradient: 'from-yellow-600 to-yellow-900',
    accent: '#fde047',
    days: 7,
    guestMin: 300,
    guestMax: 500,
    basePrice: 800000,
    allInclusive: true,
    includes: [
      'ค่าเช่าศาลาแอร์ Royal Suite 7+ คืน', 'ค่าเมรุ Royal Design พิเศษสุด',
      'ดอกไม้ Signature Design + พวงหรีด 5 พวง', 'Premium Bar + Fine Dining + บุฟเฟต์ทุกวัน',
      'โลง Custom Design', 'รถรับศพ Luxury', 'ของชำร่วย 600 ชุด', 'ดอกไม้จันทน์ 500 ดอก',
      'ช่างภาพ-วีดีโอ Full Coverage + Memorial Video', 'พนักงานยกโลง 10 คน',
      'โต๊ะจีน VIP 4 โต๊ะ', 'Live Streaming', 'หน้าอนุสรณ์ออนไลน์', 'Digital Guestbook', 'ทีมงานดูแล 20-25 คน',
    ],
    caskets: [
      { name: 'โลง Custom Design', price: 0 },
      { name: 'โลง Imported', price: 50000 },
      { name: '🌿 โลง Eco Luxury', price: 30000, eco: true },
    ],
  },
];

const addons = {
  floral: [
    { id: 'basic', name: 'Basic', price: 0 },
    { id: 'premium', name: 'Premium', price: 15000 },
    { id: 'signature', name: 'Signature', price: 30000 },
  ],
  photoVideo: [
    { id: 'none', name: 'ไม่ต้องการ', price: 0 },
    { id: 'basic', name: 'Basic', price: 15000 },
    { id: 'fullday', name: 'Full Day', price: 25000 },
  ],
  memorial: [
    { id: 'no', name: 'ไม่ต้องการ', price: 0 },
    { id: 'yes', name: 'Memorial Video', price: 25000 },
  ],
  streaming: [
    { id: 'no', name: 'ไม่ต้องการ', price: 0 },
    { id: 'yes', name: 'Live Streaming', price: 20000 },
  ],
};

const temples = [
  { id: 't1', name: 'วัดธาตุทอง', area: 'เขตวัฒนา', pricePerDay: 15000 },
  { id: 't2', name: 'วัดมกุฏกษัตริยาราม', area: 'เขตพระนคร', pricePerDay: 20000 },
  { id: 't3', name: 'วัดเทพศิรินทราวาส', area: 'เขตป้อมปราบฯ', pricePerDay: 25000 },
  { id: 't4', name: 'วัดพระศรีมหาธาตุ', area: 'เขตบางเขน', pricePerDay: 18000 },
];

const caskets = [
  { id: 'c1', name: 'โลงไม้ธรรมดา', price: 8000 },
  { id: 'c2', name: 'โลงไม้สัก', price: 15000 },
  { id: 'c3', name: 'โลงไม้สักทอง', price: 25000 },
  { id: 'c4', name: 'โลงโลหะ/สแตนเลส', price: 35000 },
  { id: 'c5', name: '🌿 โลงไม้ไผ่สาน (Eco)', price: 12000, eco: true },
  { id: 'c6', name: '🌿 โลงผักตบชวา (Eco)', price: 10000, eco: true },
];

const cremations = [
  { id: 'cr1', name: 'เมรุธรรมดา', price: 8000 },
  { id: 'cr2', name: 'เมรุกลาง', price: 15000 },
  { id: 'cr3', name: 'เมรุ VIP', price: 30000 },
  { id: 'cr4', name: 'เมรุ Royal', price: 50000 },
];

const florals = [
  { id: 'f1', name: 'ขาวสง่างาม', price: 15000 },
  { id: 'f2', name: 'ธรรมชาติสงบ', price: 20000 },
  { id: 'f3', name: 'ทองหรูหรา', price: 25000 },
];

const caterings = [
  { id: 'cat1', name: 'น้ำดื่ม + ขนม + กาแฟ', pricePerDay: 3000 },
  { id: 'cat2', name: 'Snack Box (100 กล่อง)', pricePerDay: 8000 },
  { id: 'cat3', name: 'บุฟเฟต์ (100 คน)', pricePerDay: 35000 },
];

const extras = [
  { id: 'ex1', name: 'ช่างภาพ-วีดีโอ', price: 15000 },
  { id: 'ex2', name: 'Memorial Video', price: 25000 },
  { id: 'ex3', name: 'Live Streaming', price: 20000 },
  { id: 'ex4', name: 'รถรับศพ VIP', price: 8000 },
];

const souvenirs = [
  { id: 's1', name: '100 ชุด', price: 8000 },
  { id: 's2', name: '200 ชุด', price: 15000 },
  { id: 's3', name: '300 ชุด', price: 20000 },
];

const cremationFlowers = [
  { id: 'cf1', name: '100 ดอก', price: 2000 },
  { id: 'cf2', name: '200 ดอก', price: 4000 },
  { id: 'cf3', name: '300 ดอก', price: 6000 },
];

const pallbearers = [
  { id: 'pb1', name: '6 คน', price: 6000 },
  { id: 'pb2', name: '8 คน', price: 8000 },
  { id: 'pb3', name: '10 คน', price: 10000 },
];

const formatPrice = (price: number) => new Intl.NumberFormat('th-TH').format(price);

// ==================== MAIN COMPONENT ====================
export default function ServiceSelector({ onClose }: ServiceSelectorProps) {
  const [mode, setMode] = useState<'select' | 'package' | 'custom'>('select');
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [packageStep, setPackageStep] = useState<'list' | 'customize' | 'summary'>('list');
  const [customStep, setCustomStep] = useState(1);
  const [showContact, setShowContact] = useState(false);
  const [showIncludes, setShowIncludes] = useState(false);

  const [packageOptions, setPackageOptions] = useState({
    guests: 50, casket: '', floral: 'basic', photoVideo: 'none', memorial: 'no', streaming: 'no',
  });

  const [customData, setCustomData] = useState({
    temple: '', days: 3, guests: 100, casket: '', cremation: '', floral: '',
    catering: [] as string[], souvenir: '', cremationFlower: '', pallbearer: '', extras: [] as string[],
  });

  const selectedPkg = packages.find(p => p.id === selectedPackageId);

  const calculatePackageTotal = () => {
    if (!selectedPkg) return 0;
    let total = selectedPkg.basePrice;
    const casket = selectedPkg.caskets.find(c => c.name === packageOptions.casket);
    if (casket) total += casket.price;
    if (!selectedPkg.allInclusive) {
      const floral = addons.floral.find(f => f.id === packageOptions.floral);
      if (floral) total += floral.price;
      const photo = addons.photoVideo.find(p => p.id === packageOptions.photoVideo);
      if (photo) total += photo.price;
      const memorial = addons.memorial.find(m => m.id === packageOptions.memorial);
      if (memorial) total += memorial.price;
      const streaming = addons.streaming.find(s => s.id === packageOptions.streaming);
      if (streaming) total += streaming.price;
    }
    return total;
  };

  const calculateCustomTotal = () => {
    let total = 0;
    const temple = temples.find(t => t.id === customData.temple);
    if (temple) total += temple.pricePerDay * customData.days;
    const casket = caskets.find(c => c.id === customData.casket);
    if (casket) total += casket.price;
    const cremation = cremations.find(c => c.id === customData.cremation);
    if (cremation) total += cremation.price;
    const floral = florals.find(f => f.id === customData.floral);
    if (floral) total += floral.price;
    customData.catering.forEach(catId => {
      const cat = caterings.find(c => c.id === catId);
      if (cat) total += cat.pricePerDay * customData.days;
    });
    const souvenir = souvenirs.find(s => s.id === customData.souvenir);
    if (souvenir) total += souvenir.price;
    const cflower = cremationFlowers.find(f => f.id === customData.cremationFlower);
    if (cflower) total += cflower.price;
    const pallbearer = pallbearers.find(p => p.id === customData.pallbearer);
    if (pallbearer) total += pallbearer.price;
    customData.extras.forEach(extId => {
      const ext = extras.find(e => e.id === extId);
      if (ext) total += ext.price;
    });
    return total;
  };

  const handleSelectPackage = (pkgId: string) => {
    const pkg = packages.find(p => p.id === pkgId);
    if (pkg) {
      setSelectedPackageId(pkgId);
      setPackageOptions({ ...packageOptions, guests: pkg.guestMin, casket: pkg.caskets[0].name });
      setPackageStep('customize');
    }
  };

  const handleReset = () => {
    setMode('select');
    setSelectedPackageId(null);
    setPackageStep('list');
    setCustomStep(1);
  };

  const OptionButton = ({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button onClick={onClick} className={`px-4 py-2 rounded-lg text-sm transition-all ${selected ? 'bg-gold text-black font-semibold' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
      {children}
    </button>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black z-50 overflow-auto">
      {onClose && (
        <button onClick={onClose} className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <X className="w-6 h-6 text-white" />
        </button>
      )}

      <div className="min-h-screen text-white">
        <div className="max-w-2xl mx-auto px-4 py-8">
          
          {/* Mode Selection */}
          {mode === 'select' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-gold mb-2">One Stop Service</h1>
                <p className="text-white/60">เลือกรูปแบบบริการที่ต้องการ</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setMode('package')} className="p-6 rounded-2xl border-2 border-white/20 hover:border-gold/50 bg-white/5 hover:bg-gold/5 transition-all text-left group">
                  <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/30 transition-colors">
                    <Package className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Package Mode</h3>
                  <p className="text-white/60 text-sm mb-4">เลือกแพ็คเกจสำเร็จรูป ครบจบในที่เดียว</p>
                  <div className="flex items-center text-gold text-sm"><span>เลือกแพ็คเกจ</span><ChevronRight className="w-4 h-4 ml-1" /></div>
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setMode('custom')} className="p-6 rounded-2xl border-2 border-white/20 hover:border-purple-500/50 bg-white/5 hover:bg-purple-500/5 transition-all text-left group">
                  <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                    <Wand2 className="w-7 h-7 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Custom Mode</h3>
                  <p className="text-white/60 text-sm mb-4">ออกแบบงานตามความต้องการ</p>
                  <div className="flex items-center text-purple-400 text-sm"><span>ออกแบบเอง</span><ChevronRight className="w-4 h-4 ml-1" /></div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Package List */}
          {mode === 'package' && packageStep === 'list' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="flex items-center gap-4">
                <button onClick={handleReset} className="p-2 rounded-lg hover:bg-white/10"><ChevronLeft className="w-6 h-6" /></button>
                <div><h2 className="text-2xl font-bold">เลือกแพ็คเกจ</h2><p className="text-white/60 text-sm">เลือกแพ็คเกจที่เหมาะกับคุณ</p></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packages.map((pkg) => {
                  const Icon = pkg.icon;
                  return (
                    <motion.button key={pkg.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleSelectPackage(pkg.id)} className={`relative p-5 rounded-2xl text-left transition-all bg-gradient-to-br ${pkg.gradient} ${selectedPackageId === pkg.id ? 'ring-2 ring-gold shadow-lg' : 'opacity-80 hover:opacity-100'}`}>
                      {pkg.recommended && <div className="absolute -top-3 right-4 bg-gold text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><Sparkles className="w-3 h-3" />แนะนำ</div>}
                      {pkg.allInclusive && <div className="absolute -top-3 left-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">All Inclusive</div>}
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center"><Icon className="w-6 h-6" style={{ color: pkg.accent }} /></div>
                        {selectedPackageId === pkg.id && <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center"><Check className="w-5 h-5 text-black" /></div>}
                      </div>
                      <h3 className="text-xl font-serif font-bold">{pkg.name}</h3>
                      <p className="text-white/80 text-sm">{pkg.nameTh}</p>
                      <p className="text-sm mt-1" style={{ color: pkg.accent }}>{pkg.tagline}</p>
                      <div className="mt-3 text-xs text-white/60 space-y-1">
                        <div className="flex items-center gap-2"><Calendar className="w-3 h-3" /><span>{pkg.days} วัน</span></div>
                        <div className="flex items-center gap-2"><Users className="w-3 h-3" /><span>{pkg.guestMin}-{pkg.guestMax} คน/วัน</span></div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-white/20">
                        <div className="text-lg font-bold" style={{ color: pkg.accent }}>฿{formatPrice(pkg.basePrice)}{!pkg.allInclusive && <span className="text-xs font-normal text-white/60"> เริ่มต้น</span>}</div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Package Customize */}
          {mode === 'package' && packageStep === 'customize' && selectedPkg && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="flex items-center gap-4">
                <button onClick={() => setPackageStep('list')} className="p-2 rounded-lg hover:bg-white/10"><ChevronLeft className="w-6 h-6" /></button>
                <div><h2 className="text-2xl font-bold flex items-center gap-2"><selectedPkg.icon className="w-6 h-6" style={{ color: selectedPkg.accent }} />{selectedPkg.name}</h2><p className="text-white/60 text-sm">{selectedPkg.nameTh}</p></div>
              </div>

              {/* Includes */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <button onClick={() => setShowIncludes(!showIncludes)} className="w-full flex items-center justify-between">
                  <span className="font-semibold flex items-center gap-2"><Check className="w-5 h-5 text-green-400" />รายการที่รวมอยู่ในแพ็คเกจ</span>
                  {showIncludes ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                <AnimatePresence>
                  {showIncludes && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 text-sm text-white/80">
                        {selectedPkg.includes.map((item, i) => <div key={i} className="flex items-start gap-2"><span className="text-gold">✓</span>{item}</div>)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Guest Slider */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm text-white/60 flex items-center gap-2"><Users className="w-4 h-4" />จำนวนแขก (ต่อวัน)</label>
                  <span className="text-lg font-bold" style={{ color: selectedPkg.accent }}>{packageOptions.guests} คน</span>
                </div>
                <input type="range" min={selectedPkg.guestMin} max={selectedPkg.guestMax} value={packageOptions.guests} onChange={(e) => setPackageOptions({ ...packageOptions, guests: parseInt(e.target.value) })} className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer" />
                <div className="flex justify-between text-xs text-white/40 mt-1"><span>{selectedPkg.guestMin}</span><span>{selectedPkg.guestMax}</span></div>
              </div>

              {/* Casket */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <label className="text-sm text-white/60 mb-3 block">เลือกแบบโลงศพ</label>
                <div className="flex flex-wrap gap-2">
                  {selectedPkg.caskets.map((c) => <OptionButton key={c.name} selected={packageOptions.casket === c.name} onClick={() => setPackageOptions({ ...packageOptions, casket: c.name })}>{c.name}{c.price > 0 && ` (+฿${formatPrice(c.price)})`}</OptionButton>)}
                </div>
              </div>

              {!selectedPkg.allInclusive && (
                <>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <label className="text-sm text-white/60 mb-3 block flex items-center gap-2"><Flower2 className="w-4 h-4" />อัพเกรดดอกไม้</label>
                    <div className="flex flex-wrap gap-2">
                      {addons.floral.map((f) => <OptionButton key={f.id} selected={packageOptions.floral === f.id} onClick={() => setPackageOptions({ ...packageOptions, floral: f.id })}>{f.name}{f.price > 0 && ` (+฿${formatPrice(f.price)})`}</OptionButton>)}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <label className="text-sm text-white/60 mb-3 block flex items-center gap-2"><Camera className="w-4 h-4" />ช่างภาพ-วีดีโอ</label>
                    <div className="flex flex-wrap gap-2">
                      {addons.photoVideo.map((p) => <OptionButton key={p.id} selected={packageOptions.photoVideo === p.id} onClick={() => setPackageOptions({ ...packageOptions, photoVideo: p.id })}>{p.name}{p.price > 0 && ` (+฿${formatPrice(p.price)})`}</OptionButton>)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <label className="text-sm text-white/60 mb-3 block">Memorial Video</label>
                      <div className="flex flex-wrap gap-2">
                        {addons.memorial.map((m) => <OptionButton key={m.id} selected={packageOptions.memorial === m.id} onClick={() => setPackageOptions({ ...packageOptions, memorial: m.id })}>{m.name === 'ไม่ต้องการ' ? 'ไม่' : 'ใช่'}{m.price > 0 && ` (+฿${formatPrice(m.price)})`}</OptionButton>)}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <label className="text-sm text-white/60 mb-3 block">Live Streaming</label>
                      <div className="flex flex-wrap gap-2">
                        {addons.streaming.map((s) => <OptionButton key={s.id} selected={packageOptions.streaming === s.id} onClick={() => setPackageOptions({ ...packageOptions, streaming: s.id })}>{s.name === 'ไม่ต้องการ' ? 'ไม่' : 'ใช่'}{s.price > 0 && ` (+฿${formatPrice(s.price)})`}</OptionButton>)}
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="sticky bottom-0 bg-black/95 backdrop-blur-sm border-t border-white/10 p-4 -mx-4 mt-6">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm text-white/60">ราคารวม</p><p className="text-2xl font-bold text-gold">฿{formatPrice(calculatePackageTotal())}</p></div>
                  <button onClick={() => setPackageStep('summary')} className="px-6 py-3 bg-gold text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors">ดูสรุปรายการ</button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Package Summary */}
          {mode === 'package' && packageStep === 'summary' && selectedPkg && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
              <div className="flex items-center gap-4">
                <button onClick={() => setPackageStep('customize')} className="p-2 rounded-lg hover:bg-white/10"><ChevronLeft className="w-6 h-6" /></button>
                <h2 className="text-2xl font-bold">สรุปรายการ</h2>
              </div>
              <div className="rounded-2xl p-6 border bg-gradient-to-br from-gold/20 to-amber-900/20 border-gold/30">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-4">
                  <selectedPkg.icon className="w-8 h-8" style={{ color: selectedPkg.accent }} />
                  <div><h3 className="text-xl font-bold">{selectedPkg.name}</h3><p className="text-white/60">{selectedPkg.nameTh}</p></div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-white/60">📅 ระยะเวลา</span><span>{selectedPkg.days} วัน</span></div>
                  <div className="flex justify-between"><span className="text-white/60">👥 จำนวนแขก</span><span>{packageOptions.guests} คน/วัน</span></div>
                  <div className="flex justify-between"><span className="text-white/60">⚰️ โลงศพ</span><span>{packageOptions.casket}</span></div>
                </div>
                <div className="mt-6 pt-4 border-t border-gold/30">
                  <div className="flex justify-between items-center text-xl font-bold"><span>รวมทั้งสิ้น</span><span className="text-gold">฿{formatPrice(calculatePackageTotal())}</span></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setPackageStep('customize')} className="py-4 rounded-xl border border-white/20 hover:bg-white/10 transition-colors font-semibold">← แก้ไข</button>
                <button onClick={() => setShowContact(true)} className="py-4 rounded-xl bg-gold text-black font-bold hover:bg-yellow-400 transition-colors">✓ ยืนยัน</button>
              </div>
            </motion.div>
          )}

          {/* Custom Mode */}
          {mode === 'custom' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="flex items-center gap-4">
                <button onClick={() => { if (customStep > 1) setCustomStep(customStep - 1); else handleReset(); }} className="p-2 rounded-lg hover:bg-white/10"><ChevronLeft className="w-6 h-6" /></button>
                <div className="flex-1"><h2 className="text-xl font-bold">ออกแบบงานเอง</h2><p className="text-white/60 text-sm">ขั้นตอนที่ {customStep} จาก 7</p></div>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" initial={{ width: 0 }} animate={{ width: `${(customStep / 7) * 100}%` }} transition={{ duration: 0.3 }} />
              </div>

              <AnimatePresence mode="wait">
                {customStep === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
                    <div><h3 className="text-xl font-bold mb-2">เลือกวัด/สถานที่</h3><p className="text-white/60 text-sm">เลือกสถานที่จัดงาน</p></div>
                    <div className="space-y-3">
                      {temples.map((temple) => (
                        <button key={temple.id} onClick={() => setCustomData({ ...customData, temple: temple.id })} className={`w-full p-4 rounded-xl text-left transition-all flex justify-between items-center ${customData.temple === temple.id ? 'bg-purple-500/20 border-2 border-purple-500' : 'bg-white/5 border-2 border-transparent hover:bg-white/10'}`}>
                          <div><p className="font-semibold">{temple.name}</p><p className="text-sm text-white/60">{temple.area}</p></div>
                          <p className="text-purple-400 font-bold">฿{formatPrice(temple.pricePerDay)}/วัน</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {customStep === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                    <div><h3 className="text-xl font-bold mb-2">จำนวนวันและแขก</h3></div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <label className="text-sm text-white/60 mb-3 block">จำนวนวัน</label>
                      <div className="grid grid-cols-4 gap-3">
                        {[3, 5, 7, 9].map((d) => <button key={d} onClick={() => setCustomData({ ...customData, days: d })} className={`py-4 rounded-xl text-center transition-all ${customData.days === d ? 'bg-purple-500 text-white' : 'bg-white/10 hover:bg-white/20'}`}><p className="text-2xl font-bold">{d}</p><p className="text-xs">วัน</p></button>)}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex justify-between items-center mb-3"><label className="text-sm text-white/60">จำนวนแขก</label><span className="text-lg font-bold text-purple-400">{customData.guests} คน</span></div>
                      <input type="range" min={30} max={500} value={customData.guests} onChange={(e) => setCustomData({ ...customData, guests: parseInt(e.target.value) })} className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer" />
                    </div>
                  </motion.div>
                )}

                {customStep === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
                    <div><h3 className="text-xl font-bold mb-2">เลือกโลงศพ</h3><p className="text-white/60 text-sm">มี Eco-Friendly 🌿</p></div>
                    <div className="space-y-3">
                      {caskets.map((casket) => (
                        <button key={casket.id} onClick={() => setCustomData({ ...customData, casket: casket.id })} className={`w-full p-4 rounded-xl text-left transition-all flex justify-between items-center ${customData.casket === casket.id ? 'bg-purple-500/20 border-2 border-purple-500' : 'bg-white/5 border-2 border-transparent hover:bg-white/10'}`}>
                          <div><p className="font-semibold">{casket.name}</p>{casket.eco && <p className="text-xs text-green-400 mt-1">🌿 เป็นมิตรกับสิ่งแวดล้อม</p>}</div>
                          <p className="text-purple-400 font-bold">฿{formatPrice(casket.price)}</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {customStep === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
                    <div><h3 className="text-xl font-bold mb-2">เลือกเมรุ</h3></div>
                    <div className="grid grid-cols-2 gap-3">
                      {cremations.map((cr) => <button key={cr.id} onClick={() => setCustomData({ ...customData, cremation: cr.id })} className={`p-4 rounded-xl text-center transition-all ${customData.cremation === cr.id ? 'bg-purple-500 text-white' : 'bg-white/5 hover:bg-white/10'}`}><p className="font-semibold">{cr.name}</p><p className="text-sm mt-1">฿{formatPrice(cr.price)}</p></button>)}
                    </div>
                  </motion.div>
                )}

                {customStep === 5 && (
                  <motion.div key="step5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                    <div><h3 className="text-xl font-bold mb-2">ดอกไม้และอาหาร</h3></div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <label className="text-sm text-white/60 mb-3 block">💐 สไตล์ดอกไม้</label>
                      <div className="grid grid-cols-3 gap-2">
                        {florals.map((f) => <button key={f.id} onClick={() => setCustomData({ ...customData, floral: f.id })} className={`p-3 rounded-lg text-center transition-all ${customData.floral === f.id ? 'bg-purple-500/30 border border-purple-500' : 'bg-white/5 border border-transparent hover:bg-white/10'}`}><p className="font-semibold text-sm">{f.name}</p><p className="text-xs text-purple-400">฿{formatPrice(f.price)}</p></button>)}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <label className="text-sm text-white/60 mb-3 block">🍽️ บริการอาหาร</label>
                      <div className="space-y-2">
                        {caterings.map((cat) => {
                          const isSelected = customData.catering.includes(cat.id);
                          return <button key={cat.id} onClick={() => { const newCatering = isSelected ? customData.catering.filter(c => c !== cat.id) : [...customData.catering, cat.id]; setCustomData({ ...customData, catering: newCatering }); }} className={`w-full p-3 rounded-lg text-left transition-all flex justify-between items-center ${isSelected ? 'bg-purple-500/30 border border-purple-500' : 'bg-white/5 border border-transparent hover:bg-white/10'}`}><span className="text-sm">{cat.name}</span><span className="text-sm text-purple-400">฿{formatPrice(cat.pricePerDay)}/วัน</span></button>;
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {customStep === 6 && (
                  <motion.div key="step6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                    <div><h3 className="text-xl font-bold mb-2">ของชำร่วยและดอกไม้จันทน์</h3></div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <label className="text-sm text-white/60 mb-3 block">🎁 ของชำร่วย</label>
                      <div className="flex flex-wrap gap-2">{souvenirs.map((s) => <OptionButton key={s.id} selected={customData.souvenir === s.id} onClick={() => setCustomData({ ...customData, souvenir: s.id })}>{s.name} (฿{formatPrice(s.price)})</OptionButton>)}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <label className="text-sm text-white/60 mb-3 block">🌸 ดอกไม้จันทน์</label>
                      <div className="flex flex-wrap gap-2">{cremationFlowers.map((f) => <OptionButton key={f.id} selected={customData.cremationFlower === f.id} onClick={() => setCustomData({ ...customData, cremationFlower: f.id })}>{f.name} (฿{formatPrice(f.price)})</OptionButton>)}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <label className="text-sm text-white/60 mb-3 block">👥 พนักงานยกโลง</label>
                      <div className="flex flex-wrap gap-2">{pallbearers.map((p) => <OptionButton key={p.id} selected={customData.pallbearer === p.id} onClick={() => setCustomData({ ...customData, pallbearer: p.id })}>{p.name} (฿{formatPrice(p.price)})</OptionButton>)}</div>
                    </div>
                  </motion.div>
                )}

                {customStep === 7 && (
                  <motion.div key="step7" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
                    <div><h3 className="text-xl font-bold mb-2">บริการเสริม</h3><p className="text-white/60 text-sm">Optional</p></div>
                    <div className="space-y-2">
                      {extras.map((ext) => {
                        const isSelected = customData.extras.includes(ext.id);
                        return <button key={ext.id} onClick={() => { const newExtras = isSelected ? customData.extras.filter(e => e !== ext.id) : [...customData.extras, ext.id]; setCustomData({ ...customData, extras: newExtras }); }} className={`w-full p-4 rounded-xl text-left transition-all flex justify-between items-center ${isSelected ? 'bg-purple-500/20 border-2 border-purple-500' : 'bg-white/5 border-2 border-transparent hover:bg-white/10'}`}><span>{ext.name}</span><span className="text-purple-400 font-bold">฿{formatPrice(ext.price)}</span></button>;
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="sticky bottom-0 bg-black/95 backdrop-blur-sm border-t border-white/10 p-4 -mx-4">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm text-white/60">ราคาประมาณ</p><p className="text-xl font-bold text-purple-400">฿{formatPrice(calculateCustomTotal())}</p></div>
                  <button onClick={() => { if (customStep < 7) setCustomStep(customStep + 1); else setShowContact(true); }} className="px-6 py-3 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-400 transition-colors flex items-center gap-2">{customStep === 7 ? 'ดูสรุป' : 'ถัดไป'}<ChevronRight className="w-5 h-5" /></button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContact && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setShowContact(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-zinc-900 rounded-2xl p-6 max-w-md w-full border border-white/10" onClick={(e) => e.stopPropagation()}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-green-400" /></div>
                <h3 className="text-2xl font-bold mb-2">ขอบคุณค่ะ</h3>
                <p className="text-white/60">ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง</p>
              </div>
              <div className="space-y-3">
                <a href="tel:0812345678" className="w-full py-4 rounded-xl bg-gold text-black font-bold flex items-center justify-center gap-3 hover:bg-yellow-400 transition-colors"><Phone className="w-5 h-5" />โทร 081-234-5678</a>
                <a href="https://line.me/ti/p/@sasan" target="_blank" rel="noopener noreferrer" className="w-full py-4 rounded-xl bg-green-500 text-white font-bold flex items-center justify-center gap-3 hover:bg-green-400 transition-colors"><MessageCircle className="w-5 h-5" />LINE: @sasan</a>
              </div>
              <button onClick={() => setShowContact(false)} className="w-full mt-4 py-3 text-white/60 hover:text-white transition-colors">ปิด</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`.text-gold{color:#D4AF37}.bg-gold{background-color:#D4AF37}.border-gold{border-color:#D4AF37}input[type="range"]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:20px;height:20px;border-radius:50%;background:#D4AF37;cursor:pointer}input[type="range"]::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:#D4AF37;cursor:pointer;border:none}`}</style>
    </motion.div>
  );
}
