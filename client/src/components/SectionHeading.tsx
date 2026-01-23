import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  light?: boolean;
}

export function SectionHeading({ title, subtitle, align = "center", light = false }: SectionHeadingProps) {
  const alignmentClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <div className={`flex flex-col mb-16 ${alignmentClass[align]}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={`text-4xl md:text-5xl font-serif font-bold mb-4 ${light ? "text-white" : "text-gold"}`}>
          {title}
        </h2>
        {subtitle && (
          <div className="flex flex-col items-center">
            <span className={`h-px w-24 bg-gold mb-4 ${align === "center" ? "mx-auto" : ""}`} />
            <p className={`text-lg md:text-xl font-thai font-light ${light ? "text-white/80" : "text-white/60"}`}>
              {subtitle}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
