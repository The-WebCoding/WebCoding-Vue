module.exports = {
  publicPath: "./",
  outputDir: "WebCoding2",
  chainWebpack: config => {
    config.module
      .rule("raw")
      .test(/\.[txt|md]$/)
      .use("raw-loader")
      .loader("raw-loader")
      .end();
  }
};
