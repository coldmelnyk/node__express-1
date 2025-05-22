const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);
router.get("/edit-product/:productId", adminController.getEditProduct);
router.get("/products", adminController.getAdminProductsList);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);
router.post("/edit-product", adminController.postEditProduct);

module.exports = router;
