import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Link } from "wouter";
import { RotateCcw, ShoppingBag, ArrowRight, Wand2 } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Stage = "intro" | "quiz" | "analyzing" | "result";

interface Product {
  nameTh: string;
  price: string;
  img: string;
}

interface CardDef {
  id: string;
  name: string;
  nameTh: string;
  tagTh: string;
  desc: string;
  image: string;
  type: "angel" | "demon";
  pkg: string;
  pkgDesc: string;
  products: Product[];
}

interface QuizOption {
  text: string;
  scores: Record<string, number>;
}

interface QuizQuestion {
  q: string;
  opts: QuizOption[];
}

// ─── Card Data ────────────────────────────────────────────────────────────────

const CARDS: CardDef[] = [
  {
    id: "angel-01", name: "Angel of Calm", nameTh: "คุณคือความสงบ ลึกซึ้ง และมีสติ",
    tagTh: "ผู้สังเกต · ผู้รู้สึก · ผู้คิด",
    desc: "คุณเป็นคนที่ใจเย็นและคิดก่อนพูดเสมอ มีสติรับรู้ทุกความรู้สึก ไม่ถูกกระแสอารมณ์พัดพา ในวันที่ทุกคนวุ่นวาย คุณคือหินก้อนใหญ่ที่คนอื่นพิงได้",
    image: "/Quiz Demon Angle/Angel-01.jpg", type: "angel",
    pkg: "The Memoir", pkgDesc: "ความงามอยู่ในความเรียบง่าย งานสงบและเต็มไปด้วยความหมาย",
    products: [
      { nameTh: "ชุดดอกไม้จันทน์พรีเมียม", price: "1,500", img: "/Premium.jpg" },
      { nameTh: "โกศเซรามิคคลาสสิค", price: "3,500", img: "/SD Urn.png" },
    ],
  },
  {
    id: "angel-02", name: "Angel of Hope", nameTh: "คุณคือแสงสว่างในวันที่มืดมน",
    tagTh: "นักฝัน · นักสู้ · ผู้ไม่ยอมแพ้",
    desc: "คุณเชื่อมั่นว่าทุกวิกฤตมีทางออก มองปัญหาเป็นโอกาส พร้อมลุกขึ้นใหม่เสมอ พลังงานบวกของคุณเป็นสิ่งที่คนรอบข้างรู้สึกได้โดยไม่ต้องบอกกล่าว",
    image: "/Quiz Demon Angle/Angel-02.jpg", type: "angel",
    pkg: "The Narrative", pkgDesc: "บอกเล่าเรื่องราวชีวิตอันงดงาม ให้ทุกคนได้จดจำตลอดไป",
    products: [
      { nameTh: "พวงหรีดทองพรีเมียม", price: "3,500", img: "/Flower G.png" },
      { nameTh: "ชุดดอกไม้จันทน์ 100 ดอก", price: "900", img: "/100.jpg" },
    ],
  },
  {
    id: "angel-03", name: "Angel of Healing", nameTh: "คุณคือคนที่เยียวยาหัวใจคนอื่น",
    tagTh: "ผู้รับฟัง · ผู้เยียวยา · ผู้ดูแล",
    desc: "คุณรู้สึกได้ถึงความเจ็บปวดของคนอื่นก่อนที่เขาจะพูด ธรรมชาติของคุณคือการดูแลและเยียวยา ทำให้คนรอบข้างรู้สึกปลอดภัยเสมอ",
    image: "/Quiz Demon Angle/Angel-03.jpg", type: "angel",
    pkg: "The Narrative", pkgDesc: "งานอบอุ่น เต็มไปด้วยความห่วงใยและความรักจากคนรอบข้าง",
    products: [
      { nameTh: "พวงหรีดขาวคลาสสิค", price: "1,500", img: "/Flower C.png" },
      { nameTh: "ชุดดอกไม้จันทน์พรีเมียม", price: "1,500", img: "/Premium.jpg" },
    ],
  },
  {
    id: "angel-04", name: "Angel of Love", nameTh: "คุณเต็มไปด้วยความรักและความอบอุ่น",
    tagTh: "ผู้รัก · ผู้ผูกพัน · ผู้มีน้ำใจ",
    desc: "ความสัมพันธ์คือพลังงานหลักของคุณ คุณรู้สึกมีชีวิตเมื่อได้ใกล้ชิดคนที่รัก ความรักของคุณลึกและจริงใจ บางครั้งลึกกว่าที่คุณกล้าแสดงออก",
    image: "/Quiz Demon Angle/Angel-04.jpg", type: "angel",
    pkg: "The Narrative", pkgDesc: "เพราะทุกความรักสมควรถูกจดจำ และทุกการจากลาสมควรงดงาม",
    products: [
      { nameTh: "พวงหรีดทองพรีเมียม", price: "3,500", img: "/Flower G.png" },
      { nameTh: "ชุดของชำร่วย Luxury", price: "150/ชุด", img: "/set3.jpg" },
    ],
  },
  {
    id: "angel-05", name: "Guardian Angel", nameTh: "คุณคือผู้ปกป้องที่แข็งแกร่ง",
    tagTh: "ผู้นำ · ผู้ปกป้อง · ผู้รับผิดชอบ",
    desc: "คุณรับผิดชอบทั้งต่อตัวเองและคนรอบข้าง มักเป็นคนที่ทุกคนหันมาพึ่งพาในยามวิกฤต ความแข็งแกร่งของคุณไม่ได้มาจากความไม่รู้สึก แต่จากการเลือกที่จะยืนหยัด",
    image: "/Quiz Demon Angle/Angel-05.jpg", type: "angel",
    pkg: "The Legacy", pkgDesc: "เกียรติยศและความภาคภูมิใจ สำหรับผู้ที่ทุ่มเทให้คนรอบข้างมาตลอด",
    products: [
      { nameTh: "พวงหรีดม่วงรอยัล", price: "5,500", img: "/Flower R.png" },
      { nameTh: "โกศทองเหลืองพรีเมียม", price: "8,500", img: "/Golden Urn.png" },
    ],
  },
  {
    id: "angel-06", name: "Angel of Dreams", nameTh: "คุณมีโลกจินตนาการที่สวยงาม",
    tagTh: "นักฝัน · ผู้สร้างสรรค์ · ผู้มีวิสัยทัศน์",
    desc: "คุณอาศัยอยู่ระหว่างโลกความจริงและจินตนาการ ความฝันของคุณคือต้นกำเนิดของสิ่งสร้างสรรค์ที่ยิ่งใหญ่ คนที่รู้จักคุณดีจะพบว่าโลกภายในของคุณลึกซึ้งกว่าที่เห็น",
    image: "/Quiz Demon Angle/Angel-06.jpg", type: "angel",
    pkg: "The Masterpiece", pkgDesc: "งานที่ออกแบบเหมือนงานศิลป์ สะท้อนจิตวิญญาณที่ไม่เหมือนใคร",
    products: [
      { nameTh: "พวงหรีด Fan Deluxe", price: "4,500", img: "/Flower D.png" },
      { nameTh: "ชุดของชำร่วย Luxury", price: "150/ชุด", img: "/set3.jpg" },
    ],
  },
  {
    id: "angel-07", name: "Angel of Music", nameTh: "คุณใช้เสียงเพลงแทนความรู้สึก",
    tagTh: "ศิลปิน · นักรู้สึก · ผู้ละเอียดอ่อน",
    desc: "คุณรับรู้โลกผ่านประสาทสัมผัสที่ละเอียดอ่อน เสียง แสง กลิ่น — ล้วนพูดกับคุณได้ คุณใช้ศิลปะเป็นภาษาที่ตรงไปตรงมากว่าคำพูดใดๆ",
    image: "/Quiz Demon Angle/Angel-07.jpg", type: "angel",
    pkg: "The Legacy", pkgDesc: "บรรยากาศสุนทรีย์ ดนตรีและแสงเสียงที่สร้างความทรงจำตลอดกาล",
    products: [
      { nameTh: "ชุดดอกไม้จันทน์พรีเมียม", price: "1,500", img: "/Premium.jpg" },
      { nameTh: "ชุดของชำร่วย Luxury", price: "150/ชุด", img: "/set3.jpg" },
    ],
  },
  {
    id: "angel-08", name: "Angel of Freedom", nameTh: "คุณรักอิสระและการเดินทาง",
    tagTh: "นักสำรวจ · ผู้แสวงหา · ผู้ไม่หยุดนิ่ง",
    desc: "คุณเชื่อว่าชีวิตมีไว้สำรวจ ไม่ใช่แค่ดำเนินไป กรอบเกณฑ์ทำให้คุณหายใจไม่ออก คุณต้องการพื้นที่เพื่อเติบโต เปลี่ยนแปลง และเป็นตัวเอง",
    image: "/Quiz Demon Angle/Angel-08.jpg", type: "angel",
    pkg: "The Legacy", pkgDesc: "งานที่ไม่ยึดติดรูปแบบ สร้างสรรค์ตามวิถีชีวิตที่เป็นตัวเอง",
    products: [
      { nameTh: "พวงหรีด Fan Deluxe", price: "4,500", img: "/Flower D.png" },
      { nameTh: "ชุดของชำร่วยพื้นฐาน", price: "35/ชุด", img: "/set1.jpg" },
    ],
  },
  {
    id: "angel-09", name: "Angel of Luck", nameTh: "คุณมีพลังแห่งโชคอยู่กับตัว",
    tagTh: "ผู้มองโลกสดใส · มีเสน่ห์ · ดึงดูดสิ่งดี",
    desc: "คุณดึงดูดสิ่งดีๆ เข้ามาในชีวิต ไม่ใช่แค่โชค แต่เพราะคุณเปิดใจรับและมองเห็นโอกาสที่คนอื่นมองข้าม รอยยิ้มของคุณเป็นสิ่งที่ทุกคนจดจำ",
    image: "/Quiz Demon Angle/Angel-09.jpg", type: "angel",
    pkg: "The Narrative", pkgDesc: "งานที่เต็มไปด้วยความสุขและรอยยิ้ม แม้ในวันที่ยากที่สุด",
    products: [
      { nameTh: "พวงหรีดขาวคลาสสิค", price: "1,500", img: "/Flower C.png" },
      { nameTh: "ชุดดอกไม้จันทน์ 100 ดอก", price: "900", img: "/100.jpg" },
    ],
  },
  {
    id: "angel-10", name: "Angel of Dawn", nameTh: "คุณคือการเริ่มต้นใหม่เสมอ",
    tagTh: "ผู้ลุกขึ้น · ผู้ให้อภัย · ผู้เยียวยาตัวเอง",
    desc: "คุณผ่านพายุมามากกว่าที่คนอื่นรู้ แต่ทุกครั้งคุณก็ลุกขึ้นได้ ความสามารถในการให้อภัยตัวเองและเริ่มใหม่คือพลังที่หายากและทรงคุณค่าอย่างยิ่ง",
    image: "/Quiz Demon Angle/Angel-10.jpg", type: "angel",
    pkg: "The Memoir", pkgDesc: "สงบ เรียบง่าย เต็มไปด้วยความหมาย — เหมือนรุ่งอรุณใหม่",
    products: [
      { nameTh: "พวงหรีดทองพรีเมียม", price: "3,500", img: "/Flower G.png" },
      { nameTh: "ชุดดอกไม้จันทน์ 100 ดอก", price: "900", img: "/100.jpg" },
    ],
  },
  {
    id: "demon-01", name: "Sulky Devil", nameTh: "ขึ้งอน แต่รักจริง",
    tagTh: "ผู้รักลึก · รู้สึกไว · แต่ไม่กล้าบอก",
    desc: "คุณรักลึกมากกว่าที่แสดงออก การขึ้งอนของคุณคือสัญญาณบอกว่า 'คุณสำคัญกับฉันมาก' คนที่เข้าใจคุณจะรู้ว่าหลังความน้อยใจมีความรักอยู่เสมอ",
    image: "/Quiz Demon Angle/Demon-01.jpg", type: "demon",
    pkg: "The Narrative", pkgDesc: "งานที่บอกเล่าความรักที่ซ่อนอยู่ ให้ทุกคนได้รู้ว่าคุณรักกันแค่ไหน",
    products: [
      { nameTh: "พวงหรีดขาวคลาสสิค", price: "1,500", img: "/Flower C.png" },
      { nameTh: "ชุดดอกไม้จันทน์พรีเมียม", price: "1,500", img: "/Premium.jpg" },
    ],
  },
  {
    id: "demon-02", name: "Prank Devil", nameTh: "สายแกล้ง สร้างเสียงหัวเราะ",
    tagTh: "นักสร้างสีสัน · คนตลก · ผู้ทำให้ทุกคนยิ้ม",
    desc: "คุณทำให้ทุกที่ที่อยู่มีชีวิตชีวา การแกล้งเล่นของคุณคือภาษาแห่งความรัก คุณสร้างความทรงจำที่คนอื่นหัวเราะได้แม้เวลาผ่านไปนานแค่ไหน",
    image: "/Quiz Demon Angle/Demon-02.jpg", type: "demon",
    pkg: "The Legacy", pkgDesc: "งานที่เต็มไปด้วยเรื่องราวและเสียงหัวเราะ สมกับชีวิตที่มีสีสัน",
    products: [
      { nameTh: "พวงหรีด Fan Deluxe", price: "4,500", img: "/Flower D.png" },
      { nameTh: "ชุดของชำร่วยพรีเมียม", price: "85/ชุด", img: "/set2.jpg" },
    ],
  },
  {
    id: "demon-03", name: "Secret Devil", nameTh: "ลึกลับ น่าค้นหา",
    tagTh: "ผู้ซ่อนตัว · ผู้สังเกต · ผู้ลึกซึ้ง",
    desc: "คุณไม่เปิดเผยตัวเองง่ายๆ ไม่ใช่เพราะไม่ไว้ใจ แต่เพราะคุณรู้ว่าคุณค่าที่แท้จริงต้องค้นพบ ไม่ใช่แจกฟรี คนที่ได้รู้จักคุณจริงๆ รู้ว่าพวกเขาโชคดีแค่ไหน",
    image: "/Quiz Demon Angle/Demon-03.jpg", type: "demon",
    pkg: "The Masterpiece", pkgDesc: "งานที่มีความหมายลึกซึ้ง ออกแบบเฉพาะตัว สำหรับผู้ที่ไม่เหมือนใคร",
    products: [
      { nameTh: "โกศทองเหลืองพรีเมียม", price: "8,500", img: "/Golden Urn.png" },
      { nameTh: "ชุดของชำร่วย Luxury", price: "150/ชุด", img: "/set3.jpg" },
    ],
  },
  {
    id: "demon-04", name: "Lazy Devil", nameTh: "ชิลๆ ใช้ชีวิตสโลว์ไลฟ์",
    tagTh: "ผู้ชิล · นักพักผ่อน · ผู้รู้จักความสุขเล็กๆ",
    desc: "คุณเข้าใจสิ่งที่คนส่วนใหญ่ยังตามหา นั่นคือ 'การพัก' ไม่ใช่ความอ่อนแอ คุณรู้ว่าความสุขไม่ได้อยู่ที่ความเร็ว แต่อยู่ที่การได้สัมผัสช่วงเวลาตรงหน้า",
    image: "/Quiz Demon Angle/Demon-04.jpg", type: "demon",
    pkg: "The Memoir", pkgDesc: "เรียบง่าย ไม่ซับซ้อน เต็มไปด้วยความอบอุ่น ไม่มีอะไรเกินจำเป็น",
    products: [
      { nameTh: "ชุดของชำร่วยพื้นฐาน", price: "35/ชุด", img: "/set1.jpg" },
      { nameTh: "ชุดดอกไม้จันทน์ 50 ดอก", price: "500", img: "/50.jpg" },
    ],
  },
  {
    id: "demon-05", name: "Foodie Devil", nameTh: "ความสุขคือการกิน",
    tagTh: "นักชิม · ผู้รักความอร่อย · ผู้แสวงหาความสุข",
    desc: "คุณรู้ดีว่าอาหารไม่ใช่แค่สารอาหาร — มันคือความทรงจำ ความรัก และการเชื่อมต่อ โต๊ะอาหารของคุณคือพื้นที่ที่ทุกคนรู้สึกเป็นที่ต้อนรับ",
    image: "/Quiz Demon Angle/Demon-05.jpg", type: "demon",
    pkg: "The Legacy", pkgDesc: "งานที่มี Catering จัดเต็ม เพราะทุกมื้ออาหารคือความทรงจำ",
    products: [
      { nameTh: "ชุดดอกไม้จันทน์พรีเมียม", price: "1,500", img: "/Premium.jpg" },
      { nameTh: "ชุดของชำร่วย Luxury", price: "150/ชุด", img: "/set3.jpg" },
    ],
  },
  {
    id: "demon-06", name: "Chaos Devil", nameTh: "สนุก ซน พลังลั่น",
    tagTh: "นักผจญภัย · ผู้มีพลังงานสูง · ผู้ทำลายความน่าเบื่อ",
    desc: "คุณคือพลังงานที่ทำให้ทุกที่มีชีวิต คุณไม่กลัวความวุ่นวาย — คุณสร้างมันอย่างสร้างสรรค์ ชีวิตของคุณไม่มีคำว่า 'จืดชืด' อยู่ในพจนานุกรม",
    image: "/Quiz Demon Angle/Demon-06.jpg", type: "demon",
    pkg: "The Masterpiece", pkgDesc: "งานระดับ Grand เต็มพลังงาน ระบบแสงเสียงพิเศษ สมกับชีวิตที่ยิ่งใหญ่",
    products: [
      { nameTh: "พวงหรีดม่วงรอยัล", price: "5,500", img: "/Flower R.png" },
      { nameTh: "พวงหรีด Fan Deluxe", price: "4,500", img: "/Flower D.png" },
    ],
  },
  {
    id: "demon-07", name: "Ego Devil", nameTh: "มั่นใจ และมีเสน่ห์",
    tagTh: "ผู้นำ · นักประสบความสำเร็จ · ผู้มีเสน่ห์",
    desc: "คุณเชื่อในตัวเองและไม่กลัวที่จะแสดงออก ความมั่นใจของคุณดึงดูดคนเข้ามา คุณรู้ว่าตัวเองต้องการอะไร และกล้าที่จะออกไปเอามัน",
    image: "/Quiz Demon Angle/Demon-07.jpg", type: "demon",
    pkg: "The Masterpiece", pkgDesc: "เกียรติยศระดับ Royal สำหรับผู้ที่ใช้ชีวิตอย่างยิ่งใหญ่",
    products: [
      { nameTh: "โกศทองเหลืองพรีเมียม", price: "8,500", img: "/Golden Urn.png" },
      { nameTh: "พวงหรีดม่วงรอยัล", price: "5,500", img: "/Flower R.png" },
    ],
  },
  {
    id: "demon-08", name: "Jealous Devil", nameTh: "รักแรง หวงแรง",
    tagTh: "ผู้รักอย่างเข้มข้น · ผู้ผูกพันอย่างลึกซึ้ง",
    desc: "คุณรักอย่างไม่มีข้อแม้ ความหึงหวงของคุณไม่ใช่ความอ่อนแอ — มันคือบทพิสูจน์ว่าคุณลงทุนทางอารมณ์อย่างเต็มที่ คนที่ได้รับความรักจากคุณโชคดีมาก",
    image: "/Quiz Demon Angle/Demon-08.jpg", type: "demon",
    pkg: "The Legacy", pkgDesc: "งานที่สะท้อนความรักที่ยิ่งใหญ่ เต็มไปด้วยความงดงามและความหมาย",
    products: [
      { nameTh: "พวงหรีดทองพรีเมียม", price: "3,500", img: "/Flower G.png" },
      { nameTh: "ชุดของชำร่วย Luxury", price: "150/ชุด", img: "/set3.jpg" },
    ],
  },
  {
    id: "demon-09", name: "Speed Devil", nameTh: "รวดเร็ว ใจร้อน",
    tagTh: "นักลงมือ · ผู้ขับเคลื่อน · ผู้ไม่รอช้า",
    desc: "คุณตัดสินใจเร็ว ลงมือเร็ว ไม่ทนต่อความล่าช้า พลังงานของคุณผลักดันให้ทุกอย่างเดินหน้า คุณคือคนที่ทำให้สิ่งต่างๆ 'เกิดขึ้น' จริงๆ",
    image: "/Quiz Demon Angle/Demon-09.jpg", type: "demon",
    pkg: "The Narrative", pkgDesc: "วางแผนล่วงหน้า ทุกอย่างพร้อมเมื่อถึงเวลา ไม่มีการรอช้า",
    products: [
      { nameTh: "ชุดของชำร่วยพรีเมียม", price: "85/ชุด", img: "/set2.jpg" },
      { nameTh: "ชุดดอกไม้จันทน์ 100 ดอก", price: "900", img: "/100.jpg" },
    ],
  },
  {
    id: "demon-10", name: "Nightmare Devil", nameTh: "ดาร์ก แต่ลึกซึ้ง",
    tagTh: "นักคิด · ผู้ตั้งคำถาม · ผู้เข้าใจความเจ็บปวด",
    desc: "คุณไม่กลัวที่จะมองตรงเข้าไปในความมืด เพราะคุณรู้ว่านั่นคือที่ที่ความจริงซ่อนอยู่ คุณเข้าใจความเจ็บปวดของคนอื่นในระดับที่คนส่วนใหญ่ทำไม่ได้",
    image: "/Quiz Demon Angle/Demon-10.jpg", type: "demon",
    pkg: "The Masterpiece", pkgDesc: "งานที่ลึกซึ้งและมีความหมาย ออกแบบด้วย Personal Funeral Director เฉพาะตัว",
    products: [
      { nameTh: "โกศทองเหลืองพรีเมียม", price: "8,500", img: "/Golden Urn.png" },
      { nameTh: "ชุดของชำร่วย Luxury", price: "150/ชุด", img: "/set3.jpg" },
    ],
  },
];

