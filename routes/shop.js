const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getShop);
router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);
router.post("/cart-delete-item", shopController.postDeleteFromCart);
router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getProduct);
router.get('/checkout', shopController.getCheckout);
router.get('/orders', shopController.getOrders);

module.exports = router;
