import { motion } from "framer-motion";

/**
 * Side-profile racing car (F1/GT hybrid silhouette) with animated flame
 * exhaust trail, glowing headlight, rotating rims, and speed streaks.
 * Meant to be dropped anywhere as a hero prop — fully SVG, no images.
 */
export default function RacingCar({ className = "", flip = false, dir = "right" }) {
  return (
    <div className={`relative ${className}`} data-testid="racing-car-3d">
      <svg
        viewBox="0 0 900 300"
        className="w-full h-auto"
        style={{ transform: flip ? "scaleX(-1)" : "none" }}
      >
        <defs>
          <linearGradient id="carBody" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="45%" stopColor="#050505" />
            <stop offset="100%" stopColor="#FF3B30" />
          </linearGradient>
          <linearGradient id="cabinGlass" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id="flameCore">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor="#FFE066" />
            <stop offset="55%" stopColor="#FF7A00" />
            <stop offset="100%" stopColor="#FF3B30" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="headBeam">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="60%" stopColor="#FFE066" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FF3B30" stopOpacity="0" />
          </radialGradient>
          <filter id="flameBlur">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="softBlur">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        {/* Ground / speed streaks */}
        <g opacity="0.6">
          {Array.from({ length: 22 }).map((_, i) => (
            <motion.line
              key={i}
              x1={i * 42}
              y1={250 + (i % 3) * 4}
              x2={i * 42 + 28}
              y2={250 + (i % 3) * 4}
              stroke="#FF3B30"
              strokeWidth="1.2"
              initial={{ x: 0, opacity: 0.2 }}
              animate={{ x: dir === "right" ? -60 : 60, opacity: [0.2, 0.9, 0.2] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: (i * 0.05) % 0.8,
                ease: "linear",
              }}
            />
          ))}
        </g>

        {/* Ground line */}
        <line x1="0" y1="270" x2="900" y2="270" stroke="#FF3B30" strokeDasharray="6 8" opacity="0.4" />

        {/* Flame trail (behind car) */}
        <g transform="translate(60 210)" filter="url(#flameBlur)">
          {[
            { d: 1.0, s: 1.0, dur: 0.35 },
            { d: 0.15, s: 0.85, dur: 0.42 },
            { d: 0.3, s: 0.7, dur: 0.5 },
          ].map((f, i) => (
            <motion.ellipse
              key={i}
              cx="0"
              cy="0"
              rx={70 * f.s}
              ry={18 * f.s}
              fill="url(#flameCore)"
              animate={{
                rx: [70 * f.s, 90 * f.s, 60 * f.s, 70 * f.s],
                opacity: [0.9, 0.6, 0.95, 0.9],
              }}
              transition={{ duration: f.dur, repeat: Infinity, delay: f.d, ease: "easeInOut" }}
            />
          ))}
        </g>
        <g transform="translate(60 210)">
          {[0, 1, 2, 3].map((i) => (
            <motion.circle
              key={i}
              r="4"
              fill="#FFE066"
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: -80 - i * 40, opacity: 0 }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeOut",
              }}
            />
          ))}
        </g>

        {/* Rear diffuser */}
        <path d="M80,240 L100,220 L140,220 L130,240 Z" fill="#0a0a0a" stroke="#27272A" />

        {/* Car body — aggressive low racer silhouette */}
        <path
          d="M100,240
             L140,240
             C150,215 175,195 210,190
             L280,185
             C300,155 340,130 400,125
             L560,125
             C620,128 660,155 685,190
             L770,205
             C810,210 830,225 830,240
             L820,250
             L750,250
             C745,232 725,222 705,222
             C685,222 665,232 660,250
             L260,250
             C255,232 235,222 215,222
             C195,222 175,232 170,250
             L100,250 Z"
          fill="url(#carBody)"
          stroke="#FF3B30"
          strokeWidth="1"
        />

        {/* Cockpit / windshield */}
        <path
          d="M310,178 L360,135 L520,130 L580,175 Z"
          fill="url(#cabinGlass)"
          stroke="#FF3B30"
          strokeWidth="1"
        />
        <line x1="440" y1="130" x2="440" y2="178" stroke="#FF3B30" strokeWidth="0.8" opacity="0.6" />

        {/* Racing number panel */}
        <rect x="360" y="180" width="60" height="30" fill="#FFFFFF" opacity="0.95" />
        <text x="390" y="203" textAnchor="middle" fill="#0A0A0A" fontFamily="Chakra Petch, sans-serif" fontWeight="700" fontSize="22">
          07
        </text>

        {/* Side stripe */}
        <path
          d="M180,220 L820,220 L810,228 L190,228 Z"
          fill="#FF3B30"
        />
        <text x="500" y="227" textAnchor="middle" fill="#0A0A0A" fontFamily="Chakra Petch, sans-serif" fontWeight="700" fontSize="10" letterSpacing="4">
          ROHIT DHONGADE · SERVICE TEAM
        </text>

        {/* Front spoiler */}
        <path d="M770,240 L830,220 L845,225 L830,250 Z" fill="#0a0a0a" stroke="#FF3B30" />

        {/* Headlight beam */}
        <ellipse cx="830" cy="220" rx="50" ry="12" fill="url(#headBeam)" opacity="0.9" />
        <circle cx="820" cy="220" r="6" fill="#FFE066" filter="url(#softBlur)" />

        {/* Rear wheel */}
        <g transform="translate(215 245)">
          <circle r="28" fill="#0a0a0a" stroke="#27272A" strokeWidth="2" />
          <circle r="20" fill="#141414" stroke="#FF3B30" strokeWidth="1" />
          <g className="gear-cw" style={{ transformOrigin: "center" }}>
            {[0, 36, 72, 108, 144].map((a) => (
              <rect
                key={a}
                x="-1.5"
                y="-18"
                width="3"
                height="12"
                fill="#FF3B30"
                transform={`rotate(${a})`}
              />
            ))}
          </g>
          <circle r="5" fill="#FF3B30" />
        </g>

        {/* Front wheel */}
        <g transform="translate(705 245)">
          <circle r="28" fill="#0a0a0a" stroke="#27272A" strokeWidth="2" />
          <circle r="20" fill="#141414" stroke="#FF3B30" strokeWidth="1" />
          <g className="gear-cw" style={{ transformOrigin: "center" }}>
            {[0, 36, 72, 108, 144].map((a) => (
              <rect
                key={a}
                x="-1.5"
                y="-18"
                width="3"
                height="12"
                fill="#FF3B30"
                transform={`rotate(${a})`}
              />
            ))}
          </g>
          <circle r="5" fill="#FF3B30" />
        </g>

        {/* Rear wing */}
        <path d="M105,180 L165,180 L165,190 L105,190 Z" fill="#0a0a0a" stroke="#FF3B30" strokeWidth="1" />
        <rect x="130" y="180" width="8" height="30" fill="#0a0a0a" />
      </svg>
    </div>
  );
}
