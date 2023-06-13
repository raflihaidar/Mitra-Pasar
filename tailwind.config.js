/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('./src/assets/img/img1.jpg')"
      },
      fontFamily: {
        openSans: "font-family: 'Quicksand', sans-serif;",
        display: ['Ubuntu, sans-serif']
      },
      animation: {
        slideIn: 'slideIn 1s ease-out',
        fadein: 'fadein 2s ease-in'
      },
      colors: {
        'black-rgba': 'rgba(0, 0, 0, 0.5)'
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '100%' }
        }
      }
    },
    plugins: []
  }
}
