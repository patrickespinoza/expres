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

// Middleware para establecer el encabezado Content-Type en application/json
server.use((request, response, next) => {
  response.setHeader("Content-Type", "application/json");
  next();
});

server.post("/koder", (request, response) => {
  const newKoder = request.body.name;

  if (!newKoder) {
    response.status(400);
    response.json({
      message: "koder's name is required to continue",
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

server.delete("/koder/:name", (request, response) => {
  const name = request.params.name;
  let koders = readKoders();

  const newKoders = koders.filter(
    (koder) => koder.name.toLowerCase() !== name.toLowerCase()
  );

  if (koders.length === newKoders.length) {
    response.status(404).json({ message: "Koder not found" });
    return;
  }

  writeKoders(newKoders);
  response
    .status(200)
    .json({ message: "Koder deleted successfully", koders: newKoders });
});

server.listen(8081, () => {
  console.log("server is running on port 8081");
});
