//definir nuestro servidor
const express = require("express");

const kodersRouter = require("./koders.router");
const mentorRouter = require("./mentor.router");

const server = express();

server.use(express.json());

server.use((request, response, next) => {
  console.log("Middleware de applicacion");

  const authorization = request.headers.authorization;
  // middleware a nivel de aplicacion
  if (authorization == "alohomora") {
    next();
  } else {
    response.status(403);
    response.json({
      message: "No tienes acceso",
    });
  }

  next();
});

server.use("/koders", kodersRouter);
server.use("/mentors", mentorRouter);

server.get("/", (request, response) => {
  response.json({
    message: "kodemi apiv1",
  });
});

module.exports = server;
