import React, { useState } from 'react';

/**
 * SASAN Service Selector - One Stop Service
 * 
 * 2 โหมด:
 * 1. Package Mode - เลือก Package สำเร็จรูป (ปรับได้นิดหน่อย)
 * 2. Custom Mode - ออกแบบเองทุกอย่าง
 */

// ===== DATA =====
const packages = [
  {
    id: 'memoir',
    name: 'The Memoir',
    nameTh: 'เดอะ เมมัวร์',
    tagline: 'ความทรงจำอันอบอุ่น',
    icon: '📖',
    color: 'from-slate-700 to-slate-900',
    accent: '#93c5fd',
    duration: '3 วัน',
    venue: 'วัดขนาดเล็ก',
    guests: '30-80 คน/วัน',
    price: { min: 45000, max: 55000 },
    includes: [
      'ค่าเช่าศาลา 3 คืน',
      'ค่าเมรุและฌาปนกิจ',
      'ดอกไม้ตกแต่งหน้างาน',
      'ธูปเทียน 3 คืน',
      'น้ำดื่ม-ขนม-กาแฟ 3 คืน',
      'รถรับศพ',
      'ของชำร่วย 100 ชุด',
      'ดอกไม้จันทน์ 100 ดอก',
      'ทีมงานดูแล 8-10 คน',
    ],
    casketOptions: ['โลงไม้ธรรมดา', 'โลงไม้สัก (+5,000)'],
  },
  {
    id: 'narrative',
    name: 'The Narrative',
    nameTh: 'เดอะ แนร์ราทีฟ',
    tagline: 'บอกเล่าเรื่องราว',
    icon: '📚',
    color: 'from-amber-800 to-amber-950',
    accent: '#fcd34d',
    duration: '5 วัน',
    venue: 'วัดขนาดกลาง',
    guests: '80-150 คน/วัน',
    price: { min: 120000, max: 150000 },
    includes: [
      'ค่าเช่าศาลา 5 คืน',
      'ค่าเมรุและฌาปนกิจ',
      'ดอกไม้ตกแต่งระดับกลาง',
      'พวงหรีดตัวอย่าง 3 พวง',
      'ธูปเทียน 5 คืน',
      'น้ำดื่ม-ขนม-กาแฟ 5 คืน',
      'Snack Box 100 กล่อง',
      'รถรับศพ VIP',
      'พนักงานยกโลง 6 คน',
      'ของชำร่วย 200-300 ชุด',
      'ดอกไม้จันทน์ 150-200 ดอก',
      'ช่างภาพ-วีดีโอ',
      'ทีมงานดูแล 12-15 คน',
    ],
    casketOptions: ['โลงไม้สัก', 'โลงโลหะ (+8,000)', 'โลงไม้ไผ่สาน Eco (+3,000)'],
  },
  {
    id: 'legacy',
    name: 'The Legacy',
    nameTh: 'เดอะ เลกาซี่',
    tagline: 'เกียรติยศสืบสาน',
    icon: '👑',
    color: 'from-purple-800 to-purple-950',
    accent: '#c4b5fd',
    duration: '7 วัน',
    venue: 'วัดขนาดใหญ่',
    guests: '150-300 คน/วัน',
    price: { min: 350000, max: 450000 },
    recommended: true,
    includes: [
      'ค่าเช่าศาลาแอร์ VIP 7 คืน',
      'ค่าเมรุและฌาปนกิจพิเศษ',
      'ดอกไม้ตกแต่ง Premium Design',
      'พวงหรีดตัวอย่าง 4 พวง',
      'ดอกไม้ตกแต่งโต๊ะ VIP',
      'ธูปเทียนพิเศษ 7 คืน',
      'น้ำดื่ม-เครื่องดื่มครบ 7 คืน',
      'ขนม Premium 7 คืน',
      'Snack Box พิเศษ 200 กล่อง',
      'Catering บุฟเฟต์วันเผา',
      'โต๊ะจีนแขก VIP 1-2 โต๊ะ',
      'รถรับศพ VIP',
      'พนักงานยกโลง 8 คน',
      'ของชำร่วย Premium 400-500 ชุด',
      'ดอกไม้จันทน์ 300-400 ดอก',
      'ช่างภาพ-วีดีโอ Full Day',
      'ทีมงานดูแลเต็มระบบ 15-20 คน',
    ],
    casketOptions: ['โลงไม้สักทอง', 'โลงสแตนเลส (+15,000)', 'โลงไม้ไผ่สาน Premium Eco (+10,000)'],
  },
  {
    id: 'masterpiece',
    name: 'The Masterpiece',
    nameTh: 'เดอะ มาสเตอร์พีซ',
    tagline: 'ผลงานชิ้นเอก',
    icon: '💎',
    color: 'from-yellow-700 to-yellow-900',
    accent: '#fde047',
    duration: '7+ วัน',
    venue: 'วัดระดับพิเศษ',
    guests: '300-500 คน/วัน',
    price: { min: 800000, max: 1000000 },
    includes: [
      'ค่าเช่าศาลาแอร์ Royal Suite 7+ คืน',
      'ค่าเมรุพิเศษสุด Royal Design',
      'ดอกไม้ตกแต่ง Signature Design',
      'พวงหรีดตัวอย่าง 5 พวง',
      'ดอกไม้ตกแต่งโต๊ะ VIP ทุกโต๊ะ',
      'ธูปเทียนพิเศษสุด 7+ คืน',
      'เครื่องดื่ม Premium Bar',
      'อาหาร Fine Dining',
      'Snack Box Premium 300 กล่อง',
      'Catering บุฟเฟต์ทุกวัน',
      'โต๊ะจีน VIP 3-4 โต๊ะ',
      'รถรับศพ Luxury',
      'พนักงานยกโลง 10 คน',
      'ของชำร่วย Exclusive 600 ชุด',
      'ดอกไม้จันทน์ 500 ดอก',
      'ช่างภาพ-วีดีโอ Full Coverage',
      'Memorial Video Production',
      'ทีมงานดูแลเต็มระบบ 20-25 คน',
    ],
    casketOptions: ['โลง Custom Design', 'โลง Imported (+50,000)', 'โลง Eco Luxury (+30,000)'],
  },
];

