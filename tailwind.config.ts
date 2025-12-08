import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#22c55e",
          light: "#4ade80",
          dark: "#16a34a",
        },
        accent: {
          DEFAULT: "#10b981",
          light: "#34d399",
        },
        dark: {
          DEFAULT: "#0a0f0a",
          light: "#0f1a0f",
        },
        surface: {
          DEFAULT: "#1a2e1a",
          hover: "#243a24",
        },
        border: {
          DEFAULT: "#1e3a1e",
          light: "#2d4d2d",
        },
        bg: {
          DEFAULT: "#0a0f0a",
          secondary: "#0f1a0f",
        },
        gray: {
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          800: "#1e293b",
        },
        muted: {
          DEFAULT: "#64748b",
          foreground: "#94a3b8",
        },
        card: {
          DEFAULT: "#1a1f3a",
          foreground: "#e2e8f0",
        },
      },
      backgroundColor: {
        'dark': '#0a0f0a',
        'dark-light': '#0f1a0f',
        'surface': '#1a2e1a',
        'surface-hover': '#243a24',
        'bg': '#0a0f0a',
        'bg-secondary': '#0f1a0f',
      },
      borderColor: {
        'border': '#1e3a1e',
        'border-light': '#2d4d2d',
      },
      textColor: {
        'primary-light': '#4ade80',
        'accent-light': '#34d399',
        'text': 'var(--color-text)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(34, 197, 94, 0.3)',
        'glow-strong': '0 0 40px rgba(34, 197, 94, 0.5)',
        'glow-lg': '0 0 60px rgba(34, 197, 94, 0.4)',
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-green": "glow-green 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

