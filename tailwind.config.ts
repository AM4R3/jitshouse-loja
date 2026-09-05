import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    // Bordas retas em tudo — identidade da marca.
    borderRadius: { none: '0', DEFAULT: '0', full: '0' },
    extend: {
      colors: {
        papel: '#F3EEE3',
        'papel-2': '#EAE2D2',
        tinta: '#171410',
        ouro: '#B9892F',
        'ouro-claro': '#D2AC5C',
        cinza: '#6E675C',
      },
      fontFamily: {
        display: ['var(--fonte-display)', 'Georgia', 'serif'],
        sans: ['var(--fonte-corpo)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.1em',
      },
      maxWidth: {
        conteudo: '80rem',
      },
    },
  },
  plugins: [],
}

export default config
