import { motion } from "framer-motion";
import { rohit } from "@/data/rohit";
import { Bike, Gamepad2, Users, Trophy } from "lucide-react";

const icons = { Bike, Gamepad2, Users, Trophy };

export default function Hobbies() {
  return (
    <section
      id="hobbies"
      className="relative py-24 sm:py-32 bg-[#0A0A0A]"
      data-testid="hobbies-section"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="flex items-end justify-between mb-10 border-b border-[#27272A] pb-6">
          <div>
            <div className="overline text-[#FF3B30]">07 / OFF DUTY</div>
            <h2 className="mt-2 font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tighter">
              Beyond The Bay
            </h2>
            <p className="mt-3 text-[#A1A1AA] max-w-lg text-sm sm:text-base">
              When the tools are down and the last car&apos;s rolled out — this is what fuels the tank.
            </p>
          </div>
          <div className="hidden sm:block overline text-[#71717A]">HOBBIES · 04</div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {rohit.hobbies.map((h, i) => {
            const Icon = icons[h.icon] || Trophy;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="group card-industrial corners p-6 sm:p-8 aspect-[4/5] flex flex-col justify-between relative overflow-hidden"
                data-testid={`hobby-card-${i}`}
              >
                <span className="tl" /><span className="tr" />
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#71717A]">
                    HOB-{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="w-2 h-2 bg-[#FF3B30] rounded-full group-hover:animate-glow-pulse" />
                </div>

                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border border-[#27272A] rounded-full group-hover:border-[#FF3B30] transition-colors" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 border border-[#27272A] rounded-full group-hover:border-[#FF3B30]/50 transition-colors gear-cw" />
                  </div>
                  <Icon
                    size={48}
                    className="text-white group-hover:text-[#FF3B30] transition-colors relative z-10"
                  />
                </div>

                <div>
                  <div className="font-display text-white text-lg sm:text-xl uppercase tracking-tight leading-tight">
                    {h.name}
                  </div>
                  <div className="mt-2 h-px w-8 bg-[#FF3B30] group-hover:w-full transition-all duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
