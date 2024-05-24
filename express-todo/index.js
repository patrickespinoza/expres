const express = require("express");

const server = express();

server.use(express.json());

const todos = [];

server.get("/todos", (request, response) => {
  response.json({
    message: "all todos",
    todos: todos,
  });
});

server.post("/todos", (request, response) => {
  const newTodo = request.body.todos;

  if (!newTodo) {
    response.status(400);
    response.json({ message: "todo is required" });
    return;
  }
  todos.push(newTodo);

  response.json({ message: "new todo added", todos: todos });
});

server.delete("/todos/:idx", (request, response) => {
  const indexToDelete = request.params.idx;
  const indexAsInreger = parseInt(indexToDelete);

  if (isNaN(indexAsInreger)) {
    response.status(400);
    response.json({
      message: "invalid index, must be a number",
    });
    return;
  }

  if (indexAsInreger < 0 || indexAsInreger >= todos.length) {
    response.status(400);
    response.json({ message: "invalid index, out of bound" });
    return;
  }

  todos.splice(indexAsInreger, 1);

  response.json({
    message: "todo delete successfully",
    todos: todos,
  });
});

server.listen(8080, () => {
  console.log("server reunnig on port 8080");
});
