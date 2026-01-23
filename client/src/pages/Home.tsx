import { Navigation } from "@/components/Navigation";
import { useLanguage } from "@/components/LanguageContext";
import { SectionHeading } from "@/components/SectionHeading";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { insertInquirySchema } from "@shared/schema";
import { motion, useScroll, useTransform } from "framer-motion";
import { Feather, Heart, FileText, Share2, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRef } from "react";

// Icons map for the dimensions section
const icons = {
  matter: Feather,
  clear: Heart,
  message: FileText,
  weave: Share2,
};

// Form schema with validation messages
const formSchema = insertInquirySchema;

export default function Home() {
  const { t, language } = useLanguage();
  const createInquiry = useCreateInquiry();
  const contactRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax effect for hero
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createInquiry.mutate(values, {
      onSuccess: () => form.reset(),
    });
  }

  const dimensions = [
    { key: "matter", icon: Feather, color: "text-stone-300" },
    { key: "clear", icon: Heart, color: "text-rose-200" },
    { key: "message", icon: FileText, color: "text-amber-200" },
    { key: "weave", icon: Share2, color: "text-emerald-200" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden selection:bg-gold selection:text-black">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background - Dark texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black opacity-80 z-0" />
        
        {/* Abstract shapes/glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />

        <motion.div 
          style={{ y: y1, opacity }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gradient-gold tracking-tight">
              SASAN
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-3xl font-serif italic text-white/90 mb-4"
          >
            "{t.hero.tagline}"
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className={`text-lg md:text-xl text-gold/80 tracking-widest uppercase ${language === 'th' ? 'font-thai' : 'font-sans'}`}
          >
            {t.hero.subtitle}
          </motion.p>
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/30 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={32} />
        </motion.div>
      </section>

      {/* Philosophy Quote */}
      <section className="py-24 md:py-32 relative bg-zinc-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="font-script text-6xl md:text-8xl text-gold/20 absolute -top-10 left-10">"</span>
            <p className={`text-2xl md:text-4xl font-serif leading-relaxed text-white/90 ${language === 'th' ? 'font-thai' : ''}`}>
              {t.philosophy.quote}
            </p>
            <span className="font-script text-6xl md:text-8xl text-gold/20 absolute -bottom-16 right-10">"</span>
          </motion.div>
        </div>
      </section>

      {/* 4 Dimensions Section (About) */}
      <section id="about" className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title={t.nav.about} align="center" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dimensions.map((dim, index) => {
              const contentKey = dim.key as keyof typeof t.dimensions;
              const Icon = dim.icon;
              
              return (
                <motion.div
                  key={dim.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="group relative p-8 border border-white/5 bg-white/5 hover:bg-white/10 hover:border-gold/30 transition-all duration-500 rounded-sm"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  
                  <Icon className={`w-10 h-10 mb-6 ${dim.color} group-hover:scale-110 transition-transform duration-500`} strokeWidth={1.5} />
                  
                  <h3 className={`text-xl font-bold mb-4 text-gold ${language === 'th' ? 'font-thai' : 'font-serif'}`}>
                    {t.dimensions[contentKey].title}
                  </h3>
                  
                  <p className={`text-sm leading-relaxed text-white/60 group-hover:text-white/80 transition-colors ${language === 'th' ? 'font-thai' : 'font-sans'}`}>
                    {t.dimensions[contentKey].description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-zinc-900 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading title={t.services.title} subtitle="Our Offerings" align="left" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {t.services.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative overflow-hidden rounded-xl h-80"
              >
                {/* Card Background Image Placeholder - In production use actual images */}
                <div className={`absolute inset-0 bg-neutral-800 transition-transform duration-700 group-hover:scale-110
                  ${index === 0 ? "bg-gradient-to-br from-slate-900 to-slate-800" : ""}
                  ${index === 1 ? "bg-gradient-to-br from-stone-900 to-stone-800" : ""}
                  ${index === 2 ? "bg-gradient-to-br from-emerald-950 to-emerald-900" : ""}
                `} />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="h-0.5 w-12 bg-gold mb-4 transform origin-left group-hover:scale-x-150 transition-transform duration-500" />
                  <h3 className={`text-2xl font-bold text-white mb-2 ${language === 'th' ? 'font-thai' : 'font-serif'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-white/70 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 ${language === 'th' ? 'font-thai' : 'font-sans'}`}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-24 bg-black relative">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading title={t.contact.title} align="center" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl shadow-gold/5"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">{t.contact.name}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="" 
                            {...field} 
                            className="bg-black/50 border-white/10 focus:border-gold h-12 rounded-lg transition-colors"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">{t.contact.email}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="" 
                            {...field} 
                            className="bg-black/50 border-white/10 focus:border-gold h-12 rounded-lg transition-colors"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">{t.contact.phone}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="" 
                            {...field} 
                            value={field.value || ""}
                            className="bg-black/50 border-white/10 focus:border-gold h-12 rounded-lg transition-colors"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">{t.contact.serviceType}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="" 
                            {...field}
                            value={field.value || ""} 
                            className="bg-black/50 border-white/10 focus:border-gold h-12 rounded-lg transition-colors"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">{t.contact.message}</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="" 
                          {...field} 
                          className="bg-black/50 border-white/10 focus:border-gold min-h-[150px] rounded-lg transition-colors resize-none"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center pt-4">
                  <Button 
                    type="submit" 
                    disabled={createInquiry.isPending}
                    className="bg-gold text-black hover:bg-white hover:text-black px-12 py-6 rounded-full text-lg font-bold tracking-widest uppercase transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-white/10"
                  >
                    {createInquiry.isPending ? "Sending..." : t.contact.submit}
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/10 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <span className="text-2xl font-serif font-bold text-white/90">SASAN</span>
          <p className="text-white/40 text-sm tracking-widest uppercase">
            © {new Date().getFullYear()} Sasan. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
