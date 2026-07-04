import { motion } from "framer-motion";

/**
 * Rev-counter / tachometer style skill dial.
 * Sweeps from 0 to the target value on view.
 */
export default function Tachometer({ value = 80, label = "", code = "" }) {
  const angleStart = -120;
  const angleEnd = 120;
  const targetAngle = angleStart + (angleEnd - angleStart) * (value / 100);

  const ticks = Array.from({ length: 21 }).map((_, i) => {
    const a = angleStart + (i / 20) * (angleEnd - angleStart);
    const isMajor = i % 5 === 0;
    return { a, isMajor };
  });

  return (
    <div className="relative w-full aspect-square max-w-[220px]" data-testid={`tachometer-${code}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Outer ring */}
        <circle cx="100" cy="100" r="92" stroke="#27272A" strokeWidth="1" fill="none" />
        <circle cx="100" cy="100" r="80" stroke="#141414" strokeWidth="16" fill="none" />

        {/* Ticks */}
        {ticks.map(({ a, isMajor }, i) => {
          const rad = (a * Math.PI) / 180;
          const r1 = isMajor ? 68 : 72;
          const r2 = 80;
          const x1 = 100 + Math.cos(rad - Math.PI / 2) * r1;
          const y1 = 100 + Math.sin(rad - Math.PI / 2) * r1;
          const x2 = 100 + Math.cos(rad - Math.PI / 2) * r2;
          const y2 = 100 + Math.sin(rad - Math.PI / 2) * r2;
          const past = i / 20 <= value / 100;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={past ? "#FF3B30" : "#3f3f46"}
              strokeWidth={isMajor ? 2 : 1}
            />
          );
        })}

        {/* Needle */}
        <motion.g
          initial={{ rotate: angleStart }}
          whileInView={{ rotate: targetAngle }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{ originX: "100px", originY: "100px" }}
        >
          <line x1="100" y1="100" x2="100" y2="30" stroke="#FF3B30" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="100" cy="30" r="3" fill="#FF3B30" />
        </motion.g>

        <circle cx="100" cy="100" r="8" fill="#141414" stroke="#FF3B30" strokeWidth="1.5" />

        {/* Center readout */}
        <text
          x="100"
          y="145"
          textAnchor="middle"
          fill="#fff"
          fontFamily="Chakra Petch, sans-serif"
          fontWeight="700"
          fontSize="22"
        >
          {value}
        </text>
        <text
          x="100"
          y="162"
          textAnchor="middle"
          fill="#71717A"
          fontFamily="JetBrains Mono, monospace"
          fontSize="8"
          letterSpacing="2"
        >
          {code}
        </text>
      </svg>
      <div className="mt-3 text-center font-display text-sm text-white/90 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}
