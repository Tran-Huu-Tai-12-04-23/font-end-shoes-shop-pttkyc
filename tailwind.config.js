/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        barlow: ['"Barlow Condensed"', "Dosis", "sans-serif"],
      },
      height: {
        "30vh": "30vh",
        "100vh": "100vh",
      },
      colors: {
        dark: {
          text: "#fff",
          primary: "#1E1E1E",
          second: "#0085ff",
          third: "#e0ffff",
          blur: "rgba(255, 255, 255,.2)",
        },
        light: {
          text: "#000",
          primary: "#fff",
          second: "#0085ff",
          third: "#e0ffff",
          blur: "rgba(0,0,0,.2)",
        },
      },
      backgroundImage: {
        linear:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(239,0,255,0.6252626050420168) 30%);",
      },
      maxHeight: {
        "30vh": "30vh",
        "100vh": "100vh",
        15: "15rem",
        20: "20rem",
      },
      minHeight: {
        "30vh": "30vh",
        "100vh": "100vh",
        15: "15rem",
        20: "20rem",
      },
      minWidth: {
        30: "30rem",
        "100vh": "100vh",
        15: "15rem",
        "1/8": "calc(100% / 8 )",
      },
      maxWidth: {
        "100vh": "100vh",
        15: "15rem",
      },
      borderRadius: {
        "1/2": "50%",
      },

      borderBottom: {
        custom: "1px solid #e0e0e0",
      },
    },
  },
  plugins: [],
};
