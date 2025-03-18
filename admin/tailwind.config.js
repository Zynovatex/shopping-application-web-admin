/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors:{
          primary_purple: "#7B5AF7",
          lamaSkyLight: "#EDF9FD",
          lamaPurple: "#CFCEFF",
          lamaPurpleLight: "#F1F0FF",
          lamaYellow: "#FAE27C", 
          lamaYellowLight: "#FEFCE8",
        }
      },
  
    },
    plugins: [],
  };
  
  