// ─── Questions ────────────────────────────────────────────────────────────────

const QUESTIONS: QuizQuestion[] = [
  {
    q: "เมื่อคุณมีวันหยุดว่างๆ คุณอยากทำอะไรมากที่สุด?",
    opts: [
      { text: "นอนพักผ่อนอยู่บ้าน สงบกาย สงบใจ", scores: { "angel-01": 2, "demon-04": 2, "demon-03": 1, "angel-10": 1 } },
      { text: "ออกไปสำรวจสถานที่ใหม่ ผจญภัย", scores: { "angel-08": 2, "demon-06": 2, "angel-09": 1 } },
      { text: "อยู่กับคนที่รัก ทำกิจกรรมร่วมกัน", scores: { "angel-04": 2, "angel-03": 2, "angel-05": 1, "demon-01": 1 } },
      { text: "สร้างสรรค์งานศิลปะ เขียน วาดรูป ฟังเพลง", scores: { "angel-06": 2, "angel-07": 2, "demon-10": 1 } },
    ],
  },
  {
    q: "เวลาเจอปัญหาใหญ่ คุณมักจะทำอะไรเป็นอย่างแรก?",
    opts: [
      { text: "ใจเย็น วิเคราะห์สถานการณ์ก่อนลงมือ", scores: { "angel-01": 2, "angel-05": 1, "demon-09": 1 } },
      { text: "มองหาแง่บวก เชื่อว่าทุกอย่างจะดีขึ้น", scores: { "angel-02": 2, "angel-09": 2, "angel-10": 1 } },
      { text: "ระบายหรือร้องไห้กับคนที่ไว้ใจ", scores: { "demon-01": 2, "angel-04": 2, "demon-08": 1 } },
      { text: "เก็บไว้ในใจ แล้วค่อยจัดการในแบบตัวเอง", scores: { "demon-03": 2, "demon-10": 2, "angel-01": 1 } },
    ],
  },
  {
    q: "เพื่อนๆ มักบอกว่าคุณเป็นคนแบบไหน?",
    opts: [
      { text: "ไว้ใจได้ รับผิดชอบ พึ่งพาได้เสมอ", scores: { "angel-05": 2, "angel-01": 1, "angel-03": 1, "demon-09": 1 } },
      { text: "ตลก สนุกสนาน ทำให้ทุกคนหัวเราะได้", scores: { "demon-02": 2, "demon-06": 2, "angel-09": 1 } },
      { text: "มีเสน่ห์ ดึงดูดใจ มั่นใจในตัวเอง", scores: { "demon-07": 2, "demon-09": 1, "demon-08": 1 } },
      { text: "ลึกลับ น่าค้นหา ไม่ค่อยเปิดเผยตัวเอง", scores: { "demon-03": 2, "demon-10": 2, "angel-06": 1 } },
    ],
  },
  {
    q: "สิ่งที่สำคัญที่สุดในชีวิตของคุณคืออะไร?",
    opts: [
      { text: "ความสัมพันธ์อันอบอุ่นกับคนรอบข้าง", scores: { "angel-04": 2, "angel-03": 2, "angel-05": 1, "demon-08": 1 } },
      { text: "อิสระในการใช้ชีวิตตามแบบที่ตัวเองต้องการ", scores: { "angel-08": 2, "demon-06": 1, "demon-07": 1 } },
      { text: "ความสงบสุขและความมั่นคงในชีวิต", scores: { "angel-01": 2, "demon-04": 2, "angel-10": 1 } },
      { text: "การเติบโตและการได้รับการยอมรับ", scores: { "angel-02": 2, "demon-09": 2, "demon-07": 1 } },
    ],
  },
  {
    q: "คุณรู้สึกดีที่สุดเมื่อได้ทำสิ่งใด?",
    opts: [
      { text: "ช่วยเหลือหรือดูแลคนที่คุณรัก", scores: { "angel-03": 2, "angel-05": 1, "angel-04": 1 } },
      { text: "ลองสิ่งใหม่ที่ไม่เคยทำมาก่อน", scores: { "angel-08": 2, "demon-06": 2, "angel-09": 1 } },
      { text: "อยู่เงียบๆ จมอยู่กับความคิดตัวเอง", scores: { "angel-07": 2, "angel-06": 1, "demon-03": 1, "demon-10": 1 } },
      { text: "กินของอร่อย นอนหลับ พักอย่างเต็มที่", scores: { "demon-05": 2, "demon-04": 2, "demon-02": 1 } },
    ],
  },
  {
    q: "คุณรับมือกับความเศร้าหรือความสูญเสียอย่างไร?",
    opts: [
      { text: "ฟังเพลง ดูหนัง หรือจมกับงานสร้างสรรค์", scores: { "angel-07": 2, "demon-10": 2, "angel-06": 1 } },
      { text: "พูดคุยและระบายกับคนที่ไว้ใจ", scores: { "angel-04": 2, "angel-03": 1, "demon-01": 1 } },
      { text: "ออกไปข้างนอก ทำกิจกรรม เปลี่ยนบรรยากาศ", scores: { "angel-08": 2, "demon-06": 1, "angel-09": 1, "angel-02": 1 } },
      { text: "นอนพักผ่อน รอให้เวลาเยียวยา", scores: { "demon-04": 2, "angel-01": 1, "angel-10": 1 } },
    ],
  },
  {
    q: "ตอนนี้คุณ 'อยากได้' สิ่งใดมากที่สุด?",
    opts: [
      { text: "ใครสักคนที่เข้าใจคุณอย่างแท้จริง", scores: { "angel-04": 2, "demon-01": 2, "demon-08": 1 } },
      { text: "เวลาส่วนตัวที่ไม่มีใครมายุ่ง", scores: { "demon-03": 2, "angel-01": 1, "demon-04": 1 } },
      { text: "ประสบการณ์ใหม่และการผจญภัย", scores: { "angel-08": 2, "demon-06": 2, "angel-09": 1 } },
      { text: "การยอมรับและความชื่นชมจากคนรอบข้าง", scores: { "demon-07": 2, "demon-09": 1, "angel-02": 1 } },
    ],
  },
  {
    q: "ถ้าคุณเป็น 'วิญญาณ' คุณอยากเป็นแบบไหน?",
    opts: [
      { text: "วิญญาณที่สงบ สถิตอยู่กับธรรมชาติ", scores: { "angel-01": 2, "angel-10": 2, "demon-04": 1 } },
      { text: "วิญญาณที่อบอุ่น คอยปกป้องคนที่รัก", scores: { "angel-03": 2, "angel-04": 2, "angel-05": 1 } },
      { text: "วิญญาณซุกซน คอยส่งสัญญาณให้คนรัก", scores: { "demon-02": 2, "demon-06": 2, "angel-09": 1 } },
      { text: "วิญญาณลึกลับ ทิ้งร่องรอยไว้ให้ค้นหา", scores: { "demon-03": 2, "demon-10": 2, "angel-06": 1 } },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Quiz() {
  const [stage, setStage] = useState<Stage>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [result, setResult] = useState<CardDef | null>(null);

  const handleAnswer = (optIndex: number, opt: QuizOption) => {
    if (selected !== null) return;
    setSelected(optIndex);

    const newScores = { ...scores };
    Object.entries(opt.scores).forEach(([id, pts]) => {
      newScores[id] = (newScores[id] ?? 0) + pts;
    });
    setScores(newScores);

    setTimeout(() => {
      setSelected(null);
      if (currentQ + 1 < QUESTIONS.length) {
        setCurrentQ((q) => q + 1);
      } else {
        const winner = CARDS.reduce((best, card) =>
          (newScores[card.id] ?? 0) > (newScores[best.id] ?? 0) ? card : best
        );
        setResult(winner);
        setStage("analyzing");
        setTimeout(() => {
          setStage("result");
          setTimeout(() => setIsFlipped(true), 800);
        }, 2800);
      }
    }, 500);
  };

  const reset = () => {
    setStage("intro");
    setCurrentQ(0);
    setScores({});
    setSelected(null);
    setIsFlipped(false);
    setResult(null);
  };

  const progress = ((currentQ) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <AnimatePresence mode="wait">

        {/* ── INTRO ─────────────────────────────────────────── */}
        {stage === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-12"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-10"
            >
              <p className="text-gold/70 tracking-[0.4em] text-xs uppercase mb-4">SASAN × Soul Quiz</p>
              <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">
                วิญญาณของคุณ<br />คือแบบไหน?
              </h1>
              <p className="text-white/50 text-sm md:text-base max-w-md mx-auto leading-relaxed">
                ตอบ 8 ข้อ แล้วค้นพบตัวละครวิญญาณที่ตรงกับบุคลิกของคุณ<br />พร้อมสินค้าและบริการที่เหมาะกับคุณที่สุด
              </p>
            </motion.div>

            {/* Card stack preview */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="relative w-56 h-80 mb-10"
            >
              {[2, 1, 0].map((offset) => (
                <div
                  key={offset}
                  className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    transform: `rotate(${(offset - 1) * 6}deg) translateY(${offset * 4}px)`,
                    zIndex: 3 - offset,
                  }}
                >
                  <img
                    src="/Quiz Demon Angle/back card.png"
                    alt="card back"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-gold/30" style={{ zIndex: 4 }} />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={() => setStage("quiz")}
              className="flex items-center gap-3 bg-gold text-black px-10 py-4 rounded-full font-semibold text-sm tracking-widest uppercase hover:bg-yellow-300 transition-colors"
            >
              <Wand2 size={16} />
              เริ่ม Quiz
            </motion.button>
            <p className="text-white/30 text-xs mt-4">ใช้เวลาประมาณ 2 นาที · ไม่มีคำตอบผิดหรือถูก</p>
          </motion.div>
        )}

        {/* ── QUIZ ──────────────────────────────────────────── */}
        {stage === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col pt-24 pb-12 px-4"
          >
            {/* Progress */}
            <div className="max-w-2xl mx-auto w-full mb-8">
              <div className="flex justify-between text-xs text-white/40 mb-2">
                <span>ข้อที่ {currentQ + 1} / {QUESTIONS.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gold rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQ}
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -60, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* Question */}
                  <h2 className="font-serif text-2xl md:text-3xl text-white mb-8 leading-snug">
                    {QUESTIONS[currentQ].q}
                  </h2>

                  {/* Options */}
                  <div className="grid gap-3">
                    {QUESTIONS[currentQ].opts.map((opt, i) => (
                      <motion.button
                        key={i}
                        onClick={() => handleAnswer(i, opt)}
                        disabled={selected !== null}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className={`w-full text-left px-6 py-4 rounded-xl border transition-all duration-200 text-sm md:text-base
                          ${selected === i
                            ? "border-gold bg-gold/20 text-gold"
                            : selected !== null
                            ? "border-white/10 bg-white/3 text-white/30 cursor-not-allowed"
                            : "border-white/15 bg-white/5 text-white hover:border-gold/60 hover:bg-gold/10 hover:text-gold"
                          }`}
                      >
                        <span className="text-gold/50 mr-3 font-serif">{String.fromCharCode(65 + i)}.</span>
                        {opt.text}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* ── ANALYZING ─────────────────────────────────────── */}
        {stage === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center gap-8"
          >
            <motion.div
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-40 h-56 rounded-xl overflow-hidden shadow-[0_0_60px_rgba(234,213,136,0.4)]"
            >
              <img src="/Quiz Demon Angle/back card.png" alt="" className="w-full h-full object-cover" />
            </motion.div>

            <div className="text-center">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-gold font-serif text-xl mb-2"
              >
                กำลังค้นหาวิญญาณของคุณ...
              </motion.div>
              <p className="text-white/30 text-xs tracking-widest uppercase">Reading your soul</p>
            </div>

            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-gold"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* ── RESULT ────────────────────────────────────────── */}
        {stage === "result" && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen pt-24 pb-16 px-4"
          >
            <div className="max-w-4xl mx-auto">

              {/* Header */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mb-10"
              >
                <p className="text-gold/60 tracking-[0.4em] text-xs uppercase mb-2">วิญญาณของคุณคือ</p>
                <h1 className="font-serif text-3xl md:text-5xl text-gold">{result.name}</h1>
              </motion.div>

              {/* Card flip + info */}
              <div className="flex flex-col lg:flex-row gap-10 items-center justify-center mb-14">

                {/* Card flip */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex-shrink-0"
                  style={{ perspective: "1000px" }}
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="relative w-56 h-80"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Back face */}
                    <div
                      className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <img src="/Quiz Demon Angle/back card.png" alt="" className="w-full h-full object-cover" />
                    </div>
                    {/* Front face */}
                    <div
                      className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(234,213,136,0.3)]"
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                      <img src={result.image} alt={result.name} className="w-full h-full object-cover" />
                    </div>
                  </motion.div>
                </motion.div>

                {/* Personality info */}
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="max-w-md"
                >
                  <div className={`inline-block text-xs px-3 py-1 rounded-full border mb-4 ${
                    result.type === "angel"
                      ? "border-blue-400/40 text-blue-300 bg-blue-400/10"
                      : "border-red-400/40 text-red-300 bg-red-400/10"
                  }`}>
                    {result.type === "angel" ? "✦ Angel Spirit" : "✦ Demon Spirit"}
                  </div>

                  <h2 className="font-serif text-2xl md:text-3xl text-white mb-1">{result.nameTh}</h2>
                  <p className="text-gold/60 text-sm mb-4">{result.tagTh}</p>
                  <p className="text-white/70 leading-relaxed text-sm md:text-base">{result.desc}</p>

                  <div className="mt-6 p-4 border border-gold/20 bg-gold/5 rounded-xl">
                    <p className="text-gold/60 text-xs uppercase tracking-widest mb-1">บริการที่เหมาะกับคุณ</p>
                    <p className="text-white font-serif text-lg">{result.pkg}</p>
                    <p className="text-white/50 text-sm mt-1">{result.pkgDesc}</p>
                  </div>
                </motion.div>
              </div>

              {/* Product recommendations */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="font-serif text-xl text-center text-white/80 mb-6">
                  สินค้าที่เหมาะกับวิญญาณของคุณ
                </h3>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-10">
                  {result.products.map((p, i) => (
                    <Link key={i} href="/shop">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-gold/40 transition-colors"
                      >
                        <div className="aspect-square bg-white/5">
                          <img src={p.img} alt={p.nameTh} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-3">
                          <p className="text-white/80 text-xs leading-tight mb-1">{p.nameTh}</p>
                          <p className="text-gold text-sm font-semibold">{p.price} ฿</p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link href="/shop">
                    <button className="flex items-center gap-2 bg-gold text-black px-7 py-3 rounded-full text-sm font-semibold hover:bg-yellow-300 transition-colors">
                      <ShoppingBag size={15} />
                      ดูสินค้าทั้งหมด
                    </button>
                  </Link>
                  <Link href="/#services">
                    <button className="flex items-center gap-2 border border-gold/50 text-gold px-7 py-3 rounded-full text-sm hover:bg-gold/10 transition-colors">
                      <ArrowRight size={15} />
                      ดูแพ็กเกจ {result.pkg}
                    </button>
                  </Link>
                  <button
                    onClick={reset}
                    className="flex items-center gap-2 border border-white/20 text-white/60 px-7 py-3 rounded-full text-sm hover:border-white/40 hover:text-white transition-colors"
                  >
                    <RotateCcw size={15} />
                    ทำ Quiz ใหม่
                  </button>
                </div>

                {/* Share nudge */}
                <p className="text-center text-white/25 text-xs mt-8">
                  คุณได้รับการ์ด <span className="text-white/40">{result.name}</span> · SASAN The Last Chapter
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
