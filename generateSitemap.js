const config = require("./src/config.json");
const fs = require("fs");
const sm = require("sitemap");
const routes = require("./public/routes.json");

let urls = routes.map(route => {
  if (route.meta.showInSiteMap) {
    let obj = {};
    obj.url = `${config.clientURL}${config.publicPath}${route.path}`;
    obj.changefreq = "weekly";
    obj.priority = 0.5;
    obj.lastmod = route.meta.updatedAt;
    return obj;
  }
});

let home = {};
home.url = `${config.clientURL}${config.publicPath}`;
home.changefreq = "weekly";
home.priority = 0.5;
home.lastmod = new Date().toJSON().substring(0, 10);
urls.push(home);

// filter undefined
let temp = [];
for (let i of urls) i && temp.push(i);
urls = temp;

let sitemap = sm.createSitemap({
  hostname: `${config.clientURL}${config.publicPath}`,
  cacheTime: 600000, //600 sec (10 min) cache purge period
  urls
});

fs.writeFileSync("./public/sitemap.xml", sitemap.toString());
console.log(`Created: ./public/sitemap.xml`);
