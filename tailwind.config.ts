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
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
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
        // Governance specific colors
        chamber: "hsl(var(--chamber))",
        encrypted: "hsl(var(--encrypted))",
        revealed: "hsl(var(--revealed))",
        voting: "hsl(var(--voting))",
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
        "encrypt": {
          "0%": { opacity: "1", filter: "blur(0px)" },
          "50%": { opacity: "0.3", filter: "blur(3px)" },
          "100%": { opacity: "1", filter: "blur(0px)" },
        },
        "reveal": {
          "0%": { opacity: "0", scale: "0.9", filter: "blur(5px)" },
          "100%": { opacity: "1", scale: "1", filter: "blur(0px)" },
        },
        "gavel-strike": {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-15deg)" },
          "75%": { transform: "rotate(5deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "vote-pulse": {
          "0%, 100%": { opacity: "1", scale: "1" },
          "50%": { opacity: "0.7", scale: "1.05" },
        },
        "circuit-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "encrypt": "encrypt 2s infinite",
        "reveal": "reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "gavel-strike": "gavel-strike 0.8s ease-out",
        "vote-pulse": "vote-pulse 3s infinite",
        "circuit-flow": "circuit-flow 20s linear infinite",
      },
      backgroundImage: {
        "gradient-chamber": "var(--gradient-chamber)",
        "gradient-gold": "var(--gradient-gold)",
        "gradient-circuit": "var(--gradient-circuit)",
      },
      boxShadow: {
        "chamber": "var(--shadow-chamber)",
        "glow": "var(--shadow-glow)",
        "encrypted": "var(--shadow-encrypted)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
