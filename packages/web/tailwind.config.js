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
      colors: {
        "darkblue": {
          "100": "#C8CAE9",
          "200": "#9196D4",
          "400": "#3A4092",
          "600": "#1D2049",
          "800": "#0E1025"
        },
        "softblue": {
          "100": "#f0f8ff",
          "200": "#68E1FD",
          "400": "#03ADD3",
          "600": "#02738D",
          "800": "#001D23"
        },
        "yellow": {
          "100": "#ffffde",
          "200": "#FFEC99",
          "400": "#FFDA33",
          "600": "#CCA700",
          "800": "#997D00",
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

