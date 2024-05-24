const express = require("express");

const fs = require("fs");

const path = require("path");

const server = express();
server.use(express.json());

const fileKoders = path.join(__dirname, "koders.json");

const readKoders = () => {
  const data = fs.readFileSync(fileKoders, "utf8");
  return JSON.parse(data);
};

const writeKoders = (koders) => {
  fs.writeFileSync(fileKoders, JSON.stringify(koders, null, 1));
};

server.post("/koder", (request, response) => {
  const newKoder = request.body.nameKoder;

  if (!newKoder) {
    response.status(400);
    response.json({
      message: "koder`s name ir required for continue",
    });
    return;
  }
  const koders = readKoders();
  koders.push(newKoder);
  writeKoders(koders);

  response.json({
    message: "new koder added",
    koders,
  });
});

server.get("/koder", (request, response) => {
  const koders = readKoders();
  response.json({
    message: "All koders",
    koders,
  });
});

server.delete("/koder/:name", (request, response) => {});

server.listen(8081, () => {
  console.log("server is running on port 8081");
});
