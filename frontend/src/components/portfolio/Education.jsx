import { motion } from "framer-motion";
import { rohit } from "@/data/rohit";
import { GraduationCap, Award } from "lucide-react";

export default function Education() {
  return (
    <section
      id="education"
      className="relative py-24 sm:py-32 bg-[#0A0A0A]"
      data-testid="education-section"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="flex items-end justify-between mb-10 border-b border-[#27272A] pb-6">
          <div>
            <div className="overline text-[#FF3B30]">05 / ACADEMIC RECORDS</div>
            <h2 className="mt-2 font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tighter">
              Education
            </h2>
          </div>
          <div className="hidden sm:block overline text-[#71717A]">SPEC-SHEET</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rohit.education.map((ed, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="card-industrial corners p-8 relative overflow-hidden"
              data-testid={`education-card-${i}`}
            >
              <span className="tl" /><span className="tr" />
              <div className="flex items-center justify-between">
                <GraduationCap className="text-[#FF3B30]" size={28} />
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#71717A]">
                  {ed.code}
                </span>
              </div>
              <h3 className="mt-6 font-display text-white text-xl sm:text-2xl uppercase tracking-tight leading-tight">
                {ed.title}
              </h3>
              <div className="mt-2 text-[#A1A1AA] text-sm">{ed.institute}</div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div>
                  <div className="overline text-[#71717A]">Duration</div>
                  <div className="mt-1 font-display text-white text-lg">{ed.years}</div>
                </div>
                <div>
                  <div className="overline text-[#71717A]">Score</div>
                  <div className="mt-1 font-display text-[#FF3B30] text-2xl flex items-center gap-2">
                    {ed.score}
                    <Award size={16} />
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-6 h-1 bg-[#0A0A0A] border border-[#27272A] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: ed.score }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-[#FF3B30] to-[#FF5A52]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
