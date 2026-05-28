import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        md: "2rem",
        lg: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#111111",
          900: "#000000",
          800: "#222222",
          700: "#333333",
          500: "#666666",
        },
        bone: {
          100: "#FFFFFF",
          200: "#F5F2EC", // warm off-white, casa rural touch
          300: "#EEEAE1",
          400: "#E8E5DE",
          500: "#D7D2C7",
        },
        accent: {
          // verde oliva apagado — sustituye al "color-5" original
          DEFAULT: "#6B6E51",
        },
      },
      fontFamily: {
        sans: ["var(--font-montreal)", "system-ui", "sans-serif"],
        serif: ["var(--font-zodiak)", "Georgia", "serif"],
        mono: ["var(--font-dmmono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widest2: "0.16em",
      },
      transitionTimingFunction: {
        creative: "cubic-bezier(0.165, 0.84, 0.44, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
