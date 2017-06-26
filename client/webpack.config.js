var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(
      __dirname,
      "../server/wp-content/themes/custom-theme/dist"
    ),
    publicPath: "/wp-content/themes/custom-theme/dist/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["css-loader"]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  resolve: {
    alias: {}
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    hot: true,
    inline: true,
    contentBase: path.resolve(__dirname, "../server/"),
    proxy: {
      "**": {
        target: {
          host: "localhost",
          protocol: "http:",
          port: 80
        },
        ignorePath: false,
        changeOrigin: true,
        secure: false
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: "#eval-source-map"
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        dead_code: true,
        unused: true,
        hoist_funs: true,
        hoist_vars: true
      },
      sourceMap: true,
      output: {
        comments: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
