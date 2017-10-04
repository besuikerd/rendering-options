var path = require('path');
console.log(path.join(__dirname, '/dist'))
var config = {
  entry: {
    main: './src/main',
    styles: './stylesheets/main.scss'
  }
, devtool: "source-map"
, resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
, output: {
    path: path.resolve(__dirname, 'target')
  , publicPath: 'target/'
  , filename: '[name].js'
  }
, module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader'
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  }
};

module.exports = config;