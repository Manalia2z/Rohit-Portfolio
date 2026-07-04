import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Blueprint-style animated car silhouette (side view).
 * Uses SVG stroke-dashoffset for the "engineer's line drawing" reveal
 * and CSS 3D perspective wrapper for tilt on scroll / hover.
 */
export default function BlueprintCar({ className = "" }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [8, -8]), { stiffness: 80, damping: 12 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 80, damping: 12 });
  const [hover, setHover] = useState(false);

  const onMove = (e) => {
    const b = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - b.left) / b.width) * 2 - 1);
    my.set(((e.clientY - b.top) / b.height) * 2 - 1);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        mx.set(0);
        my.set(0);
      }}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className={`relative w-full ${className}`}
      data-testid="blueprint-car-3d"
    >
      <svg
        viewBox="0 0 800 320"
        className="w-full h-auto"
        stroke="#FF3B30"
        strokeWidth="1.5"
        fill="none"
      >
        <defs>
          <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF3B30" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#FF3B30" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FF3B30" stopOpacity="0.1" />
          </linearGradient>
          <filter id="softglow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid backdrop */}
        <g stroke="#27272A" strokeWidth="0.5" opacity="0.6">
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="320" />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 40} x2="800" y2={i * 40} />
          ))}
        </g>

        {/* Ground line */}
        <line x1="0" y1="250" x2="800" y2="250" stroke="#FF3B30" strokeDasharray="4 6" opacity="0.5" />

        {/* Car body silhouette */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, ease: "easeInOut" }}
          d="M80,240 L120,240 C130,210 160,180 200,175 L320,165 C350,140 400,120 480,120 L580,120 C640,120 680,150 700,180 L720,240 L740,240"
          filter="url(#softglow)"
        />
        {/* Roof / cabin */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, delay: 0.2, ease: "easeInOut" }}
          d="M240,170 L320,120 L520,110 L620,155"
        />
        {/* Window lines */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 1.2 }}
          d="M400,113 L400,158 M475,110 L475,155"
          stroke="#FF3B30"
          opacity="0.6"
        />
        {/* Front wheel */}
        <motion.circle
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.4 }}
          cx="180"
          cy="245"
          r="34"
        />
        <motion.circle cx="180" cy="245" r="14" strokeWidth="1" />
        {/* Rear wheel */}
        <motion.circle
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          cx="600"
          cy="245"
          r="34"
        />
        <motion.circle cx="600" cy="245" r="14" strokeWidth="1" />

        {/* Rim spokes rotating */}
        <g transform="translate(180 245)" className="gear-cw" style={{ transformOrigin: "center" }}>
          {[0, 45, 90, 135].map((a) => (
            <line
              key={a}
              x1="0"
              y1="-30"
              x2="0"
              y2="30"
              transform={`rotate(${a})`}
              strokeWidth="1"
              opacity="0.7"
            />
          ))}
        </g>
        <g transform="translate(600 245)" className="gear-cw" style={{ transformOrigin: "center" }}>
          {[0, 45, 90, 135].map((a) => (
            <line
              key={a}
              x1="0"
              y1="-30"
              x2="0"
              y2="30"
              transform={`rotate(${a})`}
              strokeWidth="1"
              opacity="0.7"
            />
          ))}
        </g>

        {/* Headlight beam */}
        <motion.path
          d="M700,190 L780,175 L780,205 L700,210 Z"
          fill="url(#glow)"
          opacity={hover ? 0.9 : 0.35}
          animate={{ opacity: hover ? 0.9 : 0.3 }}
        />

        {/* Callouts (blueprint labels) */}
        <g fill="#FF3B30" fontFamily="JetBrains Mono, monospace" fontSize="10" opacity="0.9">
          <text x="150" y="300">FRONT AXLE</text>
          <text x="380" y="90">CABIN / ROOF LINE</text>
          <text x="580" y="300">REAR AXLE</text>
          <text x="670" y="170">HEADLAMP</text>
        </g>
        <g stroke="#FF3B30" strokeWidth="0.8" opacity="0.6" strokeDasharray="2 3">
          <line x1="180" y1="285" x2="180" y2="295" />
          <line x1="600" y1="285" x2="600" y2="295" />
          <line x1="420" y1="105" x2="420" y2="90" />
        </g>
      </svg>
    </motion.div>
  );
}
