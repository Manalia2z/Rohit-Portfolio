import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Fixed full-viewport scroll-reactive background layer.
 * Renders behind ALL sections at z-0 (sections have z-10+).
 *
 * Layers:
 *  - Global grid + radial red glow that follows scroll
 *  - Rotating giant gear silhouettes drifting across
 *  - Scroll-driven "blueprint schematic" (car chassis lines revealing)
 *  - Floating engine parts (pistons, gears, bolts)
 *  - Section-tied labels ("PHASE 01 / IGNITION", etc.)
 */
export default function AnimatedBackdrop() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.4 });

  // Big background transforms
  const gearRot1 = useTransform(smooth, [0, 1], [0, 720]);
  const gearRot2 = useTransform(smooth, [0, 1], [0, -540]);
  const glowY = useTransform(smooth, [0, 1], ["-20%", "80%"]);
  const glowX = useTransform(smooth, [0, 0.25, 0.5, 0.75, 1], ["-10%", "40%", "80%", "20%", "60%"]);
  const gridY = useTransform(smooth, [0, 1], [0, -400]);
  const chassisDraw = useTransform(smooth, [0.05, 0.6], [0, 1]);
  const chassisOpacity = useTransform(smooth, [0, 0.05, 0.5, 0.8, 1], [0, 0.55, 0.55, 0.15, 0.05]);
  const carX = useTransform(smooth, [0.15, 0.9], ["-30%", "130%"]);
  const carOpacity = useTransform(smooth, [0.15, 0.2, 0.85, 0.9], [0, 0.85, 0.85, 0]);

  const engineOpacity = useTransform(smooth, [0.4, 0.55, 0.85, 0.95], [0, 0.55, 0.55, 0]);
  const engineRot = useTransform(smooth, [0.4, 1], [0, 360]);

  const phaseIndex = useTransform(smooth, [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1], [0, 1, 2, 3, 4, 5, 6, 7, 7]);
  const [phase, setPhase] = useState(0);
  useEffect(() => phaseIndex.on("change", (v) => setPhase(Math.floor(v))), [phaseIndex]);

  const labels = [
    "PHASE 01 / IGNITION",
    "PHASE 02 / IDENTITY",
    "PHASE 03 / TELEMETRY",
    "PHASE 04 / SERVICE LOG",
    "PHASE 05 / RECORDS",
    "PHASE 06 / GARAGE",
    "PHASE 07 / OFF DUTY",
    "PHASE 08 / TRANSMIT",
  ];

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      data-testid="animated-backdrop"
    >
      {/* Base grid moving upward on scroll */}
      <motion.div
        style={{ y: gridY }}
        className="absolute -inset-y-[20%] inset-x-0 bg-grid opacity-40"
      />

      {/* Radial red glow orb */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,59,48,0.20) 0%, rgba(255,59,48,0.05) 40%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
      </motion.div>

      {/* Large rotating gear silhouettes */}
      <motion.svg
        style={{ rotate: gearRot1 }}
        className="absolute -left-40 top-[20vh] w-[520px] h-[520px] opacity-[0.05]"
        viewBox="0 0 200 200"
      >
        <Gear />
      </motion.svg>
      <motion.svg
        style={{ rotate: gearRot2 }}
        className="absolute -right-40 top-[85vh] w-[620px] h-[620px] opacity-[0.05]"
        viewBox="0 0 200 200"
      >
        <Gear teeth={16} />
      </motion.svg>
      <motion.svg
        style={{ rotate: gearRot1 }}
        className="absolute left-[40%] top-[180vh] w-[720px] h-[720px] opacity-[0.04]"
        viewBox="0 0 200 200"
      >
        <Gear teeth={20} />
      </motion.svg>

      {/* Scroll-driven chassis blueprint */}
      <motion.svg
        style={{ opacity: chassisOpacity }}
        viewBox="0 0 1000 400"
        className="absolute inset-x-0 top-[30vh] w-full h-[60vh]"
        stroke="#FF3B30"
        strokeWidth="1"
        fill="none"
      >
        <motion.g style={{ pathLength: chassisDraw }}>
          <ChassisBlueprint />
        </motion.g>
      </motion.svg>

      {/* Floating racing car moving across the screen with fire trail */}
      <motion.div
        style={{ x: carX, opacity: carOpacity }}
        className="absolute top-[45vh] w-[600px]"
      >
        <svg viewBox="0 0 900 300" className="w-full">
          <defs>
            <radialGradient id="bgFlame">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="30%" stopColor="#FFE066" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#FF7A00" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FF3B30" stopOpacity="0" />
            </radialGradient>
            <filter id="bgFlameBlur">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>

          {/* Flame trail behind */}
          <g transform="translate(60 210)" filter="url(#bgFlameBlur)">
            <motion.ellipse
              cx="0" cy="0" rx="90" ry="20"
              fill="url(#bgFlame)"
              animate={{ rx: [80, 110, 75, 90] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.ellipse
              cx="-30" cy="0" rx="60" ry="14"
              fill="url(#bgFlame)"
              animate={{ opacity: [0.8, 0.4, 0.9] }}
              transition={{ duration: 0.4, repeat: Infinity }}
            />
          </g>
          {/* Simple car silhouette */}
          <path
            d="M110,240 L150,240 C160,215 195,192 235,190 L305,183
               C325,155 375,132 435,128 L590,128
               C640,132 685,158 705,192 L785,205
               C815,210 830,220 830,240 L110,240 Z"
            fill="#0a0a0a"
            stroke="#FF3B30"
            strokeWidth="1"
            opacity="0.85"
          />
          <path d="M320,180 L370,135 L555,132 L610,178 Z" fill="#38bdf8" opacity="0.35" stroke="#FF3B30" />
          <circle cx="230" cy="245" r="26" fill="#0a0a0a" stroke="#FF3B30" />
          <circle cx="705" cy="245" r="26" fill="#0a0a0a" stroke="#FF3B30" />
        </svg>
      </motion.div>

      {/* Middle-band engine schematic */}
      <motion.div
        style={{ opacity: engineOpacity }}
        className="absolute inset-x-0 top-[100vh] flex items-center justify-center"
      >
        <motion.svg
          style={{ rotate: engineRot }}
          viewBox="0 0 400 400"
          className="w-[560px] h-[560px]"
          stroke="#FF3B30"
          strokeWidth="1"
          fill="none"
        >
          {/* Engine block outline */}
          <rect x="80" y="120" width="240" height="180" strokeDasharray="4 6" />
          {/* Cylinders */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={100 + i * 56} y="80" width="40" height="40" strokeDasharray="2 4" />
              <circle cx={120 + i * 56} cy="100" r="14" />
              <line x1={120 + i * 56} y1="115" x2={120 + i * 56} y2="180" strokeWidth="0.6" />
            </g>
          ))}
          {/* Crankshaft */}
          <circle cx="200" cy="250" r="60" strokeDasharray="6 8" />
          <circle cx="200" cy="250" r="8" fill="#FF3B30" />
          {/* Labels */}
          <text x="200" y="330" textAnchor="middle" fill="#FF3B30" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="4">ENGINE / 4-CYL · 1.2L</text>
        </motion.svg>
      </motion.div>

      {/* Bottom-right phase indicator (dashboard readout) */}
      <div className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 flex items-center gap-2 border border-[#27272A] bg-[#0A0A0A]/70 backdrop-blur-md px-3 py-2">
        <span className="w-1.5 h-1.5 bg-[#FF3B30] rounded-full animate-glow-pulse" />
        <span className="font-mono text-[10px] tracking-widest text-[#A1A1AA] uppercase">
          {labels[phase] || labels[0]}
        </span>
      </div>

      {/* Scroll progress bar (left edge) */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#141414]">
        <motion.div
          className="w-full bg-gradient-to-b from-[#FF3B30] via-[#FF7A00] to-[#FFE066] origin-top"
          style={{ scaleY: smooth, height: "100%" }}
        />
      </div>

      {/* Bottom dashboard readout — telemetry */}
      <TelemetryLine progress={smooth} />

      {/* Vignette darkening the very edges so content readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.7) 100%)",
        }}
      />
    </div>
  );
}

function TelemetryLine({ progress }) {
  const pct = useTransform(progress, (v) => `${Math.round(v * 100)}%`);
  const rpm = useTransform(progress, (v) => 1000 + Math.round(v * 6500));
  return (
    <div className="absolute left-4 sm:left-6 top-[calc(env(safe-area-inset-top)+80px)] hidden md:flex flex-col gap-2 text-[10px] font-mono uppercase tracking-widest text-[#71717A]">
      <div className="flex items-center gap-2">
        <span className="w-1 h-1 bg-[#3ED598] rounded-full" />
        SYS.OK
      </div>
      <div>
        SCROLL <motion.span className="text-[#FF3B30]">{pct}</motion.span>
      </div>
      <div>
        RPM <motion.span className="text-white">{rpm}</motion.span>
      </div>
    </div>
  );
}

function Gear({ teeth = 12 }) {
  const arr = Array.from({ length: teeth });
  const angle = 360 / teeth;
  return (
    <g stroke="#FF3B30" strokeWidth="1.5" fill="none">
      <circle cx="100" cy="100" r="55" />
      <circle cx="100" cy="100" r="30" />
      <circle cx="100" cy="100" r="10" />
      {arr.map((_, i) => (
        <rect
          key={i}
          x="96"
          y="20"
          width="8"
          height="18"
          transform={`rotate(${i * angle} 100 100)`}
        />
      ))}
      {/* Spokes */}
      {[0, 60, 120].map((a) => (
        <line
          key={a}
          x1="100"
          y1="100"
          x2="100"
          y2="60"
          transform={`rotate(${a} 100 100)`}
          strokeWidth="1"
        />
      ))}
    </g>
  );
}

