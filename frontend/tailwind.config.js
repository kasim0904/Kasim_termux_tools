/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        somalia: {
          bg: "#F8FAFC",
          surface: "#FFFFFF",
          slate: "#0F172A",
          muted: "#64748B",
          emerald: "#059669",
          gold: "#D97706",
          blue: "#0284C7",
          border: "#E2E8F0"
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'elevated': '0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'glow-green': '0 0 25px -3px rgba(5, 150, 105, 0.25)'
      }
    },
  },
  plugins: [],
}
