import { motion } from "framer-motion";
import { rohit } from "@/data/rohit";
import Tachometer from "@/components/portfolio/Tachometer";

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32 overflow-hidden"
      data-testid="skills-section"
    >
      <div className="absolute inset-0 bg-grid opacity-30 mask-radial-fade pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="flex items-end justify-between mb-10 border-b border-[#27272A] pb-6">
          <div>
            <div className="overline text-[#FF3B30]">03 / SKILL DASHBOARD</div>
            <h2 className="mt-2 font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tighter">
              Instrument Cluster
            </h2>
            <p className="mt-3 text-[#A1A1AA] max-w-lg text-sm sm:text-base">
              Each dial represents a core competency — from diagnostics to workshop coordination. Needles sweep on view.
            </p>
          </div>
          <div className="hidden sm:block overline text-[#71717A]">RPM.MODULE / 08</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rohit.skills.map((s, i) => (
            <motion.div
              key={s.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="relative card-industrial corners p-6 flex flex-col items-center justify-between"
              data-testid={`skill-card-${s.code}`}
            >
              <span className="tl" /><span className="tr" />
              <div className="flex w-full items-center justify-between text-[10px] font-mono uppercase tracking-widest">
                <span className="text-[#FF3B30]">{s.code}</span>
                <span className="text-[#71717A]">MOD/{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="w-full flex justify-center my-4">
                <Tachometer value={s.level} code={s.code} />
              </div>
              <div className="text-center font-display text-white text-sm uppercase tracking-wide leading-tight">
                {s.name}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee ticker */}
        <div className="mt-16 border-y border-[#27272A] overflow-hidden">
          <div className="animate-marquee whitespace-nowrap py-4 flex gap-8 font-display text-3xl sm:text-4xl uppercase tracking-tight text-[#141414]">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-8 items-center">
                {[
                  "DIAGNOSTICS",
                  "MERCEDES-BENZ",
                  "HYUNDAI",
                  "TWO-WHEELER",
                  "OIL CHANGE",
                  "PRECISION",
                  "TORQUE",
                  "SAI SERVICE",
                ].map((t, i) => (
                  <span key={`${k}-${i}`} className="flex items-center gap-8">
                    <span className={i % 2 ? "text-white" : "text-[#FF3B30]"}>{t}</span>
                    <span className="text-[#27272A]">◆</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
