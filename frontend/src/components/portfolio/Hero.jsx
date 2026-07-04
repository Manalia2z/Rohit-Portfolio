import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { rohit, media } from "@/data/rohit";
import BlueprintCar from "@/components/portfolio/BlueprintCar";
import { ArrowDown, Wrench, Gauge, MapPin } from "lucide-react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((v) => (v + 1) % 100), 60);
    return () => clearInterval(t);
  }, []);
  const rpm = 2400 + Math.round(Math.sin(tick / 6) * 900);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden noise-overlay"
      data-testid="hero-section"
    >
      {/* Parallax hero image */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${media.hero[0]})`,
            filter: "grayscale(30%) contrast(1.1) brightness(0.55)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-[#0A0A0A]/40 to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-grid opacity-40" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pt-40 pb-24"
      >
        {/* Top status bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-[#27272A] py-3 mb-16">
          <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-[0.25em] text-[#A1A1AA]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#FF3B30] rounded-full animate-glow-pulse" />
              Online / Available
            </span>
            <span className="hidden sm:inline text-[#71717A]">System Status: OPTIMAL</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.25em] text-[#71717A]">
            <span>Ver 2026.01</span>
            <span className="hidden sm:inline">Bay #02</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="overline text-[#FF3B30] mb-4"
              data-testid="hero-overline"
            >
              PORTFOLIO / 2026 · MECHANICAL ENGINEER
            </motion.p>

            <h1
              className="font-display font-bold text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl uppercase leading-[0.9] tracking-tighter"
              data-testid="hero-title"
            >
              {"ROHIT".split("").map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {c}
                </motion.span>
              ))}
              <br />
              <span className="text-[#FF3B30]">
                {"DHONGADE".split("").map((c, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.65 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block"
                  >
                    {c}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mt-6 text-[#A1A1AA] text-base sm:text-lg max-w-xl leading-relaxed"
              data-testid="hero-tagline"
            >
              {rohit.tagline} A diploma mechanical engineer trained across Mercedes-Benz & Hyundai service floors — obsessed with clean diagnostics, sharp torque and precise repairs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#experience"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-3 bg-[#FF3B30] text-white font-mono text-xs uppercase tracking-widest px-6 py-3 hover:bg-[#FF5A52] transition-colors"
                data-testid="hero-cta-primary"
              >
                <Wrench size={14} className="group-hover:rotate-12 transition-transform" />
                View Experience
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-3 border border-[#27272A] text-white font-mono text-xs uppercase tracking-widest px-6 py-3 hover:border-[#FF3B30] hover:text-[#FF3B30] transition-colors"
                data-testid="hero-cta-secondary"
              >
                Hire / Contact
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-12 flex flex-wrap items-center gap-6 text-[11px] font-mono text-[#71717A]"
            >
              <span className="flex items-center gap-2">
                <MapPin size={12} className="text-[#FF3B30]" /> {rohit.location}
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="uppercase tracking-widest">Diploma · Mechanical Engineering</span>
            </motion.div>
          </div>

          {/* RPM widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="lg:col-span-5"
          >
            <div className="relative card-industrial corners p-6 sm:p-8" data-testid="hero-rpm-widget">
              <span className="tl" />
              <span className="tr" />
              <div className="flex items-center justify-between mb-4">
                <span className="overline text-[#71717A]">LIVE / TACHOMETER</span>
                <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#FF3B30]">
                  <Gauge size={12} />
                  6 CYL
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                <div className="font-display text-5xl sm:text-6xl text-white leading-none tracking-tighter">
                  {rpm.toLocaleString()}
                </div>
                <div className="font-mono text-xs text-[#71717A] uppercase tracking-widest">RPM</div>
              </div>

              {/* RPM bar */}
              <div className="mt-6 h-2 w-full bg-[#0A0A0A] border border-[#27272A] relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#FF3B30] via-[#FF3B30] to-[#FF5A52] transition-all duration-100"
                  style={{ width: `${((rpm - 1500) / 3500) * 100}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-[10px] font-mono text-[#71717A]">
                <span>0</span>
                <span>2</span>
                <span>4</span>
                <span>6</span>
                <span className="text-[#FF3B30]">8</span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <Metric label="TEMP" value="87°C" />
                <Metric label="OIL" value="OK" ok />
                <Metric label="BATT" value="12.4V" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Blueprint car below */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="overline text-[#71717A]">BLUEPRINT / SIDE PROFILE · 1:24</span>
            <div className="flex-1 h-px bg-[#27272A]" />
            <span className="overline text-[#FF3B30]">DWG.001</span>
          </div>
          <BlueprintCar />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#71717A]"
      >
        Scroll <ArrowDown size={14} className="text-[#FF3B30]" />
      </motion.div>
    </section>
  );
}

function Metric({ label, value, ok }) {
  return (
    <div className="border border-[#27272A] p-3">
      <div className="text-[10px] font-mono text-[#71717A] uppercase tracking-widest">{label}</div>
      <div className={`font-display text-lg mt-1 ${ok ? "text-[#3ED598]" : "text-white"}`}>{value}</div>
    </div>
  );
}
