const express = require("express");

const {
  createOne,
  getAll,
  getOneById,
  updateOneById,
  patchOneById,
  updateOneByTitle,
  deleteOneById
} = require("./controller");

const router = express.Router();

router.post("/", createOne);

router.get("/", getAll);

router.get("/:id", getOneById);

router.put("/:id", updateOneById);

router.put("/:title", updateOneByTitle);

router.patch("/:id", patchOneById);

router.delete("/:id", deleteOneById);

module.exports = router;
