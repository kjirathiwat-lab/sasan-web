import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "th" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof content.th;
}

export const content = {
  th: {
    // ============================================================
    // NAVIGATION
    // ============================================================
    nav: {
      home: "หน้าหลัก",
      about: "อัตลักษณ์องค์กร",
      services: "บริการ",
      portfolio: "ผลงานที่ผ่านมา",
      shop: "ร้านค้า",
      blog: "บล็อก",
      faq: "คำถามที่พบบ่อย",
      contact: "ติดต่อเรา",
    },

    // ============================================================
    // HERO SECTION
    // ============================================================
    hero: {
      tagline: "Designing Your Beautiful Last Chapter",
      subtitle: "ออกแบบบทสุดท้ายที่งดงามของคุณ",
      description: "วางแผนและจัดงานศพแบบครบวงจรสำหรับครอบครัวที่ต้องการความสงบ โปร่งใสทุกขั้นตอน พร้อมทีมมืออาชีพดูแลตั้งแต่การวางแผนจนพิธีสุดท้าย",
      cta: "เริ่มออกแบบงาน",
      callFree: "โทรปรึกษาฟรี",
      service24h: "บริการ 24 ชม.",
      transparent: "ราคาโปร่งใส",
      noPressure: "ไม่มีการบังคับ",
    },

    // ============================================================
    // PROCESS STEPS
    // ============================================================
    process: {
      title: "ขั้นตอนการทำงาน",
      subtitle: "เราดูแลทุกขั้นตอนให้คุณ",
      steps: [
        {
          title: "ติดต่อปรึกษา",
          description: "โทรหาเรา 24 ชม. ทีมงานพร้อมรับฟังและให้คำปรึกษาฟรี",
          time: "ทันที",
        },
        {
          title: "วางแผนร่วมกัน",
          description: "นัดพบเพื่อพูดคุยรายละเอียด เลือกแพ็คเกจและบริการ",
          time: "1-2 ชม.",
        },
        {
          title: "เตรียมงาน",
          description: "ทีมงานจัดเตรียมทุกอย่าง ดอกไม้ สถานที่ อุปกรณ์",
          time: "1-3 วัน",
        },
        {
          title: "ดำเนินพิธี",
          description: "ดูแลทุกรายละเอียดตลอดงาน ให้ทุกอย่างราบรื่น",
          time: "3-7 วัน",
        },
        {
          title: "ดูแลหลังงาน",
          description: "บริการเก็บอัฐิ ลอยอังคาร และติดตามผล",
          time: "ตามต้องการ",
        },
      ],
      ready: "พร้อมเริ่มต้นแล้วหรือยัง?",
      contactFree: "ติดต่อปรึกษาฟรี",
    },

    // ============================================================
    // SOCIAL PROOF / STATS
    // ============================================================
    stats: {
      years: "ปีประสบการณ์",
      families: "ครอบครัวที่ไว้วางใจ",
      satisfaction: "ความพึงพอใจ",
      partners: "พันธมิตรที่ไว้วางใจ",
    },

    // ============================================================
    // TESTIMONIALS
    // ============================================================
    testimonials: {
      title: "เสียงจากครอบครัว",
      subtitle: "ที่ไว้วางใจเรา",
      items: [
        {
          quote: "ทีมงาน SASAN ดูแลทุกอย่างอย่างดีมาก ในช่วงเวลาที่ยากลำบากที่สุด พวกเขาทำให้ทุกอย่างผ่านไปอย่างราบรื่นและสมเกียรติ",
          name: "คุณสมชาย ว.",
          role: "ครอบครัวผู้ใช้บริการ",
        },
        {
          quote: "ประทับใจมากค่ะ ตั้งแต่การให้คำปรึกษาจนถึงวันสุดท้าย ทีมงานใส่ใจทุกรายละเอียด งานออกมาสวยงามเกินคาด",
          name: "คุณวิภา ส.",
          role: "ครอบครัวผู้ใช้บริการ",
        },
        {
          quote: "บริการระดับพรีเมียมจริงๆ ครับ ราคาสมเหตุสมผล ไม่มีค่าใช้จ่ายแอบแฝง แนะนำเลยครับ",
          name: "คุณธนา พ.",
          role: "ครอบครัวผู้ใช้บริการ",
        },
        {
          quote: "ขอบคุณทีมงาน SASAN ที่ช่วยจัดงานให้คุณพ่อได้อย่างสมเกียรติ ทุกอย่างเป็นไปตามที่ตกลงกันไว้ ไม่มีค่าใช้จ่ายเพิ่มเติม",
          name: "คุณนภา ก.",
          role: "ครอบครัวผู้ใช้บริการ",
        },
        {
          quote: "ทีมงานมืออาชีพมาก ดูแลทุกขั้นตอนอย่างใส่ใจ งานออกมาสวยงาม ญาติๆ ทุกคนประทับใจ",
          name: "คุณประยุทธ์ จ.",
          role: "ครอบครัวผู้ใช้บริการ",
        },
      ],
    },

    // ============================================================
    // PHILOSOPHY / QUOTE
    // ============================================================
    philosophy: {
      quote: "ชีวิตคือการประกอบกันของ 'สสาร'... ร่างกาย ความรัก และน้ำตา",
    },

    // ============================================================
    // DIMENSIONS (4 ส สาน)
    // ============================================================
    dimensions: {
      matter: {
        title: "สสาร (MATTER)",
        description: "ความจริงของธรรมชาติ - ร่างกายมนุษย์คือสสาร น้ำตาก็คือสสารที่มีน้ำหนักเช่นกัน",
      },
      clear: {
        title: "สะสาง (CLEAR/RESOLVE)",
        description: "การปลดเปลื้องทางใจ - แก้ปัญหาที่ญาติไม่มีเวลา ให้ได้กล่าวลาอย่างหมดจด",
      },
      message: {
        title: "สาร (MESSAGE)",
        description: "จดหมายฉบับสุดท้าย - ส่งสารสุดท้ายของผู้ที่จากไป บทอวสานที่งดงาม",
      },
      weave: {
        title: "สาน (WEAVE)",
        description: "การถักทอความสัมพันธ์ - สานต่อเจตนารมณ์ ประสานทุกอย่างให้สมบูรณ์",
      },
    },

    // ============================================================
    // SERVICES SECTION
    // ============================================================
    services: {
      title: "บริการของเรา",
      subtitle: "The Storytelling Collection",
      viewCards: "แบบการ์ด",
      viewTable: "เปรียบเทียบ",
      startingPrice: "ราคาเริ่มต้น",
      duration: "ระยะเวลางาน",
      venue: "ขนาดสถานที่",
      guests: "รองรับแขก",
      features: "สิ่งที่รวมในแพ็คเกจ",
      viewGallery: "ดูตัวอย่างงาน",
      selectPackage: "เลือกแพ็คเกจนี้",
      
      // Package names
      packages: {
        memoir: {
          name: "The Memoir",
          nameTh: "เดอะ เมมัวร์",
          tagline: "Intimate & Personal",
          taglineTh: "ความทรงจำอันอบอุ่น",
          duration: "งาน 3 วัน",
          venue: "วัดขนาดเล็ก",
          guests: "30-80 คน/วัน",
        },
        narrative: {
          name: "The Narrative",
          nameTh: "เดอะ แนร์ราทีฟ",
          tagline: "Story & Journey",
          taglineTh: "บอกเล่าเรื่องราว",
          duration: "งาน 5 วัน",
          venue: "วัดขนาดกลาง",
          guests: "80-150 คน/วัน",
        },
        legacy: {
          name: "The Legacy",
          nameTh: "เดอะ เลกาซี่",
          tagline: "Grand & Honorable",
          taglineTh: "เกียรติยศสืบสาน",
          duration: "งาน 7 วัน",
          venue: "วัดขนาดใหญ่",
          guests: "150-300 คน/วัน",
        },
        masterpiece: {
          name: "The Masterpiece",
          nameTh: "เดอะ มาสเตอร์พีซ",
          tagline: "Royal & Luxurious",
          taglineTh: "ผลงานชิ้นเอก",
          duration: "งาน 7 วัน",
          venue: "วัดดังระดับประเทศ",
          guests: "300-500+ คน/วัน",
        },
      },
    },

    // ============================================================
    // SIGNATURE CARE (PROMOTIONS)
    // ============================================================
    signatureCare: {
      title: "Signature Care",
      subtitle: "สิทธิพิเศษเพื่อช่วยแบ่งเบาภาระของครอบครัวในวันที่เปราะบาง",
      prePlanning: {
        title: "การวางแผนล่วงหน้า (Pre-planning)",
        benefit1: "วางแผนล่วงหน้าก่อนความจำเป็นมาถึง ช่วยให้ครอบครัวมีเวลาเตรียมใจ",
        benefit2: "จองล่วงหน้า 30 วัน:",
        benefit2Detail: "รับเงื่อนไขพิเศษเพื่อช่วยจัดการงบประมาณ",
        benefit3: "จองล่วงหน้า 60 วัน:",
        benefit3Detail: "ได้รับการออกแบบแพ็กเกจอย่างละเอียดตามความต้องการของครอบครัว",
      },
      referral: {
        title: "โปรแกรมดูแลครอบครัวที่แนะนำกันต่อ",
        description: "เมื่อครอบครัวที่เคยใช้บริการแนะนำคนใกล้ชิดให้เราได้ดูแล",
        benefit: "เรามีสิทธิพิเศษตอบแทนทั้งสองครอบครัว",
      },
    },

    // ============================================================
    // PORTFOLIO
    // ============================================================
    portfolio: {
      title: "ผลงานที่ผ่านมา",
      subtitle: "ตัวอย่างงานที่เราภูมิใจนำเสนอ",
      note: "* รูปตัวอย่างเพื่อประกอบการพิจารณา",
      items: [
        { label: "ทีมวางแผนงาน" },
        { label: "พิธีไว้อาลัย" },
        { label: "บริการครบวงจร" },
        { label: "ดูแลด้วยใจ" },
        { label: "วางแผนพิธี" },
        { label: "ขบวนพิธี" },
        { label: "พิธีกรรมไทย" },
        { label: "จัดดอกไม้" },
      ],
    },

    // ============================================================
    // ABOUT US
    // ============================================================
    about: {
      title: "เกี่ยวกับ SASAN",
      description1: "ก่อตั้งขึ้นด้วยความตั้งใจที่จะสร้างมาตรฐานใหม่ในการจัดงานศพ ด้วยประสบการณ์กว่า 15 ปี เราเข้าใจว่าการจากลาบุคคลอันเป็นที่รัก เป็นช่วงเวลาที่ต้องการความใส่ใจเป็นพิเศษ",
      description2: "ทีมงานมืออาชีพของเราพร้อมดูแลทุกขั้นตอน ตั้งแต่การวางแผน การจัดเตรียมสถานที่ ไปจนถึงพิธีสุดท้าย เพื่อให้ครอบครัวได้มีเวลาไว้อาลัยอย่างสงบ",
      philosophy: "ทุกชีวิตมีเรื่องราว และเรื่องราวทุกเรื่องสมควรได้รับการบอกเล่าอย่างงดงาม",
      credentials: [
        { text: "ใบอนุญาตประกอบกิจการ" },
        { text: "มาตรฐาน ISO 9001" },
        { text: "สมาชิกสมาคมฯ" },
        { text: "ประกันความรับผิดชอบ" },
      ],
      stats: {
        years: "ปี",
        works: "งาน",
        team: "ทีมงาน",
      },
      imageLabels: [
        "ทีมงานมืออาชีพ",
        "ออกแบบงานอย่างพิถีพิถัน",
        "สำนักงานใหญ่ SASAN",
        "อาคารสำนักงาน",
      ],
    },

    // ============================================================
    // FAQ
    // ============================================================
    faq: {
      title: "คำถามที่พบบ่อย",
      subtitle: "FAQ",
      moreQuestions: "ยังมีคำถามเพิ่มเติม?",
      callFree: "โทรปรึกษาฟรี",
      items: [
        {
          q: "ขั้นตอนการจองบริการเป็นอย่างไร?",
          a: "เพียงติดต่อเราผ่านโทรศัพท์ LINE หรือกรอกแบบฟอร์มบนเว็บไซต์ ทีมงานจะติดต่อกลับภายใน 1 ชั่วโมง เพื่อรับฟังความต้องการและแนะนำแพ็คเกจที่เหมาะสม จากนั้นนัดหมายพบปะเพื่อวางแผนรายละเอียด",
        },
        {
          q: "ชำระเงินอย่างไร? ต้องจ่ายล่วงหน้าเท่าไหร่?",
          a: "รับชำระเงินสด โอนเงิน และบัตรเครดิต สำหรับการวางแผนล่วงหน้า (Pre-planning) มัดจำ 30% ส่วนกรณีเร่งด่วนชำระ 50% ก่อนเริ่มงาน และส่วนที่เหลือหลังเสร็จสิ้นพิธี",
        },
        {
          q: "สามารถยกเลิกหรือเลื่อนได้ไหม?",
          a: "สำหรับ Pre-planning สามารถเลื่อนได้โดยไม่มีค่าใช้จ่ายเพิ่ม และยกเลิกได้โดยหักค่าดำเนินการ 10% กรณีจองแล้วต้องการเปลี่ยนแปลง กรุณาแจ้งล่วงหน้าอย่างน้อย 7 วัน",
        },
        {
          q: "ราคาที่แจ้งรวมอะไรบ้าง? มีค่าใช้จ่ายแอบแฝงไหม?",
          a: "ราคาที่แจ้งเป็นราคาเหมาจ่ายตามรายการในแพ็คเกจ ไม่มีค่าใช้จ่ายแอบแฝง หากต้องการบริการเพิ่มเติมนอกเหนือแพ็คเกจ ทีมงานจะแจ้งราคาล่วงหน้าทุกครั้ง",
        },
        {
          q: "SASAN ให้บริการในพื้นที่ใดบ้าง?",
          a: "เราให้บริการทั่วกรุงเทพฯ และปริมณฑล รวมถึงต่างจังหวัดทั่วประเทศ (อาจมีค่าเดินทางเพิ่มเติมสำหรับพื้นที่ห่างไกล)",
        },
        {
          q: "กรณีเร่งด่วน สามารถจัดงานได้เร็วสุดกี่วัน?",
          a: "ทีมงานพร้อมให้บริการ 24 ชั่วโมง กรณีเร่งด่วนสามารถเริ่มดำเนินการได้ทันที และจัดงานได้ภายใน 24-48 ชั่วโมง",
        },
      ],
    },

    // ============================================================
    // CONTACT
    // ============================================================
    contact: {
      title: "ติดต่อเรา",
      oneStopService: "One Stop Service",
      oneStopDesc: "เลือกแพ็คเกจหรือออกแบบงานด้วยตัวเอง พร้อมคำนวณราคาอัตโนมัติ",
      startNow: "เริ่มต้นใช้งาน",
      callUs: "โทรหาเราเลย",
      available24h: "พร้อมให้บริการ 24 ชั่วโมง",
      lineOfficial: "LINE Official",
      scanOrClick: "แสกน QR หรือคลิกเพื่อแชท",
      or: "หรือ",
      directContact: "ติดต่อทีมงานโดยตรง",
      name: "ชื่อ",
      email: "อีเมล",
      phone: "เบอร์โทรศัพท์ (ไม่บังคับ)",
      serviceType: "ประเภทบริการที่สนใจ",
      message: "ข้อความ",
      submit: "ส่งข้อความ",
      sending: "กำลังส่ง...",
    },

    // ============================================================
    // TEAM SECTION
    // ============================================================
    team: {
      title: "Our Chapter",
      subtitle: "Behind The Scenes",
      description: "ทีมงานผู้อยู่เบื้องหลังทุกความสำเร็จ พร้อมดูแลคุณด้วยใจ",
      bottomText: "เราพร้อมดูแลทุกรายละเอียด เพื่อให้ \"บทสุดท้าย\" ของคุณสมบูรณ์แบบ",
      members: [
        {
          name: "เบญจมาศ",
          role: "Project Group Leader",
          roleSecondary: "6808800016",
          quote: "นำทีมด้วยวิสัยทัศน์ สร้างสรรค์ผลงานด้วยใจ",
        },
        {
          name: "ชยากร",
          role: "Content Creator",
          roleSecondary: "6808800001",
          quote: "เล่าเรื่องราวที่จับใจ",
        },
        {
          name: "วรรณสิทธิ์",
          role: "Content Creator",
          roleSecondary: "6808800013",
          quote: "สร้างสรรค์เนื้อหาที่โดดเด่น",
        },
        {
          name: "อนวรรตน์",
          role: "Project Group Secretary",
          roleSecondary: "6808800006",
          quote: "พร้อมดูแลทุกขั้นตอน",
        },
        {
          name: "จิราธิวัฒน์",
          role: "Web Programmer",
          roleSecondary: "6808800011",
          quote: "เปลี่ยนไอเดียให้เป็นจริง",
        },
      ],
    },

    // ============================================================
    // COMMON / MISC
    // ============================================================
    common: {
      learnMore: "อ่านเพิ่มเติม",
      viewAll: "ดูทั้งหมด",
      close: "ปิด",
      next: "ถัดไป",
      previous: "ก่อนหน้า",
      baht: "บาท",
      perDay: "ต่อวัน",
      people: "คน",
      days: "วัน",
      recommended: "แนะนำ",
      allInclusive: "รวมทุกอย่าง",
      readMore: "อ่านเพิ่มเติม",
      backToHome: "กลับหน้าหลัก",
      loading: "กำลังโหลด...",
      error: "เกิดข้อผิดพลาด",
      success: "สำเร็จ",
      cancel: "ยกเลิก",
      confirm: "ยืนยัน",
      save: "บันทึก",
      delete: "ลบ",
      edit: "แก้ไข",
      add: "เพิ่ม",
      remove: "ลบออก",
      search: "ค้นหา",
      filter: "กรอง",
      sort: "เรียงลำดับ",
      all: "ทั้งหมด",
      none: "ไม่มี",
      yes: "ใช่",
      no: "ไม่",
      free: "ฟรี",
      total: "รวม",
      subtotal: "รวมย่อย",
      discount: "ส่วนลด",
      quantity: "จำนวน",
      price: "ราคา",
      inStock: "มีสินค้า",
      outOfStock: "สินค้าหมด",
      addToCart: "เพิ่มลงตะกร้า",
      checkout: "ชำระเงิน",
      continueShopping: "เลือกซื้อต่อ",
    },

    // ============================================================
    // BLOG PAGE
    // ============================================================
    blog: {
      heroTitle: "SASAN",
      heroSubtitle: "The Last Chapter",
      heroTagline: "ออกแบบบทสุดท้ายที่งดงาม",
      readTime: "นาที",
      comparison: {
        title: "เปรียบเทียบความแตกต่าง",
        subtitle: "ระหว่างการวางแผนล่วงหน้า กับการไม่มีแผน",
        sasanBtn: "SASAN (วางแผนล่วงหน้า)",
        generalBtn: "ทั่วไป (ไม่มีแผน)",
      },
      cta: {
        title: "ของขวัญชิ้นสุดท้าย...",
        subtitle: "แด่คนที่คุณรัก",
        description1: "การวางแผนล่วงหน้า ไม่ใช่การแช่งตัวเอง",
        description2: "แต่คือการบอกคนที่คุณรักว่า...",
        quote: "ไม่ต้องห่วงนะ ฉันเตรียมทุกอย่างไว้ให้แล้ว ดูแลตัวเองให้ดีก็พอ",
        button: "เริ่มวางแผน \"บทสุดท้าย\" วันนี้",
        note: "ปรึกษาฟรี ไม่มีค่าใช้จ่าย",
      },
      footer: {
        quote: "คุณเขียนบทชีวิตมาดีทั้งเรื่อง... อย่าปล่อยให้ตอนจบวุ่นวาย",
      },
    },

    // ============================================================
    // SHOP PAGE
    // ============================================================
    shop: {
      title: "ร้านค้า",
      subtitle: "SASAN Shop",
      description: "พวงหรีด ดอกไม้ และของที่ระลึก คุณภาพพรีเมียม",
      searchPlaceholder: "ค้นหาสินค้า...",
      categories: {
        all: "ทั้งหมด",
        wreath: "พวงหรีด",
        flower: "ดอกไม้",
        memorial: "ของที่ระลึก",
      },
      filters: {
        priceRange: "ช่วงราคา",
        sortBy: "เรียงตาม",
        newest: "ใหม่ล่าสุด",
        priceLow: "ราคาต่ำ-สูง",
        priceHigh: "ราคาสูง-ต่ำ",
        popular: "ยอดนิยม",
      },
      product: {
        reviews: "รีวิว",
        addToCart: "เพิ่มลงตะกร้า",
        customize: "ปรับแต่ง",
        deliveryTime: "จัดส่งภายใน",
        features: "คุณสมบัติ",
      },
      cart: {
        title: "ตะกร้าสินค้า",
        empty: "ตะกร้าว่างเปล่า",
        emptyDesc: "ยังไม่มีสินค้าในตะกร้า",
        items: "รายการ",
        total: "รวมทั้งหมด",
        checkout: "ดำเนินการชำระเงิน",
        continueShopping: "เลือกซื้อต่อ",
        removeItem: "ลบสินค้า",
        customText: "ข้อความบนริบบิ้น",
        deliveryDate: "วันที่จัดส่ง",
        deliveryLocation: "สถานที่จัดส่ง",
      },
      checkout: {
        title: "ข้อมูลการจัดส่ง",
        name: "ชื่อผู้สั่ง",
        phone: "เบอร์โทรศัพท์",
        address: "ที่อยู่จัดส่ง",
        templeName: "ชื่อวัด/สถานที่",
        note: "หมายเหตุเพิ่มเติม",
        payment: "วิธีชำระเงิน",
        cod: "ชำระเงินปลายทาง",
        transfer: "โอนเงิน",
        credit: "บัตรเครดิต",
        placeOrder: "สั่งซื้อ",
        orderSuccess: "สั่งซื้อสำเร็จ!",
        orderSuccessDesc: "ทีมงานจะติดต่อกลับภายใน 30 นาที",
      },
      delivery: {
        free: "จัดส่งฟรี",
        freeOver: "ฟรีค่าส่งเมื่อซื้อครบ",
        sameDay: "จัดส่งวันเดียวกัน",
        within: "ภายใน",
        hours: "ชั่วโมง",
      },
    },

    // ============================================================
    // SERVICE SELECTOR
    // ============================================================
    serviceSelector: {
      title: "The Last Chapter",
      subtitle: "ออกแบบบทสุดท้ายที่งดงาม",
      loading: "กำลังโหลด...",
      
      modeSelect: {
        title: "เลือกวิธีการ",
        packageTitle: "The Storytelling Collection",
        packageDesc: "แพ็คเกจบริการของเรา",
        packageNote: "เลือกจากคอลเลคชันที่ออกแบบไว้ ครบจบในที่เดียว",
        packageCount: "4 แพ็คเกจ",
        
        quizTitle: "Personalized Design",
        quizDesc: "ค้นหาแพ็คเกจที่ใช่สำหรับคุณ",
        quizNote: "ตอบ 3 คำถาม ระบบจะแนะนำแพ็คเกจที่เหมาะกับคุณ",
        quizTime: "30 วินาที",
        quizTeaser: "ค้นพบแพ็คเกจที่ใช่ในเวลาไม่ถึงนาที",
      },
      
      package: {
        selectTitle: "เลือกคอลเลคชันที่เหมาะกับคุณ",
        startingPrice: "เริ่มต้น",
        guests: "แขก",
        days: "วัน",
        recommended: "แนะนำ",
        allInclusive: "รวมทุกอย่าง",
        includes: "สิ่งที่รวมในแพ็คเกจ",
        customize: "ปรับแต่งเพิ่มเติม",
        selectThis: "เลือกแพ็คเกจนี้",
      },
      
      customize: {
        title: "ปรับแต่งเพิ่มเติม",
        coffin: "เลือกโลงศพ",
        flower: "เลือกธีมดอกไม้",
        extras: "บริการเสริม",
        included: "รวมในแพ็คเกจ",
        additional: "เพิ่มเติม",
      },
      
      summary: {
        title: "สรุปรายการ",
        package: "แพ็คเกจ",
        addons: "บริการเสริม",
        total: "รวมทั้งหมด",
        note: "* ราคาอาจเปลี่ยนแปลงตามรายละเอียดจริง",
      },
      
      contact: {
        title: "ข้อมูลติดต่อ",
        name: "ชื่อ-นามสกุล",
        phone: "เบอร์โทรศัพท์",
        line: "LINE ID (ไม่บังคับ)",
        note: "หมายเหตุเพิ่มเติม",
        submit: "ส่งข้อมูล",
        submitting: "กำลังส่ง...",
      },
      
      success: {
        title: "ขอบคุณค่ะ!",
        message: "ทีมงานจะติดต่อกลับภายใน 1 ชั่วโมง",
        close: "ปิด",
      },
      
      quiz: {
        question1: "งานนี้จัดให้ใครคะ?",
        question2: "คุณอยากให้บรรยากาศงานออกมาในรูปแบบใด?",
        question3: "คุณอยากให้แขกรู้สึกอย่างไรเมื่อมาร่วมงาน?",
        analyzing: "กำลังวิเคราะห์...",
        result: "แพ็คเกจที่เหมาะกับคุณ",
        matchScore: "ความเหมาะสม",
      },
    },

    // ============================================================
    // FOOTER
    // ============================================================
    footer: {
      rights: "All rights reserved.",
    },
  },

  // ============================================================
  // ENGLISH TRANSLATIONS
  // ============================================================
  en: {
    nav: {
      home: "Home",
      about: "Corporate Identity",
      services: "Services",
      portfolio: "Portfolio",
      shop: "Shop",
      blog: "Blog",
      faq: "FAQ",
      contact: "Contact Us",
    },

    hero: {
      tagline: "Designing Your Beautiful Last Chapter",
      subtitle: "Creating meaningful farewells with dignity and grace",
      description: "Comprehensive funeral planning services for families seeking peace of mind. Transparent pricing with professional team support from planning to the final ceremony.",
      cta: "Start Planning",
      callFree: "Free Consultation",
      service24h: "24/7 Service",
      transparent: "Transparent Pricing",
      noPressure: "No Pressure",
    },

    process: {
      title: "Our Process",
      subtitle: "We take care of everything for you",
      steps: [
        {
          title: "Initial Consultation",
          description: "Call us 24/7. Our team is ready to listen and provide free advice.",
          time: "Immediate",
        },
        {
          title: "Planning Together",
          description: "Meet to discuss details, select packages and services.",
          time: "1-2 hours",
        },
        {
          title: "Preparation",
          description: "Our team prepares everything: flowers, venue, equipment.",
          time: "1-3 days",
        },
        {
          title: "Ceremony",
          description: "We handle every detail throughout the ceremony for smooth proceedings.",
          time: "3-7 days",
        },
        {
          title: "Aftercare",
          description: "Ash collection, scattering services, and follow-up care.",
          time: "As needed",
        },
      ],
      ready: "Ready to get started?",
      contactFree: "Free Consultation",
    },

    stats: {
      years: "Years of Experience",
      families: "Families Served",
      satisfaction: "Satisfaction Rate",
      partners: "Trusted Partners",
    },

    testimonials: {
      title: "Family",
      subtitle: "Testimonials",
      items: [
        {
          quote: "The SASAN team took excellent care of everything during our most difficult time. They made everything go smoothly and with dignity.",
          name: "Mr. Somchai W.",
          role: "Client Family",
        },
        {
          quote: "Very impressed from consultation to the final day. The team paid attention to every detail. The result exceeded our expectations.",
          name: "Mrs. Wipa S.",
          role: "Client Family",
        },
        {
          quote: "Truly premium service. Reasonable pricing with no hidden costs. Highly recommended.",
          name: "Mr. Thana P.",
          role: "Client Family",
        },
        {
          quote: "Thank you to the SASAN team for arranging a dignified ceremony for my father. Everything was as agreed with no additional charges.",
          name: "Mrs. Napa K.",
          role: "Client Family",
        },
        {
          quote: "Very professional team. They took care of every step with attention. Beautiful ceremony. All relatives were impressed.",
          name: "Mr. Prayuth J.",
          role: "Client Family",
        },
      ],
    },

    philosophy: {
      quote: "Life is the assembly of 'matter'... body, love, and tears.",
    },

    dimensions: {
      matter: {
        title: "MATTER",
        description: "Understanding nature's truth - the human body returns to earth, tears carry weight too.",
      },
      clear: {
        title: "CLEAR/RESOLVE",
        description: "Emotional release - we handle the details so families can say goodbye peacefully.",
      },
      message: {
        title: "MESSAGE",
        description: "The final letter - conveying the deceased's last wishes beautifully.",
      },
      weave: {
        title: "WEAVE",
        description: "Connecting relationships - continuing their legacy, bringing everything together.",
      },
    },

    services: {
      title: "Our Services",
      subtitle: "The Storytelling Collection",
      viewCards: "Card View",
      viewTable: "Compare",
      startingPrice: "Starting Price",
      duration: "Duration",
      venue: "Venue Size",
      guests: "Guest Capacity",
      features: "Package Includes",
      viewGallery: "View Gallery",
      selectPackage: "Select Package",
      
      packages: {
        memoir: {
          name: "The Memoir",
          nameTh: "The Memoir",
          tagline: "Intimate & Personal",
          taglineTh: "Intimate & Personal",
          duration: "3 Days",
          venue: "Small Temple",
          guests: "30-80 guests/day",
        },
        narrative: {
          name: "The Narrative",
          nameTh: "The Narrative",
          tagline: "Story & Journey",
          taglineTh: "Story & Journey",
          duration: "5 Days",
          venue: "Medium Temple",
          guests: "80-150 guests/day",
        },
        legacy: {
          name: "The Legacy",
          nameTh: "The Legacy",
          tagline: "Grand & Honorable",
          taglineTh: "Grand & Honorable",
          duration: "7 Days",
          venue: "Large Temple",
          guests: "150-300 guests/day",
        },
        masterpiece: {
          name: "The Masterpiece",
          nameTh: "The Masterpiece",
          tagline: "Royal & Luxurious",
          taglineTh: "Royal & Luxurious",
          duration: "7 Days",
          venue: "Premium Temple",
          guests: "300-500+ guests/day",
        },
      },
    },

    signatureCare: {
      title: "Signature Care",
      subtitle: "Special privileges to help ease the burden during vulnerable times",
      prePlanning: {
        title: "Pre-planning",
        benefit1: "Plan ahead before necessity arrives. Gives family time to prepare emotionally.",
        benefit2: "Book 30 days ahead:",
        benefit2Detail: "Receive special conditions for budget management",
        benefit3: "Book 60 days ahead:",
        benefit3Detail: "Get detailed package customization for your family's needs",
      },
      referral: {
        title: "Family Referral Program",
        description: "When a family who has used our services recommends someone close to us,",
        benefit: "We provide special benefits for both families",
      },
    },

    portfolio: {
      title: "Our Portfolio",
      subtitle: "Examples of our proud work",
      note: "* Sample images for consideration",
      items: [
        { label: "Planning Team" },
        { label: "Memorial Ceremony" },
        { label: "Full Service" },
        { label: "Caring Service" },
        { label: "Ceremony Planning" },
        { label: "Procession" },
        { label: "Thai Ceremony" },
        { label: "Floral Arrangement" },
      ],
    },

    about: {
      title: "About SASAN",
      description1: "Founded with the intention to create new standards in funeral services. With over 15 years of experience, we understand that saying goodbye to loved ones requires special care and attention.",
      description2: "Our professional team is ready to handle every step, from planning and venue preparation to the final ceremony, so families can mourn in peace.",
      philosophy: "Every life has a story, and every story deserves to be told beautifully.",
      credentials: [
        { text: "Licensed Business" },
        { text: "ISO 9001 Certified" },
        { text: "Association Member" },
        { text: "Liability Insurance" },
      ],
      stats: {
        years: "Years",
        works: "Projects",
        team: "Team Members",
      },
      imageLabels: [
        "Professional Team",
        "Careful Design",
        "SASAN Headquarters",
        "Office Building",
      ],
    },

    faq: {
      title: "Frequently Asked Questions",
      subtitle: "FAQ",
      moreQuestions: "Have more questions?",
      callFree: "Free Consultation",
      items: [
        {
          q: "What is the booking process?",
          a: "Simply contact us via phone, LINE, or fill out the website form. Our team will respond within 1 hour to understand your needs and recommend suitable packages, then arrange a meeting to plan details.",
        },
        {
          q: "How do I pay? How much upfront?",
          a: "We accept cash, bank transfer, and credit cards. For pre-planning, 30% deposit is required. For urgent cases, 50% before starting, with the remainder after the ceremony.",
        },
        {
          q: "Can I cancel or postpone?",
          a: "For pre-planning, postponement is free. Cancellation incurs a 10% processing fee. For changes after booking, please notify us at least 7 days in advance.",
        },
        {
          q: "What's included in the price? Any hidden costs?",
          a: "Quoted prices are all-inclusive per package items. No hidden costs. For additional services, our team will quote in advance.",
        },
        {
          q: "What areas does SASAN serve?",
          a: "We serve Bangkok and surrounding areas, as well as nationwide (travel fees may apply for distant locations).",
        },
        {
          q: "For urgent cases, how fast can you arrange?",
          a: "Our team is available 24/7. For urgent cases, we can start immediately and arrange within 24-48 hours.",
        },
      ],
    },

    contact: {
      title: "Contact Us",
      oneStopService: "One Stop Service",
      oneStopDesc: "Select a package or design your own with automatic pricing",
      startNow: "Get Started",
      callUs: "Call Us Now",
      available24h: "Available 24/7",
      lineOfficial: "LINE Official",
      scanOrClick: "Scan QR or click to chat",
      or: "or",
      directContact: "Contact Team Directly",
      name: "Name",
      email: "Email",
      phone: "Phone (Optional)",
      serviceType: "Service Type of Interest",
      message: "Message",
      submit: "Send Message",
      sending: "Sending...",
    },

    team: {
      title: "Our Chapter",
      subtitle: "Behind The Scenes",
      description: "The team behind every success, ready to serve you with heart",
      bottomText: "We're ready to take care of every detail to make your \"last chapter\" complete",
      members: [
        {
          name: "Benjamas",
          role: "Project Group Leader",
          roleSecondary: "6808800016",
          quote: "Leading with vision, creating with heart",
        },
        {
          name: "Chayakorn",
          role: "Content Creator",
          roleSecondary: "6808800001",
          quote: "Telling stories that touch hearts",
        },
        {
          name: "Wannasit",
          role: "Content Creator",
          roleSecondary: "6808800013",
          quote: "Creating outstanding content",
        },
        {
          name: "Anawat",
          role: "Project Group Secretary",
          roleSecondary: "6808800006",
          quote: "Ready to care for every step",
        },
        {
          name: "Jirathiwat",
          role: "Web Programmer",
          roleSecondary: "6808800011",
          quote: "Turning ideas into reality",
        },
      ],
    },

    common: {
      learnMore: "Learn More",
      viewAll: "View All",
      close: "Close",
      next: "Next",
      previous: "Previous",
      baht: "Baht",
      perDay: "per day",
      people: "guests",
      days: "days",
      recommended: "Recommended",
      allInclusive: "All Inclusive",
      readMore: "Read More",
      backToHome: "Back to Home",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      confirm: "Confirm",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      add: "Add",
      remove: "Remove",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      all: "All",
      none: "None",
      yes: "Yes",
      no: "No",
      free: "Free",
      total: "Total",
      subtotal: "Subtotal",
      discount: "Discount",
      quantity: "Quantity",
      price: "Price",
      inStock: "In Stock",
      outOfStock: "Out of Stock",
      addToCart: "Add to Cart",
      checkout: "Checkout",
      continueShopping: "Continue Shopping",
    },

    blog: {
      heroTitle: "SASAN",
      heroSubtitle: "The Last Chapter",
      heroTagline: "Designing Your Beautiful Last Chapter",
      readTime: "min",
      comparison: {
        title: "Compare the Difference",
        subtitle: "Between pre-planning and no plan",
        sasanBtn: "SASAN (Pre-planning)",
        generalBtn: "General (No Plan)",
      },
      cta: {
        title: "The Last Gift...",
        subtitle: "For Your Loved Ones",
        description1: "Pre-planning is not a curse on yourself",
        description2: "It's telling your loved ones...",
        quote: "Don't worry, I've prepared everything. Just take care of yourself.",
        button: "Start Planning Your \"Last Chapter\" Today",
        note: "Free consultation, no charge",
      },
      footer: {
        quote: "You've written your life story so well... Don't let the ending be chaotic.",
      },
    },

    shop: {
      title: "Shop",
      subtitle: "SASAN Shop",
      description: "Premium wreaths, flowers, and memorial items",
      searchPlaceholder: "Search products...",
      categories: {
        all: "All",
        wreath: "Wreaths",
        flower: "Flowers",
        memorial: "Memorial Items",
      },
      filters: {
        priceRange: "Price Range",
        sortBy: "Sort By",
        newest: "Newest",
        priceLow: "Price: Low to High",
        priceHigh: "Price: High to Low",
        popular: "Most Popular",
      },
      product: {
        reviews: "reviews",
        addToCart: "Add to Cart",
        customize: "Customize",
        deliveryTime: "Delivery within",
        features: "Features",
      },
      cart: {
        title: "Shopping Cart",
        empty: "Cart is Empty",
        emptyDesc: "No items in cart yet",
        items: "items",
        total: "Total",
        checkout: "Proceed to Checkout",
        continueShopping: "Continue Shopping",
        removeItem: "Remove Item",
        customText: "Ribbon Message",
        deliveryDate: "Delivery Date",
        deliveryLocation: "Delivery Location",
      },
      checkout: {
        title: "Delivery Information",
        name: "Your Name",
        phone: "Phone Number",
        address: "Delivery Address",
        templeName: "Temple/Location Name",
        note: "Additional Notes",
        payment: "Payment Method",
        cod: "Cash on Delivery",
        transfer: "Bank Transfer",
        credit: "Credit Card",
        placeOrder: "Place Order",
        orderSuccess: "Order Successful!",
        orderSuccessDesc: "Our team will contact you within 30 minutes",
      },
      delivery: {
        free: "Free Delivery",
        freeOver: "Free delivery for orders over",
        sameDay: "Same Day Delivery",
        within: "Within",
        hours: "hours",
      },
    },

    serviceSelector: {
      title: "The Last Chapter",
      subtitle: "Designing Your Beautiful Last Chapter",
      loading: "Loading...",
      
      modeSelect: {
        title: "Select Method",
        packageTitle: "The Storytelling Collection",
        packageDesc: "Our Service Packages",
        packageNote: "Choose from our curated collections, all-in-one solution",
        packageCount: "4 Packages",
        
        quizTitle: "Personalized Design",
        quizDesc: "Find the right package for you",
        quizNote: "Answer 3 questions, we'll recommend the perfect package",
        quizTime: "30 seconds",
        quizTeaser: "Find your ideal package in under a minute",
      },
      
      package: {
        selectTitle: "Select Your Collection",
        startingPrice: "Starting at",
        guests: "Guests",
        days: "Days",
        recommended: "Recommended",
        allInclusive: "All Inclusive",
        includes: "Package Includes",
        customize: "Customize",
        selectThis: "Select This Package",
      },
      
      customize: {
        title: "Customize Options",
        coffin: "Select Coffin",
        flower: "Select Flower Theme",
        extras: "Additional Services",
        included: "Included",
        additional: "Additional",
      },
      
      summary: {
        title: "Order Summary",
        package: "Package",
        addons: "Add-ons",
        total: "Total",
        note: "* Price may vary based on actual details",
      },
      
      contact: {
        title: "Contact Information",
        name: "Full Name",
        phone: "Phone Number",
        line: "LINE ID (Optional)",
        note: "Additional Notes",
        submit: "Submit",
        submitting: "Submitting...",
      },
      
      success: {
        title: "Thank You!",
        message: "Our team will contact you within 1 hour",
        close: "Close",
      },
      
      quiz: {
        question1: "Who is this ceremony for?",
        question2: "What atmosphere would you like?",
        question3: "How would you like guests to feel?",
        analyzing: "Analyzing...",
        result: "Your Recommended Package",
        matchScore: "Match Score",
      },
    },

    footer: {
      rights: "All rights reserved.",
    },
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("th");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "th" ? "en" : "th"));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t: content[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
