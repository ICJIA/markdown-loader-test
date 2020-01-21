const config = require("./src/config.json");
const fs = require("fs");
const sm = require("sitemap");
const routes = require("./routes");

let urls = routes.map(route => {
  let obj = {};
  obj.url = `${config.clientURL}${config.publicPath}${route}`;
  obj.changefreq = "weekly";
  obj.priority = 0.5;
  obj.lastmod = new Date();
  return obj;
});

let sitemap = sm.createSitemap({
  hostname: `${config.clientURL}${config.publicPath}`,
  cacheTime: 600000, //600 sec (10 min) cache purge period
  urls
});

fs.writeFileSync("./public/sitemap.xml", sitemap.toString());
console.log(`Created: ./public/sitemap.xml`);
