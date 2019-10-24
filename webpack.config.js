var path = require('path');
var HTMLWebpackPlugins = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    devtool: "inline-source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js"
    },
    module:{
        rules: [
            {
            test: /\.(png|svg|jpg|gif)$/, 
            loader: "file-loader",
            options:
                {
                    name: "[name].[ext]"
                },
            },
            {
                test: /\.scss$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      // you can specify a publicPath here
                      // by default it uses publicPath in webpackOptions.output
                      publicPath: (resourcePath, context) =>{
                          return path.relative(path.dirname(resourcePath), context) + '/';
                      },
                      hmr: process.env.NODE_ENV === 'development',
                    },
                  },
                  "css-loader",
                  "sass-loader"
                ],
              },
        ]
    },
    plugins:[
        new HTMLWebpackPlugins({
            title: "YetAnotherOne",
            filename: "index.html",
            template: "src/index.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ],
    devServer: {
        contentBase: './dist'
      },
}