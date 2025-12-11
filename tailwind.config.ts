import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        lucky: {
          green: "hsl(var(--lucky-green))",
          "green-light": "hsl(var(--lucky-green-light))",
          "green-glow": "hsl(var(--lucky-green-glow))",
          gold: "hsl(var(--lucky-gold))",
          "gold-light": "hsl(var(--lucky-gold-light))",
          "gold-glow": "hsl(var(--lucky-gold-glow))",
          emerald: "hsl(var(--lucky-emerald))",
          shamrock: "hsl(var(--lucky-shamrock))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--lucky-gold) / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(var(--lucky-gold) / 0.6)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        wiggle: "wiggle 0.5s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "celtic-knot": `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300A86B' stroke-opacity='0.08' stroke-width='2.5'%3E%3Cpath d='M50 50 C45 48 38 45 32 40 C26 35 24 28 26 22 C28 16 34 14 40 16 C44 17 47 20 50 25 C53 20 56 17 60 16 C66 14 72 16 74 22 C76 28 74 35 68 40 C62 45 55 48 50 50' transform='rotate(-45 50 50)'/%3E%3Cpath d='M50 50 C45 48 38 45 32 40 C26 35 24 28 26 22 C28 16 34 14 40 16 C44 17 47 20 50 25 C53 20 56 17 60 16 C66 14 72 16 74 22 C76 28 74 35 68 40 C62 45 55 48 50 50' transform='rotate(45 50 50)'/%3E%3Cpath d='M50 50 C45 48 38 45 32 40 C26 35 24 28 26 22 C28 16 34 14 40 16 C44 17 47 20 50 25 C53 20 56 17 60 16 C66 14 72 16 74 22 C76 28 74 35 68 40 C62 45 55 48 50 50' transform='rotate(135 50 50)'/%3E%3Cpath d='M50 50 C45 48 38 45 32 40 C26 35 24 28 26 22 C28 16 34 14 40 16 C44 17 47 20 50 25 C53 20 56 17 60 16 C66 14 72 16 74 22 C76 28 74 35 68 40 C62 45 55 48 50 50' transform='rotate(225 50 50)'/%3E%3Ccircle cx='50' cy='50' r='3'/%3E%3Cpath d='M47 55 L44 80 M53 55 L56 80'/%3E%3C/g%3E%3C/svg%3E")`,
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