const floralOptions = [
  { id: 'white', name: 'White Elegant', nameTh: 'ขาวสง่างาม', price: 0 },
  { id: 'natural', name: 'Natural Serenity', nameTh: 'ธรรมชาติสงบ', price: 5000 },
  { id: 'gold', name: 'Royal Gold', nameTh: 'ทองหรูหรา', price: 8000 },
];

// Custom Mode Data
const temples = [
  { id: 't1', name: 'วัดธาตุทอง', area: 'เขตวัฒนา', pricePerDay: 15000 },
  { id: 't2', name: 'วัดมกุฏกษัตริยาราม', area: 'เขตพระนคร', pricePerDay: 20000 },
  { id: 't3', name: 'วัดเทพศิรินทราวาส', area: 'เขตป้อมปราบฯ', pricePerDay: 25000 },
  { id: 't4', name: 'วัดพระศรีมหาธาตุ', area: 'เขตบางเขน', pricePerDay: 18000 },
  { id: 't5', name: 'วัดโสมนัสวิหาร', area: 'เขตป้อมปราบฯ', pricePerDay: 22000 },
];

const caskets = [
  { id: 'c1', name: 'โลงไม้ธรรมดา', price: 8000, eco: false },
  { id: 'c2', name: 'โลงไม้สัก', price: 15000, eco: false },
  { id: 'c3', name: 'โลงไม้สักทอง', price: 25000, eco: false },
  { id: 'c4', name: 'โลงโลหะ/สแตนเลส', price: 35000, eco: false },
  { id: 'c5', name: '🌿 โลงไม้ไผ่สาน (Eco)', price: 12000, eco: true },
  { id: 'c6', name: '🌿 โลงผักตบชวา (Eco)', price: 10000, eco: true },
  { id: 'c7', name: '🌿 โลง Eco Premium', price: 20000, eco: true },
];

const cremationOptions = [
  { id: 'cr1', name: 'เมรุธรรมดา', price: 8000 },
  { id: 'cr2', name: 'เมรุกลาง', price: 15000 },
  { id: 'cr3', name: 'เมรุ VIP', price: 30000 },
  { id: 'cr4', name: 'เมรุ Royal', price: 50000 },
];

const cateringOptions = [
  { id: 'f1', name: 'น้ำดื่ม + ขนม + กาแฟ', pricePerDay: 3000 },
  { id: 'f2', name: 'Snack Box (100 กล่อง)', pricePerDay: 8000 },
  { id: 'f3', name: 'บุฟเฟต์ (100 คน)', pricePerDay: 35000 },
  { id: 'f4', name: 'โต๊ะจีน (10 โต๊ะ)', pricePerDay: 50000 },
];

