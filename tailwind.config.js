import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#09070b',
        surface: '#140b14',
        panel: '#190c16',
        fg: '#f6eaef',
        muted: '#a88b95',
        accent: '#e43f5a',
        accentLight: '#ff8ba4',
        accentSoft: '#f9b8c7',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(228, 63, 90, 0.1), 0 20px 60px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
}

export default config
