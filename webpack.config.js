var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
//var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  //entry: './src/main.ts',
  entry: {
    app: ['./src/polyfills.js', './src/main.ts'],
    vendor: [
      //__dirname + '/node_modules/bootstrap/scss/bootstrap-flex.scss',
      //__dirname + '/node_modules/bootstrap/dist/css/bootstrap.css',
      'jquery',
      'tether',
      'bootstrap',
      'vue',
      'vue-router',
      'vuex'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'build.js'
  },
  // resolve TypeScript and Vue file
  resolve: {
    extensions: ['', '.ts', '.vue', '.js', '.css'],
    // https://github.com/TypeStrong/ts-loader/issues/29#issuecomment-128842847
    modulesDirectories: ['node_modules', 'src'],
  },

  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.ts$/, loader: 'vue-ts' },
      // Support for CSS as raw text
      { test: /\.css$/, loaders: ['style', 'css'] },
      //{ test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(scss|sass)$/, loaders: ['style', 'css', 'sass'] },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },

    ],
  },
  vue: {
    // instruct vue-loader to load TypeScript
    loaders: { js: 'vue-ts-loader', },
    // make TS' generated code cooperate with vue-loader
    esModule: true,
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  },
  devServer: {
    port: 8080,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 }
  },
  //devtool: '#eval-source-map',
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: Infinity
    }),
    // static assets
    //new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }]),
    //Make jquery,Vue and Tether globally available without the need to import them
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
      "window.Tether": 'tether',
      Vue: 'vue',
      VueRouter: 'vue-router',
      Vuex: 'vuex',
    }),

  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: 'src/index.template.html',
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
    }),

  ])

  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  module.exports.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        ['js', 'css', 'html'].join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )

} else {
  module.exports.plugins = (module.exports.plugins || []).concat([
    // generating html
    new HtmlWebpackPlugin({
      template: 'src/index.template.html',
    }),
  ])
}