const extras = [
  { id: 'e1', name: 'ช่างภาพ-วีดีโอ', price: 15000 },
  { id: 'e2', name: 'Memorial Video', price: 25000 },
  { id: 'e3', name: 'Live Streaming', price: 20000 },
  { id: 'e4', name: 'หน้าอนุสรณ์ออนไลน์', price: 5000 },
  { id: 'e5', name: 'ของชำร่วย 100 ชุด', price: 8000 },
  { id: 'e6', name: 'ของชำร่วย 300 ชุด', price: 20000 },
  { id: 'e7', name: 'ดอกไม้จันทน์ 200 ดอก', price: 4000 },
  { id: 'e8', name: 'พนักงานยกโลง 6 คน', price: 6000 },
  { id: 'e9', name: 'รถรับศพ VIP', price: 8000 },
];

// ===== COMPONENTS =====

const formatPrice = (price) => {
  return new Intl.NumberFormat('th-TH').format(price);
};

// Mode Selector
const ModeSelector = ({ mode, setMode }) => (
  <div className="flex flex-col sm:flex-row gap-4 mb-8">
    <button
      onClick={() => setMode('package')}
      className={`flex-1 p-6 rounded-2xl border-2 transition-all duration-300 ${
        mode === 'package'
          ? 'border-gold bg-gold/10 shadow-lg shadow-gold/20'
          : 'border-white/20 hover:border-white/40'
      }`}
    >
      <div className="text-4xl mb-3">🎁</div>
      <h3 className="text-xl font-bold mb-2">เลือก Package สำเร็จรูป</h3>
      <p className="text-sm text-white/60">เลือก Package ที่เหมาะกับคุณ ครบจบในตัว</p>
      <div className="mt-3 text-xs text-gold">แนะนำสำหรับผู้ที่ต้องการความสะดวก</div>
    </button>
    
    <button
      onClick={() => setMode('custom')}
      className={`flex-1 p-6 rounded-2xl border-2 transition-all duration-300 ${
        mode === 'custom'
          ? 'border-gold bg-gold/10 shadow-lg shadow-gold/20'
          : 'border-white/20 hover:border-white/40'
      }`}
    >
      <div className="text-4xl mb-3">✨</div>
      <h3 className="text-xl font-bold mb-2">ออกแบบเอง (Custom)</h3>
      <p className="text-sm text-white/60">เลือกทุกรายละเอียดด้วยตัวเอง</p>
      <div className="mt-3 text-xs text-purple-400">สำหรับผู้ที่ต้องการความยืดหยุ่น</div>
    </button>
  </div>
);

