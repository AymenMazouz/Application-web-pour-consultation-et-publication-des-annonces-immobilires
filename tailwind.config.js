/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Configure your color palette here
        transparent: "transparent",
        light: {
          100: "#F8FAFC",
          200: "#ECEBF0",
          300: "#D5D6DF",
          400: "#878998",
          500: "#7A7D89",
          600: "#696977",
          700:"#ffffff ",
          800:"#E3E8EC",
        },
        dark: {
          100: "#ABB9C4",/** tres leger */
          200: "#525365",
          300: "#404254",
          400: "#3F424D",
          500: "#383B47",
          600: "#323542",
          700: "#1c1d24",
          800:"#000000",
        },
        blue: {
          200: "#C8D9ED",
          100: "#F9FEFF",
          300: "#C1D8EF",
          400:"#759ec7",
          500:"D3DDEB",
        },
      fontSize: {
        "2xs": "0.6rem",
      },
      dropShadow: {
        "3xl": "5px 5px 15px rgb(0 0 0 / 75%)",
      },
    },
  },
  
  plugins: [
    module.exports = {
      theme: {
        screens: {
          'tablet': '640px',
          // => @media (min-width: 640px) { ... }
    
          'laptop': '1024px',
          // => @media (min-width: 1024px) { ... }
    
          'desktop': '1280px',
          // => @media (min-width: 1280px) { ... }
        },
      }
    }
  ],
  },
}
