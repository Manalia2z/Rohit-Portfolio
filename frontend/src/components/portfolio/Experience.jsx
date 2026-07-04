import { motion } from "framer-motion";
import { rohit, media } from "@/data/rohit";
import { Briefcase, ChevronRight } from "lucide-react";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-24 sm:py-32 overflow-hidden"
      data-testid="experience-section"
    >
      {/* Engine background layer */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.08] pointer-events-none"
        style={{ backgroundImage: `url(${media.engine[0]})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="flex items-end justify-between mb-14 border-b border-[#27272A] pb-6">
          <div>
            <div className="overline text-[#FF3B30]">04 / SERVICE LOG</div>
            <h2 className="mt-2 font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tighter">
              Work Experience
            </h2>
          </div>
          <div className="hidden sm:block overline text-[#71717A]">JOB CARD · 02 ENTRIES</div>
        </div>

        <div className="relative">
          {/* Vertical rail */}
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-[#27272A]">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              style={{ originY: 0 }}
              className="absolute inset-0 bg-gradient-to-b from-[#FF3B30] via-[#FF3B30] to-transparent"
            />
          </div>

          <div className="space-y-10">
            {rohit.experience.map((e, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative pl-14 sm:pl-20"
                data-testid={`experience-card-${idx}`}
              >
                {/* Node */}
                <div className="absolute left-0 sm:left-2 top-8 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-[#FF3B30] bg-[#0A0A0A] flex items-center justify-center animate-glow-pulse">
                    <div className="w-2 h-2 bg-[#FF3B30]" />
                  </div>
                </div>

                <div className="card-industrial corners group p-6 sm:p-8">
                  <span className="tl" /><span className="tr" />
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Briefcase size={16} className="text-[#FF3B30]" />
                        <span className="overline text-[#71717A]">{e.brand}</span>
                      </div>
                      <h3 className="font-display text-white text-2xl sm:text-3xl uppercase tracking-tight">
                        {e.company}
                      </h3>
                      <div className="mt-1 text-[#A1A1AA] text-sm">
                        {e.role} · {e.city}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-[#71717A]">
                        {e.dur}
                      </div>
                      <div
                        className="mt-1 inline-flex items-center gap-2 px-3 py-1 border font-mono text-[10px] uppercase tracking-widest"
                        style={{ borderColor: e.color, color: e.color }}
                      >
                        {e.length}
                      </div>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {e.points.map((p, i) => (
                      <li key={i} className="flex gap-3 text-sm text-[#A1A1AA] leading-relaxed">
                        <ChevronRight size={14} className="mt-1 shrink-0 text-[#FF3B30]" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Meter bar (hover reveal) */}
                  <div className="mt-6 h-1 bg-[#0A0A0A] border border-[#27272A] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: idx === 0 ? "33%" : "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: 0.3 }}
                      className="h-full bg-[#FF3B30]"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
