const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getSlicedProducts);
router.get("/cart", shopController.getCart);
router.get("/shop", shopController.getProducts);
router.get('/checkout', shopController.getCheckout);
router.get('/orders', shopController.getOrders);

module.exports = router;
