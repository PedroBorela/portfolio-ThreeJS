/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Breakpoint único do protótipo: "wide" é o layout de desktop, o resto é "narrow".
      screens: {
        wide: { raw: '(min-width: 861px) and (min-height: 720px)' },
      },
      fontFamily: {
        sans: ['General Sans', 'sans-serif'],
      },
      colors: {
        pf: {
          black: '#010103',
          surface: '#0E0E10',
          border: '#1C1C21',
          'muted-2': '#3A3A49',
          muted: '#62646C',
          text: '#AFB0B6',
          'text-strong': '#E4E4E6',
          silver: '#D6D9E9',
          green: '#22C55E',
          ping: '#4ADE80',
          logo: '#1A1A1A',
          indigo: '#6366F1',
          emerald: '#10B981',
        },
      },
      spacing: {
        gutter: 'clamp(20px,4vw,40px)',
        section: 'clamp(112px,14vw,176px)',
        'section-end': 'clamp(80px,10vw,120px)',
        card: 'clamp(22px,2.6vw,36px)',
      },
      maxWidth: {
        site: '1280px',
      },
    },
  },
  plugins: [],
};
