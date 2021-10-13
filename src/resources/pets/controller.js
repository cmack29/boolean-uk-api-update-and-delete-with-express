const db = require("../../utils/database");

function createOne(req, res) {
  const createOne = `
    INSERT INTO pets
      (name, age, type, microchip)
    VALUES
      ($1, $2, $3, $4)
    RETURNING *;
  `;

  db.query(createOne, Object.values(req.body))
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function getAll(req, res) {
  const getAll = `
    SELECT *
    FROM pets;
  `;

  db.query(getAll)
    .then((result) => res.json({ data: result.rows }))
    .catch(console.error);
}

function getOneById(req, res) {
  const idToGet = req.params.id;

  const getOneById = `
    SELECT *
    FROM pets
    WHERE id = $1;
  `;

  db.query(getOneById, [idToGet])
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function updateOneById(req, res) {
  const petToUpdate = {
    id: req.params.id,
    ...req.body
  };

  console.log(petToUpdate);

  const SQL = `
  UPDATE pets
  SET
   name = $1,
   age = $2,
   type = $3,
   breed = $4,
   microchip = $5
  WHERE
   id = $6
  `;

  db.query(SQL, [
    petToUpdate.name,
    petToUpdate.age,
    petToUpdate.type,
    petToUpdate.breed,
    petToUpdate.microchip,
    petToUpdate.id
  ])
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function patchOneById(req, res) {
  const id = req.params.id;
  console.log(req.body);
  const petToUpdate = req.body;

  let SQL = `
  UPDATE pets SET
  `;

  console.log("petToUpdate: ", petToUpdate);

  const SQLParams = [];

  let i = 1;
  for (const key in petToUpdate) {
    SQL += ` ${key} = $`;
    SQL += i;
    SQL += ",";
    SQLParams.push(petToUpdate[key]);
    i = i + 1;
  }

  SQLParams.push(id);

  SQL = SQL.slice(0, SQL.length - 1);
  SQL += ` where id = $`;
  SQL += i;
  SQL += ` returning *`;

  console.log(SQL);
  console.log(SQLParams);

  db.query(SQL, SQLParams)
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function updateOneByName(req, res) {
  const petToUpdate = {
    name: req.params.name,
    ...req.body
  };

  console.log(petToUpdate);

  const SQL = `
  UPDATE pets
  SET
   id = $1,
   age = $2,
   type = $3,
   breed = $4,
   microchip = $5
  WHERE
   name = $6
   `;

  db.query(SQL, [
    petToUpdate.name,
    petToUpdate.age,
    petToUpdate.type,
    petToUpdate.breed,
    petToUpdate.microchip,
    petToUpdate.id
  ])
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function deleteOneById(req, res) {
  const id = req.params.id;

  const SQL = `
    DELETE FROM pets
    WHERE id = $1
  `;

  db.query(SQL, [id])
    .then((result) => res.json({ message: "deleted successfully" }))
    .catch(console.error);
}

module.exports = {
  createOne,
  getAll,
  getOneById,
  updateOneById,
  patchOneById,
  updateOneByName,
  deleteOneById
};
