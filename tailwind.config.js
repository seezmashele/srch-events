/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    // rename breakpoints similar to xl, 2xl, 3xl. e.g md, md2, lg, lg2
    screens: {
      xs: '0',
      'md-ish': '900px',
      lg2: '1100px',
      ...defaultTheme.screens
    },

    extend: {
      colors: {
        'accent-blue': '#0066FF',
        'accent-light': '#EBF3FF',
        // 'accent-main': '#2563eb',
        'accent-main': '#f21b3f',
        'accent-main-hover': '#E70D32',
        // 'accent-main-hover': '#1d4ed8',
        'accent-medium': '#FFD6D8',
        'neutral-150': '#eaeaea',
        'neutral-950': '#0a0a0a'
      },
      width: {
        34: '8.5rem',
        54: '13.5rem',
        84: '21rem',
        sidebar: '500px',
        sidebar_xs: '30%'
      },
      minWidth: {
        4: '24rem',
        xs: '18rem',
        sm: '20rem'
      },
      minHeight: {
        post: '24rem'
      },
      height: {
        34: '8.5rem',
        0.75: '.875rem',
        6.5: '1.625rem',
        22: '5.5rem',
        104: '26rem'
      },
      aspectRatio: {
        '3/2': '3 / 2',
        '6/1': '6 / 1'
      },
      fontSize: {
        custom_base: '1.0625rem',
        card_title: '1.1875rem',
        sidebar_card_title: '0.9375rem',
        '1.5xl': '1.275rem',
        '2.5xl': '1.6875rem'
      },
      maxWidth: {
        72: '18rem',
        xxs: '18.5rem',
        '2.5xl': '45rem',
        '6.5xl': '76rem',
        page: '81.5rem',
        sidebar: '21.5rem'
      },
      margin: {
        6.5: '1.75rem',
        15.5: '3.875rem'
      },
      boxShadow: {
        dropdown: '0 35px 60px -15px rgba(0, 0, 0 / 0.3)'
      },
      scale: {
        103: '1.03'
      }
    }
  },
  plugins: []
}
