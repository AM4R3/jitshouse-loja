import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    // Cantos de 1px, como no site principal — nunca cantos arredondados.
    borderRadius: { none: '0', DEFAULT: '1px', full: '1px' },
    extend: {
      colors: {
        papel: '#F0E8D6',
        'papel-alto': '#F7F1E4',
        floresta: '#04211E',
        'floresta-2': '#01100F',
        'verde-rosa': '#004030',
        ouro: '#C5B178',
        areia: '#F9DA85',
        'ouro-dia': '#935C0E',
        'areia-sol': '#D98E3B',
        tinta: '#1C2420',
        'mute-papel': '#4A554F',
        'mute-esc': '#A7BCB2',
      },
      fontFamily: {
        display: ['var(--fonte-display)', 'Georgia', 'serif'],
        rotulo: ['var(--fonte-rotulo)', 'Arial Narrow', 'sans-serif'],
        sans: ['var(--fonte-corpo)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.15em',
        largo: '0.22em',
      },
      maxWidth: {
        conteudo: '1180px',
      },
      transitionTimingFunction: {
        marca: 'cubic-bezier(.22,1,.36,1)',
      },
    },
  },
  plugins: [],
}

export default config
