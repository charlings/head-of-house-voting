import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#14213D",
          2: "#0D1730",
          3: "#1C2C52",
        },
        paper: "#FBF9F4",
        gold: {
          DEFAULT: "#F2A93B",
          soft: "#FBDDA6",
        },
        teal: {
          DEFAULT: "#1B998B",
          soft: "#CFEDE8",
        },
        coral: {
          DEFAULT: "#E85D4C",
          soft: "#F8D3CC",
        },
        slate: {
          DEFAULT: "#5C6470",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        stamp: "0 12px 30px -10px rgba(20, 33, 61, 0.45)",
        card: "0 1px 2px rgba(20, 33, 61, 0.06), 0 8px 24px -12px rgba(20, 33, 61, 0.18)",
      },
      keyframes: {
        "stamp-in": {
          "0%": { transform: "scale(2.4) rotate(-14deg)", opacity: "0" },
          "55%": { transform: "scale(0.92) rotate(-8deg)", opacity: "1" },
          "75%": { transform: "scale(1.06) rotate(-10deg)" },
          "100%": { transform: "scale(1) rotate(-8deg)", opacity: "1" },
        },
        "toast-in": {
          "0%": { transform: "translateY(16px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fill-rise": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0%)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(232, 93, 76, 0.45)" },
          "100%": { boxShadow: "0 0 0 14px rgba(232, 93, 76, 0)" },
        },
      },
      animation: {
        "stamp-in": "stamp-in 0.5s cubic-bezier(.2,1.4,.4,1) forwards",
        "toast-in": "toast-in 0.35s ease-out forwards",
        "fill-rise": "fill-rise 0.6s ease-out forwards",
        "pulse-ring": "pulse-ring 1.6s cubic-bezier(0,0,0.2,1) infinite",
      },
    },
  },
  daisyui: {
    themes: [
      {
        hoh: {
          primary: "#F2A93B",
          "primary-content": "#14213D",
          secondary: "#1B998B",
          "secondary-content": "#FBF9F4",
          accent: "#E85D4C",
          "accent-content": "#FBF9F4",
          neutral: "#14213D",
          "neutral-content": "#FBF9F4",
          "base-100": "#FBF9F4",
          "base-200": "#F3EEE2",
          "base-300": "#E8E1CF",
          "base-content": "#14213D",
          info: "#1B998B",
          success: "#1B998B",
          warning: "#F2A93B",
          error: "#E85D4C",
        },
      },
    ],
  },
  plugins: [daisyui],
};

export default config;
