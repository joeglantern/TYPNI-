import type { Config } from "tailwindcss"
import { fontFamily } from 'tailwindcss/defaultTheme'

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        inter: ['var(--font-inter)'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#590099",
          50: "#F4E6FF",
          100: "#E6CCFF",
          200: "#D1A3FF",
          300: "#B366FF",
          400: "#9933FF",
          500: "#590099",
          600: "#47007A",
          700: "#35005C",
          800: "#23003D",
          900: "#11001F",
          950: "#08000F",
        },
        secondary: {
          DEFAULT: "#FFBD00",
          50: "#FFF7E6",
          100: "#FFEFCC",
          200: "#FFE099",
          300: "#FFD066",
          400: "#FFC133",
          500: "#FFBD00",
          600: "#CC9700",
          700: "#997100",
          800: "#664C00",
          900: "#332600",
          950: "#191300",
        },
        accent: {
          DEFAULT: "#900059",
          50: "#FFE6F4",
          100: "#FFCCE9",
          200: "#FF99D3",
          300: "#FF66BD",
          400: "#FF33A7",
          500: "#900059",
          600: "#730047",
          700: "#560035",
          800: "#3A0024",
          900: "#1D0012",
          950: "#0F0009",
        },
        highlight: {
          DEFAULT: "#FF0054",
          50: "#FFE6ED",
          100: "#FFCCDB",
          200: "#FF99B7",
          300: "#FF6693",
          400: "#FF336F",
          500: "#FF0054",
          600: "#CC0043",
          700: "#990032",
          800: "#660022",
          900: "#330011",
          950: "#1A0008",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          violet: "#590099",
          yellow: "#FFBD00",
          berry: "#900059",
          pink: "#FF0054",
        },
        white: {
          DEFAULT: "#FFFFFF",
          soft: "#F8FAFC",
          muted: "#F1F5F9",
          dim: "#E2E8F0",
        },
        instagram: {
          bg: {
            DEFAULT: "hsl(var(--background))",
            dark: "hsl(224 12% 12%)",
          },
          fg: {
            DEFAULT: "hsl(var(--foreground))",
            dark: "hsl(210 40% 98%)",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            dark: "hsl(224 12% 20%)",
          },
          border: {
            DEFAULT: "hsl(var(--border))",
            dark: "hsl(224 12% 25%)",
          },
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
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        "scroll-up-main": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-33.33%)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow": {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.5",
            transform: "scale(1.2)",
          },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'blob': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'dash': {
          to: {
            strokeDashoffset: '-10',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-in-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        'fade-in-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        'scroll-vertical': {
          '0%': {
            transform: 'translateY(0)'
          },
          '100%': {
            transform: 'translateY(-100%)'
          }
        },
        'scroll-vertical-delayed': {
          '0%': {
            transform: 'translateY(20%)'
          },
          '100%': {
            transform: 'translateY(-80%)'
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "scroll": "scroll 40s linear infinite",
        "scroll-reverse": "scroll-reverse 40s linear infinite",
        "scroll-up": "scroll-up-main 30s linear infinite",
        "scroll-up-delayed": "scroll-vertical-delayed 30s linear infinite",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
        "marquee": "marquee 25s linear infinite",
        'blob': 'blob 7s infinite',
        'bounce-slow': 'bounce 3s infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'dash': 'dash 1.5s linear infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in-down': 'fade-in-down 0.6s ease-out forwards',
        'fade-in-left': 'fade-in-left 0.6s ease-out forwards',
        'fade-in-right': 'fade-in-right 0.6s ease-out forwards',
        'scroll-vertical': 'scroll-vertical 25s linear infinite',
        'scroll-vertical-delayed': 'scroll-vertical-delayed 25s linear infinite',
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
      },
      blur: {
        '4xl': '72px',
        '5xl': '96px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-border': 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)',
      },
      transitionDuration: {
        '400': '400ms',
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
  ],
} satisfies Config

export default config 