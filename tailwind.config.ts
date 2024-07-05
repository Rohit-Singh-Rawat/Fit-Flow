/* @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          "500": "#309B9C",
          "100": "#ADD8DD",
        },
        dark: {
          "100": "#000000",
          "200": "#0a0a0a",
          "300": "#141414",
          "400": "#1e1e1e",
          "500": "#282828",
        },
        light: {
          "900": "#FFFFFF",
          "850": "#f6f7f9",
          "800": "#F4F6F8",
          "700": "#DCE3F1",
          "500": "#B3FFCC",
          "400": "#F3F8FF",
        },
        "accent-blue": "#1DA1F2",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        spaceGrotesk: ["var(--font-spaceGrotesk)"],
      },
      boxShadow: {
        "light-100":
          "0px 12px 20px 0px rgba(184, 184, 184, 0.03), 0px 6px 12px 0px rgba(184, 184, 184, 0.02), 0px 2px 4px 0px rgba(184, 184, 184, 0.03)",
        "light-200": "10px 10px 20px 0px rgba(218, 213, 213, 0.10)",
        "light-300": "-10px 10px 20px 0px rgba(218, 213, 213, 0.10)",
        "dark-100": "0px 2px 10px 0px rgba(46, 52, 56, 0.10)",
        "dark-200": "2px 0px 20px 0px rgba(39, 36, 36, 0.04)",
        "inner-custom":
          "inset 0 1px 2px rgba(0, 0, 0, 0.6), inset 0 -1px 1px rgba(255, 255, 255, 0.1)",
      },
      backgroundImage: {
        "auth-dark": "url('/assets/images/auth-dark.png')",
        "auth-light": "url('/assets/images/auth-light.png')",

        "dark-gradient":
          "linear-gradient(110deg,#000103,45%,#282626,55%,#000103)",
        "light-gradient":
          "linear-gradient(110deg, #007BFF, 45%, #5A9BFF, 55%, #007BFF)",
      },
      screens: {
        xs: "420px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 4s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
