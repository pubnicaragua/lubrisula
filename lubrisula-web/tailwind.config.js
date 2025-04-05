/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        autoflowx: {
          dark: '#1F2A44',
          light: '#3C4B67',
          gray: '#AAB2BD',
          accent: '#4DA1FF',
          glass: 'rgba(255, 255, 255, 0.2)',
        }
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
