module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'triangle-pattern': "url('../../public/svg/bg-triangles.svg')",
      },
      dropShadow: {
        'md': '5px 5px 10px #2d6e71',
      },
      screens: {
        'xl': {'max': '1279px'},
  
        'lg': {'max': '1080px'},
  
        'md': {'max': '760px'},
  
        'sm': {'max': '639px'},
      },
      colors: {
        "darkblue": {
          "100": "#81a8a5",
          "200": "#2D6A80",
          "400": "#334B63",
          "600": "#2A3157",
          "800": "#0E1025"
        },
        "softblue": {
          "100": "#badadd",
          "200": "#96C4C8",
          "400": "#98DAE6",
          "600": "#358FA4",
          "800": "#125565"
        },
        "grayish": {
          "100": "#F3F4F6",
          "200": "#DFDFE7",
          "400": "#D3D4DE",
          "600": "#999AB3",
          "800": "#6B6D8F",
        }
      },
    },
  },
  plugins: [],
}

