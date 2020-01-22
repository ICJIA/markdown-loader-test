const fs = require("fs");
const path = require("path");
const base = "src/markdown";
const slugs = require("slugs");

function findInDir(dir, filter, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const fileStat = fs.lstatSync(filePath);

    if (fileStat.isDirectory()) {
      findInDir(filePath, filter, fileList);
    } else if (filter.test(filePath)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

let paths = findInDir(base, /\.md$/);
let generatedRoutes = [];

paths.forEach(path => {
  let routeObj = {};
  routeObj.path = path.replace(base, "").replace(".md", "");
  routeObj.name = slugs(routeObj.path);
  generatedRoutes.push(routeObj);
});

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

storeData(generatedRoutes, "./public/routes.json");
