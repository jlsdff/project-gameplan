/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-to-b-transparent-black': 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8))',
      },
      scrollbar: {
        hide: {
          '::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',  // IE and Edge
          'scrollbar-width': 'none',  // Firefox
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui",
      addCommonColors: true,
      defaultTheme: "dark",
      themes: {
        light: {
          colors: {
            background: "#FFF8F7",
            foreground: "#201a19",
            primary: {
              100: "#FCEACA",
              200: "#F9CF96",
              300: "#EEAA60",
              400: "#DE8438",
              500: "#C85101",
              600: "#AC3B00",
              700: "#902900",
              800: "#741A00",
              900: "#601000",
              DEFAULT: "#C85101",
            },
          }, // light theme colors
        },
        dark: {
          colors: {
            background: "#201A19",
            foreground: "#FFF8F7",
            primary: {
              100: "#FCEACA",
              200: "#F9CF96",
              300: "#EEAA60",
              400: "#DE8438",
              500: "#C85101",
              600: "#AC3B00",
              700: "#902900",
              800: "#741A00",
              900: "#601000",
              DEFAULT: "#C85101",
            },
          }, // dark theme colors
        },
        // ... custom themes
      },
    }),
  ],
};
