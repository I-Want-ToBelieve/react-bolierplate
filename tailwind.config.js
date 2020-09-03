const isPro = process.env.NODE_ENV === 'production'
const disablePurgecss = process.env.NOT_USE_PURGECSS === 'true' && !isPro

// https://tailwindcss.com/docs/configuration
// https://tailwindcomponents.com/components
module.exports = {
  important: false,
  // https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
  purge: {
    enabled: !disablePurgecss,
    content: [
      './src/**/*.html',
      './src/**/*.vue',
      './src/**/*.jsx',
      './src/**/*.tsx',
    ],
    // These options are passed through directly to PurgeCSS
    options: {},
  },
  theme: {
    extend: {
      // https://tailwindcss.com/docs/top-right-bottom-left#negative-values
      inset: {
        // https://tailwindcss.com/docs/width 1rem = 16px
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        fitts: '-0.625rem',
      },
      width: {
        // https://tailwindcss.com/docs/width/#customizing
        '72': '18rem',
      },
      zIndex: {
        // https://tailwindcss.com/docs/z-index#negative-values
        '-10': '-10',
      },
      opacity: {
        // https://tailwindcss.com/docs/opacity#customizing
        '60': '.6',
      },
    },
  },
  variants: {},
  plugins: [],
}
