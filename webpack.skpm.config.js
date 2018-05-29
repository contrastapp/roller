module.exports = function (config) {
  config.resolve.extensions = [".sketch.js", ".js", ".jsx"]
  config.module.rules.push({
    test: /\.(html)$/,
    use: [{
        loader: "@skpm/extract-loader",
      },
      {
        loader: "html-loader",
        options: {
          attrs: [
            'img:src',
            'link:href'
          ],
          interpolate: true,
        },
      },
    ]
  })
  config.module.rules.push({
    test: /\.(css)$/,
    use: [{
        loader: "@skpm/extract-loader",
      },
      {
        loader: "css-loader",
      },
    ]
  })
  config.module.rules.push({
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: "babel-loader",
    query: {
      presets: ["react"],
      plugins: ["react-html-attrs", "transform-class-properties", "transform-object-rest-spread"],
    },
  })
}
