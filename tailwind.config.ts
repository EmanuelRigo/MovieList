import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "var(--background)",
          primary: "var(--background-primary)",
          secondary: "var(--background-secondary)",
          elevated: "var(--background-elevated)",
        },
        foreground: "var(--foreground)",
        surface: {
          primary: "var(--surface-primary)",
          hover: "var(--surface-hover)",
          active: "var(--surface-active)",
        },
        border: {
          subtle: "var(--border-subtle)",
          strong: "var(--border-strong)",
        },
        accent: {
          primary: "rgb(244 180 0 / <alpha-value>)",
          hover: "rgb(255 201 61 / <alpha-value>)",
          muted: "rgb(215 154 0 / <alpha-value>)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
      },
      aspectRatio: {
        "9/16": "9 / 16",
      },
      screens: {
        "1-5xl": "1600px",
      },
      boxShadow: {
        accent:
          "0 0 18px -2px rgb(244 180 0 / 0.35), 0 0 4px rgb(244 180 0 / 0.15)",
      },
    },
  },
  plugins: [],
} satisfies Config;
