import { motion } from "framer-motion";
import { rohit, media } from "@/data/rohit";
import EngineDiagram from "@/components/portfolio/EngineDiagram";
import { CircleDot } from "lucide-react";

const SectionHeader = ({ code, title, right }) => (
  <div className="flex items-end justify-between mb-10 border-b border-[#27272A] pb-6">
    <div>
      <div className="overline text-[#FF3B30]">{code}</div>
      <h2 className="mt-2 font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tighter">
        {title}
      </h2>
    </div>
    {right && <div className="hidden sm:block overline text-[#71717A]">{right}</div>}
  </div>
);

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#0A0A0A]" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <SectionHeader code="02 / PROFILE" title="About The Mechanic" right="PROFILE.INIT" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <div className="relative card-industrial corners p-2 overflow-hidden" data-testid="about-portrait">
              <span className="tl" /><span className="tr" />
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={media.silhouette}
                  alt="Rohit"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: "grayscale(80%) contrast(1.15) brightness(0.7)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
                <div className="absolute inset-0 bg-grid-fine opacity-40" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="overline text-[#FF3B30]">SUBJECT / 01</div>
                  <div className="font-display text-white text-xl mt-1">{rohit.short}</div>
                </div>
                {/* Reticle */}
                <svg className="absolute top-4 right-4" width="40" height="40" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="14" fill="none" stroke="#FF3B30" strokeWidth="1" />
                  <line x1="20" y1="2" x2="20" y2="10" stroke="#FF3B30" />
                  <line x1="20" y1="30" x2="20" y2="38" stroke="#FF3B30" />
                  <line x1="2" y1="20" x2="10" y2="20" stroke="#FF3B30" />
                  <line x1="30" y1="20" x2="38" y2="20" stroke="#FF3B30" />
                </svg>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3" data-testid="about-quickstats">
              <Stat k="03" v="Languages" />
              <Stat k="08" v="Skill Modules" />
              <Stat k="02" v="Marques Worked" />
              <Stat k="10+" v="Yrs Around Tools" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-8"
          >
            <div className="space-y-6" data-testid="about-copy">
              {rohit.about.map((p, i) => (
                <p key={i} className="text-[#A1A1AA] text-base sm:text-lg leading-relaxed">
                  <span className="text-[#FF3B30] font-mono text-xs mr-2 align-middle">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rohit.achievements.map((a, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, borderColor: "#FF3B30" }}
                  className="card-industrial p-5 flex gap-3"
                  data-testid={`achievement-${i}`}
                >
                  <CircleDot size={16} className="text-[#FF3B30] shrink-0 mt-1" />
                  <p className="text-sm text-white/85 leading-relaxed">{a}</p>
                </motion.div>
              ))}
            </div>

            {/* Engine diagram accent */}
            <div className="mt-10 relative card-industrial p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="overline text-[#FF3B30]">ENGINE / CUTAWAY · 4-CYL</span>
                <span className="overline text-[#71717A]">LIVE SIM</span>
              </div>
              <EngineDiagram className="h-[220px]" />
              <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                {rohit.languages.concat(["Team"]).slice(0, 4).map((l, i) => (
                  <div key={i} className="border-t border-[#27272A] pt-2 text-[10px] font-mono uppercase tracking-widest text-[#71717A]">
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }) {
  return (
    <div className="border border-[#27272A] p-4 hover:border-[#FF3B30] transition-colors">
      <div className="font-display text-2xl text-white">{k}</div>
      <div className="mt-1 text-[10px] font-mono text-[#71717A] uppercase tracking-widest">{v}</div>
    </div>
  );
}
