import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden selection:bg-gold selection:text-black">
      <Navigation />

      <main className="flex flex-col items-center justify-center min-h-screen px-4 pt-24">
        {/* Decorative gradient orbs */}
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gold/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center relative z-10"
        >
          {/* Large 404 */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[10rem] md:text-[14rem] font-serif font-bold text-gold leading-none tracking-tighter"
          >
            404
          </motion.h1>

          {/* Thai message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl md:text-2xl font-serif text-white mt-4"
          >
            ไม่พบหน้าที่คุณต้องการ
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-white/60 text-sm md:text-base mt-2 max-w-md mx-auto"
          >
            หน้านี้อาจถูกย้ายหรือลบไปแล้ว
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-12"
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-gold text-black hover:bg-yellow-400 px-10 py-4 rounded-full text-base font-bold tracking-widest uppercase transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 hover:scale-105"
            >
              กลับหน้าหลัก
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </main>
    </div>
  );
}
