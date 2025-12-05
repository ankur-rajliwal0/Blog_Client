/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container:{
        center:true,
        padding:'12px',
          screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px', 
      }},
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
      boxShadow:{
        'soft':'0px 0px 4px 0px #0000001A',
        'card':'0px 4px 4px 0px #00000026'
      },
     keyframes: {
        progress: {
          "0%": { width: "0%" },
          "100%": { width: "100%" }
        }
      },
      animation: {
        progress: "progress 2s linear forwards"
      }
    },
  },
  plugins: [],
};
