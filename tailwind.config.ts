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
        // CareerLab Design System - Exact Figma values
        white: "#FFFFFF",
        career: {
          dark: "#212746",
          blue: {
            100: "#F3F4FF",
            200: "#DCDFFF",
            400: "#9FA9FF",
            500: "#6D7BFC",
          },
          green: {
            200: "#EBFF8C",
            500: "#D0E957",
          },
          grey: {
            300: "#C1C8D5",
            500: "#8D96AC",
            dark: "#5A607F",
          },
          light: {
            100: "#F6F8FF",
            bg: "#F0F3FF",
          },
          dark500: "#ADB3C7",
          dark900: "#5A607F",
        },
      },
      fontFamily: {
        aeonik: ["Aeonik Pro", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Figma text styles
        "h1": ["62px", { lineHeight: "normal", fontWeight: "500" }],
        "h2": ["48px", { lineHeight: "normal", fontWeight: "500" }],
        "h3": ["36px", { lineHeight: "40px", fontWeight: "400" }],
        "h4": ["26px", { lineHeight: "30px", fontWeight: "500", letterSpacing: "0.52px" }],
        "body-lg": ["24px", { lineHeight: "30px", fontWeight: "400" }],
        "body": ["20px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["18px", { lineHeight: "normal", fontWeight: "500" }],
        "caption": ["16px", { lineHeight: "normal", fontWeight: "500" }],
        "caption-sm": ["14px", { lineHeight: "normal", fontWeight: "500" }],
      },
      boxShadow: {
        // Exact Figma shadows
        "dropdown": "2px 2px 2px 0px rgba(151, 151, 151, 0.15)",
        "button": "1px 1px 2px 0px rgba(0, 0, 0, 0.15)",
        "box": "1px 1px 2px 0px rgba(0, 12, 70, 0.1)",
        "card": "0px 4px 12px 0px rgba(0, 0, 0, 0.25)",
        "screen": "-2px -2px 16px 0px rgba(0, 0, 0, 0.25)",
        "floating": "2px 2px 20px 0px rgba(0, 0, 0, 0.15)",
        "feature": "0px -3px 26.4px 0px rgba(0, 0, 0, 0.15)",
      },
      borderRadius: {
        "xl": "12px",
        "2xl": "20px",
        "3xl": "24px",
        "4xl": "40px",
      },
      spacing: {
        "18": "72px",
        "22": "88px",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
