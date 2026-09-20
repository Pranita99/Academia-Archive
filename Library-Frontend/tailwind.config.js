/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT( {
    content: ["./src/**/*.{html,js,jsx}", 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        colors:{
          gray: {
            150: "#eeeeee",
            50: "#f8f8f8",
            250: "#e5e5e5"
          },
          blue: {
            250: "#0C21C1",
            550: "#000842",

          }
        },
        width: {
          '1/7': "14.2857143%",
          '1/8': "12.5%",
  
        },
        screens: {
          'nlg': '900px'
        }
      },
    },
    plugins: [
      require('flowbite/plugin')
    ]
  }
)