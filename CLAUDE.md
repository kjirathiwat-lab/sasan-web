# SASAN — Website Project Documentation

## Brand Overview

**ชื่อแบรนด์:** SASAN (สะสาน)
**Tagline:** "Designing Your Beautiful Last Chapter" / "The Last Chapter"
**ธุรกิจ:** บริการจัดงานศพระดับ Luxury ที่เน้น Human-Centric & Design-Led

### ปรัชญา 4 มิติ (The Definition of SASAN)

| ชื่อ | ความหมาย | บริการ |
|------|---------|--------|
| **สสาร** (MATTER) | ความจริงของธรรมชาติ | ใช้วัสดุธรรมชาติ เน้น Sustainability |
| **สะสาง** (CLEAR/RESOLVE) | การปลดเปลื้องทางใจ | ดูแลครอบครัวให้มีเวลา "สะสาง" ความรู้สึก |
| **สาร** (MESSAGE) | จดหมายฉบับสุดท้าย | Digital Legacy — ออกแบบรีมยา สื่อส่ง "สาร" ของผู้จากไป |
| **สาน** (WEAVE) | การถักทอความสัมพันธ์ | ผู้ "ประสาน" ระหว่างโลกคนเป็นและพิธีกรรม |

---

## Visual Identity — "THE GOLDEN SILENCE"

### Color Palette

| ชื่อ | Hex | RGB | ความหมาย |
|------|-----|-----|---------|
| Midnight Black | `#000000` | 0, 0, 0 | ความเงียบสงบ การดับสูญ จารีตประเพณี |
| Champagne Gold | `#EAD588` | 234, 213, 136 | เกียรติยศ แสงสว่างแห่งกุศล ความพรีเมียม |
| Raw Silk Cream | `#F5F1EA` | 245, 241, 234 | ความบริสุทธิ์ การก่อมตน วัสดุแห่งการทำบุญ |
| Deep Forest | `#344C31` | 52, 76, 49 | ธรรมชาติที่ซ่อนอยู่ในทานบารมี |

ใน CSS ใช้: `text-gold` = `#EAD588`, พื้นหลังหลัก = `#000000`

### Typography

| Font | ใช้กับ | Import |
|------|--------|--------|
| Playfair Display | Heading (h1–h6), serif display | Google Fonts |
| Inter | Body text (EN) | Google Fonts |
| Noto Sans Thai | Body text (TH) | Google Fonts |
| Great Vibes | Script/Logo decorative | Google Fonts |

### Brand Voice

- **Sophisticated** (เรียบหรู)
- **Serene** (สงบเงียบ)
- **Prestigious** (มีเกียรติ)

**คำต้องห้าม:** ห้ามใช้ `CHEAP` หรือ `FULL SERVICE`
**ใช้แทนด้วย:** `MEANINGFUL` และ `WISDOM`

---

## Tech Stack

| Layer | Library/Tool |
|-------|-------------|
| Framework | React 18 + TypeScript |
| Routing | Wouter |
| Styling | TailwindCSS + shadcn/ui |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Data Fetching | TanStack Query (React Query) |
| Auth | Custom AuthContext (mock) |
| Icons | Lucide React |

---

## Project Structure

```
client/src/
├── App.tsx                    # Router setup + Providers
├── main.tsx                   # Entry point
├── index.css                  # Global styles, CSS variables, fonts
├── pages/
│   ├── Home.tsx               # หน้าหลัก (Landing Page)
│   ├── San.tsx                # หน้า SAN Foundation (มูลนิธิสาน)
│   ├── Shop.tsx               # ร้านค้า
│   ├── Blog.tsx               # บล็อก
│   ├── BlogDetail.tsx         # รายละเอียดบล็อก
│   ├── Login.tsx              # เข้าสู่ระบบ
│   ├── Profile.tsx            # โปรไฟล์ผู้ใช้
│   ├── MyOrders.tsx           # คำสั่งซื้อ
│   ├── Dashboard.tsx          # แดชบอร์ด (admin)
│   └── not-found.tsx          # 404
├── components/
│   ├── Navigation.tsx         # Navbar (fixed, transparent→black on scroll)
│   ├── LanguageContext.tsx    # TH/EN toggle context
│   ├── AuthContext.tsx        # Auth state context
│   ├── ServiceSelector.tsx    # Service Wizard (popup)
│   ├── SectionHeading.tsx     # Section title component
│   ├── UserMenu.tsx           # User avatar menu
│   └── ui/                   # shadcn/ui components
├── hooks/
│   ├── use-inquiries.ts       # Contact form API hook
│   ├── use-mobile.tsx         # Responsive hook
│   └── use-toast.ts           # Toast notification
└── lib/
    ├── queryClient.ts         # React Query setup
    └── utils.ts               # Utility functions
```

---

## Routes

