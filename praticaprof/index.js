const importServer = require("./server");

const importdb = require("./db");

const port = 8082;

importdb.init();

importServer.listen(port, () => {
  console.log(`server is running at http://localhots:${port}`);
});
