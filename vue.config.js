const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
      },
    },
  },

  productionSourceMap: process.env.NODE_ENV === "dev",
  //......
  configureWebpack: {
    devtool: process.env.NODE_ENV === "dev" ? "source-map" : undefined,
  },
});
