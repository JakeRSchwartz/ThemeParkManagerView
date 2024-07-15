/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {}
  },
  plugins: []
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // ...
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  plugins: [
    // ...
    require('flowbite/plugin')
  ]
}

