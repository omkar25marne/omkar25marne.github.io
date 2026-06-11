/**
 * tailwind.config.js
 * ------------------
 * Extends Tailwind's default theme with the custom colour palette
 * and animation tokens used throughout this portfolio.
 *
 * Loaded by the Tailwind CDN via:
 *   <script>tailwind.config = { ... }</script>   (index.html)
 *
 * If you ever migrate to a build-step (Vite / PostCSS), point your
 * tailwind.config.js to this file and import it directly.
 */

tailwind.config = {
  theme: {
    extend: {

      /* ── Colour palette ──────────────────────────────────────────── */
      colors: {
        zinc: {
          950: '#09090b',   /* page background                         */
          900: '#18181b',   /* card / input background                 */
          800: '#27272a',   /* subtle borders, terminal bar            */
          700: '#3f3f46',   /* default border                          */
          400: '#a1a1aa',   /* muted text                              */
          300: '#d4d4d8',
          100: '#f4f4f5',
        },
        violet: {
          400: '#a78bfa',   /* accent text, chip colour                */
          500: '#8b5cf6',   /* dot accents                             */
          600: '#7c3aed',   /* primary accent (buttons, borders, glow) */
          700: '#6d28d9',   /* button hover                            */
        },
      },

      /* ── Typography ─────────────────────────────────────────────── */
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      /* ── Custom animations ──────────────────────────────────────── */
      animation: {
        'blink':      'blink 1s step-end infinite',
        'fade-up':    'fadeUp 0.6s ease forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },

      keyframes: {
        blink: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 20px rgba(124,58,237,0.3)' },
          '50%':     { boxShadow: '0 0 40px rgba(124,58,237,0.6)' },
        },
      },
    },
  },
};
