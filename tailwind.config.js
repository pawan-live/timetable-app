/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
      fontSize: {
        greetingCardDate: "20px",
        greetingCardgreeting: "14px",
        location: "8px",
      },
      letterSpacing: {
        moduleType: "0.2em",
      },
    },
  },
  plugins: [],
};
