const fs = require("node:fs");
const fileNmae = "db.json";
const defaulData = { koders: [] };

function init() {
  if (!fs.existsSync(fileNmae)) {
    fs.writeFileSync(fileNmae, JSON.stringify(defaulData));
  }
}

function read() {
  const dbAsString = fs.readFileSync(fileNmae, "utf8");
  return JSON.parse(dbAsString);
}

function write(dataToWrite) {
  fs.writeFileSync(fileNmae, JSON.stringify(dataToWrite));
}

module.exports = {
  init,
  read,
  write,
};
