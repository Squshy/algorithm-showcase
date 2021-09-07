const colors = require("tailwindcss/colors");
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
      keyframes: {
        visitedNode: {
          "0%": {
            transform: "scale(0.2)",
            backgroundColor: colors.green[300],
            borderRadius: "100%",
            border: "1px white solid",
          },
          "25%": {
            transform: "scale(0.5)",
            backgroundColor: colors.blue[500],
            border: "1px black solid",
          },
          "50%": {
            transform: "scale(0.7)",
            backgroundColor: colors.purple[500],
          },
          "75%": {
            transform: "scale(1.2)",
            backgroundColor: colors.purple[800],
          },
          "100%": {
            transform: "scale(1.0)",
            backgroundColor: colors.purple[600],
          },
        },
        finalPath: {
          "0%": {
            transform: "scale(1.4)",
            backgroundColor: colors.lime[800],
            borderRadius: "100%",
          },
          "50%": {
            transform: "scale(0.6)",
            backgroundColor: colors.blue[200],
            border: "1px black solid",
          },
          "100%": {
            transform: "scale(1.0)",
            backgroundColor: colors.blue[500],
          },
        },
      },
    },
    animation: {
      "visited-node": "visitedNode 1s ease-in-out forwards",
      "final-path": "finalPath 1s ease-in-out forwards",
    },
  },
  variants: {
    extend: {
      width: ["responsive", "hover"],
      height: ["responsive", "hover"],
      borderWidth: ["responsive", "hover"],
      borderColor: ["responsive", "hover"],
      zIndex: ["hover"],
    },
  },
  plugins: [],
};
