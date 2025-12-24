import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'hsl(190 92% 95%)',
          100: 'hsl(190 92% 90%)',
          200: 'hsl(190 90% 80%)',
          300: 'hsl(190 85% 70%)',
          400: 'hsl(190 78% 55%)',
          500: 'hsl(190 80% 45%)',
          600: 'hsl(190 85% 38%)',
          700: 'hsl(190 85% 30%)',
          800: 'hsl(190 80% 22%)',
          900: 'hsl(190 75% 16%)',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(2, 6, 23, 0.10)',
      },
    },
  },
  plugins: [],
} satisfies Config;
