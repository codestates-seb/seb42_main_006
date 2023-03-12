/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "default-pink": "#ff3366",
        "default-black": "#151515",
        "box-black": "#222222",
        "box-gray": "#4A4A4A",
        "box-border-gray": "#5A5959",
        "text-white": "#fff",
        "text-gray": "#4E4E4E",
        "text-red": "#FC0000",
        "text-blue": "#5452CE",
        "text-placeholder-gray": "#585757",
      },
      boxShadow: {
        input: "0 0 4px 1px #ff3366",
      },
    },
  },
  plugins: [],
};
