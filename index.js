const express = require("express");
const server = express();

const koders = [
  {
    name: "patrick",
    generation: 33,
  },
  {
    name: "Leonel",
    generation: 33,
  },
  {
    name: "Marcos",
    generation: 33,
  },
  {
    name: "Aiden",
    generation: 33,
  },
];

server.use(express.json());

server.get("/", (request, response) => {
  console.log("GET root");

  response.writeHead(200, {
    "Content-type": "text/plain",
  });

  response.end("Hola mundo");
});

server.post("/koders", (request, response) => {
  console.log("body:", request.body);
  const newKoderName = request.body.name;
  const newKoderGeneration = request.body.generation;

  const newKoder = {
    name: newKoderName,
    generation: newKoderGeneration,
  };
  koders.push(newKoder);

  response.json(koders);
});

server.get("/koders", (request, response) => {
  //   response.writeHead(200, {
  //     "Content-type": "application/json",
  //   });
  //   response.end(JSON.stringify(koders));
  response.json(koders);
});

server.listen(8070, () => {
  console.log("Server ready");
});
