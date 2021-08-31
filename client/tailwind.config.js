module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        black: {
          0: "#000000",
          25: "#0d121d",
          50: "#080c13",
        },
      },
      maxWidth: {
        "8xl": "92rem",
      },
      inset: {
        105: "105px",
      },
    },
  },
  variants: {
    extend: {
      width: ["responsive", "hover"],
      height: ["responsive", "hover"],
      borderWidth: ["responsive", "hover"],
      borderColor: ['responsive', 'hover'],
      zIndex: ['hover']
    },
  },
  plugins: [],
};
