import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { rohit, media } from "@/data/rohit";
import { Wrench, MapPin, CheckCircle2 } from "lucide-react";

export default function Workshop() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  const w = rohit.workshop;

  return (
    <section
      ref={ref}
      id="workshop"
      className="relative py-24 sm:py-32 overflow-hidden bg-[#0A0A0A]"
      data-testid="workshop-section"
    >
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${media.workshop[0]})`,
            filter: "grayscale(60%) brightness(0.4) contrast(1.15)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-grid opacity-40" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="flex items-end justify-between mb-10 border-b border-[#27272A] pb-6">
          <div>
            <div className="overline text-[#FF3B30]">06 / FAMILY BUSINESS</div>
            <h2 className="mt-2 font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tighter">
              The Family Garage
            </h2>
          </div>
          <div className="hidden sm:block overline text-[#71717A]">BAY # 01 / OPEN</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left - big label card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 card-industrial corners p-8 sm:p-10 relative overflow-hidden"
            data-testid="workshop-hero-card"
          >
            <span className="tl" /><span className="tr" />
            <div className="flex items-center gap-3">
              <Wrench className="text-[#FF3B30]" size={20} />
              <span className="overline text-[#FF3B30]">{w.tagline}</span>
            </div>
            <h3 className="mt-4 font-display font-bold text-white text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tighter leading-[0.9]">
              {w.name.split(" ").map((word, i) => (
                <span key={i} className={i === 1 ? "text-[#FF3B30] block" : "block"}>
                  {word}
                </span>
              ))}
            </h3>

            <div className="mt-6 flex items-center gap-2 text-[#A1A1AA] text-sm">
              <MapPin size={14} className="text-[#FF3B30]" />
              {w.location}
            </div>

            <p className="mt-6 text-[#A1A1AA] leading-relaxed max-w-xl">
              Rohit grew up around Sai Service — a family-run two-wheeler workshop where wrenches came before textbooks. This is where his instinct for engines was forged, servicing hundreds of bikes over the years.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3" data-testid="workshop-stats">
              {w.stats.map((s, i) => (
                <div key={i} className="border border-[#27272A] p-4 hover:border-[#FF3B30] transition-colors">
                  <div className="font-display text-2xl text-white">{s.k}</div>
                  <div className="mt-1 text-[10px] font-mono text-[#71717A] uppercase tracking-widest">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - services list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 space-y-4"
            data-testid="workshop-services"
          >
            <div className="overline text-[#71717A] mb-4">SERVICES OFFERED</div>
            {w.services.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 6, borderColor: "#FF3B30" }}
                className="group flex items-center gap-4 border border-[#27272A] bg-[#141414]/80 backdrop-blur-md px-5 py-4 cursor-pointer transition-colors"
                data-testid={`service-${i}`}
              >
                <span className="font-mono text-xs text-[#FF3B30]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-8 h-px bg-[#27272A] group-hover:bg-[#FF3B30] transition-colors" />
                <CheckCircle2 size={16} className="text-[#FF3B30]" />
                <span className="font-display text-white text-sm sm:text-base uppercase tracking-wide flex-1">{s}</span>
              </motion.div>
            ))}

            {/* Second workshop image */}
            <div className="mt-6 card-industrial p-1 overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={media.workshop[1]}
                  alt="workshop tools"
                  className="w-full h-full object-cover"
                  style={{ filter: "contrast(1.1) grayscale(15%)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#FF3B30] animate-glow-pulse" />
                  <span className="overline text-white">IMG_04 · TOOLBAY</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
