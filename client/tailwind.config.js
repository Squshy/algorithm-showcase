module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        // gray: {
        //   50: "#f5f5f5",
        //   100: "#EDEDED",
        //   200: "#DBDBDB",
        //   300: "#C2C2C2",
        //   400: "#A6A6A6",
        //   500: "#858585",
        //   600: "#666666",
        //   700: "#4F4F4F",
        //   800: "#454545",
        //   900: "#383838",
        //   1100: "#1e1e1e",
        // },
      },
      maxWidth: {
        '8xl': "92rem"
      },
      inset: {
        '105': "105px"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
