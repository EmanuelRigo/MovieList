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
          primary: "var(--accent-primary)",
          hover: "var(--accent-hover)",
          muted: "var(--accent-muted)",
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
    },
  },
  plugins: [],
} satisfies Config;
