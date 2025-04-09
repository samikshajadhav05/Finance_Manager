/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        greenDeep: "#021526", // Example dark blue
        greenMedium: "#1F4287", // Example grayish blue
        greenLight: "#278EA5", // Example green
        warning: "#f59e0b", // Example yellow
        error: "#ef4444", // Example red
        background: "#123524", // Example light gray
        text: "#21E6C1", // Example dark gray
      },
    },
  },
  plugins: [],
};
