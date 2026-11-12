"use client";

import { motion } from "motion/react";
import { LINES } from "@/lib/stations";

export default function NetworkOverview() {
  return (
    <figure className="overflow-hidden rounded-card border border-rule bg-surface p-4 md:p-6">
      <svg
        viewBox="0 0 360 190"
        role="img"
        aria-label="Animated schematic of Pune Metro Purple and Aqua lines"
        className="w-full"
      >
        {/* Purple route */}
        <motion.path
          d="M30 150 L180 95 L330 40"
          fill="none"
          stroke="#A855F7"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />

        {/* Aqua route */}
        <motion.path
          d="M30 40 L180 95 L330 150"
          fill="none"
          stroke="#0EA5E9"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.4, ease: "easeInOut" }}
        />

        {/* Stations */}
        {[
          [30, 150],
          [330, 40],
          [30, 40],
          [330, 150],
        ].map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="7"
            fill="white"
            stroke="#172033"
            strokeWidth="3"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 + i * 0.15, duration: 0.4 }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}

        {/* Interchange station */}
        <motion.circle
          cx="180"
          cy="95"
          r="11"
          fill="white"
          stroke="#172033"
          strokeWidth="3.5"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />

        {/* Moving train indicators */}
        <motion.circle
          r="5"
          fill="#A855F7"
          animate={{ cx: [30, 180, 330], cy: [150, 95, 40] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />

        <motion.circle
          r="5"
          fill="#0EA5E9"
          animate={{ cx: [30, 180, 330], cy: [40, 95, 150] }}
          transition={{ duration: 7, delay: 3.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Station labels */}
        <g fontSize="12" fill="#172033" fontWeight="600">
          <text x="30" y="176">PCMC</text>
          <text x="330" y="28" textAnchor="end">Swargate</text>
          <text x="30" y="26">Vanaz</text>
          <text x="330" y="176" textAnchor="end">Ramwadi</text>
          <text x="180" y="122" textAnchor="middle">
            District Court
          </text>
        </g>
      </svg>

      <figcaption className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
        {Object.values(LINES).map((line) => (
          <span key={line.name} className="flex items-center gap-2">
            <i
              className="h-2 w-5 rounded-full"
              style={{ background: line.color }}
            />
            {line.name}: {line.from} to {line.to}
          </span>
        ))}
        <span>Schematic, not to scale.</span>
      </figcaption>
    </figure>
  );
}
