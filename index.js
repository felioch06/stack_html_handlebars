let hb = require("handlebars");
let fs = require("fs");
var ncp = require("ncp").ncp;

async function createPages(folder, output) {
  let pages = fs.readdirSync(folder);

  fs.mkdirSync(output, { recursive: true });

  await pages.map((page) => {
    let name = page.split(".")[0];
    var temp = fs.readFileSync(`${folder}/${page}`, "utf8");
    var compiled = hb.compile(temp);
    let html = compiled();
    fs.writeFileSync(`${output}/${name}.html`, html);
  });
}

function registerPartial(folder) {
  let templates = fs.readdirSync(folder);

  templates.map((template) => {
    let name = template.split(".")[0];
    var temp = fs.readFileSync(`${folder}/${template}`, "utf8");
    var compiled = hb.compile(temp);

    hb.registerPartial(name, compiled);
  });
}

function copyFolder(folder, output) {
  ncp(folder, output);
}

(() => {
  registerPartial("partials");
  createPages("pages", "dist/pages");

  copyFolder("assets", "dist/assets");
})();