| Path | Component | คำอธิบาย |
|------|-----------|---------|
| `/` | Home | Landing page หลัก |
| `/shop` | Shop | ร้านค้าสินค้า |
| `/blog` | Blog | บทความ/บล็อก |
| `/blog/:slug` | BlogDetail | รายละเอียดบทความ |
| `/san` | San | หน้ามูลนิธิสาน |
| `/login` | Login | เข้าสู่ระบบ |
| `/profile` | Profile | โปรไฟล์ผู้ใช้ |
| `/my-orders` | MyOrders | คำสั่งซื้อ |
| `/dashboard` | Dashboard | แดชบอร์ดแอดมิน |

---

## Home Page Sections

1. **Hero** — Fullscreen video/image slideshow + parallax, tagline, CTA
2. **About / Identity** — 4 มิติของ SASAN + auto-sliding photo gallery
3. **Services / Packages** — 4 แพ็กเกจงานศพ (cards / table toggle)
4. **Portfolio** — ผลงานที่ผ่านมา
5. **Testimonials** — รีวิวจากครอบครัวที่ใช้บริการ (slider)
6. **Team (The Chapter)** — สมาชิกทีมงาน
7. **Blog** — บทความล่าสุด
8. **FAQ** — คำถามที่พบบ่อย
9. **Contact** — ฟอร์มติดต่อ + Floating action buttons (LINE, Phone)

---

## Service Packages

| Package | ชื่อไทย | ระดับราคา | ระยะเวลา | ขนาดงาน |
|---------|---------|----------|---------|---------|
| The Memoir | เดอะ เมมัวร์ | BASIC 45K / STANDARD 55K | 3 วัน | 30–80 คน/วัน |
| The Narrative | เดอะ แนร์ราทีฟ | SILVER 120K / GOLD 150K | 5 วัน | 80–150 คน/วัน |
| The Legacy ⭐ | เดอะ เลกาซี่ | PLATINUM 350K / DIAMOND 450K | 7 วัน | 150–300 คน/วัน |
| The Masterpiece | เดอะ มาสเตอร์พีซ | ROYAL 800K / EXCLUSIVE 1M | 7 วัน | 300–500+ คน/วัน |

⭐ = Recommended package

รูปแกลเลอรีแต่ละแพ็กเกจอยู่ใน `public/package-gallery/`

---

## SAN Foundation Page (`/san`)

มูลนิธิสาน — CSR ของ SASAN บริจาคสิ่งของให้ครอบครัวที่ขาดแคลน:
- ผ้าห่อศพ (1,200+ ชุด)
- อาหารและเครื่องดื่ม (800+ ครอบครัว)
- ของใช้จำเป็น (500+ ชุด)

---

## Navigation

```
หน้าหลัก | อัตลักษณ์องค์กร | บริการ | ผลงานที่ผ่านมา | ร้านค้า | บล็อก | สาน | คำถามที่พบบ่อย | ติดต่อเรา
Home     | About Us        | Services | Portfolio      | Shop    | Blog  | SAN | FAQ             | Contact
```

- Fixed navbar, transparent → `bg-black/90` when scrolled > 50px
- TH/EN toggle button ขวาบน
- User menu + mobile hamburger
- Anchor links (`/#section`) scroll smooth บนหน้า Home, navigate + scroll บนหน้าอื่น

---

## Assets / Public Files

```
public/
├── logo-sasan.png             # โลโก้หลัก (ใช้ใน Navigation)
├── sasan-bg.png               # Background image (fixed attachment)
├── About_Sasan_1-4.png        # รูป About section slider
├── Team Image/
│   ├── benja.jpg
│   ├── chayakorn.jpg
│   └── ...
└── package-gallery/
    ├── TheL01-03.png          # The Memoir / The Legacy
    ├── TheN01-03.png          # The Narrative
    └── TheMP01-03.png         # The Masterpiece
```

---

## Market Context (จาก Ref)

- ปี 2568: ผู้เสียชีวิต 559,684 คน vs เกิดใหม่ 416,523 คน (ส่วนต่าง -143,161)
- 70–75% ของผู้เสียชีวิตคือกลุ่มผู้สูงอายุ (60 ปีขึ้นไป)
- ภาคตะวันออกเฉียงเหนือ: ปริมาณสูงสุด 1.8–2 แสน ราย/ปี
- กรุงเทพฯ: **กลุ่มเป้าหมายหลัก** สำหรับบริการ "ออกแบบงานศพ" รูปแบบใหม่
- Pain Point: ตลาดเดิมขาดแคลน Human-Centric & Design-Led — ลูกค้ายุคใหม่ต้องการ Personalization

---

## Development Notes

- `LanguageProvider` ถูก wrap ซ้อน 2 ชั้นใน `App.tsx` (bug เล็กน้อย ยังไม่กระทบ)
- `ServiceSelector` เปิดได้ผ่าน URL param `?openWizard=true`
- Contact form ใช้ schema จาก `@shared/schema` → `insertInquirySchema`
- Package gallery ใช้ modal overlay พร้อม keyboard/click navigation
- Animation: Framer Motion `useScroll` + `useTransform` สำหรับ parallax hero
