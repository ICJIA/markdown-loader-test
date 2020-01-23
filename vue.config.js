const path = require("path");
const Mode = require("./loaders/frontmatter-markdown-loader/mode");
const markdownIt = require("markdown-it");
const markdownItNamedHeaders = require("markdown-it-named-headers");
const markdownItAttrs = require("markdown-it-attrs");
const config = require("./src/config.json");

module.exports = {
  //publicPath: process.env.NODE_ENV === `production` ? config.publicPath : "/",
  publicPath: "/",
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    moment: {
      locales: ["en"]
    }
  },
  chainWebpack: config => {
    config.module
      .rule("markdown")
      .test(/\.md$/)
      .use(path.resolve("./loaders/frontmatter-markdown-loader"))
      .loader(path.resolve("./loaders/frontmatter-markdown-loader"))
      .tap(options => {
        return {
          mode: [Mode.VUE_COMPONENT],
          vue: {
            root: "markdown-body"
          },
          markdownIt: markdownIt({
            html: true,
            breaks: false,
            langPrefix: "language-",
            linkify: true
          })
            .use(markdownItNamedHeaders)
            .use(markdownItAttrs)
        };
      });
  }
};