// Package Card
const PackageCard = ({ pkg, selected, onSelect }) => (
  <div
    onClick={() => onSelect(pkg.id)}
    className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 bg-gradient-to-br ${pkg.color} ${
      selected === pkg.id
        ? 'ring-2 ring-gold scale-[1.02] shadow-2xl'
        : 'hover:scale-[1.01] opacity-80 hover:opacity-100'
    }`}
  >
    {pkg.recommended && (
      <div className="absolute -top-3 right-4 bg-gold text-black text-xs font-bold px-3 py-1 rounded-full">
        ⭐ แนะนำ
      </div>
    )}
    
    <div className="text-4xl mb-3">{pkg.icon}</div>
    <h3 className="text-2xl font-serif font-bold">{pkg.name}</h3>
    <p className="text-white/80">{pkg.nameTh}</p>
    <p className="text-sm mt-1" style={{ color: pkg.accent }}>{pkg.tagline}</p>
    
    <div className="mt-4 text-sm text-white/60">
      {pkg.duration} • {pkg.venue} • {pkg.guests}
    </div>
    
    <div className="mt-4 pt-4 border-t border-white/20">
      <div className="text-2xl font-bold" style={{ color: pkg.accent }}>
        ฿{formatPrice(pkg.price.min)} - {formatPrice(pkg.price.max)}
      </div>
    </div>
    
    {selected === pkg.id && (
      <div className="absolute top-4 right-4 w-8 h-8 bg-gold rounded-full flex items-center justify-center">
        <span className="text-black">✓</span>
      </div>
    )}
  </div>
);

// Package Details (after selection)
const PackageDetails = ({ pkg, options, setOptions }) => (
  <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10">
    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
      <span>{pkg.icon}</span>
      {pkg.name} - รายการที่รวมอยู่แล้ว
    </h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
      {pkg.includes.map((item, i) => (
        <div key={i} className="flex items-center gap-2 text-sm text-white/80">
          <span className="text-gold">✓</span>
          {item}
        </div>
      ))}
    </div>
    
    <div className="border-t border-white/10 pt-6">
      <h4 className="font-bold mb-4">ปรับแต่งเพิ่มเติม (Optional)</h4>
      
      {/* Casket Selection */}
      <div className="mb-4">
        <label className="block text-sm text-white/60 mb-2">เลือกแบบโลง</label>
        <div className="flex flex-wrap gap-2">
          {pkg.casketOptions.map((casket, i) => (
            <button
              key={i}
              onClick={() => setOptions({ ...options, casket: i })}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                options.casket === i
                  ? 'bg-gold text-black'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {casket}
            </button>
          ))}
        </div>
      </div>
      
      {/* Floral Selection */}
      <div>
        <label className="block text-sm text-white/60 mb-2">โทนสีดอกไม้</label>
        <div className="flex flex-wrap gap-2">
          {floralOptions.map((floral) => (
            <button
              key={floral.id}
              onClick={() => setOptions({ ...options, floral: floral.id })}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                options.floral === floral.id
                  ? 'bg-gold text-black'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {floral.nameTh}
              {floral.price > 0 && ` (+${formatPrice(floral.price)})`}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Custom Mode Component
const CustomMode = ({ customData, setCustomData }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  
  const calculateTotal = () => {
    let total = 0;
    
    // Temple
    const temple = temples.find(t => t.id === customData.temple);
    if (temple) total += temple.pricePerDay * customData.days;
    
    // Casket
    const casket = caskets.find(c => c.id === customData.casket);
    if (casket) total += casket.price;
    
    // Cremation
    const cremation = cremationOptions.find(c => c.id === customData.cremation);
    if (cremation) total += cremation.price;
    
    // Catering
    customData.catering.forEach(catId => {
      const cat = cateringOptions.find(c => c.id === catId);
      if (cat) total += cat.pricePerDay * customData.days;
    });
    
    // Floral
    const floral = floralOptions.find(f => f.id === customData.floral);
    if (floral) total += floral.price;
    
    // Extras
    customData.extras.forEach(extId => {
      const ext = extras.find(e => e.id === extId);
      if (ext) total += ext.price;
    });
    
    return total;
  };
  
  return (
    <div className="mt-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-white/60 mb-2">
          <span>ขั้นตอนที่ {step} / {totalSteps}</span>
          <span>{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-gold to-yellow-400 transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Step 1: Temple */}
      {step === 1 && (
        <div className="animate-fadeIn">
          <h3 className="text-2xl font-bold mb-2">เลือกวัด/สถานที่</h3>
          <p className="text-white/60 mb-6">เลือกวัดที่ต้องการจัดงาน</p>
          
          <div className="grid gap-3">
            {temples.map((temple) => (
              <button
                key={temple.id}
                onClick={() => setCustomData({ ...customData, temple: temple.id })}
                className={`p-4 rounded-xl text-left transition-all ${
                  customData.temple === temple.id
                    ? 'bg-gold/20 border-2 border-gold'
                    : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold">{temple.name}</div>
                    <div className="text-sm text-white/60">{temple.area}</div>
                  </div>
                  <div className="text-gold font-bold">
                    ฿{formatPrice(temple.pricePerDay)}/วัน
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Step 2: Days */}
      {step === 2 && (
        <div className="animate-fadeIn">
          <h3 className="text-2xl font-bold mb-2">จำนวนวัน</h3>
          <p className="text-white/60 mb-6">เลือกจำนวนวันจัดงาน</p>
          
          <div className="grid grid-cols-4 gap-3">
            {[3, 5, 7, 9].map((days) => (
              <button
                key={days}
                onClick={() => setCustomData({ ...customData, days })}
                className={`p-6 rounded-xl text-center transition-all ${
                  customData.days === days
                    ? 'bg-gold text-black'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="text-3xl font-bold">{days}</div>
                <div className="text-sm">วัน</div>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Step 3: Casket */}
      {step === 3 && (
        <div className="animate-fadeIn">
          <h3 className="text-2xl font-bold mb-2">เลือกโลงศพ</h3>
          <p className="text-white/60 mb-6">มีตัวเลือก Eco-Friendly สำหรับผู้รักษ์โลก 🌿</p>
          
          <div className="grid gap-3">
            {caskets.map((casket) => (
              <button
                key={casket.id}
                onClick={() => setCustomData({ ...customData, casket: casket.id })}
                className={`p-4 rounded-xl text-left transition-all ${
                  customData.casket === casket.id
                    ? 'bg-gold/20 border-2 border-gold'
                    : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold">{casket.name}</div>
                    {casket.eco && (
                      <div className="text-xs text-green-400 mt-1">🌿 เป็นมิตรกับสิ่งแวดล้อม</div>
                    )}
                  </div>
                  <div className="text-gold font-bold">
                    ฿{formatPrice(casket.price)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Step 4: Cremation */}
      {step === 4 && (
        <div className="animate-fadeIn">
          <h3 className="text-2xl font-bold mb-2">เลือกเมรุ</h3>
          <p className="text-white/60 mb-6">เลือกระดับเมรุสำหรับพิธีฌาปนกิจ</p>
          
          <div className="grid grid-cols-2 gap-3">
            {cremationOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setCustomData({ ...customData, cremation: opt.id })}
                className={`p-4 rounded-xl text-center transition-all ${
                  customData.cremation === opt.id
                    ? 'bg-gold text-black'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="font-bold">{opt.name}</div>
                <div className="text-sm mt-1">฿{formatPrice(opt.price)}</div>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Step 5: Catering & Floral */}
      {step === 5 && (
        <div className="animate-fadeIn">
          <h3 className="text-2xl font-bold mb-2">อาหารและดอกไม้</h3>
          <p className="text-white/60 mb-6">เลือกบริการอาหารและโทนสีดอกไม้</p>
          
          <div className="mb-6">
            <h4 className="font-bold mb-3">บริการอาหาร (เลือกได้หลายรายการ)</h4>
            <div className="grid gap-2">
              {cateringOptions.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    const newCatering = customData.catering.includes(cat.id)
                      ? customData.catering.filter(c => c !== cat.id)
                      : [...customData.catering, cat.id];
                    setCustomData({ ...customData, catering: newCatering });
                  }}
                  className={`p-3 rounded-lg text-left transition-all flex justify-between ${
                    customData.catering.includes(cat.id)
                      ? 'bg-gold/20 border border-gold'
                      : 'bg-white/5 border border-transparent hover:bg-white/10'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-gold">฿{formatPrice(cat.pricePerDay)}/วัน</span>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-3">โทนสีดอกไม้</h4>
            <div className="flex flex-wrap gap-2">
              {floralOptions.map((floral) => (
                <button
                  key={floral.id}
                  onClick={() => setCustomData({ ...customData, floral: floral.id })}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    customData.floral === floral.id
                      ? 'bg-gold text-black'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {floral.nameTh}
                  {floral.price > 0 && ` (+฿${formatPrice(floral.price)})`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Step 6: Extras */}
      {step === 6 && (
        <div className="animate-fadeIn">
          <h3 className="text-2xl font-bold mb-2">บริการเสริม</h3>
          <p className="text-white/60 mb-6">เลือกบริการเสริมที่ต้องการ (Optional)</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {extras.map((ext) => (
              <button
                key={ext.id}
                onClick={() => {
                  const newExtras = customData.extras.includes(ext.id)
                    ? customData.extras.filter(e => e !== ext.id)
                    : [...customData.extras, ext.id];
                  setCustomData({ ...customData, extras: newExtras });
                }}
                className={`p-3 rounded-lg text-left transition-all flex justify-between ${
                  customData.extras.includes(ext.id)
                    ? 'bg-gold/20 border border-gold'
                    : 'bg-white/5 border border-transparent hover:bg-white/10'
                }`}
              >
                <span>{ext.name}</span>
                <span className="text-gold">฿{formatPrice(ext.price)}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Navigation & Total */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className={`px-6 py-3 rounded-xl transition-all ${
            step === 1
              ? 'bg-white/10 text-white/30 cursor-not-allowed'
              : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          ← ย้อนกลับ
        </button>
        
        <div className="text-center">
          <div className="text-sm text-white/60">ราคาประมาณ</div>
          <div className="text-2xl font-bold text-gold">
            ฿{formatPrice(calculateTotal())}
          </div>
        </div>
        
        <button
          onClick={() => setStep(Math.min(totalSteps, step + 1))}
          className="px-6 py-3 rounded-xl bg-gold text-black font-bold hover:bg-yellow-400 transition-all"
        >
          {step === totalSteps ? 'ดูสรุป →' : 'ถัดไป →'}
        </button>
      </div>
    </div>
  );
};

// Summary Component
const Summary = ({ mode, selectedPackage, packageOptions, customData, onContact }) => {
  const pkg = packages.find(p => p.id === selectedPackage);
  
  const calculatePackageTotal = () => {
    let total = pkg.price.min;
    
    // Casket upgrade (simple parsing)
    const casketOption = pkg.casketOptions[packageOptions.casket];
    const casketMatch = casketOption?.match(/\+(\d+,?\d*)/);
    if (casketMatch) {
      total += parseInt(casketMatch[1].replace(',', ''));
    }
    
    // Floral
    const floral = floralOptions.find(f => f.id === packageOptions.floral);
    if (floral) total += floral.price;
    
    return total;
  };
  
  const calculateCustomTotal = () => {
    let total = 0;
    
    const temple = temples.find(t => t.id === customData.temple);
    if (temple) total += temple.pricePerDay * customData.days;
    
    const casket = caskets.find(c => c.id === customData.casket);
    if (casket) total += casket.price;
    
    const cremation = cremationOptions.find(c => c.id === customData.cremation);
    if (cremation) total += cremation.price;
    
    customData.catering.forEach(catId => {
      const cat = cateringOptions.find(c => c.id === catId);
      if (cat) total += cat.pricePerDay * customData.days;
    });
    
    const floral = floralOptions.find(f => f.id === customData.floral);
    if (floral) total += floral.price;
    
    customData.extras.forEach(extId => {
      const ext = extras.find(e => e.id === extId);
      if (ext) total += ext.price;
    });
    
    return total;
  };
  
  if (mode === 'package' && pkg) {
    return (
      <div className="mt-8 p-6 bg-gradient-to-br from-gold/20 to-yellow-900/20 rounded-2xl border border-gold/30">
        <h3 className="text-2xl font-bold mb-4">📋 สรุปรายการ</h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span>Package: {pkg.name}</span>
            <span className="text-gold">฿{formatPrice(pkg.price.min)}</span>
          </div>
          
          {packageOptions.casket > 0 && (
            <div className="flex justify-between text-sm text-white/80">
              <span>โลง: {pkg.casketOptions[packageOptions.casket]}</span>
            </div>
          )}
          
          {packageOptions.floral !== 'white' && (
            <div className="flex justify-between text-sm text-white/80">
              <span>ดอกไม้: {floralOptions.find(f => f.id === packageOptions.floral)?.nameTh}</span>
              <span>+฿{formatPrice(floralOptions.find(f => f.id === packageOptions.floral)?.price || 0)}</span>
            </div>
          )}
        </div>
        
        <div className="pt-4 border-t border-gold/30">
          <div className="flex justify-between text-xl font-bold">
            <span>รวมทั้งสิ้น</span>
            <span className="text-gold">฿{formatPrice(calculatePackageTotal())}</span>
          </div>
        </div>
        
        <button
          onClick={onContact}
          className="w-full mt-6 py-4 bg-gold text-black font-bold rounded-xl hover:bg-yellow-400 transition-all text-lg"
        >
          📞 ติดต่อเรา
        </button>
      </div>
    );
  }
  
  if (mode === 'custom') {
    const temple = temples.find(t => t.id === customData.temple);
    const casket = caskets.find(c => c.id === customData.casket);
    const cremation = cremationOptions.find(c => c.id === customData.cremation);
    const floral = floralOptions.find(f => f.id === customData.floral);
    
    return (
      <div className="mt-8 p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/20 rounded-2xl border border-purple-500/30">
        <h3 className="text-2xl font-bold mb-4">📋 สรุปรายการ Custom</h3>
        
        <div className="space-y-2 mb-6 text-sm">
          {temple && (
            <div className="flex justify-between">
              <span>🏛️ {temple.name} ({customData.days} วัน)</span>
              <span className="text-gold">฿{formatPrice(temple.pricePerDay * customData.days)}</span>
            </div>
          )}
          
          {casket && (
            <div className="flex justify-between">
              <span>⚰️ {casket.name}</span>
              <span className="text-gold">฿{formatPrice(casket.price)}</span>
            </div>
          )}
          
          {cremation && (
            <div className="flex justify-between">
              <span>🔥 {cremation.name}</span>
              <span className="text-gold">฿{formatPrice(cremation.price)}</span>
            </div>
          )}
          
          {customData.catering.map(catId => {
            const cat = cateringOptions.find(c => c.id === catId);
            return cat && (
              <div key={catId} className="flex justify-between">
                <span>🍽️ {cat.name}</span>
                <span className="text-gold">฿{formatPrice(cat.pricePerDay * customData.days)}</span>
              </div>
            );
          })}
          
          {floral && floral.price > 0 && (
            <div className="flex justify-between">
              <span>💐 {floral.nameTh}</span>
              <span className="text-gold">฿{formatPrice(floral.price)}</span>
            </div>
          )}
          
          {customData.extras.map(extId => {
            const ext = extras.find(e => e.id === extId);
            return ext && (
              <div key={extId} className="flex justify-between">
                <span>✨ {ext.name}</span>
                <span className="text-gold">฿{formatPrice(ext.price)}</span>
              </div>
            );
          })}
        </div>
        
        <div className="pt-4 border-t border-purple-500/30">
          <div className="flex justify-between text-xl font-bold">
            <span>รวมทั้งสิ้น</span>
            <span className="text-gold">฿{formatPrice(calculateCustomTotal())}</span>
          </div>
        </div>
        
        <button
          onClick={onContact}
          className="w-full mt-6 py-4 bg-gold text-black font-bold rounded-xl hover:bg-yellow-400 transition-all text-lg"
        >
          📞 ติดต่อเรา
        </button>
      </div>
    );
  }
  
  return null;
};

// ===== MAIN COMPONENT =====
export default function ServiceSelector() {
  const [mode, setMode] = useState(null); // 'package' | 'custom'
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packageOptions, setPackageOptions] = useState({ casket: 0, floral: 'white' });
  const [customData, setCustomData] = useState({
    temple: null,
    days: 3,
    casket: null,
    cremation: null,
    floral: 'white',
    catering: [],
    extras: [],
  });
  const [showSummary, setShowSummary] = useState(false);
  
  const handleContact = () => {
    // Scroll to contact section or open LINE
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Open LINE or phone
      window.open('https://line.me/ti/p/@sasan', '_blank');
    }
  };
  
  const selectedPkg = packages.find(p => p.id === selectedPackage);
  
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
            <span className="text-gold">SASAN</span> One Stop Service
          </h1>
          <p className="text-white/60">เลือกบริการที่เหมาะกับคุณ</p>
        </div>
        
        {/* Mode Selector */}
        <ModeSelector mode={mode} setMode={setMode} />
        
        {/* Package Mode */}
        {mode === 'package' && (
          <div className="animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {packages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  selected={selectedPackage}
                  onSelect={setSelectedPackage}
                />
              ))}
            </div>
            
            {selectedPkg && (
              <PackageDetails
                pkg={selectedPkg}
                options={packageOptions}
                setOptions={setPackageOptions}
              />
            )}
            
            {selectedPackage && (
              <Summary
                mode="package"
                selectedPackage={selectedPackage}
                packageOptions={packageOptions}
                customData={customData}
                onContact={handleContact}
              />
            )}
          </div>
        )}
        
        {/* Custom Mode */}
        {mode === 'custom' && (
          <CustomMode
            customData={customData}
            setCustomData={setCustomData}
          />
        )}
        
        {/* Back Button */}
        {mode && (
          <button
            onClick={() => {
              setMode(null);
              setSelectedPackage(null);
              setCustomData({
                temple: null,
                days: 3,
                casket: null,
                cremation: null,
                floral: 'white',
                catering: [],
                extras: [],
              });
            }}
            className="mt-8 text-white/60 hover:text-white transition-all"
          >
            ← กลับไปเลือกโหมด
          </button>
        )}
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .text-gold {
          color: #D4AF37;
        }
        .bg-gold {
          background-color: #D4AF37;
        }
        .border-gold {
          border-color: #D4AF37;
        }
        .ring-gold {
          --tw-ring-color: #D4AF37;
        }
      `}</style>
    </div>
  );
}
