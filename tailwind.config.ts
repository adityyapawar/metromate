import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: { line: "#A855F7", ink: "#7E22CE", tint: "#F5EDFE" },
        aqua: { line: "#0EA5E9", ink: "#0369A1", tint: "#E6F5FD" },
        ink: "#172033", muted: "#64748B", canvas: "#F7F8FA", surface: "#FFFFFF", rule: "#E5E7EB",
      },
      fontFamily: { sans: ["var(--font-inter)", "system-ui", "sans-serif"] },
      borderRadius: { card: "14px", ctl: "10px" },
      boxShadow: { lift: "0 1px 2px rgba(23,32,51,.06), 0 8px 24px -12px rgba(23,32,51,.18)" },
      letterSpacing: { display: "-0.035em" },
    },
  },
} satisfies Config;
