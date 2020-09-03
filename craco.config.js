/* craco.config.js */
const { whenDev } = require('@craco/craco')
const StylelintPlugin = require('stylelint-webpack-plugin')
const apiMocker = require('mocker-api')
const path = require('path')
const tailwindcss = require('tailwindcss')
const chalk = require('chalk')

const log = console.log
const isPro = process.env.NODE_ENV === 'production'
const disablePurgecss = process.env.NOT_USE_PURGECSS === 'true' && !isPro

log(chalk.blue('disablePurgecss %s'), disablePurgecss)

// https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#configuration-overview
module.exports = {
  reactScriptsVersion: 'react-scripts' /* (default value) */,
  style: {
    postcss: {
      mode: 'extends' /* (default value) || 'file'*/,
      // https://github.com/facebook/create-react-app/blob/c5b96c2853671baa3f1f297ec3b36d7358898304/packages/react-scripts/config/webpack.config.js#L109
      loaderOptions: (postcssLoaderOptions, { env, paths }) => {
        const plugins = postcssLoaderOptions.plugins()
        plugins.unshift(tailwindcss)

        return { ...postcssLoaderOptions, plugins }
      },
    },
    sass: {
      loaderOptions: {
        /* Any sass-loader configuration options: https://github.com/webpack-contrib/sass-loader. */
        // fuck the sass-loader-???minify???
        // https://github.com/webpack-contrib/sass-loader/issues/763
        // https://github.com/FullHuman/purgecss/issues/294
        sassOptions: {
          outputStyle: 'expanded',
        },
      },
    },
  },
  webpack: {
    plugins: [
      ...whenDev(
        () => [
          new StylelintPlugin({
            // options here
          }),
        ],
        []
      ),
    ],
  },
  plugins: [],
  devServer: {
    /* Any devServer configuration options: https://webpack.js.org/configuration/dev-server/#devserver. */
    // https://sourcegraph.com/github.com/jaywcjlove/mocker-api/-/blob/example/webpack/webpack.config.js#L21
    before(app) {
      whenDev(
        () =>
          apiMocker(app, path.resolve('./mock/index.js'), {
            // proxy: {
            //   '/api/(.*)': 'https://api.github.com/',
            // },
            changeHost: true,
          }),
        void 0
      )
    },
  },
}
