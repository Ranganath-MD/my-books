import { Colors } from "./constants/Colors";
import { fontFamily } from "tailwindcss/defaultTheme";
import Unfonts from "unplugin-fonts";

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        geist: ["Geist", ...fontFamily.sans],
        "geist-semibold": ["Geist-SemiBold", ...fontFamily.sans],
        "geist-bold": ["Geist-Bold", ...fontFamily.sans],
        "geist-extrabold": ["Geist-ExtraBold", ...fontFamily.sans],
      },
      colors: Colors,
    },
  },
  plugins: [
    "@tailwindcss/typography",
    Unfonts.default.vite({
      custom: {
        families: [
          {
            name: "geist",
            local: "Geist-Regular",
            src: "./assets/fonts/Geist.ttf",
          },
          {
            name: "geist-semibold",
            local: "Geist-SemiBold",
            src: "./assets/fonts/Geist-SemiBold.ttf",
          },
          {
            name: "geist-bold",
            local: "Geist-Bold",
            src: "./assets/fonts/Geist-Bold.ttf",
          },
          {
            name: "geist-extrabold",
            local: "Geist-ExtraBold",
            src: "./assets/fonts/Geist-ExtraBold.ttf",
          },
        ],
      },
    }),
  ],
};
