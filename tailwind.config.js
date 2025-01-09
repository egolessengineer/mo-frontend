/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      //!bg Color
      colors: {
        primary: {
          25: "#7CD4F2",
          50: "#79C1DD",
          100: "#60A3BA",
          200: "#518B9F",
          300: "#00B7FD",
          400: "#60A3BA33",
          500: "#DFEDF1",
          600: "#E5F1F5",
        },
        bg: "#58585880",
        danger_bg: "#FFDDCF",
        text: {
          primary: {
            25: "#00B7FD33",
            50: "#80888F",
            100: "#B4B4B4",
            200: "#585858",
            300: "#74777A",
          },
          secondary: {
            25: "#3F3F3F",
            50: "#00B7FD",
            100: "#00B7FD1A",
          },
          white: {
            50: "#FFFFFF",
          },
          danger: {
            50: "#D32F2F",
            100: "#FF540D",
            200: "#E33629",
            300: "#FF540D33",
          },
          sucess: {
            50: "#3BB56E",
            100: "#319F43",
            200: "#D6ECD9",
          },
          warning: {
            50: "#FBC02D",
            100: "#FF9900",
            200: "#F8BD00",
          },
          pink: {
            50: "#F266AB",
          },
          Hold: {
            50: "#A875FF",
            100: "#EEE3FF",
          },
          HeadLine: {
            50: "#518B9F",
            100: "#60A3BA",
            200: "#F2FBFF",
          },
          gray: {
            50: "#C9C7C7",
            100: "#9C9C9C",
            200: "#3C3C3C",
            300: "#1D1B20",
            400: "#1D1B201F",
            500: "#F7F7F7",
          },
        },
      },

      //!font-family
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      //!shadow
      boxShadow: {
        role: "0px 0px 3px 3px #0000001F",
        custom:
          "5px 0 5px #00000033,3px 0px 14px #0000001F,8px 0px 10px #00000024 ",
        pop: "3px 0  14px #0000001F",
        button: "0px 1px 2px #0000004D",
        sideBar: "4px 0px 4px #00000040",
        navbar:
          "0px 1px 2px  #0000004D,0px 1px 3px 1px #00000026 , -1px 0px 4px #00000026",
        popUps:
          "0px 5px 5px 0px #00000033 ,0px 3px 14px 0px #0000001F ,0px 8px 10px 0px #00000024",
        hamburger: "4px 0px 4px 0px #00000040",
        toggle: "0px 4px 4px  #00000040",
        faq: "2px 2px 3px #00000040",
      },
      //!Font-size
      fontSize: {
        xxs: "11px",
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "22px",
        "3xl": "24px",
        "4xl": "28px",
        "5xl": "32px",
        "6xl": "40px",
        "7xl": "94.1px",
      },
      height: {
        calc: "calc(100vh - 60px)",
      },
      screens: {
        xs: "290px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
