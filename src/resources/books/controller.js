const db = require("../../utils/database");

function createOne(req, res) {
  const createOne = `
    INSERT INTO books
      (name, type, author, topic, publicationDate)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  db.query(createOne, Object.values(req.body))
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function getAll(req, res) {
  const getAll = `
    SELECT *
    FROM books;
  `;

  db.query(getAll)
    .then((result) => res.json({ data: result.rows }))
    .catch(console.error);
}

function getOneById(req, res) {
  const idToGet = req.params.id;

  const getOneById = `
    SELECT *
    FROM books
    WHERE id = $1;
  `;

  db.query(getOneById, [idToGet])
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function updateOneById(req, res) {
  const bookToUpdate = {
    id: req.params.id,
    ...req.body
  };

  console.log(bookToUpdate);

  const SQL = `
  UPDATE books
  SET
   title = $1,
   type = $2,
   author = $3,
   topic = $4,
   publicationDate = $5
  WHERE 
   id = $6
  `;

  db.query(SQL, [
    bookToUpdate.title,
    bookToUpdate.type,
    bookToUpdate.author,
    bookToUpdate.topic,
    bookToUpdate.publicationDate,
    bookToUpdate.id
  ])
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function patchOneById(req, res) {
  const id = req.params.id;
  console.log(req.body);
  const bookToUpdate = req.body;

  let SQL = `
  UPDATE pets SET
  `;

  console.log("bookToUpdate: ", bookToUpdate);

  const SQLParams = [];

  let i = 1;
  for (const key in bookToUpdate) {
    SQL += ` ${key} = $`;
    SQL += i;
    SQL += ",";
    SQLParams.push(bookToUpdate[key]);
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

function updateOneByTitle(req, res) {
  const bookToUpdate = {
    title: req.params.title,
    ...req.body
  };

  console.log(bookToUpdate);

  const SQL = `
  UPDATE books
  SET
   type = $1,
   author = $2,
   topic = $3,
   publicationDate = $4,
   id = $5
  WHERE 
   title = $6
   `;

  db.query(SQL, [
    bookToUpdate.title,
    bookToUpdate.type,
    bookToUpdate.author,
    bookToUpdate.topic,
    bookToUpdate.publicationDate,
    bookToUpdate.id
  ])
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function deleteOneById(req, res) {
  const id = req.params.id;

  const SQL = `
    DELETE FROM books
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
  updateOneByTitle,
  deleteOneById
};
