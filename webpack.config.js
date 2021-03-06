const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = {
  // Entry accepts a path or an object of entries.
  // The build chapter contains an example of the latter.
  entry: PATHS.app,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,                            // Test expects a RegExp! Note the slashes!
        loaders: ['style', 'css'],
        include: PATHS.app                         // Include accepts either a path or an array of paths.
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          // Enable caching for improved performance during development.
          // It uses default OS directory by default. If you need something
          // more custom, pass a path to it. I.e., babel?cacheDirectory=<path>
          cacheDirectory: true,
          presets: [
            'react',
            'es2015', 
            'survivejs-kanban'
          ]
        },
        include: PATHS.app
      }
    ]
  }
}

// Default configuration
if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: PATHS.build,

      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env so this is easy to customize.
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
  });
}

if (TARGET === 'build') {
  module.exports = merge(common, {});
}