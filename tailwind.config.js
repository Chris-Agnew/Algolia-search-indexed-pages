/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "custom-link": "#1D4ED8",
        "custom-link-hover": "#2563EB",
      },
    },
  },
  plugins: [],
};
