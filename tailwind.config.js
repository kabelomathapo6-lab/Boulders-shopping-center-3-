/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        porcelain: "#F4EFE6",
        bone: "#E6DDCE",
        ink: "#171611",
        graphite: "#4A453D",
        brass: { 300: "#DDB66B", 400: "#C79A48", 500: "#A9782F", 600: "#805720" },
        moss: { 500: "#4C6B54", 400: "#7A9880" },
        night: { 950: "#0C0B08", 900: "#171611", 800: "#221F19" },
      },
      fontFamily: {
        display: ["Unbounded", "ui-sans-serif", "system-ui"],
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular"],
      },
      boxShadow: {
        soft: "0 24px 70px -34px rgba(23,22,17,0.35)",
        glow: "0 16px 50px -18px rgba(169,120,47,0.45)",
      },
    },
  },
  plugins: [],
};