function ChassisBlueprint() {
  return (
    <>
      {/* Car top-view chassis */}
      <path d="M100,200 L120,140 C140,110 200,90 300,88 L680,88 C780,90 840,110 860,140 L880,200 L860,260 C840,290 780,310 680,312 L300,312 C200,310 140,290 120,260 Z" />
      {/* Wheels */}
      <circle cx="200" cy="120" r="30" />
      <circle cx="200" cy="280" r="30" />
      <circle cx="780" cy="120" r="30" />
      <circle cx="780" cy="280" r="30" />
      {/* Engine bay */}
      <rect x="720" y="150" width="120" height="100" strokeDasharray="4 6" />
      {/* Seats */}
      <rect x="380" y="150" width="80" height="90" strokeDasharray="2 3" />
      <rect x="470" y="150" width="80" height="90" strokeDasharray="2 3" />
      {/* Shafts */}
      <line x1="230" y1="200" x2="720" y2="200" strokeDasharray="4 6" />
      {/* Labels */}
      <g fill="#FF3B30" fontFamily="JetBrains Mono, monospace" fontSize="9" opacity="0.9">
        <text x="120" y="80">CHASSIS / TOP</text>
        <text x="780" y="145">ENG</text>
        <text x="400" y="140">SEATS</text>
        <text x="450" y="340">DWG.002 · 1:32</text>
      </g>
      {/* Dimension lines */}
      <line x1="100" y1="380" x2="880" y2="380" opacity="0.6" strokeDasharray="2 3" />
      <line x1="100" y1="375" x2="100" y2="385" />
      <line x1="880" y1="375" x2="880" y2="385" />
      <text x="490" y="376" textAnchor="middle" fill="#FF3B30" fontSize="8" fontFamily="JetBrains Mono, monospace">
        4680 MM
      </text>
    </>
  );
}
