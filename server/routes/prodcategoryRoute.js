const express = require("express");

const { auth, isAdmin } = require("../middlewares/auth");
const { createCategory, getallCategory, updateCategory, deleteCategory, getCategory } = require("../controllers/prodcategoryCtrl");

const router = express.Router();
router.post("/",  createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", auth, isAdmin, deleteCategory);
router.get("/:id", getCategory);
router.get("/", getallCategory);

module.exports = router;
