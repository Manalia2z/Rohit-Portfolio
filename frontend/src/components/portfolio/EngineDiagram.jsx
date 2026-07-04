import { motion } from "framer-motion";

/**
 * Animated engine-block cutaway SVG:
 *  - 4 cylinders with pistons pumping (CSS keyframe)
 *  - Rotating gears
 *  - Belt / cam lines
 * Meant as a section background or accent decoration.
 */
export default function EngineDiagram({ className = "" }) {
  return (
    <div className={`relative ${className}`} data-testid="engine-diagram">
      <svg viewBox="0 0 600 360" className="w-full h-full">
        <defs>
          <linearGradient id="metal" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="50%" stopColor="#141414" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
        </defs>

        {/* Engine block */}
        <rect x="60" y="120" width="360" height="180" rx="6" fill="url(#metal)" stroke="#27272A" />
        <rect x="60" y="120" width="360" height="30" fill="#0a0a0a" stroke="#27272A" />

        {/* Cylinder heads */}
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect
              x={80 + i * 84}
              y={70}
              width={60}
              height={60}
              fill="#141414"
              stroke="#27272A"
            />
            <circle cx={110 + i * 84} cy={95} r="14" fill="#0a0a0a" stroke="#FF3B30" />
            {/* piston shaft */}
            <motion.rect
              x={104 + i * 84}
              y={130}
              width={12}
              height={40}
              fill="#FF3B30"
              className="animate-piston"
              style={{ animationDelay: `${i * 0.12}s` }}
            />
          </g>
        ))}

        {/* Bolts */}
        {[80, 140, 220, 300, 380].map((x) => (
          <circle key={x} cx={x} cy={135} r="3" fill="#FF3B30" opacity="0.9" />
        ))}

        {/* Crankshaft rotating disc */}
        <g transform="translate(490 210)">
          <circle r="60" fill="#0a0a0a" stroke="#27272A" strokeWidth="2" />
          <g className="gear-cw">
            <circle r="52" fill="none" stroke="#FF3B30" strokeWidth="1" strokeDasharray="4 6" />
            {[0, 45, 90, 135].map((a) => (
              <line
                key={a}
                x1="-45"
                y1="0"
                x2="45"
                y2="0"
                transform={`rotate(${a})`}
                stroke="#FF3B30"
                strokeWidth="1"
                opacity="0.7"
              />
            ))}
            <circle r="10" fill="#FF3B30" />
          </g>
        </g>

        {/* Belt line */}
        <path
          d="M420,200 C450,150 470,150 490,170"
          fill="none"
          stroke="#71717A"
          strokeWidth="2"
          strokeDasharray="3 4"
        />
        <path
          d="M420,240 C450,270 470,270 490,250"
          fill="none"
          stroke="#71717A"
          strokeWidth="2"
          strokeDasharray="3 4"
        />

        {/* Labels */}
        <g fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#71717A">
          <text x="70" y="60">CYL / 01</text>
          <text x="154" y="60">CYL / 02</text>
          <text x="238" y="60">CYL / 03</text>
          <text x="322" y="60">CYL / 04</text>
          <text x="465" y="145">CRANK</text>
        </g>
      </svg>
    </div>
  );
}
