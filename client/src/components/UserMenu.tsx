import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/AuthContext";
import { useLanguage } from "@/components/LanguageContext";
import {
  User,
  LogOut,
  Package,
  Settings,
  ChevronDown,
  Heart,
  FileText,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function UserMenu() {
  const { user, isAuthenticated, logout } = useAuth();
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    setLocation("/");
  };

  // Not logged in - Show Login Button
  if (!isAuthenticated) {
    return (
      <Button
        onClick={() => setLocation("/login")}
        variant="outline"
        className="border-gold/50 text-gold hover:bg-gold hover:text-black transition-all"
      >
        <User className="w-4 h-4 mr-2" />
        {language === "th" ? "เข้าสู่ระบบ" : "Sign In"}
      </Button>
    );
  }

  // Logged in - Show User Menu
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-amber-500/30 flex items-center justify-center">
          <span className="text-sm font-bold text-gold">
            {user?.fullName?.charAt(0) || "U"}
          </span>
        </div>
        {/* Name (hide on mobile) */}
        <span className="hidden md:block text-white/80 text-sm max-w-[100px] truncate">
          {user?.fullName}
        </span>
        <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
          >
            {/* User Info */}
            <div className="p-4 border-b border-white/10">
              <p className="font-medium text-white truncate">{user?.fullName}</p>
              <p className="text-white/50 text-sm truncate">{user?.email}</p>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <button
                onClick={() => { setLocation("/profile"); setIsOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="text-sm">{language === "th" ? "โปรไฟล์" : "Profile"}</span>
              </button>
              <button
                onClick={() => { setLocation("/dashboard"); setIsOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="text-sm">{language === "th" ? "แดชบอร์ด" : "Dashboard"}</span>
              </button>
              <button
                onClick={() => { setLocation("/my-orders"); setIsOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Package className="w-4 h-4" />
                <span className="text-sm">{language === "th" ? "คำสั่งซื้อของฉัน" : "My Orders"}</span>
              </button>
              <button
                onClick={() => { setIsOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span className="text-sm">{language === "th" ? "คำขอบริการ" : "Service Requests"}</span>
              </button>
              <button
                onClick={() => { setIsOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Heart className="w-4 h-4" />
                <span className="text-sm">{language === "th" ? "รายการที่บันทึก" : "Saved Items"}</span>
              </button>
              <button
                onClick={() => { setIsOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm">{language === "th" ? "ตั้งค่า" : "Settings"}</span>
              </button>
            </div>

            {/* Logout */}
            <div className="p-2 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">{language === "th" ? "ออกจากระบบ" : "Sign Out"}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// INSTRUCTIONS: วิธีใช้ใน Navigation.tsx
// ============================================================
// 1. import { UserMenu } from "@/components/UserMenu";
// 2. วางไว้ข้างๆ Language Toggle button
// 
// ตัวอย่าง:
// <div className="flex items-center gap-3">
//   <UserMenu />
//   <button onClick={toggleLanguage}>TH | EN</button>
// </div>
// ============================================================
