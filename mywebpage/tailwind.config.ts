import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0c141d",
          900: "#111c27",
          700: "#22303d",
          600: "#34455a",
          500: "#5a6b7c",
          400: "#7f90a1",
          300: "#a3b2c0",
          100: "#dde6ee",
        },
        signal: "#f0a83a",
        wire: "#5fb8cc",
      },
      fontFamily: {
        sans: ["Archivo", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
