import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "./LanguageContext";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const { t, language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: language === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { name: language === "th" ? "อัตลักษณ์องค์กร" : "About Us", href: "/#about" },
    { name: language === "th" ? "บริการ" : "Services", href: "/#services" },
    { name: language === "th" ? "ผลงานที่ผ่านมา" : "Portfolio", href: "/#portfolio" },
    { name: language === "th" ? "ร้านค้า" : "Shop", href: "/shop" },
    { name: language === "th" ? "บล็อก" : "Blog", href: "/blog" },
    { name: language === "th" ? "คำถามที่พบบ่อย" : "FAQ", href: "/#faq" },
    { name: language === "th" ? "ติดต่อเรา" : "Contact", href: "/#contact" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // ถ้าเป็น /#section หรือ #section
    if (href.includes("#")) {
      const sectionId = href.split("#")[1];
      const isHomePage = location === "/";
      
      // ถ้าอยู่หน้า Home แล้ว ให้ scroll ไปที่ section
      if (isHomePage) {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setMobileMenuOpen(false);
        }
      }
      // ถ้าอยู่หน้าอื่น ให้ไปหน้า Home แล้ว scroll (ใช้ default behavior)
      else {
        setMobileMenuOpen(false);
        // ปล่อยให้ browser navigate ไป /#section
      }
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="group cursor-pointer">
            <div className="flex flex-col">
              <img 
                src="/logo-sasan.png" 
                alt="SASAN" 
                className="h-10 w-auto group-hover:opacity-80 transition-opacity duration-300"
              />
              <span className="text-[10px] tracking-[0.3em] text-white/60 uppercase group-hover:text-gold transition-colors duration-300">
                The Last Chapter
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-sm tracking-widest uppercase hover:text-gold transition-colors duration-200 ${
                  location === link.href ? "text-gold" : "text-white/80"
                }`}
              >
                {link.name}
              </a>
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="ml-4 flex items-center space-x-2 text-xs border border-white/20 px-3 py-1 rounded-full hover:border-gold transition-colors duration-300"
            >
              <span className={language === "th" ? "text-gold font-bold" : "text-white/50"}>TH</span>
              <span className="text-white/20">|</span>
              <span className={language === "en" ? "text-gold font-bold" : "text-white/50"}>EN</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
             <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-xs border border-white/20 px-2 py-1 rounded-full"
            >
              <span className={language === "th" ? "text-gold font-bold" : "text-white/50"}>TH</span>
              <span className="text-white/20">|</span>
              <span className={language === "en" ? "text-gold font-bold" : "text-white/50"}>EN</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-gold transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-gold/20"
          >
            <div className="flex flex-col py-4 px-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-lg font-serif text-center py-2 text-white hover:text-gold transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
