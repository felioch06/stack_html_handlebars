const fs = require("fs");

(() => {
  try {
    let argv = process.argv;

    if (!argv[2]) throw new Error("Missing arguments!");

    let fileName = argv[2].split("=")[1];
    let layoutName = argv[3] ? argv[3].split("=")[1] : "main";

    if (!fileName) throw new Error();

    let html = fs.readFileSync(`layout/${layoutName}.hbs`, "utf8");

    fs.writeFileSync(`pages/${fileName}.hbs`, html, { flag: "wx" });

    console.log(`Archivo creado: ${fileName}.hbs`);

    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
})();
