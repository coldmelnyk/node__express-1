const express = require("express");

const adminData = require("./admin");

const router = express.Router();

router.get("/favicon.ico", (req, res) => res.status(204));

router.get("/", (req, res, next) => {
  const products = adminData.products;
  const doesProductsExists = products.length > 0;

  res.render("shop", {
    doesProductsExists,
    products,
    pageTitle: "Shop",
    path: "/",
    activeShop: true,
    productCSS: true,
  });
});

exports.routes = router;
