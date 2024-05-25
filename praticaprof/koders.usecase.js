const db = require("./db");

function add(newKoder) {
  if (!newKoder.name) throw new Error("name is required");

  if (!newKoder.generation) throw new Error("generation is required");

  newKoder.generation = parseInt(newKoder.generation);
  if (isNaN(newKoder.generation))
    throw new Error("generation must be a number");
  if (newKoder.generation <= 0) throw new Error("invalid generation");

  //   if (
  //     newKoder.generation.toLowerCase() == "m" &&
  //     newKoder.generation.toLowerCase() == "f"
  //   )
  //     throw new Error("only accepted m and f");
  if (!newKoder.gener) throw new Error("gender is requiered");
  if (!["f", "m"].includes(newKoder.gener.toLowerCase())) {
    throw new Error("only m, f values are allowed");
  }

  if (!newKoder.age) throw new Error("age is required");
  newKoder.age = parseInt(newKoder.age);
  if (isNaN(newKoder.age)) throw new Error("age must be a number");
  if (newKoder.age <= 0) throw new Error("age must be greater than 0");

  if (typeof newKoder.isActive == "boolean") {
    throw new Error("isActive muts be a boolean");
  }
  const dbData = db.read();
  dbData.koders.push(newKoder);

  db.write(dbData);

  return dbData.koders;
}

function deleteAll() {
  const dbData = db.read();
  dbData.koders = [];
  db.write(dbData);
  return dbData.koders;
}

function deleteByName(name) {
  if (!name) throw new Error("name is required");
  const dbData = db.read();
  dbData.koders = dbData.koders.filter(
    (koder) => koder.name.toLowerCase() !== name.toLowerCase()
  );

  db.write(dbData);

  return dbData.koders;
}

function getAll() {
  return db.read().koders;
}

module.exports = {
  add,
  deleteAll,
  deleteByName,
  getAll,
};
