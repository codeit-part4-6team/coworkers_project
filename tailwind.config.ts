import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'color-brand-gradient': 'linear-gradient(to right, #10B981, #A3E635)',
      },
    },
    colors: {
      color: {
        brand: {
          primary: '#10B981',
          secondary: '#34D399',
          tertiary: '#A3E635',
        },
        point: {
          purple: '#A855F7',
          blue: '#3B82F6',
          cyan: '#06B6D4',
          pink: '#EC4899',
          rose: '#F43F5E',
          orange: '#F97316',
          yellow: '#EAB308',
        },
      },
      background: {
        primary: '#0F172A',
        secondary: '#1E293B',
        tertiary: '#334155',
        inverse: '#ffffff',
      },
      interaction: {
        inactive: '#94A3B8',
        hover: '#059669',
        pressed: '#047857',
        focus: '#10B981',
      },
      border: {
        primary: 'rgba(248, 250, 252, 0.5)',
      },
      text: {
        primary: '#F8FAFC',
        secondary: '#CBD5E1',
        tertiary: '#E2E8F0',
        default: '#64748B',
        inverse: '#ffffff',
        disabled: '#94A3B8',
      },
      status: {
        danger: '#DC2626',
      },
      icon: {
        primary: '#64748B',
        inverse: '#F8FAFC',
        brand: '#10B981',
      },
    },
    fontSize: {
      xs: ['12px', '14px'],
      sm: ['13px', '16px'],
      md: ['14px', '17px'],
      lg: ['16px', '19px'],
      '2lg': ['18px', '21px'],
      xl: ['20px', '24px'],
      '2xl': ['24px', '28px'],
      '3xl': ['32px', '38px'],
      '4xl': ['40px', '48px'],
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  plugins: [],
};
export default config;
