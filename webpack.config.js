const CopyWebpackPlugin = require("copy-webpack-plugin");
const ZipWebpackPlugin = require("zip-webpack-plugin");
const path = require("path")

const stripJsonComments = require("strip-json-comments").default;
const fs = require("fs");

const config = (_, options) => {
  let config = {
    optimization: {
      minimize: false
    },
    // devtool: "source-map",
    entry: {
      background: "./src/background.ts",
      content: "./src/content.ts",
      popup: "./src/popup.ts",
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].js",
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: ["ts-loader"],
          exclude: [/node_modules/],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { 
            from: './public', to: './',
            globOptions: {ignore: ['**/manifest.jsonc']}, // handled in ManifestTransformPlugin
          },
          {
            from: "public/manifest.jsonc", to: "manifest.json",
            transform(content) {return stripJsonComments(content.toString());}
          }
        ]
      }),
    ],
  }

  if (options.mode === "production") {
    config.plugins.push(new ZipWebpackPlugin({
      path: "zip",
      filename: "genshin-impact-auto-sign.zip"
    }))
  }

  return config;
}

module.exports = config;

