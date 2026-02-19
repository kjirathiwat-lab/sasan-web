import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Share2,
  Facebook,
  Twitter,
  Link2,
  BookOpen,
  Heart,
  MessageCircle,
  ChevronRight,
  Quote,
  Sparkles,
  Star,
  Shield,
  Gift,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ============================================================
// BLOG DATA - เหมือนกับใน Blog.tsx
// ============================================================
const blogArticles = [
  {
    id: 1,
    number: "01",
    slug: "pre-planning",
    category: "วางแผนล่วงหน้า",
    categoryEn: "PRE-PLANNING",
    title: 'อย่าให้ "บทสุดท้าย" กลายเป็นภาระ',
    subtitle: "วางแผนวันนี้... เพื่อให้ลูกหลานจดจำคุณด้วยรอยยิ้ม",
    excerpt: "คุณเขียนบทชีวิตมาดีทั้งเรื่อง... อย่าปล่อยให้ตอนจบวุ่นวาย Sasan ช่วยคุณออกแบบให้สมบูรณ์แบบ เพื่อให้ลูกหลานจดจำความสง่างามของคุณ ไม่ใช่ความยุ่งยาก",
    content: [
      {
        type: "paragraph",
        text: "การวางแผนล่วงหน้า ไม่ใช่การแช่งตัวเอง แต่คือการบอกคนที่คุณรักว่า \"ไม่ต้องห่วงนะ ฉันเตรียมทุกอย่างไว้ให้แล้ว\""
      },
      {
        type: "heading",
        text: "ทำไมควรวางแผนล่วงหน้า?"
      },
      {
        type: "paragraph",
        text: "ลองนึกภาพดู... ในวันที่คุณจากไป ครอบครัวไม่ต้องทะเลาะกันเรื่องจัดงาน ไม่ต้องวุ่นวายติดต่อวัด หาโลงศพ หาของชำร่วย ทุกอย่างถูกจัดเตรียมไว้เรียบร้อย"
      },
      {
        type: "quote",
        text: "พวกเขามีเวลาทำใจ และจดจำช่วงเวลาดีๆ ที่มีร่วมกับคุณ"
      },
      {
        type: "heading",
        text: "สิ่งที่คุณได้รับจากการวางแผนล่วงหน้า"
      },
      {
        type: "list",
        items: [
          "ครอบครัวไม่ต้องแบกรับภาระทางอารมณ์และการเงิน",
          "งานศพเป็นไปตามความต้องการของคุณ 100%",
          "รู้ค่าใช้จ่ายล่วงหน้า ไม่มีค่าใช้จ่ายแอบแฝง",
          "เลือกทุกอย่างได้ตั้งแต่ดอกไม้ไปจนถึงเพลง",
          "มีเวลาเตรียมตัวและทำใจกับสิ่งที่จะเกิดขึ้น"
        ]
      },
      {
        type: "paragraph",
        text: "นี่คือของขวัญชิ้นสุดท้าย... ที่คุณมอบให้คนที่รักได้"
      },
      {
        type: "heading",
        text: "เริ่มต้นอย่างไร?"
      },
      {
        type: "paragraph",
        text: "Sasan มีทีมที่ปรึกษาพร้อมให้คำแนะนำทุกขั้นตอน ตั้งแต่การเลือกแพ็คเกจที่เหมาะสม การออกแบบธีมงาน ไปจนถึงการจัดเตรียมเอกสารทางกฎหมาย"
      },
      {
        type: "cta",
        text: "ปรึกษาฟรี ไม่มีค่าใช้จ่าย โทร 081-234-5678"
      }
    ],
    image: "/Blog pic/Article1.1.jpg",
    readTime: "5 นาที",
    publishDate: "15 ก.พ. 2024",
    author: "SASAN Team",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    number: "02",
    slug: "custom-design",
    category: "ออกแบบเฉพาะตัว",
    categoryEn: "CUSTOM DESIGN",
    title: 'งานศพที่ "ไม่ใช่คุณ" คือความน่าเสียดาย',
    subtitle: "ชอบทะเล? หรือชอบความหรูหรา? ออกแบบได้ทุกสไตล์",
    excerpt: "ชอบทะเล? หรือชอบความหรูหรา? เปลี่ยนศาลาวัด ให้เป็น \"แกลเลอรีชีวิต\" ที่ตะโกนความเป็นตัวคุณออกมา 100% เพราะคุณมีเพียงคนเดียวในโลก",
    content: [
      {
        type: "paragraph",
        text: "ทำไมงานศพต้องเป็นรูปแบบเดิมๆ? ทุกคนมีเอกลักษณ์เฉพาะตัว และงานศพก็ควรสะท้อนตัวตนของคุณเช่นกัน"
      },
      {
        type: "heading",
        text: "ออกแบบได้ทุกสไตล์"
      },
      {
        type: "list",
        items: [
          "ธีมทะเล - สำหรับคนรักทะเลและธรรมชาติ",
          "ธีมสวนดอกไม้ - เนรมิตศาลาให้เต็มไปด้วยดอกไม้นานาพันธุ์",
          "ธีมมินิมอล - สำหรับคนรักความเรียบง่าย สะอาดตา",
          "ธีมหรูหรา - ทองคำ คริสตัล และความอลังการ",
          "ธีมธรรมชาติ - ไม้ ใบไม้ และความสงบ"
        ]
      },
      {
        type: "quote",
        text: "เปลี่ยนศาลาวัด ให้เป็น \"แกลเลอรีชีวิต\" ที่บอกเล่าตัวตนของคุณ 100%"
      },
      {
        type: "heading",
        text: "ตัวอย่างงานที่เราเคยออกแบบ"
      },
      {
        type: "paragraph",
        text: "คุณลุงสมชาย อดีตกัปตันเรือ ต้องการงานศพธีมทะเล เราจึงตกแต่งศาลาด้วยโทนสีฟ้า-ขาว มีเปลือกหอย ปะการัง และภาพทะเลที่คุณลุงเคยแล่นเรือผ่าน แขกที่มาร่วมงานรู้สึกเหมือนได้เดินทางไปกับคุณลุงอีกครั้ง"
      },
      {
        type: "paragraph",
        text: "คุณป้ามาลี คนรักดอกไม้ เราเนรมิตศาลาให้เต็มไปด้วยดอกกุหลาบ ดอกลิลลี่ และดอกไม้ป่าที่คุณป้าชอบ กลิ่นหอมอบอวลทั่วศาลา ราวกับอยู่ในสวนดอกไม้ของคุณป้าเอง"
      },
      {
        type: "cta",
        text: "ส่งไอเดียของคุณมาให้เราได้เลย เราจะออกแบบให้ฟรี!"
      }
    ],
    image: "/Blog pic/Article2.1.jpg",
    readTime: "4 นาที",
    publishDate: "12 ก.พ. 2024",
    author: "SASAN Design Team",
    icon: Sparkles,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 3,
    number: "03",
    slug: "luxury-service",
    category: "บริการระดับ VIP",
    categoryEn: "LUXURY CHOICE",
    title: 'เลือกสิ่งที่ดีที่สุด ในวันที่ยัง "เลือกเอง" ได้',
    subtitle: "ความตายไม่มีแจ้งเตือน... อย่ารอให้คนอื่นมาเลือกให้",
    excerpt: "ความตายไม่มีแจ้งเตือน... อย่ารอให้คนอื่นมาเลือกให้ ยกระดับวาระสุดท้ายด้วยบริการ Luxury Service ใส่ใจทุกดีเทลราวกับคุณเป็นแขก VIP",
    content: [
      {
        type: "paragraph",
        text: "บริการระดับ VVIP ใส่ใจทุกดีเทล เพราะคุณสมควรได้รับสิ่งที่ดีที่สุด... จนวินาทีสุดท้าย"
      },
      {
        type: "heading",
        text: "สิ่งที่รวมอยู่ในบริการ VIP"
      },
      {
        type: "list",
        items: [
          "ดอกไม้สดนำเข้าจากต่างประเทศ (ฮอลแลนด์, ญี่ปุ่น)",
          "กลิ่นหอมอโรม่าเฉพาะ ออกแบบตามความชอบ",
          "ผ้าไหมเนื้อดี สำหรับตกแต่งและคลุมโลง",
          "โลงศพไม้สักแกะสลักลายพิเศษ",
          "ทีมงานส่วนตัวดูแลตลอด 24 ชั่วโมง",
          "รถลีมูซีนรับส่งครอบครัว",
          "อาหารจากเชฟมิชลินสตาร์"
        ]
      },
      {
        type: "quote",
        text: "ทุกอย่างถูกคัดสรรมาอย่างพิถีพิถัน ให้คุณได้รับการปฏิบัติราวกับแขก VIP จนวินาทีสุดท้าย"
      },
      {
        type: "heading",
        text: "ความแตกต่างที่สัมผัสได้"
      },
      {
        type: "paragraph",
        text: "เมื่อคุณเลือกบริการ VIP คุณจะรู้สึกถึงความแตกต่างตั้งแต่วินาทีแรก ตั้งแต่การต้อนรับ การดูแล ไปจนถึงรายละเอียดเล็กๆ น้อยๆ ที่เราใส่ใจ"
      },
      {
        type: "cta",
        text: "สอบถามราคาแพ็คเกจ VIP โทร 081-234-5678"
      }
    ],
    image: "/Blog pic/Article3.1.jpg",
    readTime: "3 นาที",
    publishDate: "10 ก.พ. 2024",
    author: "SASAN Premium",
    icon: Star,
    color: "from-amber-500 to-amber-600",
  },
  {
    id: 4,
    number: "04",
    slug: "celebration-of-life",
    category: "ฉลองชีวิต",
    categoryEn: "CELEBRATION",
    title: 'เปลี่ยน "น้ำตา" ให้เป็น "รอยยิ้ม"',
    subtitle: "งานศพไม่จำเป็นต้องหดหู่เสมอไป",
    excerpt: "งานศพไม่จำเป็นต้องหดหู่เสมอไป Sasan เนรมิตงานแบบ Celebration of Life ให้คนที่รักมารวมตัวกันเพื่อ \"ขอบคุณ\" ช่วงเวลาดีๆ ที่มีร่วมกับคุณ",
    content: [
      {
        type: "paragraph",
        text: "Celebration of Life - งานที่อบอุ่น ไม่ใช่หดหู่ แทนที่จะนั่งร้องไห้... ให้คนที่รักมารวมตัวกันเพื่อ \"ขอบคุณ\" ช่วงเวลาดีๆ ที่มีร่วมกับคุณ"
      },
      {
        type: "heading",
        text: "Celebration of Life คืออะไร?"
      },
      {
        type: "paragraph",
        text: "เป็นรูปแบบงานศพที่เน้นการเฉลิมฉลองชีวิตของผู้จากไป แทนที่จะเศร้าโศก เราจะมาร่วมกันรำลึกถึงช่วงเวลาดีๆ ความทรงจำที่มีร่วมกัน และขอบคุณที่ได้รู้จักกัน"
      },
      {
        type: "list",
        items: [
          "มีเพลงโปรดของผู้จากไปเปิดตลอดงาน",
          "มีอาหารที่ผู้จากไปชอบให้แขกได้ลิ้มลอง",
          "มีรูปภาพและวิดีโอความทรงจำฉายตลอดงาน",
          "มีมุมให้แขกเขียนข้อความถึงผู้จากไป",
          "มีเสียงหัวเราะ และมีรอยยิ้ม"
        ]
      },
      {
        type: "quote",
        text: "นี่คืองานศพที่คุณอยากให้เป็น - งานที่คนมาร่วมจะจดจำด้วยความอบอุ่น ไม่ใช่ความหดหู่"
      },
      {
        type: "heading",
        text: "เหมาะกับใคร?"
      },
      {
        type: "paragraph",
        text: "Celebration of Life เหมาะกับทุกคนที่ต้องการให้งานศพเป็นช่วงเวลาแห่งการขอบคุณและรำลึก ไม่ใช่ช่วงเวลาแห่งความเศร้า โดยเฉพาะคนที่ใช้ชีวิตอย่างมีความสุขและต้องการให้คนที่รักจดจำความสุขนั้น"
      },
      {
        type: "cta",
        text: "ออกแบบ Celebration of Life ของคุณวันนี้"
      }
    ],
    image: "/Blog pic/Article4.2.jpg",
    readTime: "4 นาที",
    publishDate: "8 ก.พ. 2024",
    author: "SASAN Creative",
    icon: Heart,
    color: "from-pink-500 to-pink-600",
  },
  {
    id: 5,
    number: "05",
    slug: "family-support",
    category: "ดูแลครอบครัว",
    categoryEn: "SUPPORT",
    title: 'ในวันที่ครอบครัวอ่อนแอ ให้เราเป็น "เกราะป้องกัน"',
    subtitle: "วินาทีแห่งการสูญเสีย คือช่วงที่คนข้างหลังเปราะบางที่สุด",
    excerpt: "วินาทีแห่งการสูญเสีย... คือช่วงที่คนข้างหลังเปราะบางที่สุด อย่าให้เขาต้องแบกรับความวุ่นวาย ให้ Sasan รับจบทุกขั้นตอนแทนครอบครัวคุณ",
    content: [
      {
        type: "paragraph",
        text: "ในวันที่เปราะบางที่สุด... ให้มืออาชีพดูแลทุกขั้นตอนแทน"
      },
      {
        type: "heading",
        text: "สิ่งที่ครอบครัวไม่ต้องทำ"
      },
      {
        type: "list",
        items: [
          "ไม่ต้องติดต่อวัด - เราจัดการให้",
          "ไม่ต้องหาของชำร่วย - เราเตรียมให้",
          "ไม่ต้องจัดการเอกสาร - เราดำเนินการให้",
          "ไม่ต้องประสานงานกับใคร - เราเป็นตัวแทนให้",
          "ไม่ต้องกังวลเรื่องเงิน - เราวางแผนให้ล่วงหน้า"
        ]
      },
      {
        type: "quote",
        text: "พวกเขามีหน้าที่เดียว... คือทำใจ และจดจำช่วงเวลาดีๆ ที่มีร่วมกับคุณ"
      },
      {
        type: "heading",
        text: "ทีมงาน SASAN"
      },
      {
        type: "paragraph",
        text: "ทีมงานของเราได้รับการอบรมมาเป็นอย่างดี ไม่เพียงแค่เรื่องการจัดงาน แต่รวมถึงการดูแลจิตใจของครอบครัวด้วย เราเข้าใจว่าช่วงเวลานี้ยากลำบากแค่ไหน และพร้อมอยู่เคียงข้างตลอด"
      },
      {
        type: "paragraph",
        text: "ตั้งแต่วินาทีที่คุณโทรหาเรา จนถึงวันสุดท้ายของงาน และหลังจากนั้น เราพร้อมดูแลทุกขั้นตอน ให้ครอบครัวคุณมีเวลาดูแลจิตใจของพวกเขาเอง"
      },
      {
        type: "cta",
        text: "โทรหาเราได้ตลอด 24 ชั่วโมง: 081-234-5678"
      }
    ],
    image: "/Blog pic/Article5.1.jpg",
    readTime: "5 นาที",
    publishDate: "5 ก.พ. 2024",
    author: "SASAN Care Team",
    icon: Shield,
    color: "from-green-500 to-green-600",
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function BlogDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const [copied, setCopied] = useState(false);
  
  const slug = params.slug;
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth" // ใส่ smooth ให้มันเลื่อนขึ้นไปแบบนุ่มๆ หรือถ้าอยากให้เด้งไปเลยให้เปลี่ยนเป็น "auto"
    });
  }, [slug]);
  const article = blogArticles.find((a) => a.slug === slug);

  // If article not found
  if (!article) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gold mb-4">404</h1>
          <p className="text-white/60 mb-8">ไม่พบบทความที่คุณต้องการ</p>
          <Button onClick={() => setLocation("/blog")} className="bg-gold text-black">
            กลับไปหน้าบทความ
          </Button>
        </div>
      </div>
    );
  }

  // Get related articles (exclude current)
  const relatedArticles = blogArticles.filter((a) => a.id !== article.id).slice(0, 3);

  // Get prev/next articles
  const currentIndex = blogArticles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? blogArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < blogArticles.length - 1 ? blogArticles[currentIndex + 1] : null;

  // Copy link
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render content blocks
  const renderContent = (block: any, index: number) => {
    switch (block.type) {
      case "heading":
        return (
          <h2 key={index} className="text-2xl font-serif text-gold mt-10 mb-4">
            {block.text}
          </h2>
        );
      case "paragraph":
        return (
          <p key={index} className="text-white/80 leading-relaxed mb-4">
            {block.text}
          </p>
        );
      case "quote":
        return (
          <blockquote
            key={index}
            className="my-8 pl-6 border-l-4 border-gold bg-gold/5 py-4 pr-4 rounded-r-lg"
          >
            <p className="text-gold italic text-lg font-serif">{block.text}</p>
          </blockquote>
        );
      case "list":
        return (
          <ul key={index} className="my-6 space-y-3">
            {block.items.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-white/80">
                <Check className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      case "cta":
        return (
          <div
            key={index}
            className="my-10 p-6 bg-gradient-to-r from-gold/20 to-amber-500/20 border border-gold/30 rounded-2xl text-center"
          >
            <p className="text-gold font-medium text-lg">{block.text}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setLocation("/blog")}
          className="absolute top-24 left-6 flex items-center gap-2 text-white/70 hover:text-white transition-colors bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full"
        >
          <ArrowLeft className="w-4 h-4" />
          กลับไปหน้าบทความ
        </motion.button>

        {/* Article Number */}
        <div className="absolute top-24 right-6 bg-black/50 backdrop-blur-sm text-gold font-serif text-2xl px-4 py-2 rounded">
          {article.number}
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-gold/20 text-gold text-sm px-4 py-1 rounded-full mb-4"
            >
              {article.category}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-serif text-white leading-tight mb-4"
            >
              {article.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/70 text-lg"
            >
              {article.subtitle}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Article Meta & Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/10 mb-10">
          <div className="flex items-center gap-6 text-white/50 text-sm">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {article.publishDate}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </span>
            <span className="hidden md:block">{article.author}</span>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-white/40 text-sm mr-2">แชร์:</span>
            <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-blue-500/20 flex items-center justify-center transition-colors">
              <Facebook className="w-4 h-4 text-white/60" />
            </button>
            <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-sky-500/20 flex items-center justify-center transition-colors">
              <Twitter className="w-4 h-4 text-white/60" />
            </button>
            <button
              onClick={copyLink}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold/20 flex items-center justify-center transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-gold" />
              ) : (
                <Link2 className="w-4 h-4 text-white/60" />
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          {article.content.map((block, index) => renderContent(block, index))}
        </div>

        {/* Author Box */}
        <div className="mt-16 p-6 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center">
              <span className="text-black font-bold text-xl">S</span>
            </div>
            <div>
              <p className="text-white font-bold">{article.author}</p>
              <p className="text-white/50 text-sm">
                ทีมงาน SASAN พร้อมให้คำปรึกษาเรื่องจัดงานศพครบวงจร 24 ชั่วโมง
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Prev/Next Navigation */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prevArticle ? (
            <button
              onClick={() => setLocation(`/blog/${prevArticle.slug}`)}
              className="group p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-gold/50 transition-all text-left"
            >
              <span className="text-white/40 text-sm flex items-center gap-2 mb-2">
                <ArrowLeft className="w-4 h-4" />
                บทความก่อนหน้า
              </span>
              <p className="text-white group-hover:text-gold transition-colors line-clamp-1">
                {prevArticle.title}
              </p>
            </button>
          ) : (
            <div />
          )}

          {nextArticle && (
            <button
              onClick={() => setLocation(`/blog/${nextArticle.slug}`)}
              className="group p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-gold/50 transition-all text-right"
            >
              <span className="text-white/40 text-sm flex items-center justify-end gap-2 mb-2">
                บทความถัดไป
                <ArrowRight className="w-4 h-4" />
              </span>
              <p className="text-white group-hover:text-gold transition-colors line-clamp-1">
                {nextArticle.title}
              </p>
            </button>
          )}
        </div>
      </div>

      {/* Related Articles */}
      <section className="py-16 bg-zinc-950 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-serif text-gold mb-8 text-center">
            บทความที่เกี่ยวข้อง
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((related) => (
              <motion.article
                key={related.id}
                whileHover={{ y: -5 }}
                onClick={() => setLocation(`/blog/${related.slug}`)}
                className="group cursor-pointer bg-black rounded-xl overflow-hidden border border-white/10 hover:border-gold/50 transition-all"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  <span className="absolute top-3 right-3 bg-black/70 text-gold text-xs px-2 py-1 rounded">
                    {related.number}
                  </span>
                </div>
                <div className="p-4">
                  <span className="text-gold/70 text-xs">{related.category}</span>
                  <h3 className="text-white font-medium mt-1 line-clamp-2 group-hover:text-gold transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-white/40 text-xs mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {related.readTime}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black border-t border-gold/30">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Gift className="w-16 h-16 text-gold mx-auto mb-6" />
          <h2 className="text-3xl font-serif text-gold mb-4">
            พร้อมเริ่มวางแผนหรือยัง?
          </h2>
          <p className="text-white/60 mb-8">
            ปรึกษาทีมงาน SASAN ฟรี ไม่มีค่าใช้จ่าย
            <br />
            เราพร้อมช่วยคุณออกแบบ "บทสุดท้าย" ที่สมบูรณ์แบบ
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-gold text-black hover:bg-yellow-400 px-8 py-6 rounded-full text-lg font-bold">
              โทร 081-234-5678
            </Button>
            <Button
              variant="outline"
              className="border-gold text-gold hover:bg-gold/10 px-8 py-6 rounded-full text-lg"
            >
              LINE: @sasan
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
